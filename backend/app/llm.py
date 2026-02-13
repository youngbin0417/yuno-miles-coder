import os
from typing import Any, Dict, Iterable, Optional

import requests
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv() # Load environment variables at the start

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
    base = base_url or os.getenv("CLOUD_BASE_URL") or DEFAULT_BASE
    model = model or os.getenv("CLOUD_MODEL") or ""
    key_env = os.getenv("CLOUD_API_KEY", "")
    key = api_key if api_key is not None else key_env

    if not model:
        raise RuntimeError(
            "CLOUD_MODEL is empty. Configure CLOUD_/LOCAL_ values in your .env."
        )

    provider = _detect_provider(base)
    headers: Dict[str, str] = {"Content-Type": "application/json"}
    
    if provider == "gemini":
        if not key:
            raise RuntimeError("CLOUD_API_KEY (Gemini key) is empty.")
        url = f"{base.rstrip('/')}/models/{model}:generateContent?key={key}"
        payload = _convert_to_gemini_format(system, user)
        try:
            response = requests.post(url, headers=headers, json=payload, timeout=120)
            response.raise_for_status()
            data = response.json()
            return (
                data["candidates"][0]["content"]["parts"][0]["text"]
                .strip()
            )
        except requests.exceptions.RequestException as exc:
            raise RuntimeError(f"Gemini API request failed: {_redact_key(str(exc))}") from exc
        except (KeyError, IndexError, TypeError) as exc:
            raise RuntimeError(f"Gemini response parse error: {data}") from exc

    elif provider == "ollama":
        url = f"{base.rstrip('/')}/api/generate"
        payload = {
            "model": model,
            "prompt": f"{system}\n\n{user}",
            "stream": False,
        }
        try:
            response = requests.post(url, headers=headers, json=payload, timeout=120)
            response.raise_for_status()
            data = response.json()
            return data.get("response", "").strip()
        except requests.exceptions.RequestException as exc:
            raise RuntimeError(f"Ollama API request failed: {_redact_key(str(exc))}") from exc
        except (KeyError, IndexError, TypeError) as exc:
            raise RuntimeError(f"Ollama response parse error: {data}") from exc

    else:  # OpenAI-compatible server (OpenAI, LM Studio, vLLM, OpenRouter etc.)
        if not key and base.startswith("https://"):
            raise RuntimeError(
                "CLOUD_API_KEY is required for hosted OpenAI-compatible endpoints."
            )
        try:
            client = OpenAI(
                base_url=base.rstrip('/'),
                api_key=key or "local" # Use 'local' as key if not provided for local servers
            )
            
            messages = list(_compose_messages(system, user))
            
            llm_response = client.chat.completions.create( # Renamed to avoid clash with 'response' from requests
                model=model,
                messages=messages,
                temperature=0.8,
                max_tokens=800,
                # extra_body={"reasoning": {"enabled": True}} # Uncomment if reasoning is needed for OpenRouter
            )
            return llm_response.choices[0].message.content.strip()
        except Exception as exc: # Catch general exceptions from openai library
            # Attempt to redact key if present in error message
            error_message = _redact_key(str(exc))
            raise RuntimeError(f"OpenAI-compatible client API request failed: {error_message}") from exc
