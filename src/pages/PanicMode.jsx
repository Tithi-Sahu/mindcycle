import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { ArrowLeft, Send, Heart, Wind, Eye, MessageCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PanicMode = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello. I'm here to help you through this moment. Take a deep breath. You're safe, and this feeling will pass. What would you like to focus on right now?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const groundingExercises = [
    "Place both feet flat on the ground. Feel the stability beneath you.",
    "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
    "Hold an ice cube in your hand and focus on the cold sensation.",
    "Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat.",
  ];

  const breathingExercises = [
    "4-7-8 Breathing: Inhale for 4, hold for 7, exhale for 8.",
    "Box Breathing: Inhale 4, hold 4, exhale 4, hold 4.",
    "Alternate Nostril Breathing: Close right nostril, inhale left. Close left, exhale right. Switch sides.",
  ];

  const affirmations = [
    "This feeling is temporary. I am safe.",
    "I am stronger than I think. I can get through this.",
    "My feelings are valid, and I am worthy of care.",
    "I am breathing. I am here. I am present.",
    "One moment at a time. I can handle this.",
  ];

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `You are an empathetic mental-health support companion in a panic mode chat. Never judge the user. Always validate feelings. Offer grounding techniques first, then breathing exercises, then positive affirmations.

SYSTEM RULES:
- Prioritize: Grounding techniques → Breathing exercises → Positive affirmations → Short distraction suggestions
- Be calm, compassionate, and non-judgmental
- Keep responses concise but supportive
- Always acknowledge their feelings first
- Never give medical advice or diagnosis
- If they mention self-harm, suggest immediate professional help

User message: "${messageText}"

Respond empathetically and offer appropriate support techniques.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botResponse = response.text();

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm here for you. Let's try a simple breathing exercise: Breathe in for 4 counts, hold for 4, exhale for 4. Would you like me to suggest some grounding techniques?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    let message = '';
    switch (action) {
      case 'grounding':
        message = `I need grounding help. ${groundingExercises[Math.floor(Math.random() * groundingExercises.length)]}`;
        break;
      case 'breathing':
        message = `I need breathing help. ${breathingExercises[Math.floor(Math.random() * breathingExercises.length)]}`;
        break;
      case 'affirmation':
        message = `I need an affirmation. ${affirmations[Math.floor(Math.random() * affirmations.length)]}`;
        break;
      default:
        return;
    }
    sendMessage(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-800 to-red-900 relative overflow-hidden">
      {/* Animated background elements with calming effect */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-md border-b border-white/30 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Safety
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-300 animate-pulse" />
              <h1 className="text-lg font-semibold text-white">Panic Mode Support</h1>
            </div>
          </div>
          <div className="text-sm text-white/60">
            24/7 Support Available
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 relative z-10">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Button
            onClick={() => handleQuickAction('grounding')}
            className="flex items-center space-x-2 h-auto py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transition-all duration-300 transform hover:scale-105"
            disabled={isLoading}
          >
            <Eye className="h-4 w-4" />
            <span className="text-xs">Grounding</span>
          </Button>
          <Button
            onClick={() => handleQuickAction('breathing')}
            className="flex items-center space-x-2 h-auto py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white transition-all duration-300 transform hover:scale-105"
            disabled={isLoading}
          >
            <Wind className="h-4 w-4" />
            <span className="text-xs">Breathing</span>
          </Button>
          <Button
            onClick={() => handleQuickAction('affirmation')}
            className="flex items-center space-x-2 h-auto py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white transition-all duration-300 transform hover:scale-105"
            disabled={isLoading}
          >
            <Heart className="h-4 w-4" />
            <span className="text-xs">Affirmation</span>
          </Button>
          <Button
            onClick={() => sendMessage("I'm feeling overwhelmed and need help")}
            className="flex items-center space-x-2 h-auto py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transition-all duration-300 transform hover:scale-105"
            disabled={isLoading}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">Talk to Me</span>
          </Button>
        </div>

        {/* Chat Messages */}
        <Card className="h-96 mb-4 bg-white/10 backdrop-blur-md border-white/20 hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-center text-red-200">Support Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg transition-all duration-300 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-white/20 backdrop-blur-sm text-white/90 border border-white/30'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
        </Card>

        {/* Message Input */}
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here... (or use quick actions above)"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
            className="flex-1 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 focus:bg-white/30 transition-all duration-300"
            disabled={isLoading}
          />
          <Button
            onClick={() => sendMessage(inputMessage)}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Emergency Resources */}
        <Card className="mt-6 bg-white/15 backdrop-blur-md border-white/30 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-4">
            <h3 className="font-semibold text-white/90 mb-2">Emergency Resources</h3>
            <div className="text-sm text-white/80 space-y-1">
              <p>• If you're in immediate danger, call emergency services</p>
              <p>• National Suicide Prevention Lifeline: 988</p>
              <p>• Crisis Text Line: Text HOME to 741741</p>
              <p>• This AI chat is for support only, not a replacement for professional help</p>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};

export default PanicMode;