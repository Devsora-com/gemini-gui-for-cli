# Gemini GUI for CLI

A modern web-based graphical user interface for the Gemini CLI tool, providing an intuitive way to interact with Google's Gemini AI through a user-friendly interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Usage](#usage)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project provides a web-based GUI for the Gemini CLI, consisting of:

- **Frontend**: React + Vite application with a modern, responsive interface
- **Backend**: FastAPI server that interfaces with the Gemini CLI
- **Integration**: Seamless connection between the web interface and Gemini CLI commands

### Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │───▶│  FastAPI Backend │───▶│   Gemini CLI    │
│   (Port 5173)   │    │   (Port 8000)   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Prerequisites

Before installing, ensure you have the following installed on your system:

### Required Software

1. **Python 3.8 or higher**
   - Download from [python.org](https://www.python.org/downloads/)
   - Verify installation: `python --version`

2. **Node.js 16 or higher**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

3. **Git** (optional, for cloning)
   - Download from [git-scm.com](https://git-scm.com/)

### System Requirements

- **Operating System**: Windows 10/11, macOS, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 1GB free space for dependencies

## 🚀 Installation

### Method 1: Clone from Repository

```powershell
# Clone the repository
git clone https://github.com/your-username/gemini-gui-for-cli.git
cd gemini-gui-for-cli
```

### Method 2: Download ZIP

1. Download the project as a ZIP file
2. Extract to your desired location
3. Open PowerShell/Terminal in the extracted folder

## ⚡ Quick Start

Follow these steps to get the application running quickly:

### 1. Install Gemini CLI

```powershell
# Install Gemini CLI globally
pip install gemini-cli

# Verify installation
gemini --help
```

### 2. Start Backend Server

```powershell
# Navigate to backend directory
cd gemini-gui-backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows Command Prompt:
.\venv\Scripts\activate.bat
# macOS/Linux:
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload
```

The backend will be available at `http://127.0.0.1:8000`

### 3. Start Frontend Server

Open a **new terminal window** and run:

```powershell
# Navigate to frontend directory
cd gemini-gui-frontend

# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Access the Application

1. Open your web browser
2. Navigate to `http://localhost:5173`
3. Start using the Gemini GUI!

## 🔧 Detailed Setup

### Backend Setup (FastAPI)

The backend serves as a bridge between the web interface and the Gemini CLI.

#### Dependencies

The backend requires the following packages (defined in `requirements.txt`):
- `fastapi==0.111.0` - Modern web framework for APIs
- `uvicorn==0.30.1` - ASGI server for running FastAPI

#### Configuration

The backend automatically:
- Enables CORS for frontend communication
- Validates Gemini CLI installation
- Handles command execution and error reporting

#### Environment Variables (Optional)

You can configure the backend using environment variables:

```powershell
# Set custom host and port
$env:HOST = "0.0.0.0"
$env:PORT = "8080"

# Run with custom settings
uvicorn main:app --host $env:HOST --port $env:PORT --reload
```

### Frontend Setup (React + Vite)

The frontend provides a modern, responsive interface for interacting with Gemini.

#### Key Features

- **Real-time command execution**
- **Syntax highlighting for output**
- **Command history**
- **Error handling and display**
- **Responsive design**

#### Development Dependencies

The frontend uses modern development tools:
- **Vite**: Fast build tool and development server
- **React 19**: Latest React version with concurrent features
- **ESLint**: Code linting and quality assurance

#### Build for Production

```powershell
# Navigate to frontend directory
cd gemini-gui-frontend

# Build for production
npm run build

# Preview production build
npm run preview
```

## 💻 Usage

### Basic Commands

Once both servers are running, you can:

1. **Enter Commands**: Type Gemini CLI commands in the input field
2. **Execute**: Click "Execute" or press Enter
3. **View Output**: See results in the output display area
4. **Command History**: Access previous commands using the history feature

### Example Commands

```bash
# Get help
--help

# Chat with Gemini
chat "Hello, how can you help me today?"

# Generate code
generate-code "Create a Python function to calculate fibonacci numbers"

# Analyze text
analyze "This is some sample text to analyze"
```

### Tips for Effective Usage

- **No need to prefix with 'gemini'** - the GUI automatically adds it
- **Use quotes for multi-word inputs** - `"your prompt here"`
- **Check command history** - previous commands are saved for easy reuse
- **Monitor the console** - error messages provide helpful debugging information

## 🛠️ Development

### Project Structure

```
gemini-gui-for-cli/
├── gemini-gui-backend/          # FastAPI backend
│   ├── main.py                  # Main FastAPI application
│   ├── requirements.txt         # Python dependencies
│   └── venv/                   # Virtual environment
├── gemini-gui-frontend/         # React frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── layouts/           # Layout components
│   │   ├── styles/           # CSS styles
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── package.json         # Node.js dependencies
│   └── vite.config.js      # Vite configuration
├── .gitignore              # Git ignore rules
└── README.md              # This documentation
```

### Backend Development

The backend (`main.py`) provides a single endpoint:

- **POST** `/execute_command/` - Executes Gemini CLI commands

#### Key Functions

- `is_gemini_installed()` - Checks if Gemini CLI is available
- `execute_command()` - Processes and executes commands
- CORS middleware for frontend communication

### Frontend Development

The frontend uses React functional components with hooks:

#### Key Components

- `App.jsx` - Main application container
- `CommandInput.jsx` - Command input interface
- `OutputDisplay.jsx` - Command output display
- `MainLayout.jsx` - Application layout wrapper

#### Development Commands

```powershell
# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

### Making Changes

1. **Backend changes**: The server auto-reloads with `--reload` flag
2. **Frontend changes**: Vite provides hot module replacement (HMR)
3. **Testing**: Both servers support live development

## 🔍 Troubleshooting

### Common Issues

#### 1. "Gemini CLI is not installed"

**Problem**: Backend can't find the Gemini CLI installation.

**Solution**:
```powershell
# Install Gemini CLI
pip install gemini-cli

# Verify installation
gemini --help

# Check if it's in PATH
where gemini  # Windows
which gemini  # macOS/Linux
```

#### 2. Backend Connection Errors

**Problem**: Frontend can't connect to backend.

**Solution**:
- Ensure backend is running on port 8000
- Check firewall settings
- Verify CORS configuration in `main.py`

#### 3. Node.js/NPM Issues

**Problem**: Frontend dependencies won't install.

**Solution**:
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

#### 4. Python Virtual Environment Issues

**Problem**: Can't activate virtual environment.

**Solution**:
```powershell
# Windows: Enable script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Recreate virtual environment
Remove-Item -Recurse -Force venv
python -m venv venv
.\venv\Scripts\Activate.ps1
```

#### 5. Port Already in Use

**Problem**: Default ports (8000, 5173) are occupied.

**Solution**:
```powershell
# Backend: Use different port
uvicorn main:app --port 8001 --reload

# Frontend: Vite will automatically suggest alternate port
npm run dev
```

### Debug Mode

Enable verbose logging for troubleshooting:

```powershell
# Backend with debug logging
uvicorn main:app --reload --log-level debug

# Frontend with verbose output
npm run dev -- --debug
```

### Getting Help

If you encounter issues:

1. Check the console output for error messages
2. Verify all prerequisites are installed
3. Ensure both servers are running
4. Check network connectivity between frontend and backend

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Test thoroughly
6. Submit a pull request

### Coding Standards

- **Backend**: Follow PEP 8 Python style guide
- **Frontend**: Use ESLint configuration provided
- **Comments**: Write clear, concise comments
- **Testing**: Add tests for new features

### Submitting Changes

```powershell
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add your feature description"

# Push to your fork
git push origin feature/your-feature-name
```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://deepmind.google/technologies/gemini/) for the AI capabilities
- [FastAPI](https://fastapi.tiangolo.com/) for the excellent backend framework
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) for the modern frontend tools
- The open-source community for continuous inspiration

---

## 📞 Support

If you need help or have questions:

1. **Check the troubleshooting section** above
2. **Search existing issues** in the repository
3. **Create a new issue** with detailed information about your problem
4. **Include error messages** and system information

**Happy coding with Gemini GUI! 🚀**
