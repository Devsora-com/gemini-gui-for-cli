I have made the following improvements to the Gemini GUI for CLI application:

### Frontend

- **Refactored `App.jsx`**:
  - Moved the `SyntaxHighlighter` component to a new, reusable `CodeBlock.jsx` component.
  - Created a custom hook, `useStreamingCommand`, to encapsulate the command execution logic, simplifying the `App` component.
  - Updated the `CommandInput` to use the new `useStreamingCommand` hook.

### Backend

- **Improved `main.py`**:
  - Added a startup event to check for the Gemini CLI installation, preventing repeated checks on each command execution.
  - Made the `stream_command_output` function more robust by adding exception handling.
  - The backend now returns a `400` error if the Gemini CLI is not installed, providing a clearer error message to the user.

These changes improve the overall quality and maintainability of the codebase, making it more modular and easier to understand. The user experience is also enhanced with better error handling and a more responsive interface.
