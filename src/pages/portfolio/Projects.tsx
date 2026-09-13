import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiArrowUpRight } from "react-icons/fi";
import { projects, projectTags } from "@/data/portfolio";
import { Reveal, SectionHeading, TagChip } from "@/components/portfolio/Primitives";
import { SafeImg } from "@/components/portfolio/BrandIcons";

/**
 * Projects — the old portfolio's filter tabs (All / End to End / Excel /
 * Power BI / SQL / Python) over a responsive card grid. Every card shows
 * its repo's live GitHub card image, tech tags, and both GitHub +
 * LinkedIn links.
 */
export default function Projects() {
  const [tag, setTag] = useState("All");

  const filtered = useMemo(
    () => (tag === "All" ? projects : projects.filter((p) => p.tags.includes(tag))),
    [tag],
  );

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    m.set("All", projects.length);
    for (const t of projectTags.slice(1)) {
      m.set(t, projects.filter((p) => p.tags.includes(t)).length);
    }
    return m;
  }, []);

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="03 — Projects"
          title={
            <>
              The <span className="text-primary">work</span>, queryable
            </>
          }
          description={`${projects.length} projects across BI dashboards, SQL deep-dives, ML pipelines and end-to-end builds. Filter by stack; every card links to GitHub and LinkedIn.`}
        />
      </section>

      {/* ── filter tabs ── */}
      <section className="sticky top-16 z-30 mt-10 border-y border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3 sm:px-10">
          {projectTags.map((t) => {
            const active = tag === t;
            return (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`relative shrink-0 rounded-md px-3.5 py-1.5 font-mono2 text-xs tracking-wide transition-colors duration-300 ${
                  active ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="proj-tag-pill"
                    className="absolute inset-0 rounded-md bg-primary"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                <span className="relative z-10">
                  {t}
                  <span className={active ? "opacity-70" : "opacity-50"}> · {counts.get(t) ?? 0}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── card grid ── */}
      <section className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(0.25, i * 0.04), ease: [0.22, 1, 0.36, 1] }}
              className="tilt-card panel group flex flex-col overflow-hidden transition-colors duration-300 hover:border-primary/40"
            >
              {/* repo image — 16:9 plate, zooms on hover */}
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="block aspect-[16/9] overflow-hidden border-b border-border"
                title={`Open ${p.title} on GitHub`}
              >
                <SafeImg
                  src={p.image}
                  alt={`${p.title} — repository preview`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </a>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <span className="shrink-0 font-mono2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {p.tags[0]}
                  </span>
                </div>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <TagChip key={t}>{t}</TagChip>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-mono2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {p.tags.join(" · ")}
                  </span>
                  <span className="flex items-center gap-2">
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} on GitHub`}
                      className="grid h-8 w-8 place-items-center border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                    >
                      <FiGithub className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={p.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} on LinkedIn`}
                      className="grid h-8 w-8 place-items-center border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                    >
                      <FiLinkedin className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${p.title}`}
                      className="grid h-8 w-8 place-items-center border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                    >
                      <FiArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-16 text-center font-mono2 text-sm text-muted-foreground">
            0 rows returned for “{tag}”.
          </p>
        )}
      </section>
    </div>
  );
}
