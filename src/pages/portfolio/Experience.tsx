import { experiences } from "@/data/portfolio";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";

/**
 * Minimal editorial resume layout: each internship is a dated index row
 * separated by hairlines — no cards, no timeline rail.
 */
export default function Experience() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Research-grade <span className="text-primary">milestones</span>
            </>
          }
          description="Internships across the Indian Statistical Institute ecosystem — speech recognition research, computer-vision annotation pipelines, and deep learning experimentation."
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14 sm:px-10">
        <div className="divide-y divide-border border-y border-border">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role + exp.period} delay={i * 0.05}>
              <article className="grid gap-6 py-10 md:grid-cols-[11rem_1fr] md:gap-10">
                {/* left meta column */}
                <div className="md:pt-1.5">
                  <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {exp.period}
                  </p>
                  <p className="mt-2 font-mono2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(experiences.length).padStart(2, "0")}
                  </p>
                </div>

                {/* right content column */}
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {exp.role}
                  </h3>
                  <a
                    href={exp.orgUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-sweep mt-2 inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {exp.org} ↗
                  </a>

                  <ul className="mt-6 max-w-3xl space-y-3">
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

                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <TagChip key={t}>{t}</TagChip>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
