import { useEffect, useState } from "react";

/**
 * Editorial figure plate: a hairline-framed image with a numbered caption
 * row beneath it. Images fade in once loaded; a hairline skeleton shows
 * while loading so layout never jumps.
 */
export default function Figure({
  src,
  alt,
  index,
  caption,
  source,
  ratio = "aspect-[16/10]",
  grayscale = true,
  fit = "object-contain",
  className = "",
}: {
  src: string;
  alt: string;
  index: string;
  caption: string;
  source?: string;
  ratio?: string;
  grayscale?: boolean;
  fit?: "object-contain" | "object-cover";
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  // Preloaded images (React strict-mode double render, cached files) can
  // complete before the onLoad handler attaches.
  useEffect(() => {
    const img = new Image();
    img.src = src;
    if (img.complete) setLoaded(true);
  }, [src]);

  return (
    <figure className={className}>
      <div className={`panel relative overflow-hidden ${ratio}`}>
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden />
        )}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full ${fit} transition-[opacity,filter] duration-700 ${
            grayscale ? "grayscale hover:grayscale-0" : ""
          } ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        <span className="flex min-w-0 items-baseline gap-3">
          <span className="text-primary">{index}</span>
          <span className="truncate text-foreground/80">{caption}</span>
        </span>
        {source && <span className="shrink-0 opacity-70">{source}</span>}
      </figcaption>
    </figure>
  );
}
