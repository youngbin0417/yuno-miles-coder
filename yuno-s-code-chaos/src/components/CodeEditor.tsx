interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CodeEditor = ({ value, onChange, placeholder }: CodeEditorProps) => {
  return (
    <div className="chaos-border bg-card">
      <div className="flex items-center justify-between border-b-2 border-foreground bg-muted px-3 py-1">
        <span className="font-bang text-sm tracking-wider">📝 CODE GOES HERE BRO</span>
        <div className="flex gap-1">
          <span className="inline-block h-3 w-3 border border-foreground bg-accent" />
          <span className="inline-block h-3 w-3 border border-foreground bg-primary" />
          <span className="inline-block h-3 w-3 border border-foreground bg-secondary" />
        </div>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        className="min-h-[250px] w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
};

export default CodeEditor;
