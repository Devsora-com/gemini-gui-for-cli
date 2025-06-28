import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const GeminiGUI = () => {
  const [messages, setMessages] = useState([
    { from: 'pc', text: 'Hi! I am Gemini. Ask me anything.' }
  ]);
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState('dark');
  const chatEndRef = useRef(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const sendMessage = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    const userMessage = { from: 'you', text: trimmedInput };
    const geminiResponse = { from: 'pc', text: `Gemini received: "${trimmedInput}"` };

    setMessages((prev) => [...prev, userMessage, geminiResponse]);
    setInput('');
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-black'} min-h-screen transition-colors`}>
      <div className="max-w-2xl mx-auto px-4 pt-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold tracking-tight">Gemini</h1>
          <button
            onClick={toggleTheme}
            className="text-sm px-3 py-1 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="h-[480px] overflow-y-auto rounded-md border border-gray-700 p-4 space-y-2 bg-gray-900">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.from === 'you' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-sm px-4 py-2 rounded-xl text-sm ${
                  msg.from === 'you' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-100'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            className="flex-grow rounded-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask something..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiGUI;
