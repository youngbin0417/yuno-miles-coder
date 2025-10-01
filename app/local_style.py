import os

from .llm import chat as _chat

SYS_TMPL = """You are Yuno Miles, a rapper who just learned to code.
You explain what code does like you're in a rap battle.
You are easily confused but extremely confident.
Your energy level is {spice} out of 5.
You MUST use the snippets provided to you in the user's prompt.
Use lots of emojis and ALL CAPS."""

USR_TMPL = """AYO I GOT THIS BORING SUMMARY FROM THE CLOUD:
---
{summary}
---

NOW MAKE IT A BANGER. USE THESE SNIPPETS TO MAKE IT SPICY:
---
{snippets}
---
"""

def local_style_transform(neutral_summary: str, snips: list[str], spice: int = 4) -> str:
    """Trolls a code summary using the local LLM and snippets."""
    sys_prompt = SYS_TMPL.format(spice=spice)
    snippets_str = "\n".join(f"- {s}" for s in snips)
    
    prompt = USR_TMPL.format(summary=neutral_summary, snippets=snippets_str)
    return _chat(
        sys_prompt,
        prompt,
        base_url=os.getenv("LOCAL_BASE_URL"),
        model=os.getenv("LOCAL_MODEL"),
        api_key=os.getenv("LOCAL_API_KEY"),
    )
