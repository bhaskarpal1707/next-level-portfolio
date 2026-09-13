import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { profile, marqueeSkills, stats, projects, impactPoints } from "@/data/portfolio";
import Marquee from "@/components/portfolio/Marquee";
import Magnetic from "@/components/portfolio/Magnetic";
import TiltCard from "@/components/portfolio/TiltCard";
import Parallax from "@/components/portfolio/Parallax";
import CountUp from "@/components/portfolio/CountUp";
import VideoShowcase from "@/components/portfolio/VideoShowcase";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";
import portrait from "@/assets/bhaskar-portrait.jpg";

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
        t = setTimeout(() => setPhase("holding"), 1500);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), 450);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(word.slice(0, text.length - 1)), 32);
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
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroFade = useTransform(scrollY, [0, 500], [1, 0.15]);

  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const others = projects.filter((p) => !p.featured).slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col justify-center px-4 pt-24 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          {/* text column */}
          <motion.div style={{ y: heroY, opacity: heroFade }}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-300" />
              </span>
              <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-sky-200/90">
                Open to opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-6 text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl"
            >
              <span className="block text-slate-100">BHASKAR</span>
              <span className="text-gradient block">PAL</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              I turn raw numbers into{" "}
              <span className="text-slate-100">growth catalysts</span> — dashboards,
              insights, and ML that answer the questions leaders actually ask.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-mono2 text-sm text-slate-500"
            >
              <span className="text-sky-300">&gt;</span>{" "}
              <span className="type-caret text-slate-300">{role}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <Magnetic>
                <Link
                  to="/projects"
                  className="btn-neon group inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold text-sky-200 transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(56,189,248,0.35)]"
                >
                  Explore my work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/contact"
                  className="glass glass-hover inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold text-slate-200"
                >
                  <Sparkles className="h-4 w-4 text-fuchsia-300" />
                  Let's connect
                </Link>
              </Magnetic>
              <span className="flex items-center gap-2 font-mono2 text-xs tracking-widest text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-sky-300/70" />
                KOLKATA · IN
              </span>
            </motion.div>
          </motion.div>

          {/* portrait column — parallax + tilt + gradient ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xs lg:max-w-sm"
          >
            <Parallax distance={36}>
              <TiltCard max={10}>
                <div className="conic-border relative rounded-[2rem] p-[1.5px]">
                  <div className="noise relative overflow-hidden rounded-[calc(2rem-1.5px)] border border-white/10 bg-[#0a0c13]">
                    <img
                      src={portrait}
                      alt="Bhaskar Pal"
                      className="aspect-[4/5] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080d]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div>
                        <p className="font-display text-sm font-semibold text-white">
                          {profile.name}
                        </p>
                        <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-sky-300/90">
                          {profile.roles[0]}
                        </p>
                      </div>
                      <span className="flex h-2.5 w-2.5">
                        <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-300 opacity-60" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Parallax>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-600/50 p-1.5">
            <motion.span
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-sky-300"
            />
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────── SKILL MARQUEE ─────────────────────── */}
      <section className="border-y border-white/5">
        <Marquee items={marqueeSkills} duration={44} />
        <Marquee items={[...marqueeSkills].reverse()} duration={48} reverse />
      </section>

      {/* ────────────────────────── STATS ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass glass-hover noise relative overflow-hidden rounded-2xl p-6">
                <CountUp
                  to={s.value}
                  suffix={s.suffix}
                  className="font-display text-gradient stat-glow text-4xl font-bold sm:text-5xl"
                />
                <div className="mt-2 font-mono2 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ────────────────────────── VIDEO ────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <SectionHeading
          eyebrow="Reel"
          title={
            <>
              Meet me in <span className="text-gradient">motion</span>
            </>
          }
          align="center"
        />
        <div className="mt-9">
          <VideoShowcase />
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
                    <span className="font-mono2 text-2xl text-sky-300/90">{p.glyph}</span>
                    <span className="font-mono2 text-[10px] tracking-[0.3em] text-slate-600">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold text-slate-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
          <Reveal delay={0.35}>
            <Link
              to="/about"
              className="group flex h-full min-h-[10rem] flex-col justify-between rounded-2xl border border-dashed border-sky-300/30 bg-sky-300/[0.04] p-6 transition-colors duration-300 hover:border-sky-300/60 hover:bg-sky-300/[0.08]"
            >
              <p className="font-display text-lg font-semibold text-sky-200">
                More about the journey
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-mono2 text-xs tracking-widest text-sky-300/80">
                GO TO ABOUT
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
              className="group inline-flex items-center gap-2 font-mono2 text-xs tracking-[0.25em] text-sky-300/90 transition-colors hover:text-sky-200"
            >
              VIEW ALL PROJECTS
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
                      <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-indigo-300/80">
                        {p.category}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-slate-600 transition-colors group-hover:text-sky-300" />
                    </div>
                    <h3 className="font-display mt-6 text-xl font-semibold leading-snug text-slate-100">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
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
                    <div className="font-display text-sm font-semibold text-slate-200">
                      {p.title}
                    </div>
                    <div className="mt-1 font-mono2 text-[10px] uppercase tracking-[0.25em] text-slate-500">
                      {p.category} · {p.year}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-500 transition-colors hover:text-sky-300" />
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ────────────────────────── CTA STRIP ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-3xl border border-sky-300/20 bg-gradient-to-br from-sky-400/[0.08] via-transparent to-fuchsia-400/[0.08] p-10 text-center sm:p-16">
            <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-sky-300/90">
              03 — Contact
            </p>
            <h2 className="font-display mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-slate-100 sm:text-5xl">
              Have data? <span className="text-gradient">Let's make it talk.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 sm:text-base">
              Ready to connect and discuss collaboration, career opportunities, or
              data-driven projects.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="btn-neon inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-sky-200"
                >
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="glass glass-hover inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-slate-200"
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
