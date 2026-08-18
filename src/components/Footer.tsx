import { profile } from "../data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
        <p className="text-sm text-slate-500">
          Designed & Engineered by{" "}
          <span className="gradient-text font-semibold">{profile.name}</span>
        </p>
        <p className="mt-2 text-xs text-slate-600">
          © {new Date().getFullYear()} — Built with React, Tailwind CSS & Framer Motion
        </p>
      </div>
    </footer>
  );
}
