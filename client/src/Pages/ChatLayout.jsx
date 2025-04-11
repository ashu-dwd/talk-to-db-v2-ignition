import React, { useState, useEffect, useRef } from "react";
import "../assets/css/ChatPage.css";
import { useParams, useNavigate } from "react-router-dom";

function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [roomId, setRoomId] = useState("");
  const { roomId: routeRoomId } = useParams();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch previous chat when roomId is in route
  useEffect(() => {
    if (routeRoomId) {
      const fetchChat = async () => {
        setIsLoading(true);
        try {
          console.log("Fetching chat with roomId:", routeRoomId);
          const response = await fetch(
            `http://localhost:3000/api/chat/${routeRoomId}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Chat data:", data);

          // Set roomId from route parameter
          setRoomId(routeRoomId);

          // Check if data contains messages array
          if (
            data.messages &&
            Array.isArray(data.messages) &&
            data.messages.length > 0
          ) {
            setMessages(data.messages);
          }
          // Fallback to the old format
          else if (data.userQuery && data.aiResponse) {
            // Handle aiResponse whether it's an object with mainOutput or a string
            let aiResponseText = "";
            if (
              typeof data.aiResponse === "object" &&
              data.aiResponse.mainOutput
            ) {
              aiResponseText = data.aiResponse.mainOutput;
            } else if (typeof data.aiResponse === "string") {
              aiResponseText = data.aiResponse;
            } else if (typeof data.aiResponse === "object") {
              aiResponseText = JSON.stringify(data.aiResponse);
            }

            setMessages([
              {
                text: data.userQuery,
                sender: "user",
                timestamp: new Date().toLocaleTimeString(),
              },
              {
                text: aiResponseText,
                sender: "ai",
                timestamp: new Date().toLocaleTimeString(),
              },
            ]);
          } else {
            console.warn("Unexpected data format:", data);
          }
        } catch (err) {
          console.error("Error loading chat:", err);
          setMessages([
            {
              text: `Failed to load chat: ${err.message}`,
              sender: "ai",
              timestamp: new Date().toLocaleTimeString(),
              isError: true,
            },
          ]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchChat();
    }
  }, [routeRoomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Determine the endpoint based on whether we have a roomId
      const endpoint = roomId
        ? `http://localhost:3000/api/chat/${roomId}`
        : `http://localhost:3000/api/chat`;

      console.log(`Sending message to: ${endpoint}`);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.finalResponse) {
        // Handle the case where finalResponse is an object with mainOutput property
        let messageText;
        if (
          typeof data.finalResponse === "object" &&
          data.finalResponse.mainOutput
        ) {
          messageText = data.finalResponse.mainOutput;
        } else if (
          typeof data.finalResponse === "object" &&
          data.finalResponse.success
        ) {
          messageText =
            data.finalResponse.mainOutput || "Request processed successfully";
        } else {
          messageText = JSON.stringify(data.finalResponse);
        }

        // If new chat was created, update roomId and URL
        if (!roomId && data.roomId) {
          console.log("Setting new roomId:", data.roomId);
          setRoomId(data.roomId);
          navigate(`/chat/${data.roomId}`, { replace: true });
        }

        const aiMessage = {
          text: messageText,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            text: data.error,
            sender: "ai",
            timestamp: new Date().toLocaleTimeString(),
            isError: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "Received an unexpected response format from the server.",
            sender: "ai",
            timestamp: new Date().toLocaleTimeString(),
            isError: true,
          },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: `Error: ${error.message}`,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome to AI Chat!</h2>
            <p>Ask me anything to get started...</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.sender} ${msg.isError ? "error" : ""}`}
            >
              <div className="message-bubble">
                <p dangerouslySetInnerHTML={{ __html: msg.text }} />
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="message ai loading">
            <div className="message-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}

export default ChatLayout;
