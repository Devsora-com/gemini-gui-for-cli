from fastapi import FastAPI
from pydantic import BaseModel
import subprocess
import shutil
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Command(BaseModel):
    command: str

def is_gemini_installed():
    return shutil.which("gemini") is not None

@app.post("/execute_command/")
async def execute_command(cmd: Command):
    if not is_gemini_installed():
        return {"stdout": "", "stderr": "", "error": "Gemini CLI is not installed. Please install it with 'pip install gemini-cli'."}
    # Remove leading 'gemini' if user included it
    cleaned_command = cmd.command.strip()
    if cleaned_command.lower().startswith('gemini '):
        cleaned_command = cleaned_command[len('gemini '):]
    try:
        # Always run commands through Gemini CLI
        result = subprocess.run(f"gemini {cleaned_command}", shell=True, capture_output=True, text=True, check=True)
        return {"stdout": result.stdout, "stderr": result.stderr}
    except subprocess.CalledProcessError as e:
        # If the command fails, also return Gemini CLI help output
        try:
            help_result = subprocess.run("gemini --help", shell=True, capture_output=True, text=True)
            help_text = help_result.stdout
        except Exception:
            help_text = "Could not retrieve Gemini CLI help."
        return {
            "stdout": e.stdout,
            "stderr": e.stderr,
            "error": str(e) + "\n\nGemini CLI Help:\n" + help_text
        }
    except Exception as e:
        return {"stdout": "", "stderr": "", "error": str(e)}

