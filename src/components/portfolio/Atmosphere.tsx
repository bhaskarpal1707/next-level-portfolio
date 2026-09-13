import { useEffect, useRef } from "react";

/**
 * Atmosphere layer: film-grain body class, cursor spotlight (CSS vars on
 * :root), and the ember dot+ring custom cursor. Pointer-fine devices only
 * for cursor/spotlight; grain runs everywhere.
 */
export default function Atmosphere() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("grain");
    return () => document.body.classList.remove("grain");
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      document.documentElement.style.setProperty("--mx", `${pos.x}px`);
      document.documentElement.style.setProperty("--my", `${pos.y}px`);
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      );
      if (interactive !== active) {
        active = interactive;
        ring.classList.toggle("is-active", active);
      }
    };

    const loop = () => {
      dot.style.transform = `translate(${pos.x - 3}px, ${pos.y - 3}px)`;
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      ring.style.transform = `translate(${ringPos.x - ring.offsetWidth / 2}px, ${
        ringPos.y - ring.offsetHeight / 2
      }px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="spotlight" aria-hidden />
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}
