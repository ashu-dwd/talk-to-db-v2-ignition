import React, { useState, useEffect, useRef } from "react";
import "../assets/css/ChatPage.css"; // Import your CSS file for styling

function ChatLayout() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    console.log("User input:", input);

    // Add user message to chat
    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send POST request to backend
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        // Add AI response to chat
        const aiMessage = {
          html: data.mainOutput, // Store HTML response
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } else {
        // Handle error
        const errorMessage = {
          text: data.error || "Sorry, something went wrong.",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
          isError: true,
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        text: "Network error. Please try again later.",
        sender: "ai",
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>AI Chat Assistant</h1>
      </div>
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h2>Welcome to AI Chat!</h2>
            <p>Ask me anything to get started...</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender} ${
                message.isError ? "error" : ""
              }`}
            >
              <div className="message-bubble">
                {message.html ? (
                  <div dangerouslySetInnerHTML={{ __html: message.html }} />
                ) : (
                  <p>{message.text}</p>
                )}
                <span className="timestamp">{message.timestamp}</span>
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
          placeholder="Type your message here..."
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
