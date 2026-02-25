import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm your CreditWise assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(input);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
        }, 1000);
    };

    const getBotResponse = (query) => {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('credit score') || lowerQuery.includes('improve')) {
            return "To improve your credit score, use our new 'Credit Engine'! 🚀 It lets you simulate utilization and DTI changes. General tips: 1. Pay bills on time. 2. Keep utilization <30%. 3. Limit hard inquiries.";
        } else if (lowerQuery.includes('engine') || lowerQuery.includes('simulator')) {
            return "Our 'Credit Engine' is a powerful what-if simulator. It shows how changes in your financial behavior impact your loan approval odds without affecting your real CIBIL score.";
        } else if (lowerQuery.includes('loan') || lowerQuery.includes('apply')) {
            return "You can check your loan eligibility instantly on our 'Check Loan' page. We analyze your income, credit history, and other factors.";
        } else if (lowerQuery.includes('safe') || lowerQuery.includes('secure') || lowerQuery.includes('data')) {
            return "Yes, your data is 100% secure. We use advanced encryption and do not share your personal information with third parties without consent.";
        } else if (lowerQuery.includes('contact') || lowerQuery.includes('support')) {
            return "You can reach our support team via the 'Support' page or email us at support@creditwise.com.";
        } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
            return "Hello! Feel free to ask me anything about loans or credit scores.";
        } else {
            return "I'm not sure about that. Try asking about 'credit score', 'loans', or 'safety'. You can also contact support for complex queries.";
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'rotate-0 opacity-100'
                    } absolute bottom-0 right-0 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
            >
                <MessageCircle size={28} />
            </button>

            {/* Chat Window */}
            <div
                className={`${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
                    } absolute bottom-0 right-0 w-[calc(100vw-3rem)] sm:w-96 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col`}
                style={{ maxHeight: 'calc(100vh - 100px)', height: '500px' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-full overflow-hidden flex items-center justify-center">
                            <MessageCircle size={24} className="text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">CreditBot</h3>
                            <p className="text-xs text-indigo-100 flex items-center">
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span> Online
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-white hover:text-indigo-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.sender === 'user'
                                    ? 'bg-indigo-600 text-white rounded-br-none'
                                    : 'bg-slate-700 text-slate-200 rounded-bl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-slate-800 border-t border-slate-700">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex items-center space-x-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-slate-900 border border-slate-600 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;
