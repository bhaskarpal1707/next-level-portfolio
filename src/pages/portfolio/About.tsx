import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { profile, impactPoints, skillGroups, marqueeSkills } from "@/data/portfolio";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";
import TiltCard from "@/components/portfolio/TiltCard";

export default function About() {
  return (
    <div className="pt-28">
      {/* header */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              Data Strategist · <span className="text-gradient">Insight Architect</span>
            </>
          }
          description={profile.tagline}
        />
      </section>

      {/* bio + photo */}
      <section className="mx-auto mt-14 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="glass noise relative overflow-hidden rounded-3xl p-8 sm:p-10">
            <Quote className="absolute right-6 top-6 h-8 w-8 text-amber-400/20" />
            <p className="text-lg leading-relaxed text-stone-300">{profile.about}</p>
            <p className="mt-6 text-base leading-relaxed text-stone-400">
              My passion? Turning chaos into clarity — so leaders can act with
              confidence. Every dataset has a story; my job is to make it impossible
              to ignore.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {marqueeSkills.slice(0, 8).map((s) => (
                <TagChip key={s}>{s}</TagChip>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <TiltCard max={6} className="h-full">
            <div className="glass glass-hover relative h-full min-h-[22rem] overflow-hidden rounded-3xl">
              <img
                src={profile.aboutImage}
                alt="Bhaskar Pal"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-2xl px-5 py-4">
                  <div className="font-display text-lg font-semibold text-stone-100">
                    {profile.name}
                  </div>
                  <div className="mt-1 font-mono2 text-[11px] uppercase tracking-[0.28em] text-amber-400/80">
                    {profile.location}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </section>

      {/* impact grid */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="Impact" title="How I create value" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impactPoints.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <TiltCard className="h-full">
                <div className="glass glass-hover h-full rounded-2xl p-6">
                  <span className="font-mono2 text-2xl text-amber-400/90">{p.glyph}</span>
                  <h3 className="font-display mt-4 text-lg font-semibold text-stone-100">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">{p.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* skills constellation */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills, grouped by superpower"
          description="My toolkit includes a range of technologies and methodologies that empower me to deliver impactful data solutions."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass glass-hover h-full rounded-2xl p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono2 text-[10px] tracking-[0.3em] text-rose-300/70">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-semibold text-stone-100">
                    {g.title}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <TagChip key={s}>{s}</TagChip>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* next link */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <Link
            to="/experience"
            className="group flex items-center justify-between rounded-3xl border border-white/8 bg-white/[0.02] px-8 py-8 transition-colors duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.04]"
          >
            <div>
              <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-stone-500">
                Next up
              </p>
              <p className="font-display mt-2 text-2xl font-semibold text-stone-100 sm:text-3xl">
                Experience <span className="text-gradient">timeline</span>
              </p>
            </div>
            <ArrowRight className="h-6 w-6 text-amber-400 transition-transform duration-300 group-hover:transtone-x-2" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
