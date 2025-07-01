from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import shutil
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import json

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Command(BaseModel):
    command: str

def is_gemini_installed():
    return shutil.which("gemini") is not None

GEMINI_INSTALLED = is_gemini_installed()

@app.on_event("startup")
async def startup_event():
    if not GEMINI_INSTALLED:
        print("Warning: Gemini CLI not found in PATH.")

async def stream_command_output(command: str):
    if not GEMINI_INSTALLED:
        error_message = json.dumps({'error': 'Gemini CLI is not installed.'})
        yield f"data: {error_message}\n\n"
        return

    cleaned_command = command.strip()
    if cleaned_command.lower().startswith('gemini '):
        cleaned_command = cleaned_command[len('gemini '):]

    try:
        process = await asyncio.create_subprocess_shell(
            f"gemini {cleaned_command}",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )

        async def stream_output(stream, stream_name):
            while True:
                line = await stream.readline()
                if not line:
                    break
                message = json.dumps({stream_name: line.decode()})
                yield f"data: {message}\n\n"

        await asyncio.gather(
            stream_output(process.stdout, "stdout"),
            stream_output(process.stderr, "stderr")
        )

        await process.wait()

    except Exception as e:
        error_message = json.dumps({'error': f"An error occurred: {e}"})
        yield f"data: {error_message}\n\n"

@app.post("/execute_command/")
async def execute_command(cmd: Command):
    if not GEMINI_INSTALLED:
        raise HTTPException(status_code=400, detail="Gemini CLI is not installed.")
    return StreamingResponse(stream_command_output(cmd.command), media_type="text/event-stream")

