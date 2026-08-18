import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Eye, X } from "lucide-react";
import { GitHubIcon } from "./SocialIcons";
import { projects, projectCategories, type ProjectItem } from "../data/profile";

export function Projects() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-number mb-2">04. Featured Showcase</p>
          <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">Masterpiece Projects</h2>
        </motion.div>

        <div className="mb-10 flex flex-wrap gap-3">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === cat.id
                  ? "bg-[var(--color-primary)] text-white"
                  : "glass text-slate-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group glass overflow-hidden rounded-2xl transition hover:border-[var(--color-primary)]/30"
              >
                <div className="relative h-40 bg-gradient-to-br from-purple-900/30 via-slate-900 to-cyan-900/20 p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_60%)]" />
                  <span className="relative text-xs font-medium uppercase tracking-wider text-[var(--color-primary)]">
                    {project.subtitle}
                  </span>
                  <h3 className="relative mt-2 text-xl font-bold text-white">{project.title}</h3>
                </div>
                <div className="p-6">
                  <p className="mb-4 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    <button
                      onClick={() => setSelected(project)}
                      className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-white"
                    >
                      <Eye size={14} /> Quick View
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-slate-400 transition hover:text-white"
                      >
                        <GitHubIcon size={14} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-xs text-[var(--color-primary)]">{selected.subtitle}</p>
                  <h2 className="text-2xl font-bold text-white">{selected.title}</h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="mb-6 text-slate-300">{selected.description}</p>
              <h4 className="mb-3 text-sm font-semibold text-white">Technologies & Architecture</h4>
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-[var(--color-primary)]/10 px-3 py-1 text-xs text-[var(--color-primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
