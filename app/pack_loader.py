import json
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Tuple, Optional


def load_pack(path: Optional[str]) -> Optional[dict]:
    """Load a .ymcpack archive from disk.

    The format is a zip archive containing:
    - meta.json     → metadata block
    - items.jsonl   → newline-delimited JSON objects with at least `title` and `body`

    Returns a dict with ``meta`` and ``items`` keys if successful, otherwise ``None``.
    """

    if not path:
        return None

    pack_path = Path(path).expanduser()
    if not pack_path.exists():
        return None

    import zipfile

    try:
        with zipfile.ZipFile(pack_path, "r") as zf:
            meta = json.loads(zf.read("meta.json").decode("utf-8"))
            items_blob = zf.read("items.jsonl").decode("utf-8")
    except FileNotFoundError:
        return None
    except (KeyError, json.JSONDecodeError, zipfile.BadZipFile):
        return None

    items: list[dict[str, Any]] = []
    for line in items_blob.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        if not isinstance(obj, dict):
            continue
        items.append(obj)

    return {"meta": meta, "items": items}


def pack_search(pack: dict | None, query: str, k: int = 4) -> Tuple[list[dict], list[float]]:
    """Return items whose combined title/body best match the query string."""

    if not pack or not query.strip():
        return [], []

    scored: list[tuple[float, dict[str, Any]]] = []
    q = query.lower()

    for item in pack.get("items", []):
        haystack = " ".join(
            filter(
                None,
                (
                    str(item.get("title", "")),
                    str(item.get("body", "")),
                    " ".join(item.get("tags", [])),
                ),
            )
        ).lower()
        if not haystack:
            continue
        score = SequenceMatcher(None, q, haystack).ratio()
        scored.append((score, item))

    scored.sort(key=lambda x: x[0], reverse=True)
    top = scored[: max(k, 0)]
    rows = [item for _, item in top]
    scores = [score for score, _ in top]
    return rows, scores
