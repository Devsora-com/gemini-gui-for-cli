import React, { useState, useEffect, useRef } from 'react';
import MainLayout from './layouts/MainLayout';
import './styles/main.css';
import CommandInput from './components/CommandInput.jsx';

function App() {
  const [messages, setMessages] = useState([
    { from: 'pc', text: 'Hi! I am Gemini CLI GUI. Enter a command below.' }
  ]);
  const [command, setCommand] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const executeCommand = async () => {
    const trimmed = command.trim();
    if (!trimmed) return;
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
            { from: 'pc', text: `Stdout: ${data.stdout}` }
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
      setCommand('');
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
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${msg.from === 'you' ? 'chat-bubble-user' : 'chat-bubble-pc'}`}
            >
              {msg.text}
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
