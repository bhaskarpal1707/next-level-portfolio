import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { profile, marqueeSkills, stats, projects, impactPoints, charts } from "@/data/portfolio";
import Marquee from "@/components/portfolio/Marquee";
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

export default function Home() {
  const role = useRotatingRole();

  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const others = projects.filter((p) => !p.featured).slice(0, 3);

  return (
    <div>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-24 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
        >
          Open to opportunities — <span className="text-primary">/ 2026</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-6 text-5xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-7xl"
        >
          <span className="block">BHASKAR</span>
          <span className="text-primary block">PAL</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          I turn raw numbers into growth catalysts — dashboards, insights, and ML
          that answer the questions leaders actually ask.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-mono2 text-sm text-muted-foreground"
        >
          <span className="text-primary">&gt;</span>{" "}
          <span className="type-caret text-foreground/80">{role}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-foreground"
          >
            Explore my work
            <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            className="link-sweep inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Let's connect
          </Link>
          <span className="flex items-center gap-2 font-mono2 text-xs tracking-widest text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            KOLKATA · IN
          </span>
        </motion.div>
      </section>

      {/* ─────────────────────── SKILL MARQUEE ─────────────────────── */}
      <section className="border-y border-border">
        <Marquee items={marqueeSkills} duration={44} />
      </section>

      {/* ────────────────────────── STATS ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="border-l border-border py-2 pl-5">
                <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  {s.value}
                  <span className="text-primary">{s.suffix}</span>
                </div>
                <div className="mt-2 font-mono2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ────────────────────────── ABOUT TEASER ────────────────────────── */}
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

      {/* ────────────────────── FEATURED PROJECTS ────────────────────── */}
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
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 transition-colors duration-300 sm:grid-cols-[3rem_1fr_10rem_7rem_2rem] sm:gap-6"
              >
                <span className="font-mono2 text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                    {p.title}
                  </span>
                  <span className="mt-1 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </span>
                </span>
                <span className="hidden font-mono2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
                  {p.category}
                </span>
                <span className="panel relative hidden aspect-[4/3] overflow-hidden sm:block">
                  <img
                    src={`https://opengraph.githubassets.com/1/${p.url.replace("https://github.com/", "")}`}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </span>
                <ArrowUpRight className="h-4 w-4 translate-y-0.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            </Reveal>
          ))}
        </div>

        {others.length > 0 && (
          <Reveal delay={0.1}>
            <p className="mt-6 font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Also — {others.map((p) => p.title).join(" · ")}
            </p>
          </Reveal>
        )}
      </section>

      {/* ────────────────────── ANALYTICS FIGURE ────────────────────── */}
      <section className="mx-auto max-w-6xl border-t border-border px-6 py-20 sm:px-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            eyebrow="Analytics about the analyst"
            title={
              <>
                I visualized <span className="text-primary">my own work</span>
              </>
            }
            description="My portfolio as a dataset — every chart below is generated by my own Python/matplotlib pipeline from my GitHub repos, and it auto-updates as I ship."
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

      {/* ────────────────────────── VIDEO ────────────────────────── */}
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

      {/* ────────────────────────── CTA STRIP ────────────────────────── */}
      <section className="mx-auto max-w-6xl border-t border-border px-6 py-24 text-center sm:px-10">
        <Reveal>
          <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            03 — Contact
          </p>
          <h2 className="font-display mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Have data? <span className="text-primary">Let's make it talk.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Ready to connect and discuss collaboration, career opportunities, or
            data-driven projects.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-foreground"
            >
              Get in touch
              <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="link-sweep text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {profile.email}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
