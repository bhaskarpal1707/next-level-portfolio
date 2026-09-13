import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";
import TiltCard from "@/components/portfolio/TiltCard";

const categories = [...projectCategories] as string[];

export default function Projects() {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set("All", projects.length);
    for (const p of projects) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  return (
    <div className="pt-28">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              The <span className="text-gradient">archive</span>
            </>
          }
          description="Explore my categorized projects — practical skills in problem-solving, analytics, and turning complex data into clear, impactful results across domains."
        />
      </section>

      {/* filter bar */}
      <section className="sticky top-16 z-30 mt-10 bg-[#0b0a08]/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative rounded-full px-4 py-2 font-mono2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive ? "text-[#1c1408]" : "text-stone-400 hover:text-stone-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-amber-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    {c}
                    <span className={isActive ? "ml-1.5 opacity-60" : "ml-1.5 opacity-50"}>
                      {counts.get(c) ?? 0}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* grid */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p: Project) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <a href={p.url} target="_blank" rel="noreferrer" className="block h-full">
                  <TiltCard className="h-full">
                    <article className="glass glass-hover flex h-full flex-col rounded-2xl p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-rose-300/80">
                          {p.category}
                        </span>
                        <span className="flex items-center gap-2 font-mono2 text-[10px] tracking-[0.2em] text-stone-500">
                          {p.year}
                          <ExternalLink className="h-3.5 w-3.5 transition-colors group-hover:text-amber-400" />
                        </span>
                      </div>
                      <h3 className="font-display mt-6 text-xl font-semibold leading-snug text-stone-100">
                        {p.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-400">
                        {p.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.tech.slice(0, 4).map((t) => (
                          <TagChip key={t}>{t}</TagChip>
                        ))}
                      </div>
                    </article>
                  </TiltCard>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
