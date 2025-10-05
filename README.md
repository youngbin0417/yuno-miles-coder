# YUNO-MILES-CODER 🐸🍔🎤🎮

MILES MILES MILES MILES MILES!!!!  
I PUT THE CODE IN THE MICROWAVE AND IT STARTED RAPPING BACK AT ME 😱🔥  
WHO LET PYTHON COOK?? WHO LET C++ DRIVE THE BUS??  

---

## WHAT IS THIS???
THIS NOT A TOOL  
THIS A BURGER KING DRIVE-THRU FOR CODE 👑🍔  
YOU GIVE ME FUNCTIONS — I GIVE YOU LOOPS, FRIES, AND A MIXTAPE 💿  
HELLO WORLD? NAH, HELLO UNIVERSE 🚀🚀🚀  

---

## HOW IT WORK
1. CLOUD BOT WHISPERS “this function adds numbers...” 🤓  
2. LOCAL BABY MODEL YELLS “ADDITION?? MORE LIKE ADDICTION 🔥🔥🔥”  
3. I EAT A SANDWICH 🥪  
4. YOU CRY AND SAY “THANK YOU YUNO MILES” 🙏  

---

## SETUP
1. **Environment:** COPY `.env.example` to `.env` and fill it out. The app is configured entirely by environment variables.

   - **Hybrid Mode (Default):**
     - `CLOUD_API_KEY`: Your Gemini API key.
     - `CLOUD_MODEL`: The Gemini model to use (e.g., `gemini-1.5-flash`).
     - `LOCAL_BASE_URL`: The base URL for your local Ollama API (e.g., `http://127.0.0.1:11434`).
     - `LOCAL_MODEL`: The local model name (e.g., `qwen2:7b`).

   The app also supports `local`-only and `cloud`-only modes via the `MODE` environment variable. See `.env.example` for all options.

2. **Run:**
   ```sh
   # Explain a file
   python -m app.cli examples/hello.py

   # Explain from stdin
   cat examples/hello.py | python -m app.cli
   ```

3. **Customize (Optional):**
   - **Persona:** Change the personality with the `--persona` flag. Default is `chaotic_microblog`.
     ```sh
     python -m app.cli examples/hello.py --persona yuno_miles
     ```
   - **Snippets:** Add your own jokes to `~/.coderoast/snippets.jsonl`.
   - **Packs:** For advanced snippet management, you can build `.ymcpack` archives.

---

## SNIPPETS 🍟
LOOP? I SAY “LOOP-DE-LOOP LIKE SPONGEBOB” 🧽  
IO? I SAY “STREAM THIS LIKE NETFLIX SEASON 9” 📺  
ERROR? I SAY “IF IT BREAKS WE CALL IT ART” 🎨  

WANNA ADD YOUR OWN???  
PUT IT IN THE DATABASE BRO 💾  
