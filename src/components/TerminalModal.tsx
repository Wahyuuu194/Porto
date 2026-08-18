import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { profile, projects, experiences, skillCategories } from "../data/profile";

type TerminalProps = {
  open: boolean;
  onClose: () => void;
  onMatrix: () => void;
  onSnake: () => void;
};

type Line = { type: "input" | "output"; text: string };

const quickChips = ["help", "about", "skills", "projects", "experience", "contact", "snake", "matrix"];

export function TerminalModal({ open, onClose, onMatrix, onSnake }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      text: "Welcome to Wahyu Dwiyanto's Interactive Dev Terminal!\nType help to view available commands or click quick chips below.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const newLines: Line[] = [{ type: "input", text: `$ ${raw}` }];
    let output = "";

    switch (cmd) {
      case "help":
        output = `Available commands:
  help        — Show this message
  about       — About me summary
  skills      — List tech stack
  projects    — List projects
  experience  — Work experience
  contact     — Contact info
  clear       — Clear terminal
  snake       — Play Snake game 🐍
  matrix      — Enter the Matrix 🟢`;
        break;
      case "about":
        output = profile.summary;
        break;
      case "skills":
        output = skillCategories
          .map((c) => `${c.title}: ${c.skills.join(", ")}`)
          .join("\n");
        break;
      case "projects":
        output = projects.map((p) => `• ${p.title} — ${p.subtitle}`).join("\n");
        break;
      case "experience":
        output = experiences
          .map((e) => `• ${e.role} @ ${e.company} (${e.period})`)
          .join("\n");
        break;
      case "contact":
        output = `Email: ${profile.email}\nPhone: ${profile.phone}\nLocation: ${profile.location}`;
        break;
      case "clear":
        setLines([]);
        setInput("");
        return;
      case "snake":
        onSnake();
        output = "Launching Snake game... 🐍";
        break;
      case "matrix":
        onMatrix();
        output = "Entering the Matrix... Press ESC to exit.";
        break;
      case "":
        return;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    newLines.push({ type: "output", text: output });
    setLines((prev) => [...prev, ...newLines]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-[70vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--color-primary)]/20 bg-[#0d0d14] shadow-2xl shadow-purple-900/20"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-500">wahyu-terminal</span>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`mb-2 whitespace-pre-wrap ${
                    line.type === "input" ? "text-emerald-400" : "text-slate-300"
                  }`}
                >
                  {line.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-white/5 p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {quickChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => runCommand(chip)}
                    className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-400 hover:bg-[var(--color-primary)]/20 hover:text-white"
                  >
                    {chip} {chip === "snake" ? "🐍" : chip === "matrix" ? "🟢" : ""}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runCommand(input);
                }}
                className="flex gap-2"
              >
                <span className="text-emerald-400">$</span>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-white outline-none"
                  placeholder="Type a command (e.g. help, skills, snake, matrix)..."
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
