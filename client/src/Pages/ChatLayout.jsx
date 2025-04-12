import React, { useState, useEffect, useRef } from "react";
import "../assets/css/ChatPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { StopIcon, SendIcon, MicActiveIcon, MicInactiveIcon } from "./icons";

function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [roomId, setRoomId] = useState("");
  const [listening, setListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
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

  // Voice feature function - fixed to properly submit after listening
  const handleVoiceFeature = () => {
    if (!listening) {
      setListening(true);

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.error("Speech Recognition not supported.");
        return;
      }

      const recognition = new SpeechRecognition();
      window.recognitionInstance = recognition;

      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      let finalTranscript = "";

      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        finalTranscript = transcript;
        setInput(transcript);
      };

      recognition.onend = () => {
        setListening(false);

        if (finalTranscript.trim()) {
          // Fixed: Call submitMessage instead of handleSubmit
          submitMessage(finalTranscript);
        }
      };
    } else {
      setListening(false);
      if (window.recognitionInstance) {
        window.recognitionInstance.stop();
      }
    }
  };

  // New function to handle message submission without requiring an event
  const submitMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Stop any ongoing speech when sending a new message
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const userMessage = {
      text: messageText,
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
        body: JSON.stringify({ query: messageText }),
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
          messageText = data.finalResponse.mainOutput || data.generatedQuery;
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

        // Speak the AI response
        speakText(stripHTML(messageText));
      } else if (data.error) {
        const errorMessage = {
          text: data.error,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
          isError: true,
        };

        setMessages((prev) => [...prev, errorMessage]);

        // Speak the error message too
        speakText(stripHTML(data.error));
      } else {
        const unexpectedMessage = {
          text: "Received an unexpected response format from the server.",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
          isError: true,
        };

        setMessages((prev) => [...prev, unexpectedMessage]);

        // Speak the unexpected response message
        speakText("Received an unexpected response format from the server.");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        text: `Error: ${error.message}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);

      // Speak the error message
      speakText(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced text to speech feature with state tracking
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      // Cancel any previous speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN"; // Changed from 'hi-IN' to 'en-US' for English

      // Update state when speech starts and ends
      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-Speech is not supported in this browser.");
    }
  };

  const stripHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Modified form submission to use the new submitMessage function
  const handleSubmit = (e) => {
    e.preventDefault();
    submitMessage(input);
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
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="send-button"
          aria-label="Send message"
        >
          {isLoading ? <span className="spinner"></span> : <SendIcon />}
        </button>
        <button
          type="button"
          onClick={handleVoiceFeature}
          className={`mic-button ${listening ? "active" : ""}`}
          aria-label={listening ? "Stop listening" : "Start voice input"}
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : listening ? (
            <MicActiveIcon />
          ) : (
            <MicInactiveIcon />
          )}
        </button>
        {isSpeaking && (
          <button
            type="button"
            onClick={() => {
              window.speechSynthesis.cancel();
              setIsSpeaking(false);
            }}
            className="stop-speech-button"
            aria-label="Stop speech"
          >
            <StopIcon />
          </button>
        )}
      </form>
    </div>
  );
}

export default ChatLayout;
