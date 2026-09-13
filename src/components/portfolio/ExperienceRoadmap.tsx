import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";

/**
 * The Journey — a 3D storytelling scene. The whole roadmap lives on a
 * pointer-tilted plane: the SVG road draws in with a gradient stroke,
 * stations light up as glowing rings, and the station cards float at
 * different depths (translateZ) so moving the mouse parallaxes the scene.
 */
export default function ExperienceRoadmap() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState(-1);
  const ordered = [...experiences].reverse(); // V1, V2, V3

  useEffect(() => {
    const el = sceneRef.current;
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
    const timers = ordered.map((_, i) => setTimeout(() => setActive(i), 900 + i * 800));
    return () => timers.forEach(clearTimeout);
  }, [drawn, ordered.length]);

  const onPointerMove = (e: React.MouseEvent) => {
    const el = sceneRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
  };

  const PATH =
    "M 30 250 C 130 190, 100 100, 210 84 C 310 70, 330 156, 450 152 C 570 148, 590 62, 690 58 C 770 55, 810 140, 880 138";

  const STOPS = [
    { x: 30, y: 250 },
    { x: 450, y: 152 },
    { x: 880, y: 138 },
  ];
  const DEPTHS = ["60px", "90px", "120px"];

  return (
    <div
      ref={sceneRef}
      onMouseMove={onPointerMove}
      className="scene3d relative"
    >
      <div className="tilt-scene">
        {/* ── the 3D road ── */}
        <svg
          viewBox="0 0 900 300"
          className="w-full overflow-visible"
          style={{ transform: "translateZ(10px)" }}
          role="img"
          aria-label="Journey roadmap: Trainee Intern at ISI, then IDEAS-TIH, then Research Intern at ISI"
        >
          <defs>
            <linearGradient id="road-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="55%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#a855f7" />
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
          {/* drawn gradient road */}
          <motion.path
            d={PATH}
            fill="none"
            stroke="url(#road-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={drawn ? { pathLength: 1 } : {}}
            transition={{ duration: 2.6, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 6px rgba(239,68,68,0.35))" }}
          />

          {/* travelling pulse */}
          {drawn && (
            <motion.circle
              r="4.5"
              fill="#ef4444"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.6, times: [0, 0.05, 0.9, 1], ease: "linear" }}
            >
              <animateMotion dur="2.6s" path={PATH} fill="freeze" />
            </motion.circle>
          )}

          {/* stations — layered glow rings */}
          {ordered.map((exp, i) => {
            const s = STOPS[i];
            const lit = active >= i;
            return (
              <g key={exp.role}>
                <motion.circle
                  cx={s.x}
                  cy={s.y}
                  r={lit ? 9 : 5.5}
                  fill="var(--background)"
                  stroke={lit ? "url(#road-grad)" : "rgba(236,233,226,0.25)"}
                  strokeWidth="2.5"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={drawn ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                {lit && (
                  <motion.circle
                    cx={s.x}
                    cy={s.y}
                    r="9"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2.8, opacity: 0 }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 0.9 + i * 0.8 }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* ── station cards, floating at staggered depths ── */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {ordered.map((exp, i) => {
            const lit = active >= i;
            return (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, y: 16 }}
                animate={drawn && lit ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: `translateZ(${DEPTHS[i]})` }}
                className={`panel rounded-lg p-5 transition-colors duration-500 ${
                  lit ? "border-primary/40 bg-muted" : ""
                }`}
              >
                <div className="flex items-center justify-between font-mono2 text-[10px] uppercase tracking-[0.25em]">
                  <span className="text-grad font-semibold">
                    {lit ? "STATION 0" + (i + 1) : "······"}
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
    </div>
  );
}
