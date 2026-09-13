import { motion } from "framer-motion";
import { profile, impactPoints, stats } from "@/data/portfolio";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";
import Socials from "@/components/portfolio/BrandIcons";

/**
 * About — the portrait presented as an "exhibit": the photo sits on a
 * hairline plate with frame ticks, a scanning ember line, and a caption
 * rail, echoing the old portfolio's photo but with the data-file chrome.
 */
export default function About() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="01 — About"
          title={
            <>
              Chaos in, <span className="text-primary">clarity out</span>
            </>
          }
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* ── image showcase ── */}
          <Reveal>
            <figure className="relative">
              {/* frame ticks */}
              <span className="absolute -left-3 -top-3 h-5 w-5 border-l border-t border-primary/60" />
              <span className="absolute -right-3 -top-3 h-5 w-5 border-r border-t border-primary/60" />
              <span className="absolute -bottom-3 -left-3 h-5 w-5 border-b border-l border-primary/60" />
              <span className="absolute -bottom-3 -right-3 h-5 w-5 border-b border-r border-primary/60" />

              <div
                className="tilt-card panel relative overflow-hidden"
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const r = el.getBoundingClientRect();
                  const px = (e.clientX - r.left) / r.width - 0.5;
                  const py = (e.clientY - r.top) / r.height - 0.5;
                  el.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
                  el.style.setProperty("--ry", `${(px * 12).toFixed(2)}deg`);
                  el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(0)}%`);
                  el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(0)}%`);
                }}
              >
                <motion.img
                  src={profile.aboutImage}
                  alt="Bhaskar Pal — data analyst"
                  loading="lazy"
                  initial={{ scale: 1.06, filter: "grayscale(1)" }}
                  whileInView={{ scale: 1, filter: "grayscale(0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-[4/5] w-full object-cover"
                />
                {/* scanning line — gradient sweep */}
                <motion.span
                  aria-hidden
                  className="bg-grad absolute inset-x-0 h-px"
                  initial={{ top: "0%", opacity: 0 }}
                  whileInView={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, delay: 0.4, ease: "easeInOut" }}
                />
                {/* corner meta */}
                <span className="absolute left-3 top-3 bg-background/80 px-2 py-1 font-mono2 text-[9px] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur-sm">
                  IMG · bhaskar_about.jpg
                </span>
              </div>

              <figcaption className="mt-3 flex items-center justify-between font-mono2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span>{profile.name}</span>
                <span className="text-primary">● RECORDING ANALYST</span>
                <span>KOLKATA, IN</span>
              </figcaption>

              {/* stat chips pinned to the exhibit */}
              <div className="mt-6 grid grid-cols-2 gap-px border border-border">
                {stats.slice(0, 4).map((s) => (
                  <div key={s.label} className="bg-background p-4">
                    <div className="font-display text-2xl font-semibold">
                      {s.value}
                      <span className="text-primary">{s.suffix}</span>
                    </div>
                    <div className="mt-1 font-mono2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </figure>
          </Reveal>

          {/* ── prose + impact ── */}
          <div>
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                {profile.about}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Currently researching multilingual speech recognition at the Indian
                Statistical Institute, and building dashboards, pipelines, and ML
                experiments that make numbers answer real business questions. The toolkit
                spans SQL, Python, Power BI, and a growing bench of deep-learning work.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Socials />
              </div>
            </Reveal>

            <div className="mt-10 grid gap-px overflow-hidden border border-border sm:grid-cols-2">
              {impactPoints.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.05}>
                  <div className="group h-full bg-background p-6 transition-colors duration-300 hover:bg-muted">
                    <div className="flex items-center justify-between">
                      <span className="font-mono2 text-[10px] tracking-[0.3em] text-muted-foreground">
                        0{i + 1}
                      </span>
                      <span className="text-primary/70 transition-colors group-hover:text-primary">
                        {p.glyph}
                      </span>
                    </div>
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

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Python", "SQL", "Power BI", "PyTorch", "scikit-learn", "Excel"].map(
                  (t) => (
                    <TagChip key={t}>{t}</TagChip>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
