import os, json
from pathlib import Path

class Cache:
    def __init__(self, path=None):
        self.path = Path(path or os.path.expanduser("~/.coderoast/cache.jsonl"))
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def get(self, key: str):
        if not self.path.exists():
            return None
        with self.path.open("r", encoding="utf-8") as f:
            for line in f:
                try:
                    j = json.loads(line)
                    if j.get("key") == key:
                        return j.get("out")
                except Exception:
                    continue
        return None

    def set(self, key: str, out: str):
        with self.path.open("a", encoding="utf-8") as f:
            f.write(json.dumps({"key": key, "out": out}, ensure_ascii=False) + "\n")
