import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";

/**
 * The Journey — a winding SVG "signal path" drawn across the page while
 * scrolled into view. Each internship is a glowing station (V1 → V3);
 * a live pulse travels the line. Ordered oldest → newest.
 */
export default function ExperienceRoadmap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState(-1); // station index currently lit
  const ordered = [...experiences].reverse(); // V1, V2, V3

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setDrawn(true),
      { rootMargin: "-120px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Light stations one by one as the path draws.
  useEffect(() => {
    if (!drawn) return;
    const timers = ordered.map((_, i) =>
      setTimeout(() => setActive(i), 900 + i * 800),
    );
    return () => timers.forEach(clearTimeout);
  }, [drawn, ordered.length]);

  const PATH =
    "M 20 240 C 120 180, 90 90, 190 78 C 280 68, 300 150, 420 148 C 540 146, 560 60, 660 56 C 760 52, 780 140, 880 138";

  return (
    <div ref={wrapRef} className="relative">
      {/* the road */}
      <svg
        viewBox="0 0 900 300"
        className="w-full overflow-visible"
        role="img"
        aria-label="Journey roadmap: Trainee Intern at ISI, then IDEAS-TIH, then Research Intern at ISI"
      >
        <defs>
          <linearGradient id="road-drawn" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
        </defs>

        {/* base track */}
        <path
          d={PATH}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeDasharray="3 6"
          strokeLinecap="round"
        />
        {/* drawn ember road */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="url(#road-drawn)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={drawn ? { pathLength: 1 } : {}}
          transition={{ duration: 2.6, ease: "easeInOut" }}
        />

        {/* travelling pulse */}
        {drawn && (
          <motion.circle
            r="4"
            fill="var(--primary)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.6, times: [0, 0.05, 0.9, 1], ease: "linear" }}
          >
            <animateMotion dur="2.6s" path={PATH} fill="freeze" />
          </motion.circle>
        )}

        {/* stations */}
        {ordered.map((exp, i) => {
          // sample a point along the path roughly by station fraction
          const stops = [
            { x: 20, y: 240 },
            { x: 420, y: 148 },
            { x: 880, y: 138 },
          ];
          const s = stops[i];
          const lit = active >= i;
          return (
            <g key={exp.role}>
              <motion.circle
                cx={s.x}
                cy={s.y}
                r={lit ? 8 : 5}
                fill="var(--background)"
                stroke={lit ? "var(--primary)" : "rgba(236,233,226,0.25)"}
                strokeWidth="2"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={drawn ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              {lit && (
                <motion.circle
                  cx={s.x}
                  cy={s.y}
                  r="8"
                  fill="none"
                  stroke="var(--primary)"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: 0.9 + i * 0.8 }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* station cards under the road */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {ordered.map((exp, i) => {
          const lit = active >= i;
          return (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 16 }}
              animate={drawn && lit ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`panel p-5 transition-colors duration-500 ${
                lit ? "border-primary/40 bg-muted" : ""
              }`}
            >
              <div className="flex items-center justify-between font-mono2 text-[10px] uppercase tracking-[0.25em]">
                <span className={lit ? "text-primary" : "text-muted-foreground"}>
                  Station 0{i + 1}
                </span>
                <span className="text-muted-foreground/70">{exp.metric}</span>
              </div>
              <h3 className="font-display mt-3 text-base font-semibold leading-snug text-foreground">
                {exp.role}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{exp.org}</p>
              <p className="mt-2 font-mono2 text-[11px] tracking-wide text-muted-foreground/80">
                {exp.period} · {exp.metricLabel}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
