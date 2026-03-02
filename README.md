# YUNO-MILES-CODER 🐸🍔🎤🎮

MILES MILES MILES MILES MILES!!!!
I PUT THE CODE IN THE MICROWAVE AND IT STARTED RAPPING BACK AT ME 😱🔥
WHO LET PYTHON COOK?? WHO LET C++ DRIVE THE BUS??

> 💥 **TRY IT LIVE**: [https://yncode.click](http://yncode.click) — where code gets deep-fried in chaos and served with extra memes.
---

## WHAT IS THIS???
THIS NOT A TOOL
THIS A BURGER KING DRIVE-THRU FOR CODE 👑🍔
YOU GIVE ME FUNCTIONS — I GIVE YOU LOOPS, FRIES, AND A MIXTAPE 💿
HELLO WORLD? NAH, HELLO UNIVERSE 🚀🚀🚀

---

## 🚀 GETTING STARTED

### 🏠 Local Development
1.  **Backend**: `pip install -r requirements.txt` -> `python -m app.server`
2.  **Frontend**: `cd yuno-s-code-chaos` -> `npm install` -> `npm run dev`
3.  **Local Model**: Ensure [Ollama](https://ollama.com/) is running.

### ☁️ Cloud Deployment (Docker)
1.  **Configure**: `cp .env.example .env` (Set `MODE=cloud` & `CLOUD_API_KEY`)
2.  **Run**: `docker-compose up -d --build`
3.  **Access**: `http://<ec2-ip>` (Port 80)

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
