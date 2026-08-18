import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { experiences, profile } from "../data/profile";

export function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-number mb-2">02. Experience & Education</p>
          <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
            Career & Academic Path
          </h2>
        </motion.div>

        <div className="relative space-y-8 before:absolute before:left-4 before:top-2 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-[var(--color-primary)] before:to-transparent md:before:left-8">
          {experiences.map((exp, i) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12 md:pl-20"
            >
              <div className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--color-primary)] bg-[#0a0a0f] md:left-6">
                <Briefcase size={10} className="text-[var(--color-primary)]" />
              </div>
              <div className="glass rounded-2xl p-6 transition hover:border-[var(--color-primary)]/30">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-0.5 text-xs font-medium text-[var(--color-primary)]">
                    {exp.period}
                  </span>
                  <span className="text-xs text-slate-500">{exp.type}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <h4 className="mb-4 text-sm text-slate-400">
                  {exp.company} — {exp.location}
                </h4>
                <ul className="mb-4 space-y-2">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-slate-300">
                      <span className="text-[var(--color-primary)]">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}

          <motion.article
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-12 md:pl-20"
          >
            <div className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#0a0a0f] md:left-6">
              <GraduationCap size={10} className="text-cyan-400" />
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-cyan-400/10 px-3 py-0.5 text-xs font-medium text-cyan-400">
                  {profile.education.period}
                </span>
                <span className="text-xs text-slate-500">Education</span>
              </div>
              <h3 className="text-xl font-bold text-white">{profile.education.degree}</h3>
              <h4 className="mb-4 text-sm text-slate-400">
                {profile.education.university} — {profile.education.location}
              </h4>
              <p className="mb-4 text-sm text-slate-300">
                Core Coursework: {profile.education.coursework.join(", ")}.
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.education.coursework.slice(0, 4).map((c) => (
                  <span
                    key={c}
                    className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-slate-400"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
