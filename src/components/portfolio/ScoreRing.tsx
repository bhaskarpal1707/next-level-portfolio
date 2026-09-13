import { useEffect, useRef, useState } from "react";

/**
 * Animated CGPA / percentage ring. Draws to the score when scrolled into
 * view; percentage scores fill on a 0–100 scale, CGPA on a 0–10 scale.
 */
export default function ScoreRing({
  score,
  label,
  size = 132,
}: {
  score: string;
  label: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);
  const isPct = score.includes("%");
  const value = parseFloat(score);
  const max = isPct ? 100 : 10;
  const frac = Math.min(1, value / max);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setFired(true),
      { rootMargin: "-40px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const r = size / 2 - 8;
  const C = 2 * Math.PI * r;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!fired) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1300);
      setShown(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fired, value]);

  return (
    <div ref={ref} className="flex flex-col items-center" title={`${label}: ${score}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth="5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={fired ? C * (1 - frac) : C}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--foreground)"
          className="font-display"
          style={{ fontSize: size * 0.19, fontWeight: 600 }}
        >
          {shown.toFixed(isPct ? 1 : 2)}
          {isPct ? "%" : ""}
        </text>
      </svg>
      <span className="mt-2 font-mono2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
