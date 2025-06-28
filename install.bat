@echo off
echo ========================================
echo Gemini GUI for CLI - Installation
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
) else (
    echo SUCCESS: Python is installed
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install Node.js 16+ from https://nodejs.org
    pause
    exit /b 1
) else (
    echo SUCCESS: Node.js is installed
)

echo.
echo Installing Gemini CLI...
pip install gemini-cli

echo.
echo Setting up backend...
cd gemini-gui-backend
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
cd ..

echo.
echo Setting up frontend...
cd gemini-gui-frontend
npm install
cd ..

echo.
echo Creating startup scripts...

REM Create backend startup script
echo @echo off > start-backend.bat
echo echo Starting Gemini GUI Backend... >> start-backend.bat
echo cd gemini-gui-backend >> start-backend.bat
echo call venv\Scripts\activate.bat >> start-backend.bat
echo uvicorn main:app --reload >> start-backend.bat

REM Create frontend startup script
echo @echo off > start-frontend.bat
echo echo Starting Gemini GUI Frontend... >> start-frontend.bat
echo cd gemini-gui-frontend >> start-frontend.bat
echo npm run dev >> start-frontend.bat

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Backend:  start-backend.bat
echo 2. Frontend: start-frontend.bat
echo.
echo Then open http://localhost:5173 in your browser
echo.
echo Happy coding with Gemini GUI!
pause
