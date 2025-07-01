import React, { useState, useEffect, useRef } from 'react';
import MainLayout from './layouts/MainLayout';
import './styles/main.css';
import CommandInput from './components/CommandInput.jsx';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './components/CodeBlock.jsx';
import useStreamingCommand from './hooks/useStreamingCommand.js';

function App() {
  const [messages, setMessages] = useState([
    { from: 'pc', text: 'Hi! I am Gemini CLI GUI. Enter a command below.' }
  ]);
  const [command, setCommand] = useState('');
  const { loading, executeCommand } = useStreamingCommand(setMessages);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <MainLayout>
      <div className="chat-window">
        <div className="chat-header">
          <button onClick={() => setMessages([{ from: 'pc', text: 'Chat cleared.' }])} className="clear-chat-button">
            Clear Chat
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${msg.from === 'you' ? 'chat-bubble-user' : 'chat-bubble-pc'}`}
            >
              <ReactMarkdown
                children={msg.text}
                components={{
                  code: CodeBlock,
                }}
              />
              {msg.from === 'pc' && (
                <button onClick={() => navigator.clipboard.writeText(msg.text)} className="copy-button">
                  Copy
                </button>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input-row">
          <CommandInput
            command={command}
            setCommand={setCommand}
            onExecute={() => executeCommand(command)}
            loading={loading}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
