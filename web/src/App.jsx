import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Sparkles, Terminal, Cpu, RefreshCcw, Send, Copy, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE = '/api';

const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl bg-[#1e1e1e]">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{language || 'text'}</span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          title="Copy code"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

function App() {
  const [mode, setMode] = useState('review'); // 'review' or 'generate'
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [persona, setPersona] = useState('yuno_miles');
  const [personas, setPersonas] = useState([]);
  const [spice, setSpice] = useState(4);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/personas`)
      .then(res => setPersonas(res.data.personas))
      .catch(err => console.error("Failed to fetch personas", err));
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput('');
    
    try {
      const endpoint = mode === 'review' ? '/review' : '/generate';
      const payload = mode === 'review' 
        ? { code: input, persona, spice } 
        : { prompt: input, persona, spice };
      
      const res = await axios.post(`${API_BASE}${endpoint}`, payload);
      setOutput(res.data.result);
    } catch (err) {
      setOutput(`ERROR: ${err.response?.data?.detail || err.message} 💀`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8 font-mono flex flex-col items-center selection:bg-yellow-400 selection:text-black">
      <div className="w-full max-w-4xl flex flex-col h-full">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-5 group cursor-default">
            <div className="bg-yellow-400 w-20 h-20 flex items-center justify-center rounded-3xl rotate-12 shadow-[0_0_40px_rgba(250,204,21,0.5)] group-hover:rotate-[24deg] transition-transform duration-500">
              <span className="text-6xl select-none">🥷</span>
            </div>
            <h1 className="text-6xl font-black tracking-tighter italic">
              YN <span className="text-yellow-400">CODER</span>
            </h1>
          </div>
          
          <div className="flex bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 shadow-xl">
            <button 
              onClick={() => setMode('review')}
              className={`px-8 py-2.5 rounded-xl transition-all font-bold ${mode === 'review' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-zinc-500 hover:text-white'}`}
            >
              ROAST
            </button>
            <button 
              onClick={() => setMode('generate')}
              className={`px-8 py-2.5 rounded-xl transition-all font-bold ${mode === 'generate' ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' : 'text-zinc-500 hover:text-white'}`}
            >
              COOK
            </button>
          </div>
        </header>

        <main className="space-y-12">
          {/* Input Section - Minimal Editor Style */}
          <section className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-2xl opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
            <div className="relative bg-[#09090b] rounded-2xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden transition-colors group-focus-within:border-zinc-700">
              
              {/* Text Area */}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'review' ? 'Paste your code here to get roasted...' : 'Tell me what to build, paste code to remix, or just chat...'}
                className="w-full h-80 bg-transparent p-6 text-lg text-zinc-200 outline-none resize-none placeholder:text-zinc-600 leading-relaxed font-mono custom-scrollbar"
                spellCheck="false"
              />

              {/* Bottom Toolbar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-zinc-900/60 border-t border-zinc-800/50 backdrop-blur-md">
                
                {/* Left Controls: Settings */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                   {/* Persona Select */}
                  <div className="relative group/select">
                    <select 
                      value={persona} 
                      onChange={(e) => setPersona(e.target.value)}
                      className="appearance-none bg-zinc-800 hover:bg-zinc-700 text-xs font-bold py-2.5 pl-4 pr-10 rounded-lg border border-zinc-700 outline-none focus:border-yellow-400 transition-colors cursor-pointer text-zinc-300 uppercase tracking-wider"
                    >
                      {personas.map(p => <option key={p} value={p}>{p.replace('_', ' ')}</option>)}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-[10px]">▼</div>
                  </div>

                  {/* Spice Slider */}
                  <div className="flex items-center gap-3 bg-zinc-800/50 px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Spice</span>
                    <input 
                      type="range" min="1" max="5" step="1" 
                      value={spice} onChange={(e) => setSpice(parseInt(e.target.value))}
                      className="w-24 h-1.5 accent-yellow-400 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs font-bold text-yellow-400 w-3 text-center">{spice}</span>
                  </div>
                </div>

                {/* Right Controls: Action */}
                <button 
                  onClick={handleSubmit}
                  disabled={loading || !input.trim()}
                  className="w-full md:w-auto bg-zinc-100 hover:bg-white text-black font-black px-8 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale shadow-lg shadow-white/5"
                >
                  {loading ? <RefreshCcw size={18} className="animate-spin" /> : <Send size={18} />}
                  <span className="text-sm uppercase tracking-tight">{mode === 'review' ? 'ROAST IT' : 'COOK IT'}</span>
                </button>
              </div>
            </div>
          </section>

          {/* Output Section */}
          <AnimatePresence mode="wait">
            {(output || loading) && (
              <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative pb-24"
              >
                <div className="flex items-center gap-3 mb-6 px-2">
                  <Sparkles size={20} className="text-yellow-400" />
                  <span className="text-sm font-black uppercase tracking-widest text-yellow-400">Yuno's Masterpiece</span>
                </div>
                
                <div className="bg-zinc-900/40 rounded-3xl border border-zinc-800/50 p-8 min-h-[300px] backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-transparent opacity-50"></div>
                  
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-8">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 blur-3xl opacity-20 animate-pulse" />
                        <Cpu size={64} className="text-yellow-400 relative animate-bounce" />
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-xl font-black text-yellow-400 tracking-[0.3em] animate-pulse">PROCESSING HEAT</p>
                        <p className="text-zinc-500 text-sm font-medium">
                          {['Putting code in microwave...', 'Consulting the chaotic elders...', 'Adding extra spice...', 'Loading bars...'][Math.floor(Math.random() * 4)]}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-p:leading-loose prose-headings:font-black prose-headings:text-yellow-400"
                    >
                      <ReactMarkdown
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <CodeBlock language={match[1]} children={children} />
                            ) : (
                              <code className="bg-yellow-400/10 text-yellow-400 px-1.5 py-0.5 rounded font-bold border border-yellow-400/20" {...props}>
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {output}
                      </ReactMarkdown>
                    </motion.div>
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>
        
        <footer className="fixed bottom-0 left-0 right-0 p-4 text-center pointer-events-none">
          <div className="inline-flex items-center gap-4 bg-zinc-950/80 backdrop-blur-md px-6 py-2 rounded-full border border-zinc-800 text-zinc-500 text-xs shadow-2xl pointer-events-auto">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <p className="font-bold tracking-wide">WHO LET PYTHON COOK?? 🐸🍔🎤</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;