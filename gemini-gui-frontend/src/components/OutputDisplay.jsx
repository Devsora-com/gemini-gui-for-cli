import React from 'react';

const OutputDisplay = ({ output }) => (
  <div className="output-container">
    {output.stdout && (
      <pre className="output-stdout">
        <strong>Stdout:</strong>
        {output.stdout}
      </pre>
    )}
    {output.stderr && (
      <pre className="output-stderr">
        <strong>Stderr:</strong>
        {output.stderr}
      </pre>
    )}
    {output.error && (
      <pre className="output-error">
        <strong>Error:</strong>
        {output.error}
      </pre>
    )}
  </div>
);

export default OutputDisplay;
