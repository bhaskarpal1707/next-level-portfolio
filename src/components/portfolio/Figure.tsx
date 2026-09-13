import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Editorial figure plate: hairline-framed image with a numbered caption row
 * beneath. Optional `tilt` gives the plate a 3D pointer-tilt + glare.
 * Images fade in once loaded; a hairline skeleton prevents layout jumps.
 */
export default function Figure({
  src,
  alt,
  index,
  caption,
  source,
  ratio = "aspect-[16/10]",
  grayscale = true,
  className = "",
  tilt = false,
}: {
  src: string;
  alt: string;
  index: string;
  caption: string;
  source?: string;
  ratio?: string;
  grayscale?: boolean;
  className?: string;
  tilt?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(0)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(0)}%`);
  };

  return (
    <figure className={className}>
      <div
        ref={ref}
        onMouseMove={onMove}
        className={`panel relative overflow-hidden rounded-lg ${ratio} ${
          tilt ? "tilt-card" : ""
        }`}
      >
        {!loaded && <div className="absolute inset-0 animate-pulse bg-muted/50" />}
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          initial={false}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-contain p-4 ${grayscale ? "grayscale transition-[filter] duration-500 hover:grayscale-0" : ""}`}
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 font-mono2 text-[11px] uppercase tracking-[0.22em]">
        <span className="text-primary">{index}</span>
        <span className="flex-1 truncate text-muted-foreground">{caption}</span>
        {source && (
          <span className="hidden text-muted-foreground/60 sm:inline">{source}</span>
        )}
      </figcaption>
    </figure>
  );
}
