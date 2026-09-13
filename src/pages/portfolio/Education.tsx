import { ArrowUpRight } from "lucide-react";
import { education } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";

export default function Education() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              The <span className="text-primary">learning graph</span>
            </>
          }
          description="From boards to master's — every step compounded. Click through to verify any result."
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14 sm:px-10">
        <div className="divide-y divide-border border-y border-border">
          {education.map((ed, i) => (
            <Reveal key={ed.degree} delay={i * 0.05}>
              <a
                href={ed.resultUrl}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-7 transition-colors duration-300 sm:grid-cols-[3rem_1fr_12rem_2rem] sm:gap-6"
              >
                <span className="font-mono2 text-xs text-muted-foreground">
                  {String(education.length - i).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                    {ed.degree}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {ed.school} · {ed.period}
                  </span>
                </span>
                <span className="text-right font-mono2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {ed.scoreLabel}{" "}
                  <span className="font-display text-base font-semibold text-foreground">
                    {ed.score}
                  </span>
                </span>
                <ArrowUpRight className="hidden h-4 w-4 translate-y-0.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            All scores verified — view result opens the official document ↗
          </p>
        </Reveal>
      </section>
    </div>
  );
}
