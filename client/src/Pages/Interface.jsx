import React, { useState, useEffect, useRef, useCallback } from "react";
import "../assets/css/ChatPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faMicrophoneSlash,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

function Interface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [listening, setListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const recognitionInstance = useRef(null);
  const finalTranscriptRef = useRef(""); // Ref to hold final transcript

  const url = window.location.href;
  const routeRoomId = url.split("/").pop();

  console.log("URL:", url);
  console.log("Route room ID:", routeRoomId);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const speakText = useCallback((text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
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
  }, []);

  const stripHTML = useCallback((html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }, []);

  const submitMessage = useCallback(
    async (messageText) => {
      if (!messageText.trim()) return;

      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }

      const userMessage = {
        text: messageText,
        sender: "user",
        timestamp: new Date().toLocaleTimeString(),
      };
      console.log("User message:", userMessage);

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      const endpoint = `http://localhost:5000/api/chat/${roomId}`;
      console.log(`Sending message to: ${endpoint}`);

      try {
        const response = await axios.post(endpoint, {
          query: messageText,
        });

        const data = response.data;
        console.log("Response data:", data);

        if (!roomId && data.roomId) {
          console.log("Setting new roomId:", data.roomId);
          setRoomId(data.roomId);
          navigate(`/chat/${data.roomId}`, { replace: true });
        }

        let aiMessageText = data.aiResponse?.mainOutput || data.aiResponse; // Check mainOutput or use directly
        if (typeof aiMessageText === "object") {
          aiMessageText = JSON.stringify(aiMessageText); // Handle other object formats
        }

        if (aiMessageText) {
          const aiMessage = {
            text: aiMessageText,
            sender: "ai",
            timestamp: new Date().toLocaleTimeString(),
          };
          setMessages((prev) => [...prev, aiMessage]);
          speakText(stripHTML(aiMessageText));
        } else if (data.error) {
          const errorMessage = data.error;
          const errorAiMessage = {
            text: errorMessage,
            sender: "ai",
            timestamp: new Date().toLocaleTimeString(),
            isError: true,
          };
          setMessages((prev) => [...prev, errorAiMessage]);
          speakText(stripHTML(errorMessage));
        } else {
          const unexpectedMessage = {
            text:
              data.finalResponse.mainOutput ||
              "Received an unexpected response format from the server.",
            sender: "ai",
            timestamp: new Date().toLocaleTimeString(),
            isError: false,
          };
          setMessages((prev) => [...prev, unexpectedMessage]);
          speakText(stripHTML(unexpectedMessage.text));
        }
      } catch (err) {
        console.error("Error sending message:", err);
        let errorMessage = "Failed to send message";
        if (err.response) {
          errorMessage += `: Server error ${
            err.response.status
          } - ${JSON.stringify(err.response.data)}`;
          console.error("Response data:", err.response.data);
        } else if (err.request) {
          errorMessage +=
            ": No response from server - check if backend is running";
          console.error("Request:", err.request);
        } else {
          errorMessage += `: ${err.message}`;
        }
        const errorAiMessage = {
          text: errorMessage,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString(),
          isError: true,
        };
        setMessages((prev) => [...prev, errorAiMessage]);
        speakText(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [roomId, navigate, isSpeaking, speakText, stripHTML]
  );

  const handleVoiceFeature = useCallback(() => {
    if (!listening) {
      setListening(true);
      finalTranscriptRef.current = ""; // Reset transcript

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.error("Speech Recognition not supported.");
        return;
      }

      recognitionInstance.current = new SpeechRecognition();
      const recognition = recognitionInstance.current;

      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setInput(transcript);
        finalTranscriptRef.current = transcript; // Update ref
      };

      recognition.onend = () => {
        setListening(false);
        if (finalTranscriptRef.current.trim()) {
          submitMessage(finalTranscriptRef.current.trim());
          setInput("");
        }
      };

      recognition.start();
    } else {
      setListening(false);
      if (recognitionInstance.current) {
        recognitionInstance.current.stop();
      }
    }
  }, [listening, setListening, submitMessage, setInput]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submitMessage(input);
    },
    [input, submitMessage]
  );

  // Fetch previous chat when roomId is in route
  useEffect(() => {
    const fetchChat = async () => {
      if (routeRoomId) {
        setIsLoading(true);
        try {
          console.log("Fetching chat with roomId:", routeRoomId);
          const response = await axios.get(
            `http://localhost:5000/api/chat/${routeRoomId}`
          );
          const data = response.data;

          console.log("Chat data:", data);
          setRoomId(routeRoomId);

          if (data.messages && Array.isArray(data.messages)) {
            setMessages(data.messages);
          } else {
            console.warn("No messages array found in response:", data);
            setMessages([]);
          }
        } catch (err) {
          console.error("Error loading chat:", err);
          let errorMessage = "Failed to load chat";

          if (err.response) {
            errorMessage += `: Server error ${
              err.response.status
            } - ${JSON.stringify(err.response.data)}`;
            console.error("Response data:", err.response.data);
          } else if (err.request) {
            errorMessage +=
              ": No response from server - check if backend is running";
            console.error("Request:", err.request);
          } else {
            errorMessage += `: ${err.message}`;
          }

          setMessages([
            {
              text: errorMessage,
              sender: "ai",
              timestamp: new Date().toLocaleTimeString(),
              isError: true,
            },
          ]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchChat();
  }, [routeRoomId]);

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
          {isLoading ? (
            <span className="spinner"></span>
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} />
          )}
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
            <FontAwesomeIcon icon={faMicrophone} />
          ) : (
            <FontAwesomeIcon icon={faMicrophoneSlash} />
          )}
        </button>
        {isSpeaking && (
          <button
            type="button"
            onClick={() => window.speechSynthesis.cancel()}
            className="stop-speech-button"
            aria-label="Stop speech"
          >
            <FontAwesomeIcon icon={faStop} />
          </button>
        )}
      </form>
    </div>
  );
}

export default Interface;
