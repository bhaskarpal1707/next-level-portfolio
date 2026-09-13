import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";

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
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Projects"
          title={
            <>
              The <span className="text-primary">archive</span>
            </>
          }
          description="Explore my categorized projects — practical skills in problem-solving, analytics, and turning complex data into clear, impactful results across domains."
        />
      </section>

      {/* filter bar */}
      <section className="mx-auto max-w-6xl px-6 pt-12 sm:px-10">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {categories.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`font-mono2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isActive
                    ? "link-active text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
                <span className="ml-1.5 opacity-50">{counts.get(c) ?? 0}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* index rows */}
      <section className="mx-auto max-w-6xl px-6 pt-8 sm:px-10">
        <motion.div layout className="divide-y divide-border border-y border-border">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((p: Project) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Reveal>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6 transition-colors duration-300 sm:grid-cols-[3rem_1fr_10rem_6rem_7rem_2rem] sm:gap-6"
                >
                  <span className="font-mono2 text-xs text-muted-foreground">
                    {String(projects.indexOf(p) + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                      {p.title}
                    </span>
                    <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </span>
                  </span>
                  <span className="hidden font-mono2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
                    {p.category}
                  </span>
                  <span className="hidden font-mono2 text-[11px] tracking-[0.2em] text-muted-foreground sm:block">
                    {p.year}
                  </span>
                  <span className="panel relative hidden aspect-[4/3] overflow-hidden sm:block">
                    <img
                      src={`https://opengraph.githubassets.com/1/${p.url.replace("https://github.com/", "")}`}
                      alt={`${p.title} preview`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </span>
                  <ArrowUpRight className="hidden h-4 w-4 translate-y-0.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
                </a>
                </Reveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
