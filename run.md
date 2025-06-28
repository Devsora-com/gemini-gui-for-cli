# How to Run the Project

This project consists of a frontend (React + Vite) and a backend (FastAPI).

---

## Backend (FastAPI)

1. **Navigate to the backend directory:**
   ```powershell
   cd gemini-gui-backend
   ```
2. **(Optional) Create and activate a virtual environment:**
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```
3. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```
4. **Run the FastAPI server:**
   ```powershell
   uvicorn main:app --reload
   ```
   The backend will be available at `http://127.0.0.1:8000`.

---

## Frontend (React + Vite)

1. **Navigate to the frontend directory:**
   ```powershell
   cd gemini-gui-frontend
   ```
2. **Install dependencies:**
   ```powershell
   npm install
   ```
3. **Run the development server:**
   ```powershell
   npm run dev
   ```
   The frontend will be available at the URL shown in the terminal (usually `http://localhost:5173`).

---

## How to Start and Restart the Servers

### Backend (FastAPI)
- **To start the backend:**
  ```powershell
  cd gemini-gui-backend
  uvicorn main:app --reload
  ```
- **To stop the backend:**
  Press `Ctrl+C` in the terminal where the backend is running.
- **To restart the backend:**
  Stop it with `Ctrl+C` and run the start command again.

### Frontend (React + Vite)
- **To start the frontend:**
  ```powershell
  cd gemini-gui-frontend
  npm run dev
  ```
- **To stop the frontend:**
  Press `Ctrl+C` in the terminal where the frontend is running.
- **To restart the frontend:**
  Stop it with `Ctrl+C` and run the start command again.

---

## Notes
- Make sure Node.js and Python are installed on your system.
- The frontend and backend run independently. Start both for full functionality.
- Adjust API URLs in the frontend if the backend is hosted elsewhere.
