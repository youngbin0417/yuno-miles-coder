# YUNO-MILES-CODER 🐸🍔🎤🎮

MILES MILES MILES MILES MILES!!!!
I PUT THE CODE IN THE MICROWAVE AND IT STARTED RAPPING BACK AT ME 😱🔥
WHO LET PYTHON COOK?? WHO LET C++ DRIVE THE BUS??

> 💥 **TRY IT LIVE**: [http://yncode.click](http://yncode.click) — where code gets deep-fried in chaos and served with extra memes.
---

## WHAT IS THIS???
THIS NOT A TOOL
THIS A BURGER KING DRIVE-THRU FOR CODE 👑🍔
YOU GIVE ME FUNCTIONS — I GIVE YOU LOOPS, FRIES, AND A MIXTAPE 💿
HELLO WORLD? NAH, HELLO UNIVERSE 🚀🚀🚀

---

## SETUP

### Prerequisites
- Python 3.8+
- Node.js 18+ (for the new frontend)
- Ollama running locally (port 11434) for local model inference

### Environment Configuration
COPY `.env.example` to `.env` and fill it out. The app is configured entirely by environment variables.

- **Hybrid Mode (Default):**
  - `CLOUD_API_KEY`: Your Gemini API key.
  - `CLOUD_MODEL`: The Gemini model to use (e.g., `gemini-1.5-flash`).
  - `LOCAL_BASE_URL`: The base URL for your local Ollama API (e.g., `http://127.0.0.1:11434`).
  - `LOCAL_MODEL`: The local model name (e.g., `qwen2:7b`).

The app also supports `local`-only and `cloud`-only modes via the `MODE` environment variable. See `.env.example` for all options.

---

## RUNNING THE APPLICATION

### Option 1: Backend + Integrated Frontend (Recommended)
1. **Install backend dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

2. **Build the new frontend:**
   ```sh
   cd yuno-s-code-chaos
   npm install
   npm run build
   cd ..
   ```

3. **Run the backend server (serves both API and frontend):**
   ```sh
   python -m app.server
   ```
   
   The application will be available at `http://localhost:8000`

### Option 2: Backend Only (for development)
1. **Run the backend API only:**
   ```sh
   python -m app.server
   ```
   
   API endpoints will be available at `http://localhost:8000/api/*`

### Option 3: Frontend Development Mode
1. **Run the backend API separately:**
   ```sh
   python -m app.server
   ```

2. **Run the frontend in development mode:**
   ```sh
   cd yuno-s-code-chaos
   npm install
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:8080` and will connect to the backend at `http://localhost:8000`

---

## BUILDING FOR PRODUCTION

### Building the Full Application
1. **Build the frontend:**
   ```sh
   cd yuno-s-code-chaos
   npm install
   npm run build
   ```

2. **Run the integrated server:**
   ```sh
   python -m app.server
   ```

The built frontend will be automatically served by the backend at `http://localhost:8000`.

---

## CLI USAGE (Legacy)
For command-line usage:
```sh
# Explain a file
python -m app.cli examples/hello.py

# Explain from stdin
cat examples/hello.py | python -m app.cli

# With custom persona
python -m app.cli examples/hello.py --persona yuno_miles
```

---

## SNIPPETS 🍟
LOOP? I SAY “LOOP-DE-LOOP LIKE SPONGEBOB” 🧽
IO? I SAY “STREAM THIS LIKE NETFLIX SEASON 9” 📺
ERROR? I SAY “IF IT BREAKS WE CALL IT ART” 🎨

WANNA ADD YOUR OWN???
PUT IT IN THE DATABASE BRO 💾
