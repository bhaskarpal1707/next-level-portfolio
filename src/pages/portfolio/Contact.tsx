import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/portfolio";
import Magnetic from "@/components/portfolio/Magnetic";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";

const channels = [
  {
    icon: MapPin,
    label: "Address",
    value: "Kolkata, West Bengal, India",
    sub: "22.5726° N / 88.3639° E",
    href: "https://maps.google.com/?q=Kolkata,West+Bengal,India",
  },
  {
    icon: Phone,
    label: "Call me",
    value: "+91-73188285978",
    sub: "Mon–Sat · 10:00–20:00 IST",
    href: "tel:+9173188285978",
  },
  {
    icon: Mail,
    label: "Email me",
    value: "bhaskarpal.official@gmail.com",
    sub: "Replies within 24 hours",
    href: "mailto:bhaskarpal.official@gmail.com",
  },
];

export default function Contact() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let's make your data <span className="text-gradient">talk</span>
            </>
          }
          description="For any queries, feel free to reach out — I'm ready to connect and discuss collaboration, career opportunities, or data-driven projects with HR, managers, IT, and business professionals."
        />
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <motion.a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass glass-hover noise group relative block h-full overflow-hidden rounded-2xl p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300 transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(94,234,212,0.35)]">
                  <c.icon className="h-5 w-5" />
                </span>
                <p className="mt-6 font-mono2 text-[10px] uppercase tracking-[0.3em] text-stone-500">
                  {c.label}
                </p>
                <p className="font-display mt-2 break-words text-lg font-semibold text-stone-100">
                  {c.value}
                </p>
                <p className="mt-1.5 font-mono2 text-[11px] tracking-wide text-stone-500">
                  {c.sub}
                </p>
                <ArrowUpRight className="absolute right-6 top-7 h-4 w-4 text-stone-600 transition-all duration-300 group-hover:-transtone-y-0.5 group-hover:transtone-x-0.5 group-hover:text-amber-400" />
              </motion.a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="noise relative mt-6 overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.07] via-transparent to-rose-400/[0.07] p-8 text-center sm:p-12">
            <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-amber-400/90">
              Direct line
            </p>
            <h3 className="font-display mx-auto mt-4 max-w-xl text-2xl font-semibold tracking-tight text-stone-100 sm:text-4xl">
              One email away from <span className="text-gradient">better decisions</span>
            </h3>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-neon inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-amber-300 transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(94,234,212,0.4)]"
                >
                  <Mail className="h-4 w-4" />
                  Write me now
                </a>
              </Magnetic>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-stone-200"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-stone-200"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
