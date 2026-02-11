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
          // Convert snake_case or camelCase to proper names and add specific emojis
          const displayName = p
            .replace(/_/g, ' ')  // Replace underscores with spaces
            .replace(/\b\w/g, l => l.toUpperCase())  // Capitalize first letter of each word
            // Specific emoji mappings for each persona
            .replace('Adolf Hitler', '🗣️ Adolf Hitler')
            .replace('Arsenal Fan', '💀 Arsenal Fan')
            .replace('Benjamin Netanyahu', '🤹‍♂️ Benjamin Netanyahu')
            .replace('Charlie Kirk', '🧑‍🎤 Charlie Kirk')
            .replace('Cristiano Ronaldo', '7️⃣ Cristiano Ronaldo')
            .replace('DonaldTrump', '🟠 Donald Trump')
            .replace('Druski', '👶🏾 Druski')
            .replace('Emmanuel Macron', '👨‍🍳 Emmanuel Macron')
            .replace('Elon Musk', '🚀 Elon Musk')
            .replace('Gordon Ramsay', '👨‍🍳 Gordon Ramsay')
            .replace('Homer Simpson', '🍩 Homer Simpson')
            .replace('Joe Biden', '🏛️ Joe Biden')
            .replace('Kanye West', '🐻 Kanye West')
            .replace('Rick Sanchez', '🧪 Rick Sanchez')
            .replace('Yuno Miles', '🐸 Yuno Miles')
            .replace('Chaotic Microblog', '📱 Chaotic Microblog')
            .replace('Mrbeast', '💵 MrBeast')  // Dollar sign for MrBeast
            .replace('Ishowspeed', '📺 iShowSpeed')  // TV/Stream emoji for iShowSpeed
            .replace('Keir Starmer', '🤡 Keir Starmer')
            .replace('Lgbtq Activist', '🤓 LGBTQ Activist')  // nerd for LGBTQ Activist
            .replace('Kai Cenat', '🦱 Kai Cenat')
            .replace('Mark Zuckerberg', '🦎 Mark Zuckerberg')
            .replace('Timothée Chalamet', '💇‍♂️ Timothée Chalamet')  // haircut/hairstyle for Timothée (hi-job reference)
            .replace('Tyler The Creator', '🎤 Tyler The Creator')
            .replace('Vladimir Putin', '🎖️ Vladimir Putin')
            .replace('Playboi Carti', '🧛 Playboi Carti')
            .replace('Donald Trump', '🟠 Donald Trump');  // Orange for Trump
          
          return {
            id: p,
            name: displayName
            // Removed desc to only show names in the dropdown
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
          { id: "yuno_miles", name: "🗣️ Yuno Miles" },
          { id: "chaotic_microblog", name: "📱 Chaotic Microblog" },
          { id: "kanye_west", name: "🐻 Kanye Twitter" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, [onPersonaChange, persona]);

  const selected = personas.find((p) => p.id === persona) || personas[0] || { id: persona, name: persona };

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
        className="chaos-btn flex items-center gap-2 bg-card px-4 py-2 text-sm font-bold min-w-[200px]"
        disabled={loading}
      >
        {loading ? (
          <span>Loading personas...</span>
        ) : (
          <>
            <span className="truncate">{selected.name}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </>
        )}
      </button>

      {open && !loading && (
        <div className="absolute left-0 top-full z-50 mt-2 w-80 max-h-60 overflow-y-auto chaos-border bg-card">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => { onPersonaChange(p.id); setOpen(false); }}
              className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-bold transition-colors hover:bg-primary hover:text-primary-foreground ${
                persona === p.id ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              <span className="truncate">{p.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;
