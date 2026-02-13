import os
import hashlib
from .pack_loader import pack_search
from .llm import chat
from .persona import build_system_prompt, build_user_prompt
from .formatter import bleep_text
from .cache import Cache
from .cloud_explain import cloud_explain
from .local_style import local_style_transform
from .snippets_db import init_db, query_snips

def get_engine_response(code: str, persona: str, spice: int, pack=None, mode: str = None, no_bleep: bool = False) -> str:
    """
    Core logic for processing a code review/roast request.
    Shared by CLI and Server.
    """
    if mode is None:
        mode = os.getenv("MODE", "hybrid").lower()

    # Caching key
    key = hashlib.sha256((persona + str(spice) + code + mode).encode()).hexdigest()
    cache = Cache()
    cached = cache.get(key)
    if cached:
        return cached

    init_db()  # ensure snippet DB exists

    out = ""

    if mode == "hybrid":
        # 1) Cloud: neutral explanation
        neutral = cloud_explain(code)
        
        # 2) Tag simple heuristics -> query local snippets
        tags = []
        if "for " in code or "while " in code: tags.append("loop")
        if "open(" in code or "print(" in code or "read(" in code: tags.append("io")
        if "try:" in code or "except" in code or "raise " in code: tags.append("error")

        snips = query_snips(persona, tags, k=6)

        extra = []
        if pack and neutral.strip():
            rows, _ = pack_search(pack, neutral, k=4)
            extra = [r.get("title", "") for r in rows]
        snips.extend(f"INSPO: {t}" for t in extra if t)

        # 3) Local 7B style transform
        out = local_style_transform(neutral, snips, spice=spice)

    elif mode == "local":
        sys_prompt = build_system_prompt(persona)
        user_prompt = build_user_prompt(code, spice=spice)
        out = chat(
            sys_prompt,
            user_prompt,
            base_url=os.getenv("LOCAL_BASE_URL"),
            model=os.getenv("LOCAL_MODEL"),
            api_key=os.getenv("LOCAL_API_KEY", "local"),
        )

    else:  # "cloud"
        sys_prompt = build_system_prompt(persona)
        user_prompt = build_user_prompt(code, spice=spice)
        out = chat(
            sys_prompt,
            user_prompt,
            base_url=os.getenv("CLOUD_BASE_URL"),
            model=os.getenv("CLOUD_MODEL"),
            api_key=os.getenv("CLOUD_API_KEY"),
        )

    # Bleep filter
    if not no_bleep and os.getenv("BLEEP", "1") == "1":
        out = bleep_text(out)

    cache.set(key, out)
    return out
