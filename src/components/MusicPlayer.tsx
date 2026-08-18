import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Play, Pause, SkipBack, SkipForward, X, Volume2 } from "lucide-react";

const tracks = [
  {
    title: "Lofi Study Beats",
    artist: "Chill Coding Session",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Ambient Focus",
    artist: "Dev Mode Radio",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
];

export function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(50);
  const [audio] = useState(() => new Audio());

  const track = tracks[trackIndex];

  const loadTrack = (index: number) => {
    audio.src = tracks[index].url;
    audio.volume = volume / 100;
    setTrackIndex(index);
  };

  const togglePlay = async () => {
    if (!audio.src) loadTrack(trackIndex);
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const next = () => {
    const nextIdx = (trackIndex + 1) % tracks.length;
    loadTrack(nextIdx);
    if (playing) audio.play();
  };

  const prev = () => {
    const prevIdx = (trackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(prevIdx);
    if (playing) audio.play();
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#12121a]/90 text-[var(--color-primary)] shadow-lg backdrop-blur-md"
        title="Dev Lofi Radio"
      >
        <Headphones size={20} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            className="fixed bottom-20 left-6 z-40 w-72 rounded-2xl border border-white/10 bg-[#12121a]/95 p-4 shadow-xl backdrop-blur-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium tracking-wider text-[var(--color-primary)]">
                DEV LOFI RADIO
              </p>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-white">
                <X size={14} />
              </button>
            </div>

            <p className="truncate text-sm font-semibold text-white">{track.title}</p>
            <p className="mb-4 truncate text-xs text-slate-500">{track.artist}</p>

            <div className="mb-4 flex items-center justify-center gap-4">
              <button onClick={prev} className="text-slate-400 hover:text-white">
                <SkipBack size={18} />
              </button>
              <button
                onClick={togglePlay}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white"
              >
                {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              <button onClick={next} className="text-slate-400 hover:text-white">
                <SkipForward size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 size={14} className="text-slate-500" />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setVolume(v);
                  audio.volume = v / 100;
                }}
                className="h-1 flex-1 accent-[var(--color-primary)]"
              />
              <span className="text-xs text-slate-500">{volume}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
