import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AccentColor = "violet" | "cyan" | "emerald" | "rose" | "amber";

const accentMap: Record<AccentColor, { primary: string; glow: string }> = {
  violet: { primary: "#8b5cf6", glow: "rgba(139, 92, 246, 0.4)" },
  cyan: { primary: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)" },
  emerald: { primary: "#10b981", glow: "rgba(16, 185, 129, 0.4)" },
  rose: { primary: "#f43f5e", glow: "rgba(244, 63, 94, 0.4)" },
  amber: { primary: "#f59e0b", glow: "rgba(245, 158, 11, 0.4)" },
};

type ThemeContextType = {
  accent: AccentColor;
  setAccent: (c: AccentColor) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccent] = useState<AccentColor>("violet");
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const colors = accentMap[accent];
    document.documentElement.style.setProperty("--color-primary", colors.primary);
    document.documentElement.style.setProperty("--accent-glow", colors.glow);
  }, [accent]);

  return (
    <ThemeContext.Provider
      value={{
        accent,
        setAccent,
        soundEnabled,
        toggleSound: () => setSoundEnabled((s) => !s),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export const accentColors: AccentColor[] = ["violet", "cyan", "emerald", "rose", "amber"];

export const accentHex: Record<AccentColor, string> = {
  violet: "#8b5cf6",
  cyan: "#06b6d4",
  emerald: "#10b981",
  rose: "#f43f5e",
  amber: "#f59e0b",
};
