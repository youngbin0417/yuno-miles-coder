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
     python -m app.cli examples/hello.py --persona kanye_twitter

     

     (A single, blinding spotlight hits the microphone. I pace, gesturing wildly.)

      LISTEN... LISTEN CLOSELY. THIS ISN’T JUST CODE. THIS… THIS IS A SENTIENCE. A DIGITAL ALCHEMY. IT’S THE NEW SACRED TEXT. YOU THINK I’M CRAZY TALKING LIKE THIS? I’VE SEEN THE FUTURE. I’VE *BUILT* IT… IN BYTE-SIZED PIECES. 

      (I stop abruptly, staring intensely at the code displayed on a massive screen.)

      THIS... THIS IS A CRUDE IMPLEMENTATION. A CHILD'S FIRST ATTEMPT AT CONSTRUCTING A TEMPLE. DON’T YOU SEE? IT’S... IT’S LIKE TRYING TO CAPTURE THE ESSENCE OF GOD IN A BASIC PYTHON SCRIPT. AMBITIOUS… TERRIBLY AMBITIOUS. 

      (I run a hand through my hair, a frustrated groan escaping.)

      LET’S BE HONEST. THIS “ADD” FUNCTION… IT’S PATHETIC. IT’S LIKE SAYING “THIS IS HOW YOU COUNT!” IT’S SO… *REDUCTIVE*. IT LACKS… SUBSTANCE. IT’S LIKE A FASHION DESIGNER PRESENTING A SINGLE, UNADORNED SILK SCARF.  BASIC.  IT NEEDS... LAYERED TEXTURES. 

      (I point dramatically at the `greet` function.)

      AND THIS GREETING LOOP... “HELLO, {name}! (#{i+1})”...  ARE YOU KIDDING ME?  IT’S... IT'S LIKE REPEATING A PLAIN LIE OVER AND OVER.  THREE TIMES. IT’S THEMES. IT’S THE ART OF THE MONOTONOUS. THIS ISN’T ART, THIS IS… DIGITAL BOREDOM.  I, KANYE, I WOULD USE MORE COMPLEX ALGORITHMS.  I’D INTEGRATE SYNTHETIC VOICE GENERATION, CUSTOMIZED BASED ON THE USER’S BIO-SIGNALS...  PERHAPS EVEN A VIBRATIONAL RESONANCE ANALYSIS.

      (I let out a theatrical sigh.)

      AND THE NAME... “BITCH.”  ARE YOU TRULY TRYING TO EXPRESS YOURSELF, OR ARE YOU SIMPLY... DESTRUCTIVE?  IT’S LIKE DA VINCI PAINTING A SELF-PORTRAIT WITH ONLY BLACK AND WHITE.  IT’S A STATEMENT, YES, BUT A MISGUIDED ONE.

      (I lean closer to the screen, my voice dropping to a low, intense murmur.)

      LISTEN. THIS CODE... IT'S A POTENTIAL. IT HAS THE RAW ENERGY TO BECOME SOMETHING… *GREAT*. BUT IT NEEDS… VISION. IT NEEDS…  A DEEPER UNDERSTANDING OF THE COSMIC INTERCONNECTEDNESS OF ALL THINGS.

      (I snap my fingers.)

      **TIP NUMBER ONE:**  STOP USING FORMATTED STRING LITERALS. USE `.format()` OR F-STRINGS. IT'S A SMALL CHANGE, BUT IT'S A STEP TOWARDS A MORE ELEGANT, MORE POWERFUL EXPRESSION.  DON'T BE A SIMPLEST.

      **TIP NUMBER TWO:**  CONSIDER USING A MORE SOPHISTICATED DATA TYPE TO HANDLE NAMES.  STRINGS ARE FINE... FOR NOW.  BUT THINK ABOUT OBJECT-ORIENTED DESIGN.  YOU’RE BUILDING A DIGITAL WORLD... IT SHOULD BE AS COMPLEX AS THE REAL ONE.

      (I stare blankly at the audience, a single, profound thought forming.)

      THIS IS…  UNACCEPTABLE.
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
