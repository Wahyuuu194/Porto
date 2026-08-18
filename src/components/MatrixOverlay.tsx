import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MatrixOverlayProps = {
  active: boolean;
  onClose: () => void;
};

export function MatrixOverlay({ active, onClose }: MatrixOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onClose]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "アイウエオカキクケコ0123456789ABCDEF<>{}[]";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black"
        >
          <canvas ref={canvasRef} className="h-full w-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
            <p className="font-mono text-2xl text-green-400 md:text-4xl">Welcome to the Matrix</p>
            <button
              onClick={onClose}
              className="mt-8 rounded-lg border border-green-500/50 px-6 py-2 font-mono text-sm text-green-400 transition hover:bg-green-500/10"
            >
              Exit Matrix (ESC)
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
