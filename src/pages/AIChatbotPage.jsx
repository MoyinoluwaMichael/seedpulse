// src/pages/AIChatbotPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';

const AIChatbotPage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your IFT-DMS AI assistant 🌾\n\nI can help you with:\n• Variety recommendations\n• Trial data analysis\n• Submission guidelines\n• Yield comparisons\n\nHow can I assist you today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Mock AI response
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                text: "Thanks for your question! In a real implementation, I'd analyze trial data and give you insights.\n\nFor now, try asking about FARO-66 vs FARO-44 performance in Kano state.",
                sender: 'ai'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-xl border-b border-gray-200 shadow-md">
                <div className="px-4 md:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-700 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-green-950">IFT-DMS AI Assistant</h1>
                                <p className="text-xs text-green-600">Always here to help • Online</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 pt-20 pb-24 overflow-y-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto py-6 space-y-4">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-md md:max-w-lg px-5 py-4 rounded-2xl shadow-lg ${
                                msg.sender === 'user'
                                    ? 'bg-gradient-to-r from-green-700 to-green-600 text-white'
                                    : 'bg-white bg-opacity-90 backdrop-blur-xl border border-gray-200'
                            }`}>
                                <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                    {msg.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white bg-opacity-90 backdrop-blur-xl px-5 py-4 rounded-2xl shadow-lg border border-gray-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-xl border-t border-gray-200 shadow-2xl">
                <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about varieties, trials, or data..."
                            className="flex-1 px-5 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:border-green-600 focus:outline-none text-base"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="p-3 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatbotPage;