import { experiences, versions } from "@/data/portfolio";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";
import ExperienceRoadmap from "@/components/portfolio/ExperienceRoadmap";

/**
 * The Timeline — a storytelling journey: an animated SVG roadmap
 * (V1 → V3 stations light up as the ember path draws), followed by the
 * full detail rows. Old-portfolio bullets preserved verbatim.
 */
export default function Experience() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="05 — Experience · The Journey"
          title={
            <>
              Where the models <span className="text-primary">were trained</span>
            </>
          }
          description="Three stations across the Indian Statistical Institute ecosystem — deep-learning ASR foundations, computer-vision annotation pipelines, and speech-recognition research."
        />
      </section>

      {/* ── storytelling roadmap ── */}
      <section className="mx-auto max-w-6xl px-6 pt-14 sm:px-10">
        <Reveal>
          <div className="panel relative p-6 sm:p-8">
            <div className="mb-4 flex items-center justify-between font-mono2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="text-primary">journey_log.csv</span>
              <span>2025 → 2026 · ISI ecosystem</span>
            </div>
            <ExperienceRoadmap />
          </div>
        </Reveal>

        {/* journey stats */}
        <div className="mt-6 grid grid-cols-2 gap-px border border-border sm:grid-cols-4">
          {[
            { v: "3", l: "Stations" },
            { v: "26+", l: "Weeks in research labs" },
            { v: "2", l: "Domains — speech & vision" },
            { v: "15+", l: "Tools across the road" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05}>
              <div className="h-full bg-background p-5">
                <div className="font-display text-2xl font-semibold">{s.v}</div>
                <div className="mt-1 font-mono2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── full version rows ── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 sm:px-10">
        <div className="border-t border-border">
          {versions.map((v, i) => {
            const exp = experiences[i]; // undefined for the A0 base layer
            return (
              <Reveal key={v.tag} delay={i * 0.05}>
                <article className="row-hover grid gap-5 border-b border-border py-10 md:grid-cols-[9rem_1fr] md:gap-10">
                  {/* version tag */}
                  <div className="md:pt-1.5">
                    <span className="font-mono2 text-sm font-medium tracking-[0.12em] text-primary">
                      {v.tag}
                    </span>
                  </div>

                  {/* content */}
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {v.orgUrl ? (
                        <a href={v.orgUrl} target="_blank" rel="noreferrer" className="link-sweep">
                          {v.org} ↗
                        </a>
                      ) : (
                        v.org
                      )}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {v.role}
                      {v.period && (
                        <span className="text-muted-foreground/60"> · {v.period}</span>
                      )}
                    </p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">
                      {v.note}
                    </p>

                    {exp && (
                      <>
                        <ul className="mt-5 max-w-3xl space-y-2.5">
                          {exp.points.map((pt, j) => (
                            <li
                              key={j}
                              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                            >
                              <span className="mt-2.5 h-px w-4 shrink-0 bg-border" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {exp.tags.map((t) => (
                            <TagChip key={t}>{t}</TagChip>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
