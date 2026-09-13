import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { experiences } from "@/data/portfolio";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";

export default function Experience() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Research-grade <span className="text-gradient">milestones</span>
            </>
          }
          description="Internships across the Indian Statistical Institute ecosystem — speech recognition research, computer-vision annotation pipelines, and deep learning experimentation."
        />
      </section>

      <section className="mx-auto max-w-4xl px-4 pt-16 sm:px-6">
        <div className="relative">
          {/* vertical rail */}
          <div className="timeline-line absolute bottom-4 left-[15px] top-2 w-px sm:left-[19px]" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <Reveal key={exp.role + exp.period} delay={i * 0.08}>
                <div className="relative pl-12 sm:pl-16">
                  {/* node */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 300, damping: 18 }}
                    className="absolute left-0 top-1.5 grid h-8 w-8 place-items-center rounded-full border border-amber-400/50 bg-[#14110c] sm:h-10 sm:w-10"
                  >
                    <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(94,234,212,0.9)]" />
                  </motion.span>

                  <div className="glass glass-hover noise relative overflow-hidden rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-stone-100 sm:text-2xl">
                          {exp.role}
                        </h3>
                        <a
                          href={exp.orgUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-2 text-sm text-amber-400/90 transition-colors hover:text-amber-300"
                        >
                          <Building2 className="h-3.5 w-3.5" />
                          {exp.org}
                        </a>
                      </div>
                      <span className="glass rounded-full px-4 py-1.5 font-mono2 text-[11px] tracking-[0.18em] text-amber-300/90">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {exp.points.map((pt, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed text-stone-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-400/70" />
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
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
