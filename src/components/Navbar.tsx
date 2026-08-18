import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Gamepad2,
  Volume2,
  VolumeX,
  Menu,
  X,
  Palette,
} from "lucide-react";
import { profile } from "../data/profile";
import { useTheme, accentColors, accentHex } from "../context/ThemeContext";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

type NavbarProps = {
  onOpenTerminal: () => void;
  onOpenGame: () => void;
};

export function Navbar({ onOpenTerminal, onOpenGame }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const { accent, setAccent, soundEnabled, toggleSound } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3 shadow-lg shadow-purple-900/10" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#" className="group flex items-center gap-2">
          <span className="font-mono text-lg font-bold gradient-text transition-transform group-hover:scale-105">
            &lt;{profile.initials}/&gt;
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <button
              onClick={() => setColorOpen(!colorOpen)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
              title="Change Theme Accent Color"
            >
              <Palette size={18} style={{ color: accentHex[accent] }} />
            </button>
            <AnimatePresence>
              {colorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 flex gap-2 rounded-xl glass p-3"
                >
                  {accentColors.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setAccent(c);
                        setColorOpen(false);
                      }}
                      className="h-6 w-6 rounded-full ring-2 ring-offset-2 ring-offset-[#0a0a0f] transition hover:scale-110"
                      style={{ background: accentHex[c], outlineColor: accentHex[c] }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={onOpenTerminal}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            title="Open CLI Terminal"
          >
            <Terminal size={18} />
          </button>
          <button
            onClick={onOpenGame}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            title="Play Arcade Game"
          >
            <Gamepad2 size={18} />
          </button>
          <button
            onClick={toggleSound}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>

        <button
          className="rounded-lg p-2 text-slate-400 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
