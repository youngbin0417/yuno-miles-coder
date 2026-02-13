import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface OutputDisplayProps {
  output: string;
  isLoading: boolean;
  mode: "roast" | "cook";
}

const LOADING_MSGS = [
  "bruh hold on... 🧠",
  "cooking up something crazy... 🍳",
  "analyzing ur spaghetti code... 🍝",
  "yuno miles is thinking... 💭",
  "this code got me speechless ngl... 😶",
];

const OutputDisplay = ({ output, isLoading, mode }: OutputDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [loadingMsg] = useState(() => LOADING_MSGS[Math.floor(Math.random() * LOADING_MSGS.length)]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!output && !isLoading) {
    return (
      <div className="chaos-border flex min-h-[250px] flex-col items-center justify-center bg-card p-8 text-center">
        <span className="mb-2 text-5xl wiggle inline-block">🤔</span>
        <p className="font-bang text-lg text-muted-foreground">
          {mode === "roast"
            ? "press roast after putting code innit lol"
            : "Let me know what u wanna make lol"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">no code is safe 💀</p>
      </div>
    );
  }

  return (
    <div className="relative chaos-border min-h-[250px] bg-card">
      <div className="flex items-center justify-between border-b-2 border-foreground bg-muted px-3 py-1">
        <span className="font-bang text-sm tracking-wider">
          💬 {mode === "roast" ? "ROAST RESULTS" : "COOKED OUTPUT"}
        </span>
        {output && !isLoading && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-bold hover:text-accent transition-colors"
          >
            {copied ? <><Check className="h-3 w-3" /> COPIED!</> : <><Copy className="h-3 w-3" /> COPY</>}
          </button>
        )}
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl spin-slow inline-block">🌀</span>
            <span className="font-bang text-lg">{loadingMsg}</span>
          </div>
        ) : (
          <div className="output-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputDisplay;
