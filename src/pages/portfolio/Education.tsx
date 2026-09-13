import { motion } from "framer-motion";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";

export default function Education() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              The <span className="text-gradient">learning graph</span>
            </>
          }
          description="From boards to master's — every step compounded. Click through to verify any result."
        />
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((ed, i) => (
            <Reveal key={ed.degree} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass glass-hover noise relative h-full overflow-hidden rounded-2xl p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <span className="font-mono2 text-[10px] tracking-[0.3em] text-stone-500">
                    {String(education.length - i).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-display mt-6 text-xl font-semibold leading-snug text-stone-100">
                  {ed.degree}
                </h3>
                <p className="mt-1.5 text-sm text-stone-400">{ed.school}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="glass rounded-full px-4 py-1.5 font-mono2 text-[11px] tracking-[0.15em] text-amber-300/90">
                    {ed.period}
                  </span>
                  <span className="font-mono2 text-[11px] tracking-[0.15em] text-stone-500">
                    {ed.scoreLabel}:{" "}
                    <span className="stat-glow font-display text-sm font-bold text-amber-400">
                      {ed.score}
                    </span>
                  </span>
                </div>

                <a
                  href={ed.resultUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-7 inline-flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.25em] text-stone-400 transition-colors hover:text-amber-400"
                >
                  View result
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-transtone-y-0.5 group-hover:transtone-x-0.5" />
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
