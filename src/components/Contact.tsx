import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "./SocialIcons";
import { profile } from "../data/profile";

export function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="section-number mb-2">05. Contact & Connect</p>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Let&apos;s Work Together</h2>
          <p className="mx-auto mb-12 max-w-xl text-slate-400">
            Saat ini terbuka untuk peluang Full-Stack Developer, proyek freelance, atau kolaborasi
            teknis. Silakan hubungi saya!
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { Icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
              { Icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
              { Icon: LinkedInIcon, label: "LinkedIn", href: profile.social.linkedin },
              { Icon: GitHubIcon, label: "GitHub", href: profile.social.github },
              { Icon: InstagramIcon, label: "Instagram", href: profile.social.instagram },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-[var(--color-primary)]/30"
              >
                <div className="rounded-lg bg-[var(--color-primary)]/10 p-3">
                  <Icon size={20} className="text-[var(--color-primary)]" />
                </div>
                <span className="text-slate-300">{label}</span>
              </a>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass space-y-4 rounded-2xl p-6"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const data = new FormData(form);
              const subject = encodeURIComponent("Portfolio Contact");
              const body = encodeURIComponent(
                `Nama: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`,
              );
              window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
            }}
          >
            <div>
              <label className="mb-1 block text-sm text-slate-400">Nama</label>
              <input
                name="name"
                required
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-[var(--color-primary)]"
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-400">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-[var(--color-primary)]"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-400">Pesan</label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full resize-none rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white outline-none focus:border-[var(--color-primary)]"
                placeholder="Ceritakan tentang proyek atau peluang Anda..."
              />
            </div>
            <button
              type="submit"
              className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white"
            >
              <Send size={16} /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
