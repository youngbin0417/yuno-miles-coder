import re

BAD_GENERIC = [r"\b(idiot|stupid|dumb|moron)\b"]
BAD_STRONG  = [r"\b(f+u+c*k+|sh+it+)\b"]

def bleep_text(s: str) -> str:
    t = s
    for w in BAD_GENERIC:
        t = re.sub(w, "****", t, flags=re.I)
    for w in BAD_STRONG:
        t = re.sub(w, "f**k", t, flags=re.I)
    return t
