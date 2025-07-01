from fastapi import FastAPI, Request
from pydantic import BaseModel
import shutil
import asyncio
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import json

app = FastAPI()

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

async def stream_command_output(command: str):
    if not is_gemini_installed():
        yield f"data: {json.dumps({'error': 'Gemini CLI is not installed.'})}\n\n"
        return

    cleaned_command = command.strip()
    if cleaned_command.lower().startswith('gemini '):
        cleaned_command = cleaned_command[len('gemini '):]

    # Use asyncio.create_subprocess_shell for non-blocking execution
    process = await asyncio.create_subprocess_shell(
        f"gemini {cleaned_command}",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )

    # Stream stdout and stderr
    while True:
        # Use asyncio.wait to check both streams
        done, pending = await asyncio.wait(
            [process.stdout.readline(), process.stderr.readline()],
            return_when=asyncio.FIRST_COMPLETED
        )

        for future in done:
            output = future.result()
            if not output:
                continue
            
            # Determine if it's stdout or stderr
            if future == process.stdout.readline.__self__:
                yield f"data: {json.dumps({'stdout': output.decode()})}\n\n"
            else:
                yield f"data: {json.dumps({'stderr': output.decode()})}\n\n"
        
        # If process is done and no more output, break
        if process.returncode is not None and not pending:
            break

    await process.wait()

@app.post("/execute_command/")
async def execute_command(cmd: Command):
    return StreamingResponse(stream_command_output(cmd.command), media_type="text/event-stream")

