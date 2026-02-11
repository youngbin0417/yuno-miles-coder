import { Flame, Zap } from "lucide-react";

interface ModeToggleProps {
  mode: "roast" | "cook";
  onModeChange: (mode: "roast" | "cook") => void;
}

const ModeToggle = ({ mode, onModeChange }: ModeToggleProps) => {
  return (
    <div className="flex gap-0">
      <button
        onClick={() => onModeChange("roast")}
        className={`chaos-btn flex items-center gap-2 px-6 py-3 text-lg font-bold font-bang tracking-widest ${
          mode === "roast"
            ? "bg-primary text-primary-foreground"
            : "bg-card text-foreground"
        }`}
      >
        <Flame className={`h-5 w-5 ${mode === "roast" ? "wiggle" : ""}`} />
        ROAST 🔥
      </button>
      <button
        onClick={() => onModeChange("cook")}
        className={`chaos-btn flex items-center gap-2 px-6 py-3 text-lg font-bold font-bang tracking-widest ${
          mode === "cook"
            ? "bg-secondary text-secondary-foreground"
            : "bg-card text-foreground"
        }`}
      >
        <Zap className={`h-5 w-5 ${mode === "cook" ? "wiggle" : ""}`} />
        COOK 🍳
      </button>
    </div>
  );
};

export default ModeToggle;
