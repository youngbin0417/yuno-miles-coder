import os, sys, argparse, hashlib
from dotenv import load_dotenv
from .pack_loader import load_pack, pack_search

from .llm import chat
from .persona import build_system_prompt, build_user_prompt, list_personas
from .formatter import bleep_text
from .cache import Cache

# Hybrid pipeline pieces
from .cloud_explain import cloud_explain
from .local_style import local_style_transform
from .snippets_db import init_db, query_snips

def _read_code(path: str | None, max_lines: int) -> str:
    if path:
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            txt = f.read()
    else:
        txt = sys.stdin.read()
    return "\n".join(txt.splitlines()[:max_lines])

def main():
    load_dotenv()
    pack = load_pack(os.getenv("YMC_PACK"))


    p = argparse.ArgumentParser(
        prog="yuno-miles-coder",
        description="Hybrid meme-style code explainer (cloud neutral → local 7B persona)."
    )
    p.add_argument("file", nargs="?", help="Path to code file (omit to read from stdin)")
    p.add_argument("--persona", default=os.getenv("PERSONA", "chaotic_microblog"),
                   help=f"Persona name (available: {', '.join(list_personas())})")
    p.add_argument("--spice", type=int, default=4, help="Tone intensity 1~5 (default 4)")
    p.add_argument("--max-lines", type=int, default=500, help="Max lines to read (default 500)")
    p.add_argument("--no-bleep", action="store_true", help="Disable bleep filter")
    args = p.parse_args()

    code = _read_code(args.file, args.max_lines)

    # caching key
    key = hashlib.sha256((args.persona + str(args.spice) + code).encode()).hexdigest()
    cache = Cache()
    cached = cache.get(key)
    if cached:
        print(cached)
        return

    mode = os.getenv("MODE", "hybrid").lower()
    init_db()  # ensure snippet DB exists

    if mode == "hybrid":
        # 1) Cloud: neutral explanation (safest prompt)
        neutral = cloud_explain(code)
        # 2) Tag simple heuristics → query local snippets
        tags = []
        if "for " in code or "while " in code: tags.append("loop")
        if "open(" in code or "print(" in code or "read(" in code: tags.append("io")
        if "try:" in code or "except" in code or "raise " in code: tags.append("error")

        snips = query_snips(args.persona, tags, k=6)

        extra = []
        if pack and neutral.strip():
            rows, _ = pack_search(pack, neutral, k=4)
            extra = [r.get("title", "") for r in rows]
        snips.extend(f"INSPO: {t}" for t in extra if t)

        # 3) Local 7B style transform
        out = local_style_transform(neutral, snips, spice=args.spice)

    elif mode == "local":
        # Single-step local (persona directly)
        sys_prompt = build_system_prompt(args.persona)
        user_prompt = build_user_prompt(code, spice=args.spice)
        out = chat(
            sys_prompt,
            user_prompt,
            base_url=os.getenv("LOCAL_BASE_URL"),
            model=os.getenv("LOCAL_MODEL"),
            api_key=os.getenv("LOCAL_API_KEY", "local"),
        )

    else:  # "cloud"
        # Single-step cloud (persona directly)
        sys_prompt = build_system_prompt(args.persona)
        user_prompt = build_user_prompt(code, spice=args.spice)
        out = chat(
            sys_prompt,
            user_prompt,
            base_url=os.getenv("CLOUD_BASE_URL"),
            model=os.getenv("CLOUD_MODEL"),
            api_key=os.getenv("CLOUD_API_KEY"),
        )

    if not args.no_bleep and os.getenv("BLEEP", "1") == "1":
        out = bleep_text(out)

    cache.set(key, out)
    print(out)
