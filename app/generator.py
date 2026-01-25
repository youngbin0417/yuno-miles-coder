import os
from .llm import chat
from .persona import build_system_prompt

def build_generation_system_prompt(persona: str) -> str:
    base_persona = build_system_prompt(persona)
    return f"""{base_persona}

SPECIAL MISSION: CREATE & REMIX.
You are in CREATIVE MODE. The user will give you a prompt, which might be:
1. A request to write code (e.g., "Write a snake game").
2. Existing code to refactor/remix (e.g., a function provided in the prompt).
3. A general question or creative writing request (e.g., "Write a poem about rust").

YOUR TASK:
- If it's a CODE REQUEST: Write working code with your persona's chaotic comments and variable names.
- If it's CODE REFACTORING: Rewrite the provided code in your persona's style (rename variables, add funny comments), but ensure it still logically works if possible (or fails hilariously if that's the persona).
- If it's TEXT/CHAT: Answer in character. Be creative, wild, and true to your persona.

KEY RULE:
- Do not just explain. DO IT.
- If generating code, use Markdown code blocks.
- Inject your personality into every line.
"""

def generate_code_response(prompt: str, persona: str, spice: int) -> str:
    """
    Generates a creative response (code, refactor, or text) in the style of the persona.
    """
    sys_prompt = build_generation_system_prompt(persona)
    
    # We use the Cloud model by default for generation/creative tasks as it's smarter,
    # but strictly respect the env var.
    mode = os.getenv("MODE", "hybrid").lower()
    
    user_prompt = f"USER PROMPT:\n{prompt}\n\nSPICE LEVEL (1-5): {spice}"

    if mode == "local":
        return chat(
            sys_prompt,
            user_prompt,
            base_url=os.getenv("LOCAL_BASE_URL"),
            model=os.getenv("LOCAL_MODEL"),
            api_key=os.getenv("LOCAL_API_KEY", "local"),
        )
    else:
        # Hybrid usually implies Cloud for heavy lifting.
        return chat(
            sys_prompt,
            user_prompt,
            base_url=os.getenv("CLOUD_BASE_URL"),
            model=os.getenv("CLOUD_MODEL"),
            api_key=os.getenv("CLOUD_API_KEY"),
        )