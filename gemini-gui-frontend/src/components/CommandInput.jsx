import React, { useState } from 'react';

const CommandInput = ({ command, setCommand, onExecute, loading }) => {
  const [usePrompt, setUsePrompt] = useState(false);
  const [useVerbose, setUseVerbose] = useState(false);
  const [useHelp, setUseHelp] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Get the appropriate placeholder text based on current mode
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

  // Build the command string based on toggles
  const buildCommand = () => {
    let cmd = command.trim();
    
    if (useHelp && cmd) {
      // For help mode, show help for the entered command
      cmd = `${cmd} --help`;
    } else if (usePrompt && cmd) {
      // For prompt mode, wrap in gemini prompt
      cmd = `gemini -p "${cmd}"`;
    }
    
    // Add verbose flag if enabled (works with any mode)
    if (useVerbose && !usePrompt) {
      cmd += ' -v';
    } else if (useVerbose && usePrompt) {
      // For prompt mode with verbose, add -v before the quote
      cmd = cmd.replace('gemini -p', 'gemini -p -v');
    }
    
    return cmd;
  };

  const handleExecute = () => {
    const finalCommand = buildCommand();
    setCommand(finalCommand);
    setTimeout(onExecute, 0); // Ensure setCommand finishes before executing
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
                  if (!usePrompt) setUseHelp(false); // Disable help when enabling prompt
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
                  if (!useHelp) setUsePrompt(false); // Disable prompt when enabling help
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
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleExecute();
            }
          }}
        />
        <button 
          onClick={handleExecute} 
          disabled={loading} 
          className="chat-send-btn"
        >
          {loading ? '⏳' : '▶️'}
        </button>
      </div>
    </>
  );
};

export default CommandInput;
