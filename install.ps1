# Gemini GUI for CLI - Installation Script
# This script automates the installation and setup process

Write-Host "🚀 Gemini GUI for CLI - Installation Script" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Function to check if a command exists
function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Function to display status messages
function Write-Status {
    param([string]$Message, [string]$Status = "INFO")
    $color = switch ($Status) {
        "SUCCESS" { "Green" }
        "ERROR" { "Red" }
        "WARNING" { "Yellow" }
        default { "White" }
    }
    Write-Host "[$Status] $Message" -ForegroundColor $color
}

# Check prerequisites
Write-Status "Checking prerequisites..." "INFO"

# Check Python
if (Test-Command "python") {
    $pythonVersion = python --version 2>&1
    Write-Status "Python found: $pythonVersion" "SUCCESS"
} else {
    Write-Status "Python not found. Please install Python 3.8+ from https://python.org" "ERROR"
    exit 1
}

# Check Node.js
if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Status "Node.js found: $nodeVersion" "SUCCESS"
} else {
    Write-Status "Node.js not found. Please install Node.js 16+ from https://nodejs.org" "ERROR"
    exit 1
}

# Check npm
if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Status "npm found: $npmVersion" "SUCCESS"
} else {
    Write-Status "npm not found. Please install npm" "ERROR"
    exit 1
}

Write-Status "All prerequisites met!" "SUCCESS"
Write-Host ""

# Install Gemini CLI
Write-Status "Installing Gemini CLI..." "INFO"
try {
    pip install gemini-cli
    Write-Status "Gemini CLI installed successfully" "SUCCESS"
} catch {
    Write-Status "Failed to install Gemini CLI: $($_.Exception.Message)" "ERROR"
    Write-Status "Please install manually with: pip install gemini-cli" "WARNING"
}

Write-Host ""

# Setup Backend
Write-Status "Setting up backend..." "INFO"

if (Test-Path "gemini-gui-backend") {
    Set-Location "gemini-gui-backend"
    
    # Create virtual environment
    Write-Status "Creating Python virtual environment..." "INFO"
    python -m venv venv
    
    # Activate virtual environment
    Write-Status "Activating virtual environment..." "INFO"
    & ".\venv\Scripts\Activate.ps1"
    
    # Install backend dependencies
    Write-Status "Installing backend dependencies..." "INFO"
    pip install -r requirements.txt
    
    Write-Status "Backend setup complete!" "SUCCESS"
    Set-Location ".."
} else {
    Write-Status "Backend directory not found!" "ERROR"
    exit 1
}

Write-Host ""

# Setup Frontend
Write-Status "Setting up frontend..." "INFO"

if (Test-Path "gemini-gui-frontend") {
    Set-Location "gemini-gui-frontend"
    
    # Install frontend dependencies
    Write-Status "Installing frontend dependencies..." "INFO"
    npm install
    
    Write-Status "Frontend setup complete!" "SUCCESS"
    Set-Location ".."
} else {
    Write-Status "Frontend directory not found!" "ERROR"
    exit 1
}

Write-Host ""

# Create startup scripts
Write-Status "Creating startup scripts..." "INFO"

# Backend startup script
$backendScript = @"
# Start Backend Server
Write-Host "Starting Gemini GUI Backend..." -ForegroundColor Green
Set-Location "gemini-gui-backend"
& ".\venv\Scripts\Activate.ps1"
uvicorn main:app --reload
"@

$backendScript | Out-File -FilePath "start-backend.ps1" -Encoding UTF8

# Frontend startup script
$frontendScript = @"
# Start Frontend Server
Write-Host "Starting Gemini GUI Frontend..." -ForegroundColor Green
Set-Location "gemini-gui-frontend"
npm run dev
"@

$frontendScript | Out-File -FilePath "start-frontend.ps1" -Encoding UTF8

# Combined startup script
$startAllScript = @"
# Start Both Servers
Write-Host "Starting Gemini GUI Application..." -ForegroundColor Cyan
Write-Host "This will start both backend and frontend servers" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the servers" -ForegroundColor Yellow
Write-Host ""

# Start backend in background
Start-Process powershell -ArgumentList "-File", "start-backend.ps1"
Start-Sleep 3

# Start frontend
& ".\start-frontend.ps1"
"@

$startAllScript | Out-File -FilePath "start-all.ps1" -Encoding UTF8

Write-Status "Startup scripts created!" "SUCCESS"

Write-Host ""
Write-Host "🎉 Installation Complete!" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application, you can:" -ForegroundColor Yellow
Write-Host "1. Run both servers automatically:" -ForegroundColor White
Write-Host "   .\start-all.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Or start them manually:" -ForegroundColor White
Write-Host "   Backend:  .\start-backend.ps1" -ForegroundColor Cyan
Write-Host "   Frontend: .\start-frontend.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Or follow the manual instructions in README.md" -ForegroundColor White
Write-Host ""
Write-Host "The application will be available at:" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "Happy coding with Gemini GUI! 🚀" -ForegroundColor Cyan
