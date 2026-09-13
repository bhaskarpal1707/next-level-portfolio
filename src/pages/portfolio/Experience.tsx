import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2 } from "lucide-react";
import { experiences } from "@/data/portfolio";
import { SectionHeading, TagChip } from "@/components/portfolio/Primitives";

/**
 * Sticky stacking cards: each internship card pins under the header and the
 * next one scrolls up over it — with a subtle scale + dim on the buried card.
 */
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

      <section className="mx-auto max-w-4xl px-4 pt-14 sm:px-6">
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <StackCard key={exp.role + exp.period} index={i} total={experiences.length}>
              <div className="glass noise relative overflow-hidden rounded-3xl p-7 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-slate-500">
                      {String(i + 1).padStart(2, "0")} · {exp.period}
                    </p>
                    <h3 className="font-display mt-3 text-2xl font-semibold text-slate-100 sm:text-3xl">
                      {exp.role}
                    </h3>
                    <a
                      href={exp.orgUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2.5 inline-flex items-center gap-2 text-sm text-sky-300/90 transition-colors hover:text-sky-200"
                    >
                      <Building2 className="h-3.5 w-3.5" />
                      {exp.org}
                    </a>
                  </div>
                </div>

                <ul className="mt-7 space-y-3">
                  {exp.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-300/70" />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <TagChip key={t}>{t}</TagChip>
                  ))}
                </div>
              </div>
            </StackCard>
          ))}
        </div>
      </section>
    </div>
  );
}

function StackCard({
  children,
  index,
  total,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // buried cards sink back and dim as the next card covers them
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["brightness(1)", "brightness(0.55)"],
  );

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `calc(6.5rem + ${index * 1.5}rem)` }}
      data-stack-total={total}
    >
      <motion.div style={{ scale, filter }}>{children}</motion.div>
    </div>
  );
}
