import os, sys, argparse
from typing import Optional
from dotenv import load_dotenv
from .pack_loader import load_pack
from .persona import list_personas
from .engine import get_engine_response

def _read_code(path: Optional[str], max_lines: int) -> str:
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

    try:
        out = get_engine_response(
            code=code,
            persona=args.persona,
            spice=args.spice,
            pack=pack,
            no_bleep=args.no_bleep
        )
        print(out)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()