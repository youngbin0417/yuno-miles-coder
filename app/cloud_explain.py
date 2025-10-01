import os

from .llm import chat as _chat

SYS = "You are a precise code explainer. No jokes, no opinions."
USR_TMPL = """Summarize what this Python code does in 5 short bullet lines.
Neutral, factual, concise. No style, no jokes.

```python
{code}
```"""

def cloud_explain(code: str) -> str:
    """Call the configured cloud model for a neutral summary."""
    return _chat(
        SYS,
        USR_TMPL.format(code=code),
        base_url=os.getenv("CLOUD_BASE_URL"),
        model=os.getenv("CLOUD_MODEL"),
        api_key=os.getenv("CLOUD_API_KEY"),
    )
