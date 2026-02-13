import json
import os
import random
from pathlib import Path
from typing import Iterable

SNIPPETS = {
    "loop": [
        "LOOP-DE-LOOP LIKE SPONGEBOB 🧽",
        "THIS GOES ROUND AND ROUND LIKE A MIXTAPE 💿",
        "AGAIN? AND AGAIN? WE STUCK IN THE MATRIX 😵‍💫",
    ],
    "io": [
        "STREAM THIS LIKE NETFLIX SEASON 9 📺",
        "IN AND OUT LIKE A BURGER KING DRIVE-THRU 🍔",
        "GETTIN DATA, GETTIN PAID 💰",
    ],
    "error": [
        "IF IT BREAKS WE CALL IT ART 🎨",
        "ERROR? THAT'S A FEATURE BRO 😎",
        "WHOOPS. DIDN'T WORK. RUN IT BACK 🏃‍♂️💨",
    ],
    "general": [
        "YUNO MILES! 🐸",
        "I PUT THE CODE IN THE MICROWAVE  माइक्रोवेव",
        "WHO LET HIM COOK?? 🔥",
        "HELLO UNIVERSE 🚀🚀🚀",
        "MILES MILES MILES MILES!!!!",
    ],
}

DB_PATH = Path(os.getenv("SNIPPETS_DB_PATH", "~/.coderoast/snippets.jsonl")).expanduser()


def _seed_entries() -> Iterable[dict]:
    for tag, items in SNIPPETS.items():
        tag_list = [] if tag == "general" else [tag]
        for text in items:
            yield {"text": text, "tags": tag_list, "personas": []}


def init_db() -> None:
    """Ensure the user-level snippet store exists with default seeds."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    if DB_PATH.exists():
        return
    with DB_PATH.open("w", encoding="utf-8") as handle:
        for entry in _seed_entries():
            handle.write(json.dumps(entry, ensure_ascii=False) + "\n")


def _load_entries() -> list[dict]:
    if not DB_PATH.exists():
        return []
    entries: list[dict] = []
    with DB_PATH.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            try:
                data = json.loads(line)
            except json.JSONDecodeError:
                continue
            if "text" not in data:
                continue
            entries.append(data)
    return entries


def _fallback_from_memory(tags: list[str], k: int) -> list[str]:
    pool: list[str] = []
    for tag in tags:
        pool.extend(SNIPPETS.get(tag, []))
    needed = k - len(pool)
    if needed > 0:
        general = SNIPPETS["general"]
        pool.extend(random.sample(general, min(needed, len(general))))
    random.shuffle(pool)
    return pool[:k]


def query_snips(persona: str, tags: list[str], k: int = 6) -> list[str]:
    """Fetch persona-aware snippets from the JSONL store with fallback seeds."""
    tags = tags or []
    entries = _load_entries()
    bucket: list[str] = []
    tag_set = set(tags)

    for entry in entries:
        text = entry.get("text")
        if not text:
            continue

        personas = entry.get("personas") or []
        if personas and persona and persona not in personas:
            continue

        entry_tags = set(entry.get("tags") or [])
        if tag_set and entry_tags and not (tag_set & entry_tags):
            continue

        bucket.append(text)

    if len(bucket) < k:
        for text in _fallback_from_memory(tags, k):
            if text not in bucket:
                bucket.append(text)

    random.shuffle(bucket)
    return bucket[:k]
