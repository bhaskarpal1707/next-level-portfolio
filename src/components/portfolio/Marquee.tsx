import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite CSS marquee. Content is duplicated once; the track translates
 * -50% for a seamless loop. Hover to pause.
 */
export default function Marquee({
  items,
  duration = 40,
  reverse = false,
  className = "",
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={cn(
        "marquee-paused relative overflow-hidden py-3",
        "[mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn("marquee-track", reverse && "reverse")}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-5 flex shrink-0 items-center gap-5 font-mono2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-primary/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
