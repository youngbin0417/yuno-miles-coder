import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from .persona import list_personas
from .engine import get_engine_response
from .generator import generate_code_response
from .pack_loader import load_pack

load_dotenv()

app = FastAPI(title="Yuno Miles Coder API", version="1.0")

# Allow CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pack once at startup
PACK = load_pack(os.getenv("YMC_PACK"))

class ReviewRequest(BaseModel):
    code: str
    persona: str = "chaotic_microblog"
    spice: int = 4

class GenerateRequest(BaseModel):
    prompt: str
    persona: str = "chaotic_microblog"
    spice: int = 4

@app.get("/api/personas")
def get_personas():
    return {"personas": list_personas()}

@app.post("/api/review")
def review_code(req: ReviewRequest):
    try:
        result = get_engine_response(
            code=req.code,
            persona=req.persona,
            spice=req.spice,
            pack=PACK
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate")
def generate_code(req: GenerateRequest):
    try:
        result = generate_code_response(
            prompt=req.prompt,
            persona=req.persona,
            spice=req.spice
        )
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok", "mode": os.getenv("MODE", "hybrid")}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.server:app", host="0.0.0.0", port=8000, reload=True)
