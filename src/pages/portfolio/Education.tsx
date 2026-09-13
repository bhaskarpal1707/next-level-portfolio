import { education } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";
import ScoreRing from "@/components/portfolio/ScoreRing";

/**
 * Education — a milestone ladder: a vertical track with year markers,
 * alternating cards on desktop, and animated score rings that draw the
 * CGPA/percentage when scrolled into view.
 */
export default function Education() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="06 — Education"
          title={
            <>
              The <span className="text-primary">training data</span>
            </>
          }
          description="Formal foundations — from board exams through computer applications, each milestone scored and verifiable via the linked mark sheets."
        />
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-16 sm:px-10">
        <div className="relative">
          {/* the track */}
          <span
            aria-hidden
            className="absolute left-[19px] top-0 h-full w-px bg-border md:left-1/2"
          />

          {education.map((ed, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={ed.degree} delay={i * 0.06} className="relative">
                <div
                  className={`relative mb-12 grid items-center gap-6 pl-14 md:grid-cols-2 md:gap-16 md:pl-0 ${
                    left ? "" : "md:[direction:rtl]"
                  }`}
                >
                  {/* node on the track */}
                  <span className="absolute left-[13px] top-1/2 z-10 grid h-3.5 w-3.5 -translate-y-1/2 place-items-center md:left-1/2 md:-translate-x-1/2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-primary/40" />
                    <span className="relative h-2 w-2 rounded-full bg-primary" />
                  </span>

                  {/* card */}
                  <div
                    className={`panel group p-6 transition-colors duration-300 hover:border-primary/40 [direction:ltr] ${
                      left ? "md:mr-10" : "md:ml-10"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
                        {ed.degree}
                      </h3>
                      <span className="shrink-0 font-mono2 text-[10px] tracking-[0.2em] text-primary">
                        {ed.period}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{ed.school}</p>

                    <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
                      <div className="font-mono2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {ed.scoreLabel} · {ed.score}
                      </div>
                      <a
                        href={ed.resultUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="link-sweep font-mono2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
                      >
                        View result ↗
                      </a>
                    </div>
                  </div>

                  {/* ring side */}
                  <div className={`[direction:ltr] ${left ? "md:pl-16" : "md:pr-16"}`}>
                    <div className="flex md:justify-center">
                      <ScoreRing score={ed.score} label={ed.scoreLabel} />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* footer note strip */}
        <Reveal>
          <div className="panel mt-4 flex flex-wrap items-center justify-between gap-3 px-5 py-4 font-mono2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>4 records · MCA → 10th</span>
            <span className="text-primary">avg. trajectory: upward ↗</span>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
