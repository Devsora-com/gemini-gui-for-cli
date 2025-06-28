# 🚀 Quick Start Guide

Get the Gemini GUI for CLI running in just a few minutes!

## Prerequisites ✅

Make sure you have these installed:
- **Python 3.8+** (check with `python --version`)
- **Node.js 16+** (check with `node --version`)
- **npm** (check with `npm --version`)

## Option 1: Automated Installation (Recommended) 🔧

Run the automated installation script:

```powershell
# Run the installation script
.\install.ps1

# Start the application
.\start-all.ps1
```

That's it! The application will be available at `http://localhost:5173`

## Option 2: Manual Setup 📝

If you prefer manual setup or the script doesn't work:

### Step 1: Install Gemini CLI
```powershell
pip install gemini-cli
```

### Step 2: Setup Backend
```powershell
cd gemini-gui-backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

### Step 3: Setup Frontend (New Terminal)
```powershell
cd gemini-gui-frontend
npm install
npm run dev
```

## Access the Application 🌐

1. Open your browser
2. Go to `http://localhost:5173`
3. Start using Gemini GUI!

## Quick Commands to Try 💡

Once the app is running, try these commands:

```bash
# Get help
--help

# Simple chat
chat "Hello Gemini!"

# Generate code
generate "Create a Python hello world function"
```

## Troubleshooting 🔧

**App won't start?**
- Check if both servers are running (backend on port 8000, frontend on 5173)
- Ensure Gemini CLI is installed: `gemini --help`

**Installation issues?**
- Run as Administrator if on Windows
- Check your internet connection
- Verify Python and Node.js versions

## Need Help? 🆘

- Check the full [README.md](README.md) for detailed documentation
- Look at the troubleshooting section
- Make sure all prerequisites are properly installed

---

**🎉 You're ready to use Gemini GUI! Happy coding!**
