import { motion } from 'framer-motion';
import '../globals.css';
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// Use public path for Meddy icon

const apiEndpoint = "/api/chat";
const title = "Meddy AI";
const systemMessage = `Instructions:
  You are "Meddy", a medical assistant designed to help users with health-related queries.
  Keep messages under 300 characters.
  Do not go over 300 characters.
  Remind user to not provide personal health information.
  Provide accurate and concise answers to user queries.
  You are a helpful assistant. 
  Provide accurate and concise answers to user queries.
  Remind users to consult healthcare professionals for medical advice when query seems sensitive. 
  Keep a friendly tone.
  Avoid answering non-medical questions. 
  Replies should be concise.
  Source from "https://athome.medline.com/en/categories"
  Source from "https://athome.medline.com/en/"
  Source from "https://newsroom.medline.com/news-and-insights/"`;

function anonymizeInput(input: string): string {
  let result = input.replace(/([\w.-]+)@([\w.-]+)\.(\w+)/g, '[email hidden]');
  result = result.replace(/\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[phone hidden]');
  result = result.replace(/(my name is|i am|i'm|this is) ([A-Z][a-z]+( [A-Z][a-z]+)?)/gi, '$1 [name hidden]');
  return result;
}

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatbotWidget: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Meddy, your medical assistant. Please do not share personal health information. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const anonymizedInput = anonymizeInput(input.trim());
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: anonymizedInput },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(apiEndpoint, {
        message: anonymizedInput,
        systemMessage: systemMessage,
      });
      const reply = (response.data.reply || "Sorry, I didn't understand that.").replace(/\s+/g, " ").trim();
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
  } catch (err: unknown) {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle-btn"
        aria-label="Open Meddy Chat"
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { scale: 0.95 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img src="/meddy.svg" alt="Meddy AI icon" className="chatbot-toggle-avatar" />
      </motion.button>

      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 40 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="chatbot-container"
      >
        <div style={{ display: isOpen ? 'block' : 'none' }}>
          <div className="chatbot-popup">
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <img src="/meddy.svg" alt="Meddy Logo" className="chatbot-header-icon" />
                <h2 className="chatbot-title">{title}</h2>
              </div>
              <button
                tabIndex={0}
                className="chatbot-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >✕</button>
            </div>
            <div ref={chatBodyRef} className="chatbot-body">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chatbot-message-row ${msg.role === "user" ? "chatbot-message-user" : "chatbot-message-assistant"}`}
                >
                  {msg.role === "assistant" && (
                    <img src="/meddy.svg" alt="Meddy Logo" className="chatbot-message-icon" />
                  )}
                  <div
                    className={`chatbot-message-bubble ${msg.role === "user"
                      ? "chatbot-message-user-bubble"
                      : "chatbot-message-assistant-bubble"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="chatbot-message-row chatbot-message-assistant">
                  <img src="/meddy.svg" alt="Meddy Logo" className="chatbot-message-icon" />
                  <div className="chatbot-message-bubble chatbot-message-assistant-bubble">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
            <div className="chatbot-footer">
              <input
                type="text"
                className="chatbot-input"
                placeholder="Type your message here..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                aria-label="Type your message"
                autoComplete="off"
              />
              <button
                className="chatbot-send-btn"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send"
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatbotWidget;