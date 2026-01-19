
import React, { useState, useRef, useEffect } from 'react';
import { User, ChatMessage } from '../types';
import { geminiService } from '../services/geminiService';

interface ChatbotProps {
  user: User | null;
}

const PREDEFINED_QUESTIONS = [
  "What policies does LIC offer?",
  "How can I file a health insurance claim?",
  "What are S. Sundari's office hours?",
  "How do I update my nominee details?",
  "Which company is best for term insurance?",
  "Tell me about HDFC ERGO Optima Secure.",
  "How to reach S. Sundari in Padi, Chennai?"
];

const Chatbot: React.FC<ChatbotProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello ${user ? user.full_name : 'there'}! I'm S. Sundari's AI assistant. You can pick a question below or type your own.`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await geminiService.chat(messageText, history);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat Error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group"
        >
          <div className="absolute -top-2 -right-1 bg-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">AI</div>
          <i className="fas fa-comment-dots text-2xl"></i>
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 sm:w-96 h-[550px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                <i className="fas fa-shield-halved text-lg"></i>
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">Sundari's Assistant</div>
                <div className="text-[10px] text-blue-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50 scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm border border-slate-200 p-3 rounded-2xl flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            
            {/* Predefined Question Suggestions */}
            {!isTyping && (
              <div className="pt-2 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Suggested Questions</p>
                <div className="flex flex-wrap gap-2">
                  {PREDEFINED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-xs bg-white border border-blue-100 text-blue-600 px-3 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend('')}
                placeholder="Ask me anything..."
                className="flex-grow bg-slate-100 border border-slate-200 rounded-full px-5 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <button
                onClick={() => handleSend('')}
                disabled={!input.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg disabled:bg-slate-300 disabled:shadow-none"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">Powered by Gemini AI • Chennai Insurance Consultant</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
