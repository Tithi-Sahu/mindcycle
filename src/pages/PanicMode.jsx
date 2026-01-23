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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Safety
            </Button>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500 animate-pulse" />
              <h1 className="text-lg font-semibold text-gray-900">Panic Mode Support</h1>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            24/7 Support Available
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Button
            variant="outline"
            onClick={() => handleQuickAction('grounding')}
            className="flex items-center space-x-2 h-auto py-3"
            disabled={isLoading}
          >
            <Eye className="h-4 w-4" />
            <span className="text-xs">Grounding</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickAction('breathing')}
            className="flex items-center space-x-2 h-auto py-3"
            disabled={isLoading}
          >
            <Wind className="h-4 w-4" />
            <span className="text-xs">Breathing</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleQuickAction('affirmation')}
            className="flex items-center space-x-2 h-auto py-3"
            disabled={isLoading}
          >
            <Heart className="h-4 w-4" />
            <span className="text-xs">Affirmation</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => sendMessage("I'm feeling overwhelmed and need help")}
            className="flex items-center space-x-2 h-auto py-3"
            disabled={isLoading}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">Talk to Me</span>
          </Button>
        </div>

        {/* Chat Messages */}
        <Card className="h-96 mb-4">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Support Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
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
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={() => sendMessage(inputMessage)}
            disabled={isLoading || !inputMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Emergency Resources */}
        <Card className="mt-6 bg-red-50 border-red-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-red-800 mb-2">Emergency Resources</h3>
            <div className="text-sm text-red-700 space-y-1">
              <p>• If you're in immediate danger, call emergency services</p>
              <p>• National Suicide Prevention Lifeline: 988</p>
              <p>• Crisis Text Line: Text HOME to 741741</p>
              <p>• This AI chat is for support only, not a replacement for professional help</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PanicMode;