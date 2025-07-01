import { useState } from 'react';

const useStreamingCommand = (setMessages) => {
  const [loading, setLoading] = useState(false);

  const executeCommand = async (cmdToExecute) => {
    const trimmed = cmdToExecute.trim();
    if (!trimmed) return;

    setLoading(true);
    setMessages((prev) => [...prev, { from: 'you', text: trimmed }]);

    try {
      const response = await fetch('http://127.0.0.1:8000/execute_command/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: trimmed }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let incomingText = '';
      let pcMessageIndex = -1;

      setMessages((prev) => {
        const newMessages = [...prev, { from: 'pc', text: '' }];
        pcMessageIndex = newMessages.length - 1;
        return newMessages;
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        incomingText += decoder.decode(value, { stream: true });
        
        const parts = incomingText.split('\n\n');
        
        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (part.startsWith('data: ')) {
            const dataStr = part.substring(6);
            try {
              const data = JSON.parse(dataStr);
              let newText = '';
              if (data.stdout) newText = data.stdout;
              if (data.stderr) newText = `Stderr: ${data.stderr}`;
              if (data.error) newText = `Error: ${data.error}`;

              setMessages((prev) => {
                const newMessages = [...prev];
                if (pcMessageIndex !== -1) {
                  newMessages[pcMessageIndex].text += newText;
                }
                return newMessages;
              });

            } catch (e) {
              console.error('Failed to parse stream data:', e);
            }
          }
        }
        incomingText = parts[parts.length - 1];
      }

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: 'pc', text: `Failed to connect to backend: ${error.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { loading, executeCommand };
};

export default useStreamingCommand;
