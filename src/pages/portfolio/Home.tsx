import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { profile, marqueeSkills, stats, projects, impactPoints } from "@/data/portfolio";
import Marquee from "@/components/portfolio/Marquee";
import Magnetic from "@/components/portfolio/Magnetic";
import TiltCard from "@/components/portfolio/TiltCard";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";

const roles = profile.roles;

function useRotatingRole() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0]);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const word = roles[index % roles.length];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), 62);
      } else {
        t = setTimeout(() => setPhase("holding"), 1400);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), 400);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(word.slice(0, text.length - 1)), 34);
      } else {
        setIndex((i) => (i + 1) % roles.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, index]);

  return text;
}

export default function Home() {
  const role = useRotatingRole();

  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const others = projects.filter((p) => !p.featured).slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col justify-center px-4 pt-28 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-amber-300/90">
              Open to opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-7 text-[13vw] font-bold leading-[0.95] tracking-[-0.03em] sm:text-7xl md:text-8xl"
          >
            <span className="block text-stone-100">BHASKAR</span>
            <span className="text-gradient block">PAL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-stone-400 sm:text-lg"
          >
            I turn raw numbers into{" "}
            <span className="text-stone-100">growth catalysts</span> — crafting
            dashboards, mining insights, and building ML that answers the questions
            leaders actually ask.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-mono2 text-sm text-stone-500"
          >
            <span className="text-amber-400">&gt;</span>{" "}
            <span className="type-caret text-stone-300">{role}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link
                to="/projects"
                className="btn-neon group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-amber-300 transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(94,234,212,0.4)]"
              >
                Explore my work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:transtone-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/contact"
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-stone-200"
              >
                <Sparkles className="h-4 w-4 text-rose-300" />
                Let's connect
              </Link>
            </Magnetic>
            <span className="flex items-center gap-2 font-mono2 text-xs tracking-widest text-stone-500">
              <MapPin className="h-3.5 w-3.5 text-amber-400/70" />
              KOLKATA · IN
            </span>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="pointer-events-none absolute bottom-8 left-1/2 -transtone-x-1/2"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-stone-600/60 p-1.5">
            <motion.span
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-amber-400"
            />
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────── SKILL MARQUEE ─────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <Marquee items={marqueeSkills} duration={42} />
        <Marquee items={[...marqueeSkills].reverse()} duration={46} reverse />
      </section>

      {/* ────────────────────────── STATS ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass glass-hover noise relative overflow-hidden rounded-2xl p-6">
                <div className="font-display text-4xl font-bold text-gradient stat-glow sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 font-mono2 text-[11px] uppercase tracking-[0.22em] text-stone-500">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ────────────────────────── ABOUT TEASER ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <SectionHeading
          eyebrow="01 — About"
          title={
            <>
              Chaos in, <span className="text-gradient">clarity out</span>
            </>
          }
          description={profile.about}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impactPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <TiltCard className="h-full">
                <div className="glass glass-hover h-full rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <span className="font-mono2 text-2xl text-amber-400/90">{p.glyph}</span>
                    <span className="font-mono2 text-[10px] tracking-[0.3em] text-stone-600">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold text-stone-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">{p.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
          <Reveal delay={0.35}>
            <Link
              to="/about"
              className="group flex h-full min-h-[10rem] flex-col justify-between rounded-2xl border border-dashed border-amber-400/30 bg-amber-400/[0.04] p-6 transition-colors duration-300 hover:border-amber-400/60 hover:bg-amber-400/[0.08]"
            >
              <p className="font-display text-lg font-semibold text-amber-300">
                More about the journey
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono2 text-xs tracking-widest text-amber-400/80">
                GO TO ABOUT
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-transtone-y-0.5 group-hover:transtone-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ────────────────────── FEATURED PROJECTS ────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="02 — Featured work"
            title={
              <>
                Selected <span className="text-gradient">projects</span>
              </>
            }
            description="A cut of the archive — dashboards, pipelines, and models built to answer real questions."
          />
          <Reveal delay={0.15}>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 font-mono2 text-xs tracking-[0.25em] text-amber-400/90 transition-colors hover:text-amber-300"
            >
              VIEW ALL PROJECTS
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:transtone-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <a href={p.url} target="_blank" rel="noreferrer" className="block h-full">
                <TiltCard className="h-full">
                  <article className="glass glass-hover flex h-full flex-col rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-rose-300/80">
                        {p.category}
                      </span>
                      <ExternalLink className="h-4 w-4 text-stone-600 transition-colors group-hover:text-amber-400" />
                    </div>
                    <h3 className="font-display mt-6 text-xl font-semibold leading-snug text-stone-100">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-400">
                      {p.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tech.slice(0, 4).map((t) => (
                        <TagChip key={t}>{t}</TagChip>
                      ))}
                    </div>
                  </article>
                </TiltCard>
              </a>
            </Reveal>
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass glass-hover flex items-center justify-between rounded-2xl px-5 py-4"
                >
                  <div>
                    <div className="font-display text-sm font-semibold text-stone-200">
                      {p.title}
                    </div>
                    <div className="mt-1 font-mono2 text-[10px] uppercase tracking-[0.25em] text-stone-500">
                      {p.category} · {p.year}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-stone-500 transition-colors hover:text-amber-400" />
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ────────────────────────── CTA STRIP ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] via-transparent to-rose-400/[0.08] p-10 text-center sm:p-16">
            <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-amber-400/90">
              03 — Contact
            </p>
            <h2 className="font-display mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-stone-100 sm:text-5xl">
              Have data? <span className="text-gradient">Let's make it talk.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-stone-400 sm:text-base">
              Ready to connect and discuss collaboration, career opportunities, or
              data-driven projects.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="btn-neon inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-amber-300"
                >
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-stone-200"
              >
                {profile.email}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
