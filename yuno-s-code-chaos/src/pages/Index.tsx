import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import ModeToggle from "@/components/ModeToggle";
import PersonaSelector from "@/components/PersonaSelector";
import SpiceSlider from "@/components/SpiceSlider";
import CodeEditor from "@/components/CodeEditor";
import OutputDisplay from "@/components/OutputDisplay";

const API_BASE = "";

const RANDOM_FOOTERS = [
  "WHO LET PYTHON COOK?? 🍔🍔🔧",
  "this code bussin fr fr no cap 🧢",
  "bro really wrote this and said 'ship it' 💀",
  "average stackoverflow copy paste developer 📋",
  "ur code has more bugs than a rainforest 🐛🌴",
];

const FloatingEmoji = ({ emoji, style }: { emoji: string; style: React.CSSProperties }) => (
  <span className="fixed pointer-events-none text-2xl opacity-20 wiggle select-none" style={style}>
    {emoji}
  </span>
);

const Index = () => {
  const [mode, setMode] = useState<"roast" | "cook">("roast");
  const [persona, setPersona] = useState("yuno_miles");
  const [spice, setSpice] = useState(3);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [footer] = useState(() => RANDOM_FOOTERS[Math.floor(Math.random() * RANDOM_FOOTERS.length)]);
  const [submitCount, setSubmitCount] = useState(0);

  const handleSubmit = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setOutput("");
    setSubmitCount((c) => c + 1);

    try {
      const endpoint = mode === "roast" ? "/api/review" : "/api/generate";
      const body = mode === "roast"
        ? { code, persona, spice }
        : { prompt: code, persona, spice };

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("nah");
      const data = await res.json();
      setOutput(data.result || "bro the AI said nothing 💀");
    } catch {
      setOutput(
        "⚠️ Server connection failed 😭 Is the backend running??\n\n```bash\npython -m app.server\n```\n\nNothing works without it bruh 💀"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Background emojis
  const bgEmojis = ["💀", "🔥", "🍝", "🐛", "😭", "💯", "⚡", "🗑️"];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Floating background emojis */}
      {bgEmojis.map((emoji, i) => (
        <FloatingEmoji
          key={i}
          emoji={emoji}
          style={{
            top: `${10 + (i * 12) % 80}%`,
            left: `${5 + (i * 17) % 90}%`,
            fontSize: `${20 + (i * 7) % 30}px`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Marquee banner */}
      <div className="overflow-hidden border-b-2 border-foreground bg-primary py-1">
        <div className="marquee whitespace-nowrap font-bang text-sm text-primary-foreground">
          🔥 YUNO MILES CODER 🔥 NO CODE IS SAFE 💀 ROAST OR GET ROASTED 🍳 WHO LET THIS MF COOK 🔧 SPAGHETTI CODE DETECTOR 🍝 BUG FACTORY INSPECTOR 🐛 CTRL+C CTRL+V CHAMPION 🏆
          🔥 YUNO MILES CODER 🔥 NO CODE IS SAFE 💀 ROAST OR GET ROASTED 🍳 WHO LET THIS MF COOK 🔧 SPAGHETTI CODE DETECTOR 🍝 BUG FACTORY INSPECTOR 🐛 CTRL+C CTRL+V CHAMPION 🏆
        </div>
      </div>

      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start gap-4">
            <span className="text-5xl wiggle inline-block">🥷</span>
            <div>
              <h1 className="title-chaos text-4xl md:text-5xl text-foreground leading-tight">
                YN CODER
              </h1>
              <p className="font-bang text-lg text-muted-foreground mt-1">
                chaotic code reviews & generation 💀⚡
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-6 pb-12">
        {/* Controls row */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <ModeToggle mode={mode} onModeChange={setMode} />
          <PersonaSelector persona={persona} onPersonaChange={setPersona} />
        </div>

        {/* Spice */}
        <div className="mb-6">
          <SpiceSlider spice={spice} onSpiceChange={setSpice} />
        </div>

        {/* Editor */}
        <div className="mb-4">
          <CodeEditor
            value={code}
            onChange={setCode}
            placeholder={
              mode === "roast"
                ? "// Paste your code and hit ROAST 😈\nfunction hello() {\n  console.log('bruh');\n}"
                : "// Describe what you want to create\n// e.g. fizzbuzz but make it absolutely unhinged"
            }
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !code.trim()}
          className={`chaos-btn shake-hover mb-8 flex w-full items-center justify-center gap-3 px-8 py-4 text-xl font-bang tracking-widest disabled:opacity-30 disabled:pointer-events-none ${mode === "roast"
              ? "bg-primary text-primary-foreground chaos-border-primary"
              : "bg-secondary text-secondary-foreground chaos-border-green"
            }`}
        >
          <Send className="h-5 w-5" />
          {isLoading ? (
            <span>Processing...</span>
          ) : (
            <>
              {mode === "roast" ? "🔥 ROAST IT 🔥" : "⚡ COOK IT ⚡"}
              {submitCount > 0 && (
                <span className="ml-2 text-xs opacity-60">({submitCount}x combo)</span>
              )}
            </>
          )}
        </button>

        {/* Output */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mb-4"></div>
            <p className="text-lg font-bang text-muted-foreground">
              {mode === "roast"
                ? "Roasting your code with chaotic energy... 🌶️"
                : "Cooking up something unhinged... 🍳"}
            </p>
          </div>
        ) : (
          <OutputDisplay output={output} isLoading={isLoading} mode={mode} />
        )}

        {/* Random footer text */}
        <div className="mt-8 text-center">
          <p className="font-bang text-lg text-muted-foreground">{footer}</p>
        </div>
      </main>

      {/* Bottom marquee */}
      <div className="fixed bottom-0 left-0 right-0 overflow-hidden border-t-2 border-foreground bg-foreground py-1">
        <div className="marquee whitespace-nowrap font-bang text-sm text-background" style={{ animationDirection: "reverse" }}>
          💀 BUILT DIFFERENT 💀 YUNO MILES APPROVED 🏆 STACK OVERFLOW IS CRYING RN 😭 YOUR CODE NEEDS THERAPY 🧠 GIT COMMIT -M "I GIVE UP" 📦
          💀 BUILT DIFFERENT 💀 YUNO MILES APPROVED 🏆 STACK OVERFLOW IS CRYING RN 😭 YOUR CODE NEEDS THERAPY 🧠 GIT COMMIT -M "I GIVE UP" 📦
        </div>
      </div>
    </div>
  );
};

export default Index;
