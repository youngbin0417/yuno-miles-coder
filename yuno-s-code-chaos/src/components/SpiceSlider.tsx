interface SpiceSliderProps {
  spice: number;
  onSpiceChange: (spice: number) => void;
}

const SPICE_EMOJIS = ["😌", "😏", "🌶️", "🔥", "💀"];
const SPICE_LABELS = ["weak sauce", "gettin warm", "HOT", "ON FIRE", "ABSOLUTELY UNHINGED"];

const SpiceSlider = ({ spice, onSpiceChange }: SpiceSliderProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="font-bang text-lg tracking-wider">Spice</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            onClick={() => onSpiceChange(level)}
            className={`chaos-btn h-10 w-10 text-lg transition-all ${
              level <= spice
                ? level <= 2
                  ? "bg-primary text-primary-foreground"
                  : level <= 4
                  ? "bg-accent text-accent-foreground"
                  : "bg-foreground text-background shake-hover"
                : "bg-card text-muted-foreground"
            }`}
          >
            {SPICE_EMOJIS[level - 1]}
          </button>
        ))}
      </div>
      <span className={`font-bang text-sm ${spice >= 4 ? "text-accent wiggle inline-block" : ""}`}>
        {SPICE_LABELS[spice - 1]}
      </span>
    </div>
  );
};

export default SpiceSlider;
