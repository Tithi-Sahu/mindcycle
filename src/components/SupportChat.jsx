import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Button } from './ui/Button';
import { Send, MessageCircle, X, Minimize2 } from 'lucide-react';

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Mind Cycle support assistant. I'm here to help you with mental health, motivation, goal setting, and anything else you need. How can I support you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'your-api-key-here');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const context = `You are a supportive, empathetic AI assistant for Mind Cycle, a mental health and productivity app. Your role is to:
      - Provide emotional support and encouragement
      - Help with goal setting and motivation
      - Offer advice on mental health and wellness
      - Be conversational and human-like
      - Listen actively and respond thoughtfully
      - Suggest app features when relevant
      - Maintain a positive, supportive tone
      - Be honest about limitations (you're not a licensed therapist)

      Previous conversation context: ${messages.slice(-5).map(m => `${m.sender}: ${m.text}`).join('\n')}

      User message: ${message}`;

      const result = await model.generateContent(context);
      const response = await result.response;
      const botMessage = response.text();

      const botResponse = {
        id: messages.length + 2,
        text: botMessage,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or feel free to explore the app's other features.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-50 group"
          aria-label="Open support chat"
        >
          <MessageCircle size={24} />
          <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            ?
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl z-50 transition-all duration-200 ${
          isMinimized ? 'h-14' : 'h-[500px]'
        }`}>
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle size={20} />
              <span className="font-medium">Mind Cycle Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className="hover:bg-blue-700 p-1 rounded transition-colors"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                <Minimize2 size={16} />
              </button>
              <button
                onClick={toggleChat}
                className="hover:bg-blue-700 p-1 rounded transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[380px]">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <span className={`text-xs mt-1 block ${
                        message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    disabled={!inputMessage.trim() || isTyping}
                    className="px-4 py-2"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SupportChat;