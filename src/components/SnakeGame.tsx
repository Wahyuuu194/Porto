import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type SnakeGameProps = {
  open: boolean;
  onClose: () => void;
};

type Point = { x: number; y: number };
type Difficulty = "chill" | "normal" | "ghost";

const GRID = 20;
const CELL = 16;

export function SnakeGame({ open, onClose }: SnakeGameProps) {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [dir, setDir] = useState<Point>({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const dirRef = useRef(dir);
  dirRef.current = dir;

  const speed = difficulty === "chill" ? 180 : difficulty === "normal" ? 120 : 90;
  const ghostMode = difficulty === "ghost";

  const spawnFood = useCallback((body: Point[]) => {
    let pos: Point;
    do {
      pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    } while (body.some((s) => s.x === pos.x && s.y === pos.y));
    return pos;
  }, []);

  const reset = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 10 });
    setDir({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
  };

  const move = (d: Point) => {
    const cur = dirRef.current;
    if (d.x === -cur.x && d.y === -cur.y) return;
    setDir(d);
  };

  useEffect(() => {
    if (!open || gameOver) return;

    const tick = setInterval(() => {
      setSnake((prev) => {
        const head = {
          x: prev[0].x + dirRef.current.x,
          y: prev[0].y + dirRef.current.y,
        };

        if (!ghostMode && (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID)) {
          setGameOver(true);
          return prev;
        }

        const wrapped = ghostMode
          ? {
              x: (head.x + GRID) % GRID,
              y: (head.y + GRID) % GRID,
            }
          : head;

        if (!ghostMode && prev.some((s) => s.x === wrapped.x && s.y === wrapped.y)) {
          setGameOver(true);
          return prev;
        }

        const next = [wrapped, ...prev];
        if (wrapped.x === food.x && wrapped.y === food.y) {
          setScore((s) => s + 10);
          setFood(spawnFood(next));
        } else {
          next.pop();
        }
        return next;
      });
    }, speed);

    return () => clearInterval(tick);
  }, [open, gameOver, food, ghostMode, speed, spawnFood]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          move({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          move({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          move({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          move({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-md rounded-2xl p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Snake Arcade 🐍</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="mb-4 flex gap-2">
              {(
                [
                  ["chill", "Chill 🐢"],
                  ["normal", "Normal 🐍"],
                  ["ghost", "Pass Walls 🌀"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setDifficulty(key);
                    reset();
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs ${
                    difficulty === key
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <p className="mb-2 text-center font-mono text-sm text-[var(--color-primary)]">
              Score: {score}
            </p>

            <div
              className="relative mx-auto overflow-hidden rounded-lg border border-white/10 bg-black/50"
              style={{ width: GRID * CELL, height: GRID * CELL }}
            >
              {snake.map((s, i) => (
                <div
                  key={`${s.x}-${s.y}-${i}`}
                  className="absolute rounded-sm"
                  style={{
                    left: s.x * CELL,
                    top: s.y * CELL,
                    width: CELL - 1,
                    height: CELL - 1,
                    background: i === 0 ? "var(--color-primary)" : "#6366f1",
                  }}
                />
              ))}
              <div
                className="absolute rounded-full bg-emerald-400"
                style={{
                  left: food.x * CELL,
                  top: food.y * CELL,
                  width: CELL - 1,
                  height: CELL - 1,
                }}
              />
              {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                  <p className="text-xl font-bold text-white">GAME OVER</p>
                  <p className="text-sm text-slate-400">Final Score: {score}</p>
                  <button
                    onClick={reset}
                    className="mt-3 rounded-lg bg-[var(--color-primary)] px-4 py-1.5 text-sm text-white"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 max-w-[120px] mx-auto">
              <div />
              <button
                onClick={() => move({ x: 0, y: -1 })}
                className="rounded bg-white/5 py-2 text-xs text-slate-400 hover:bg-white/10"
              >
                Up
              </button>
              <div />
              <button
                onClick={() => move({ x: -1, y: 0 })}
                className="rounded bg-white/5 py-2 text-xs text-slate-400 hover:bg-white/10"
              >
                Left
              </button>
              <button
                onClick={reset}
                className="rounded bg-white/5 py-2 text-xs text-slate-400 hover:bg-white/10"
              >
                R
              </button>
              <button
                onClick={() => move({ x: 1, y: 0 })}
                className="rounded bg-white/5 py-2 text-xs text-slate-400 hover:bg-white/10"
              >
                Right
              </button>
              <div />
              <button
                onClick={() => move({ x: 0, y: 1 })}
                className="rounded bg-white/5 py-2 text-xs text-slate-400 hover:bg-white/10"
              >
                Down
              </button>
              <div />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
