import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Persona {
  id: string;
  name: string;
  desc?: string;
}

interface PersonaSelectorProps {
  persona: string;
  onPersonaChange: (persona: string) => void;
}

const PersonaSelector = ({ persona, onPersonaChange }: PersonaSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/personas");
        const data = await response.json();
        // Convert the persona names to a more user-friendly format
        const formattedPersonas = data.personas.map((p: string) => {
          // Convert snake_case or camelCase to proper names
          const displayName = p
            .replace(/_/g, ' ')  // Replace underscores with spaces
            .replace(/\b\w/g, l => l.toUpperCase())  // Capitalize first letter of each word
            .replace('Yuno Miles', '🗣️ Yuno Miles')  // Special cases with emojis
            .replace('Chaotic Microblog', '📱 Chaotic Microblog')
            .replace('Kanye West', '🐻 Kanye Twitter')
            .replace('Mrbeast', '💰 MrBeast')
            .replace('Ishowspeed', '🏃‍♂️ iShowSpeed')
            .replace('Gordon Ramsay', '👨‍🍳 Gordon Ramsay')
            .replace('Elon Musk', '🚀 Elon Musk')
            .replace('DonaldTrump', '🇺🇸 Donald Trump')
            .replace('Joe Biden', '🏛️ Joe Biden')
            .replace('Homer Simpson', '🍩 Homer Simpson')
            .replace('Rick Sanchez', '🧪 Rick Sanchez');
          
          return {
            id: p,
            name: displayName,
            desc: "Chaotic personality for code reviews"
          };
        });
        setPersonas(formattedPersonas);
        // Set default to the first persona if current persona is not in the list
        if (!data.personas.includes(persona) && data.personas.length > 0) {
          onPersonaChange(data.personas[0]);
        }
      } catch (error) {
        console.error("Failed to fetch personas:", error);
        // Fallback to default personas if API call fails
        setPersonas([
          { id: "yuno_miles", name: "🗣️ Yuno Miles", desc: "no cap fr fr" },
          { id: "chaotic_microblog", name: "📱 Chaotic Microblog", desc: "ratio + L + cope" },
          { id: "kanye_west", name: "🐻 Kanye Twitter", desc: "I AM THE CODE" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, [onPersonaChange, persona]);

  const selected = personas.find((p) => p.id === persona) || personas[0] || { id: persona, name: persona, desc: "Current persona" };

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
        disabled={loading}
      >
        {loading ? (
          <span>Loading personas...</span>
        ) : (
          <>
            <span>{selected.name}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </>
        )}
      </button>

      {open && !loading && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 max-h-60 overflow-y-auto chaos-border bg-card">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => { onPersonaChange(p.id); setOpen(false); }}
              className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-bold transition-colors hover:bg-primary hover:text-primary-foreground ${
                persona === p.id ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              <span className="truncate">{p.name}</span>
              {p.desc && <span className="ml-auto text-xs opacity-60 truncate">{p.desc}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;
