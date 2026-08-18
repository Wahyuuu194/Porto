import { motion } from "framer-motion";
import { ArrowRight, Mail, Layers, Code2 } from "lucide-react";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "./SocialIcons";
import { profile } from "../data/profile";
import { useTypewriter } from "../hooks/useTypewriter";

export function Hero() {
  const typed = useTypewriter(profile.roles, 90, 2200);

  return (
    <section className="relative flex min-h-screen items-center pt-24 pb-16">
      <div className="mx-auto grid max-w-6xl flex-1 items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-sm font-medium text-[var(--color-primary)]">
            {profile.location} 🇮🇩 • {profile.title}
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-white">{profile.name.split(" ")[0]}</span>
            <br />
            <span className="gradient-text">{profile.name.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="mb-2 text-lg text-slate-300 md:text-xl">
            I build{" "}
            <span className="font-semibold text-[var(--color-primary)] cursor-blink">
              {typed}
            </span>
          </p>
          <p className="mb-8 max-w-lg text-slate-400">{profile.tagline}</p>

          <div className="mb-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              Explore Projects <ArrowRight size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--color-primary)] hover:bg-white/5"
            >
              <Mail size={16} /> Contact Me
            </a>
          </div>

          <div className="flex gap-4">
            {[
              { Icon: GitHubIcon, href: profile.social.github, label: "GitHub" },
              { Icon: LinkedInIcon, href: profile.social.linkedin, label: "LinkedIn" },
              { Icon: InstagramIcon, href: profile.social.instagram, label: "Instagram" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full border border-white/10 p-2.5 text-slate-400 transition hover:border-[var(--color-primary)] hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto flex justify-center"
        >
          <div className="relative">
            <div className="profile-ring relative h-64 w-64 overflow-hidden rounded-full border-2 border-[var(--color-primary)] md:h-80 md:w-80">
              <img
                src={profile.photo}
                alt={profile.name}
                className="h-full w-full object-cover object-top"
              />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="glass absolute -left-4 top-8 flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium md:-left-8"
            >
              <Layers size={14} className="text-[var(--color-primary)]" />
              Full-Stack & UI/UX
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
              className="glass absolute -right-2 top-1/3 flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs md:-right-6"
            >
              <Code2 size={14} className="text-cyan-400" />
              Laravel • React • Figma
            </motion.div>

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
              ● {profile.status}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="mx-auto mb-2 h-8 w-5 rounded-full border-2 border-white/20">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mx-auto mt-1.5 h-1.5 w-1 rounded-full bg-[var(--color-primary)]"
          />
        </div>
        <span className="text-[10px] tracking-[0.3em] text-slate-500">SCROLL DOWN</span>
      </motion.div>
    </section>
  );
}
