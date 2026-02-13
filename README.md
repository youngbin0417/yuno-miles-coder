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

## 🚀 GETTING STARTED

Choose your flavor: **Local Chaos** (Ollama + React Dev) or **Cloud Production** (Docker + Nginx).

### 🏠 Option A: Local Development (Ollama)
Best for running locally with your own GPU/models.

1.  **Backend Setup**:
    ```bash
    pip install -r requirements.txt
    cp .env.example .env
    # Set MODE=hybrid or MODE=local in .env
    python -m app.server
    ```
2.  **Frontend Setup**:
    ```bash
    cd yuno-s-code-chaos
    npm install
    npm run dev
    ```
3.  **Local Model**: Make sure [Ollama](https://ollama.com/) is running on port `11434`.

---

### ☁️ Option B: Cloud Deployment (AWS EC2 / Docker)
**RECOMMENDED** for production. Uses Docker + Nginx proxy and cloud-only mode for stability.

1.  **Clone & Configure**:
    ```bash
    git clone <your-repo-url>
    cd troll-coder
    cp .env.example .env
    ```
2.  **Force Cloud Mode**:
    Edit `.env` and set:
    *   `MODE=cloud` (Ollama usually isn't available on EC2)
    *   `CLOUD_API_KEY=your_gemini_key`
3.  **Deploy**:
    ```bash
    docker-compose up -d --build
    ```
    *Access via `http://your-ec2-ip` (Standard HTTP port 80).*

---

## 🛠 ARCHITECTURE
The production setup uses **Nginx** as a reverse proxy:
- `http://<ip>/` -> Serves React Static Files 🖼️
- `http://<ip>/api/*` -> Proxies to FastAPI Backend (Internal Port 8000) ⚙️
- `http://<ip>/health` -> Backend Health Check ✅

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
