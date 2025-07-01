import React, { useState, useEffect } from 'react';

const CommandInput = ({ command, setCommand, onExecute, loading }) => {
  const [usePrompt, setUsePrompt] = useState(false);
  const [useVerbose, setUseVerbose] = useState(false);
  const [useHelp, setUseHelp] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const storedHistory = localStorage.getItem('commandHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const addToHistory = (cmd) => {
    const updatedHistory = [cmd, ...history.filter(c => c !== cmd)].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem('commandHistory', JSON.stringify(updatedHistory));
  };

  const getPlaceholder = () => {
    if (useHelp) {
      return "Enter command to get help for (e.g., 'ls', 'git', 'npm')...";
    }
    if (usePrompt) {
      return "Enter your prompt or question for AI...";
    }
    if (useVerbose) {
      return "Enter CLI command (will run in verbose mode)...";
    }
    return "Enter CLI command";
  };

  const buildCommand = () => {
    let cmd = command.trim();
    
    if (useHelp && cmd) {
      cmd = `${cmd} --help`;
    } else if (usePrompt && cmd) {
      cmd = `gemini -p "${cmd}"`;
    }
    
    if (useVerbose && !usePrompt) {
      cmd += ' -v';
    } else if (useVerbose && usePrompt) {
      cmd = cmd.replace('gemini -p', 'gemini -p -v');
    }
    
    return cmd;
  };

  const handleExecute = () => {
    const finalCommand = buildCommand();
    
    if (finalCommand.trim()) {
      addToHistory(command);
      setCommand('');
      setHistoryIndex(-1);
      onExecute(finalCommand);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleExecute();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  return (
    <>
      {showOptions && (
        <div className="command-options">
          <div className="option-row">
            <label className="option-label">
              <input
                type="checkbox"
                checked={usePrompt}
                onChange={() => {
                  setUsePrompt(!usePrompt);
                  if (!usePrompt) setUseHelp(false);
                }}
                className="option-checkbox"
              />
              Prompt (-p)
            </label>
            <label className="option-label">
              <input
                type="checkbox"
                checked={useVerbose}
                onChange={() => setUseVerbose(!useVerbose)}
                className="option-checkbox"
              />
              Verbose (-v)
            </label>
            <label className="option-label">
              <input
                type="checkbox"
                checked={useHelp}
                onChange={() => {
                  setUseHelp(!useHelp);
                  if (!useHelp) setUsePrompt(false);
                }}
                className="option-checkbox"
              />
              Help (--help)
            </label>
          </div>
        </div>
      )}
      <div className="chat-input-container">
        <button 
          className="options-toggle-btn"
          onClick={() => setShowOptions(!showOptions)}
          type="button"
        >
          ⚙️
        </button>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder={getPlaceholder()}
          className="chat-input"
          onKeyDown={handleKeyDown}
        />
        <button 
          onClick={handleExecute}
          disabled={loading} 
          className="chat-send-btn"
          type="button"
        >
          {loading ? '⏳' : '▶️'}
        </button>
      </div>
    </>
  );
};

export default CommandInput;
