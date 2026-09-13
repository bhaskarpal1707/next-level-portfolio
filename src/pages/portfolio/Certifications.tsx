import { ArrowUpRight } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";

export default function Certifications() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Certifications"
          title={
            <>
              Verified, <span className="text-primary">always learning</span>
            </>
          }
          description="A curated collection of verified professional certifications from reputable platforms — dedication to continuous learning and validated expertise across technical and professional skills."
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14 sm:px-10">
        <div className="divide-y divide-border border-y border-border">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.04}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 transition-colors duration-300 sm:grid-cols-[3rem_1fr_12rem_5rem_2rem] sm:gap-6"
              >
                <span className="font-mono2 text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-display text-base font-semibold text-foreground transition-colors group-hover:text-primary sm:text-lg">
                    {c.title}
                  </span>
                </span>
                <span className="hidden font-mono2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
                  {c.issuer}
                </span>
                <span className="text-right font-mono2 text-[11px] tracking-[0.2em] text-muted-foreground sm:text-left">
                  {c.year}
                </span>
                <ArrowUpRight className="hidden h-4 w-4 translate-y-0.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Full credential links available on LinkedIn → /in/bhaskar-pal-2k02
          </p>
        </Reveal>
      </section>
    </div>
  );
}
