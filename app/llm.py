import os
from typing import Any, Dict, Iterable, Optional

import requests

DEFAULT_BASE = "https://api.openai.com/v1"


def _convert_to_gemini_format(system: str, user: str) -> Dict[str, Any]:
    """Convert a chat pair into Gemini-friendly payload."""
    return {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": f"SYSTEM PROMPT: {system}\n\nUSER REQUEST: {user}"
                    }
                ],
            }
        ]
    }


def _detect_provider(base: str) -> str:
    base_lower = (base or "").lower()
    if "googleapis" in base_lower:
        return "gemini"
    if "ollama" in base_lower or base_lower.endswith(":11434"):
        return "ollama"
    return "openai"


def _compose_messages(system: str, user: str) -> Iterable[Dict[str, str]]:
    return (
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    )


def _redact_key(text: str) -> str:
    """Strip API keys from text."""
    key_to_censor = os.getenv("CLOUD_API_KEY")
    if key_to_censor:
        text = text.replace(key_to_censor, "[REDACTED_CLOUD_KEY]")
    return text


def chat(
    system: str,
    user: str,
    *,
    base_url: Optional[str] = None,
    model: Optional[str] = None,
    api_key: Optional[str] = None,
) -> str:
    base = base_url or os.getenv("LLM_BASE_URL") or DEFAULT_BASE
    model = model or os.getenv("LLM_MODEL") or ""
    key_env = os.getenv("LLM_API_KEY", "")
    key = api_key if api_key is not None else key_env

    if not model:
        raise RuntimeError(
            "LLM_MODEL is empty. Configure CLOUD_/LOCAL_ values in your .env."
        )

    provider = _detect_provider(base)
    headers: Dict[str, str] = {"Content-Type": "application/json"}

    if provider == "gemini":
        if not key:
            raise RuntimeError("CLOUD_API_KEY (Gemini key) is empty.")
        url = f"{base.rstrip('/')}/models/{model}:generateContent?key={key}"
        payload = _convert_to_gemini_format(system, user)

    elif provider == "ollama":
        url = f"{base.rstrip('/')}/api/generate"
        payload = {
            "model": model,
            "prompt": f"{system}\n\n{user}",
            "stream": False,
        }

    else:  # OpenAI-compatible server (OpenAI, LM Studio, vLLM, etc.)
        if not key and base.startswith("https://"):
            raise RuntimeError(
                "LLM_API_KEY is required for hosted OpenAI-compatible endpoints."
            )
        token = key or "local"
        headers["Authorization"] = f"Bearer {token}"
        url = f"{base.rstrip('/')}/chat/completions"
        payload = {
            "model": model,
            "messages": list(_compose_messages(system, user)),
            "temperature": 0.8,
            "max_tokens": 800,
        }

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=120)
        response.raise_for_status()
        data = response.json()

        if provider == "gemini":
            return (
                data["candidates"][0]["content"]["parts"][0]["text"]
                .strip()
            )
        if provider == "ollama":
            return data.get("response", "").strip()
        return data["choices"][0]["message"]["content"].strip()

    except requests.exceptions.RequestException as exc:
        raise RuntimeError(f"API request failed: {_redact_key(str(exc))}") from exc
    except (KeyError, IndexError, TypeError) as exc:
        raise RuntimeError(f"LLM response parse error: {data}") from exc
