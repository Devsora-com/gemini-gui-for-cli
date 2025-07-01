import React, { useState, useEffect, useRef } from 'react';
import MainLayout from './layouts/MainLayout';
import './styles/main.css';
import CommandInput from './components/CommandInput.jsx';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function App() {
  const [messages, setMessages] = useState([
    { from: 'pc', text: 'Hi! I am Gemini CLI GUI. Enter a command below.' }
  ]);
  const [command, setCommand] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const executeCommand = async (cmdToExecute) => {
    console.log('executeCommand called with:', cmdToExecute);
    // Use the passed command or fall back to the state command
    const commandToRun = cmdToExecute || command;
    const trimmed = commandToRun.trim();
    console.log('Final trimmed command:', trimmed);
    if (!trimmed) {
      console.log('Command is empty, returning early');
      return;
    }
    
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      { from: 'you', text: trimmed }
    ]);
    try {
      const response = await fetch('http://127.0.0.1:8000/execute_command/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: trimmed }),
      });
      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { from: 'pc', text: `Error: ${data.error}` }
        ]);
      } else {
        if (data.stdout) {
          setMessages((prev) => [
            ...prev,
            { from: 'pc', text: `${data.stdout}` }
          ]);
        }
        if (data.stderr) {
          setMessages((prev) => [
            ...prev,
            { from: 'pc', text: `Stderr: ${data.stderr}` }
          ]);
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: 'pc', text: `Failed to connect to backend: ${error.message}` }
      ]);
    } finally {
      setLoading(false);
      // Don't clear command here since CommandInput handles it
    }
  };

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
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={a11yDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
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
            onExecute={executeCommand}
            loading={loading}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
