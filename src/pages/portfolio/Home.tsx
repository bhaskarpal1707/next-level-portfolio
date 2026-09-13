import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin, Plus } from "lucide-react";
import {
  profile,
  fileMeta,
  marqueeSkills,
  stats,
  projects,
  impactPoints,
  charts,
} from "@/data/portfolio";
import Marquee from "@/components/portfolio/Marquee";
import Magnetic from "@/components/portfolio/Magnetic";
import VideoShowcase from "@/components/portfolio/VideoShowcase";
import Figure from "@/components/portfolio/Figure";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";

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
      <span className="text-primary">{suffix}</span>
    </div>
  );
}

export default function Home() {
  const role = useRotatingRole();
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const others = projects.filter((p) => !p.featured).slice(0, 3);

  return (
    <div>
      {/* ══════════════════ LAYERED INTRO — file chrome ══════════════════ */}
      <section className="mx-auto max-w-6xl px-6 pt-28 sm:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 font-mono2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="text-primary">{fileMeta.filename}</span>
            <span className="hidden sm:inline">{fileMeta.dims}</span>
            <span className="hidden md:inline">{fileMeta.depth}</span>
            <span>{fileMeta.updated}</span>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════ HERO — clipped reveal, type-led ══════════════════ */}
      <section className="mx-auto flex min-h-[88svh] max-w-6xl flex-col justify-center px-6 pb-16 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
        >
          Layer 00 — Open to opportunities · <span className="text-primary">/ 2026</span>
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
                  wi === 1 ? "text-primary" : ""
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
          <span className="text-foreground">growth catalysts</span> — dashboards,
          insights, and ML that answer the questions leaders actually ask.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.52 }}
          className="mt-5 font-mono2 text-sm text-muted-foreground"
        >
          <span className="text-primary">&gt;</span>{" "}
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
          <Link
            to="/contact"
            className="link-sweep text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Let's connect
          </Link>
          <span className="flex items-center gap-2 font-mono2 text-xs tracking-widest text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {fileMeta.city}
          </span>
        </motion.div>
      </section>

      {/* ══════════════════ SKILL MARQUEE ══════════════════ */}
      <section className="border-y border-border">
        <Marquee items={marqueeSkills} duration={44} />
      </section>

      {/* ══════════════════ DATA STRIP — counted stats ══════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="border-l border-border py-2 pl-5">
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

      {/* ══════════════════ 01 ABOUT — prose + portrait ══════════════════ */}
      <section className="mx-auto max-w-6xl border-t border-border px-6 py-20 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="01 — About"
              title={
                <>
                  Chaos in,
                  <br />
                  <span className="text-primary">clarity out</span>
                </>
              }
            />
            <Reveal delay={0.12}>
              <figure className="mt-10 hidden max-w-xs lg:block">
                <img
                  src={profile.aboutImage}
                  alt="Bhaskar Pal"
                  loading="lazy"
                  className="aspect-[4/5] w-full grayscale transition-[filter] duration-500 hover:grayscale-0"
                />
                <figcaption className="mt-3 flex items-center justify-between font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span>{profile.name}</span>
                  <span>KOLKATA</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                {profile.about}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-px overflow-hidden border border-border sm:grid-cols-2">
              {impactPoints.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div className="h-full bg-background p-6 transition-colors duration-300 hover:bg-muted">
                    <span className="font-mono2 text-[10px] tracking-[0.3em] text-muted-foreground">
                      0{i + 1}
                    </span>
                    <h3 className="font-display mt-3 text-base font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ 02 FEATURED WORK — hover reveals ══════════════════ */}
      <section className="mx-auto max-w-6xl border-t border-border px-6 py-20 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="02 — Featured work"
            title={
              <>
                Selected <span className="text-primary">projects</span>
              </>
            }
          />
          <Reveal delay={0.15}>
            <Link
              to="/projects"
              className="link-sweep font-mono2 text-xs tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              VIEW ALL PROJECTS →
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="row-hover group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 sm:grid-cols-[3rem_1fr_10rem_2rem] sm:gap-6"
              >
                <span className="font-mono2 text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                    {p.title}
                  </span>
                  <span className="mt-1 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </span>
                  {/* mobile: inline thumbnail */}
                  <span className="panel mt-3 block aspect-[16/9] overflow-hidden sm:hidden">
                    <img
                      src={`https://opengraph.githubassets.com/1/${p.url.replace("https://github.com/", "")}`}
                      alt={`${p.title} preview`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </span>
                </span>
                <span className="hidden font-mono2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
                  {p.category}
                </span>
                <ArrowUpRight className="h-4 w-4 translate-y-0.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            </Reveal>
          ))}
        </div>

        {others.length > 0 && (
          <Reveal delay={0.1}>
            <p className="mt-6 font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Also in the file — {others.map((p) => p.title).join(" · ")}
            </p>
          </Reveal>
        )}
      </section>

      {/* ══════════════════ ANALYTICS FIGURES ══════════════════ */}
      <section className="mx-auto max-w-6xl border-t border-border px-6 py-20 sm:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            eyebrow="Analytics about the analyst"
            title={
              <>
                I visualized <span className="text-primary">my own work</span>
              </>
            }
            description="My portfolio as a dataset — every chart is generated by my own Python/matplotlib pipeline from my GitHub repos, auto-updated as I ship."
          />
          <Reveal delay={0.1}>
            <Link
              to="/charts"
              className="link-sweep font-mono2 text-xs tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              VIEW FULL GALLERY →
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Figure
              src={charts[0].src}
              alt={charts[0].alt}
              index="01"
              caption={charts[0].caption}
              source="PYTHON · MATPLOTLIB"
              ratio="aspect-[4/3]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Figure
              src={charts[1].src}
              alt={charts[1].alt}
              index="02"
              caption={charts[1].caption}
              source="PYTHON · MATPLOTLIB"
              ratio="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════ REEL ══════════════════ */}
      <section className="mx-auto max-w-4xl border-t border-border px-6 py-20 sm:px-10">
        <SectionHeading
          eyebrow="Reel"
          title={
            <>
              Meet me in <span className="text-primary">motion</span>
            </>
          }
          align="center"
        />
        <div className="mt-10">
          <VideoShowcase />
        </div>
      </section>

      {/* ══════════════════ CTA — dashed "new file" tile ══════════════════ */}
      <section className="mx-auto max-w-6xl border-t border-border px-6 py-24 sm:px-10">
        <Reveal>
          <Link
            to="/contact"
            className="tile-dashed group mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 px-8 py-16 text-center"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors duration-300 group-hover:border-primary/60">
              <Plus className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
            </span>
            <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              new_project.csv — 0 rows, ∞ possibilities
            </span>
            <span className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Have data? <span className="text-primary">Let's make it talk.</span>
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
