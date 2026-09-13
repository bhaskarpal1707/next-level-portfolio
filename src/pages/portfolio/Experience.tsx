import { experiences, versions } from "@/data/portfolio";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";

/**
 * The Timeline — experience presented as file versions (V3 → V1, plus the
 * A0 base layer), after the "design file" convention. Full bullet detail
 * from the old portfolio is preserved inside each version row.
 */
export default function Experience() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="05 — Experience · The Timeline"
          title={
            <>
              Where the models <span className="text-primary">were trained</span>
            </>
          }
          description="Internships across the Indian Statistical Institute ecosystem — speech recognition research, computer-vision annotation pipelines, and deep learning experimentation."
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14 sm:px-10">
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
                        <a
                          href={v.orgUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="link-sweep"
                        >
                          {v.org} ↗
                        </a>
                      ) : (
                        v.org
                      )}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {v.role}
                      {v.period && <span className="text-muted-foreground/60"> · {v.period}</span>}
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
