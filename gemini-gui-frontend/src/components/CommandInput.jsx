import React from 'react';

const CommandInput = ({ command, setCommand, onExecute, loading }) => (
  <div className="command-input-container">
    <input
      type="text"
      value={command}
      onChange={(e) => setCommand(e.target.value)}
      placeholder="Enter CLI command"
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onExecute();
        }
      }}
    />
    <button onClick={onExecute} disabled={loading}>
      {loading ? 'Executing...' : 'Execute'}
    </button>
  </div>
);

export default CommandInput;
