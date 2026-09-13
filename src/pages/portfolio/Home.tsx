import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Plus, MapPin } from "lucide-react";
import { FiGithub, FiLinkedin, FiArrowUpRight } from "react-icons/fi";
import {
  profile,
  marqueeSkills,
  stats,
  projects,
  impactPoints,
} from "@/data/portfolio";
import Marquee from "@/components/portfolio/Marquee";
import Magnetic from "@/components/portfolio/Magnetic";
import VideoShowcase from "@/components/portfolio/VideoShowcase";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";
import Socials from "@/components/portfolio/BrandIcons";
import heroBg from "@/assets/hero-bg.jpg";

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

/** Count-up that runs when scrolled into view. */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setFired(true),
      { rootMargin: "-60px" },
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref]);

  useEffect(() => {
    if (!fired) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fired, to]);

  return (
    <div ref={setRef}>
      {n}
      <span className="text-grad">{suffix}</span>
    </div>
  );
}

export default function Home() {
  const role = useRotatingRole();
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const others = projects.filter((p) => !p.featured).slice(0, 3);
  const aboutRef = useRef<HTMLElement>(null);

  return (
    <div>
      {/* ══════════════════ HERO — old-site backdrop, gradient type ══════════════════ */}
      <section className="relative overflow-hidden">
        {/* old portfolio landing background, softly dimmed into the ink theme */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center opacity-[0.16] [mask-image:linear-gradient(180deg,black_45%,transparent)]"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div
          aria-hidden
          className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#f59e0b]/10 blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#a855f7]/10 blur-[120px]"
        />

        <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-center px-6 py-24 sm:px-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
          >
            Open to opportunities · <span className="text-grad font-semibold">/ 2026</span>
          </motion.p>

          <h1 className="font-display mt-7 font-semibold leading-[0.95] tracking-[-0.03em]">
            {["BHASKAR", "PAL"].map((word, wi) => (
              <span key={word} className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.08 + wi * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`block text-6xl sm:text-8xl lg:text-9xl ${
                    wi === 1 ? "text-grad" : "text-foreground"
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I turn raw numbers into{" "}
            <span className="text-grad font-medium">growth catalysts</span> — dashboards,
            insights, and ML that answer the questions leaders actually ask.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="mt-5 font-mono2 text-sm text-muted-foreground"
          >
            <span className="text-grad">&gt;</span>{" "}
            <span className="type-caret text-foreground/80">{role}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Magnetic>
              <Link
                to="/projects"
                className="btn-primary group inline-flex items-center gap-2 rounded-md px-5 py-3 font-display text-sm font-semibold text-foreground"
              >
                Explore the work
                <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-md px-5 py-3 font-display text-sm font-semibold text-foreground"
              >
                Resume ↗
              </a>
            </Magnetic>
            <Link
              to="/contact"
              className="link-sweep text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Let's connect
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <Socials />
            <span className="h-4 w-px bg-border" aria-hidden />
            <span className="flex items-center gap-2 font-mono2 text-xs tracking-widest text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              KOLKATA, IN
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ SKILL MARQUEE ══════════════════ */}
      <section className="border-y border-border">
        <Marquee items={marqueeSkills} duration={44} />
      </section>

      {/* ══════════════════ DATA STRIP — counted stats ══════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="h-full bg-background p-6">
                <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════ 01 ABOUT — restructured 3D exhibit ══════════════════ */}
      <section
        ref={aboutRef}
        className="mx-auto max-w-6xl border-t border-border px-6 py-24 sm:px-10"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* exhibit first on desktop */}
          <Reveal className="scene3d order-1 lg:order-none">
            <div
              className="tilt-card panel relative mx-auto max-w-sm overflow-hidden rounded-lg"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                el.style.setProperty("--rx", `${(-py * 12).toFixed(2)}deg`);
                el.style.setProperty("--ry", `${(px * 14).toFixed(2)}deg`);
                el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(0)}%`);
                el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(0)}%`);
              }}
            >
              <img
                src={profile.aboutImage}
                alt="Bhaskar Pal — data analyst"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              {/* gradient scan line */}
              <motion.span
                aria-hidden
                className="bg-grad absolute inset-x-0 h-px opacity-80"
                animate={{ top: ["8%", "92%", "8%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/95 to-transparent px-4 pb-3 pt-10 font-mono2 text-[10px] uppercase tracking-[0.25em]">
                <span className="text-foreground">{profile.name}</span>
                <span className="text-grad font-semibold">DATA ANALYST</span>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="01 — About"
              title={
                <>
                  Chaos in, <span className="text-grad">clarity out.</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-foreground/90 sm:text-lg">
                {profile.about}
              </p>
            </Reveal>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {impactPoints.slice(0, 4).map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div className="tilt-card panel h-full rounded-lg p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono2 text-[10px] tracking-[0.3em] text-muted-foreground">
                        0{i + 1}
                      </span>
                      <span className="text-grad font-semibold">{p.glyph}</span>
                    </div>
                    <h3 className="font-display mt-3 text-sm font-semibold text-foreground">
                      {p.title}
                    </h3>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <Link
                to="/about"
                className="link-sweep mt-8 inline-flex items-center gap-2 font-mono2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
              >
                More about me →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════ 02 FEATURED WORK — 3D cards, both links ══════════════════ */}
      <section className="mx-auto max-w-6xl border-t border-border px-6 py-24 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="02 — Selected projects"
            title={
              <>
                Work that <span className="text-grad">answered back</span>
              </>
            }
          />
          <Reveal delay={0.15}>
            <Link
              to="/projects"
              className="link-sweep font-mono2 text-xs tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              VIEW ALL {projects.length} →
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={Math.min(0.25, i * 0.05)}>
              <article className="tilt-card panel group flex h-full flex-col overflow-hidden rounded-lg">
                <div className="block aspect-[16/9] overflow-hidden border-b border-border">
                  <img
                    src={p.image}
                    alt={`${p.title} — repository preview`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-foreground">
                      {p.title}
                    </h3>
                    <span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-primary">
                      ★ Featured
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {p.tags[0]}
                    </span>
                    <span className="flex items-center gap-2">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} on GitHub`}
                        className="grid h-8 w-8 place-items-center border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                      >
                        <FiGithub className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={p.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.title} on LinkedIn`}
                        className="grid h-8 w-8 place-items-center border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                      >
                        <FiLinkedin className="h-3.5 w-3.5" />
                      </a>
                      <FiArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {others.length > 0 && (
          <Reveal delay={0.1}>
            <p className="mt-6 font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Also in the library — {others.map((p) => p.title).join(" · ")}
            </p>
          </Reveal>
        )}
      </section>

      {/* ══════════════════ REEL — cinematic expand on click ══════════════════ */}
      <section className="mx-auto max-w-5xl border-t border-border px-6 py-24 sm:px-10">
        <SectionHeading
          eyebrow="Reel"
          title={
            <>
              Meet me in <span className="text-grad">motion</span>
            </>
          }
          description="Click the frame — it expands full-screen, then scroll to glide through the story. Press Esc or ✕ to return."
          align="center"
        />
        <div className="mt-10">
          <VideoShowcase />
        </div>
      </section>

      {/* ══════════════════ CTA — dashed "add record" tile ══════════════════ */}
      <section className="mx-auto max-w-6xl border-t border-border px-6 py-24 sm:px-10">
        <Reveal>
          <Link
            to="/contact"
            className="tile-dashed group mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 rounded-lg px-8 py-16 text-center"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-primary/60">
              <Plus className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
            </span>
            <span className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Have data? <span className="text-grad">Let's make it talk.</span>
            </span>
            <span className="mt-2 inline-flex items-center gap-2 font-mono2 text-xs tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-foreground">
              OPEN CONTACT →
            </span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
