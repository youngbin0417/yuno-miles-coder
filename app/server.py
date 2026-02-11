import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, Response
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path

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

# Serve static files from the built frontend - this must come AFTER all API routes
frontend_path = Path(__file__).parent.parent / "yuno-s-code-chaos"
dist_path = frontend_path / "dist"

if dist_path.exists():
    # Mount the assets directory separately to avoid conflicts with API routes
    app.mount("/assets", StaticFiles(directory=dist_path / "assets"), name="assets")

    # Serve the index.html for the root route
    @app.get("/")
    async def read_root():
        with open(dist_path / "index.html", 'r', encoding='utf-8') as f:
            return HTMLResponse(content=f.read())

    # Custom middleware to handle frontend routing
    @app.middleware("http")
    async def handle_frontend_routing(request, call_next):
        response = await call_next(request)
        
        # If it's a 404 for a non-API route, serve the frontend for client-side routing
        if response.status_code == 404:
            path = request.url.path
            if not path.startswith("/api/") and path != "/health":
                with open(dist_path / "index.html", 'r', encoding='utf-8') as f:
                    content = f.read()
                return HTMLResponse(content=content)
        
        return response
else:
    # Fallback: serve from development build if available
    @app.get("/")
    async def serve_info():
        return {"message": "Frontend not built. Run 'cd yuno-s-code-chaos && npm run build' to build the frontend."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.server:app", host="0.0.0.0", port=8000, reload=True)
