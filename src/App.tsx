import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ParticleBackground } from "./components/ParticleBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { TerminalModal } from "./components/TerminalModal";
import { SnakeGame } from "./components/SnakeGame";
import { MatrixOverlay } from "./components/MatrixOverlay";
import { MusicPlayer } from "./components/MusicPlayer";

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [gameOpen, setGameOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <ParticleBackground />
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_50%)]" />

        <div className="relative z-10">
          <Navbar
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenGame={() => setGameOpen(true)}
          />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>

        <TerminalModal
          open={terminalOpen}
          onClose={() => setTerminalOpen(false)}
          onMatrix={() => {
            setTerminalOpen(false);
            setMatrixActive(true);
          }}
          onSnake={() => {
            setTerminalOpen(false);
            setGameOpen(true);
          }}
        />
        <SnakeGame open={gameOpen} onClose={() => setGameOpen(false)} />
        <MatrixOverlay active={matrixActive} onClose={() => setMatrixActive(false)} />
        <MusicPlayer />
      </div>
    </ThemeProvider>
  );
}
