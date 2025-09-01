import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Phone, Calendar, DollarSign, Info } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

interface ChatbotProps {
  onGetQuote: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onGetQuote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting when chatbot opens
      setTimeout(() => {
        addBotMessage(
          "Hi there! 👋 I'm here to help you with Maftown Spitbraai services. What can I assist you with today?",
          [
            "View pricing",
            "Book a service",
            "Equipment hire",
            "Event planning"
          ]
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, quickReplies?: string[]) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      quickReplies
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        resolve(true);
      }, 1000 + Math.random() * 1000);
    });
  };

  const getBotResponse = async (userInput: string): Promise<{ text: string; quickReplies?: string[] }> => {
    const input = userInput.toLowerCase();

    // Pricing inquiries
    if (input.includes('price') || input.includes('cost') || input.includes('pricing')) {
      return {
        text: "Here are our current prices:\n\n🔥 Charcoal/Firewood Spitbraai:\n• Equipment hire: R800\n• With chef: R1,300\n\n⚡ Gas Spitbraai:\n• Equipment hire: R1,200\n• With chef: R1,600\n\nFull catering packages are quoted based on your specific needs. Would you like a personalized quote?",
        quickReplies: ["Get personalized quote", "Tell me about services", "Contact details"]
      };
    }

    // Equipment hire
    if (input.includes('equipment') || input.includes('hire') || input.includes('rent')) {
      return {
        text: "We offer professional spitbraai equipment hire! 🍖\n\nOur equipment includes:\n• Professional spitbraai units\n• All necessary cooking tools\n• Delivery and pickup\n• Basic cooking instructions\n\nCharcoal equipment: R800\nGas equipment: R1,200\n\nWould you like to book equipment or need more details?",
        quickReplies: ["Book equipment", "Chef service", "Full catering", "Contact us"]
      };
    }

    // Booking/reservation
    if (input.includes('book') || input.includes('reserve') || input.includes('hire')) {
      return {
        text: "Great! I'd love to help you book our services. 📅\n\nTo get started, I'll need some details about your event:\n• Event date\n• Number of guests\n• Type of service needed\n• Location\n\nWould you like to call us directly for faster booking, or shall I guide you to our contact form?",
        quickReplies: ["Call now", "Contact form", "Tell me more about services"]
      };
    }

    // Services information
    if (input.includes('service') || input.includes('what do you') || input.includes('offer')) {
      return {
        text: "We offer comprehensive spitbraai services! 🎉\n\n🍖 Spitbraai Options:\n• Whole lamb (20-25 people)\n• Whole pork (15-20 people)\n• Custom meat selections\n\n📋 Service Types:\n• Equipment hire only\n• Equipment + professional chef\n• Full catering with sides\n• Wedding packages\n• Corporate events\n\nWhat type of event are you planning?",
        quickReplies: ["Wedding", "Corporate event", "Private party", "Equipment only"]
      };
    }

    // Contact information
    if (input.includes('contact') || input.includes('phone') || input.includes('call')) {
      return {
        text: "Here's how to reach us! 📞\n\n📱 Phone: +27 62 727 0654\n📍 Service Area: Mafikeng, North West\n📘 Facebook: Maftown Spitbraai\n\n🕒 Business Hours:\nMon-Fri: 8:00 AM - 6:00 PM\nSaturday: 8:00 AM - 8:00 PM\nSunday: 10:00 AM - 6:00 PM\n\nWould you like to call us now or send a message?",
        quickReplies: ["Call now", "Send message", "View services"]
      };
    }

    // Wedding services
    if (input.includes('wedding')) {
      return {
        text: "Congratulations on your upcoming wedding! 💒✨\n\nOur wedding spitbraai packages include:\n• Premium meat selection\n• Elegant presentation\n• Professional wedding service\n• Venue coordination\n• Special dietary accommodations\n\nWe'll work with you to create the perfect menu for your special day. Each wedding is unique, so we provide custom quotes.",
        quickReplies: ["Get wedding quote", "View menu options", "Contact us"]
      };
    }

    // Corporate events
    if (input.includes('corporate') || input.includes('business') || input.includes('company')) {
      return {
        text: "Perfect for corporate events! 🏢\n\nOur corporate services include:\n• Professional presentation\n• Flexible menu options\n• Corporate invoicing\n• Event planning assistance\n• Professional staff uniforms\n\nWe cater to team building events, client entertainment, office parties, and more. Group discounts available for larger events.",
        quickReplies: ["Get corporate quote", "Team building options", "Contact us"]
      };
    }

    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return {
        text: "Hello! Welcome to Maftown Spitbraai! 🔥\n\nI'm here to help you with all your spitbraai needs. Whether you're planning a wedding, corporate event, or private celebration, we've got you covered!\n\nWhat can I help you with today?",
        quickReplies: ["View services", "Get pricing", "Book event", "Contact info"]
      };
    }

    // Default response with helpful suggestions
    return {
      text: "I'd be happy to help you with that! 😊\n\nI can assist you with:\n• Service pricing and packages\n• Equipment hire information\n• Booking and reservations\n• Event planning advice\n• Contact details\n\nWhat would you like to know more about?",
      quickReplies: ["View pricing", "Equipment hire", "Book service", "Contact us"]
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addUserMessage(userMessage);

    await simulateTyping();
    const response = await getBotResponse(userMessage);
    addBotMessage(response.text, response.quickReplies);
  };

  const handleQuickReply = async (reply: string) => {
    addUserMessage(reply);

    // Handle special quick reply actions
    if (reply === "Call now") {
      window.location.href = "tel:+27627270654";
      return;
    }

    if (reply === "Contact form" || reply === "Send message" || reply === "Get personalized quote" || reply === "Get wedding quote" || reply === "Get corporate quote") {
      onGetQuote();
      addBotMessage("I've scrolled you to our contact form below. Fill it out and we'll get back to you with a personalized quote! 📝");
      setIsOpen(false);
      return;
    }

    await simulateTyping();
    const response = await getBotResponse(reply);
    addBotMessage(response.text, response.quickReplies);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 left-6 w-16 h-16 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-40 flex items-center justify-center ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700 rotate-180' 
            : 'bg-orange-600 hover:bg-orange-700'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-20 left-4 right-4 md:left-6 md:right-auto md:w-96 h-[70vh] md:h-[500px] max-h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 z-40 transition-all duration-300 transform ${
        isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="bg-orange-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-700 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Maftown Assistant</h3>
              <p className="text-xs text-orange-100">Online now</p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="text-white hover:text-orange-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ height: 'calc(100% - 140px)' }}>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] sm:max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-2 ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? 'bg-orange-600' : 'bg-gray-600'
                  }`}>
                    {message.isBot ? (
                      <Bot className="h-4 w-4 text-white" />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.isBot 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-orange-600 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line break-words">{message.text}</p>
                  </div>
                </div>
                
                {/* Quick Replies */}
                {message.isBot && message.quickReplies && (
                  <div className="mt-2 ml-10 flex flex-wrap gap-2">
                    {message.quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-white border border-orange-600 text-orange-600 hover:bg-orange-50 px-3 py-1 rounded-full transition-colors whitespace-nowrap"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-colors text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="w-10 h-10 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center hidden sm:block">
            For immediate assistance, call +27 62 727 0654
          </p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleChat} />
      )}
    </>
  );
};