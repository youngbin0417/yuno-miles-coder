import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const PERSONAS = [
  { id: "yuno_miles", name: "🗣️ Yuno Miles", desc: "no cap fr fr" },
  { id: "chaotic_microblog", name: "📱 Chaotic Microblog", desc: "ratio + L + cope" },
  { id: "kanye_twitter", name: "🐻 Kanye Twitter", desc: "I AM THE CODE" },
];

interface PersonaSelectorProps {
  persona: string;
  onPersonaChange: (persona: string) => void;
}

const PersonaSelector = ({ persona, onPersonaChange }: PersonaSelectorProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = PERSONAS.find((p) => p.id === persona) || PERSONAS[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="chaos-btn flex items-center gap-2 bg-card px-4 py-2 text-sm font-bold"
      >
        <span>{selected.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-56 chaos-border bg-card">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => { onPersonaChange(p.id); setOpen(false); }}
              className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-bold transition-colors hover:bg-primary hover:text-primary-foreground ${
                persona === p.id ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              <span>{p.name}</span>
              <span className="ml-auto text-xs opacity-60">{p.desc}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;
