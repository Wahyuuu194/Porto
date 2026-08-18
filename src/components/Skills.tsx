import { motion } from "framer-motion";
import { skillCategories, skillBars } from "../data/profile";

export function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-number mb-2">03. Technical Skills</p>
          <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">My Tech Stack</h2>
        </motion.div>

        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <h3 className="mb-4 text-sm font-semibold text-[var(--color-primary)]">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-[var(--color-primary)]/15 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          {skillBars.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-300">{skill.name}</span>
                <span className="font-mono text-[var(--color-primary)]">{skill.level}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-cyan-400"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
