import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { profile, impactPoints, skillGroups, marqueeSkills } from "@/data/portfolio";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";

export default function About() {
  return (
    <div className="pt-32">
      {/* header */}
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              Data Strategist ·{" "}
              <span className="text-primary">Insight Architect</span>
            </>
          }
          description={profile.tagline}
        />
      </section>

      {/* bio + portrait */}
      <section className="mx-auto mt-16 grid max-w-6xl gap-12 px-6 sm:px-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
              {profile.about}
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              My passion? Turning chaos into clarity — so leaders can act with
              confidence. Every dataset has a story; my job is to make it impossible
              to ignore.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2">
              {marqueeSkills.slice(0, 8).map((s) => (
                <TagChip key={s}>{s}</TagChip>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <figure>
            <img
              src={profile.aboutImage}
              alt="Bhaskar Pal"
              loading="lazy"
              className="aspect-[4/5] w-full grayscale transition-[filter] duration-500 hover:grayscale-0"
            />
            <figcaption className="mt-3 flex items-center justify-between font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              <span>{profile.name}</span>
              <span>{profile.location.split(",")[0]}</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* impact grid */}
      <section className="mx-auto max-w-6xl px-6 pt-24 sm:px-10">
        <SectionHeading eyebrow="Impact" title="How I create value" />
        <div className="mt-10 grid gap-px overflow-hidden border border-border sm:grid-cols-2 lg:grid-cols-3">
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
      </section>

      {/* skills */}
      <section className="mx-auto max-w-6xl px-6 pt-24 sm:px-10">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills, grouped by superpower"
          description="My toolkit includes a range of technologies and methodologies that empower me to deliver impactful data solutions."
        />
        <div className="mt-12 divide-y divide-border border-y border-border">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.04}>
              <div className="grid gap-4 py-7 md:grid-cols-[14rem_1fr] md:gap-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono2 text-[10px] tracking-[0.3em] text-muted-foreground">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {g.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <TagChip key={s}>{s}</TagChip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* next link */}
      <section className="mx-auto max-w-6xl px-6 pt-20 sm:px-10">
        <Reveal>
          <Link
            to="/experience"
            className="group flex items-center justify-between border-t border-border py-8"
          >
            <div>
              <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                Next up
              </p>
              <p className="font-display mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                Experience <span className="text-primary">timeline</span>
              </p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
