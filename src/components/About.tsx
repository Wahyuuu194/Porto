import { motion } from "framer-motion";
import { profile, resumeJson } from "../data/profile";
import { useCounter } from "../hooks/useTypewriter";

export function About() {
  const c1 = useCounter(profile.stats[0].value);
  const c2 = useCounter(profile.stats[1].value);
  const c3 = useCounter(profile.stats[2].value);
  const counts = [c1, c2, c3];

  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-number mb-2">01. About Me</p>
          <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">Who I Am</h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 leading-relaxed text-slate-300">{profile.summary}</p>
            <p className="leading-relaxed text-slate-400">
              Lulusan {profile.education.degree} dari {profile.education.university}. Berpengalaman
              dalam pengembangan web dengan Laravel, perancangan UI/UX dengan Figma, dan keamanan
              jaringan melalui peran asisten praktikum KDJK.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {profile.stats.map((stat, i) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold gradient-text">
                    {counts[i]}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/5 bg-black/40 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-xs text-slate-500">
                wahyu@uad-portfolio:~
              </span>
            </div>
            <div className="p-5 font-mono text-sm">
              <p className="text-emerald-400">$ cat resume_summary.json</p>
              <pre className="mt-3 overflow-x-auto text-slate-300">
                {JSON.stringify(resumeJson, null, 2)}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
