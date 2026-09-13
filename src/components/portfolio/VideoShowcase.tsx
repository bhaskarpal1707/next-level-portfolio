import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal } from "./Primitives";
import portrait from "@/assets/bhaskar-portrait.jpg";

/**
 * VideoShowcase — plays Bhaskar's intro reel.
 *
 * Resolution order:
 *   1. `profile.videoUrl` in src/data/portfolio.ts (absolute URL)
 *   2. /video.mp4 in this project's public/ folder  ← drop your video there
 *   3. silent poster fallback (site still looks complete)
 *
 * A candidate "counts" only if the server returns a non-HTML response.
 * Dev servers (and GH Pages 404s) fall back to serving index.html with a
 * 200 status for unknown paths — mounting a <video> against that HTML is
 * what throws "The element has no supported sources".
 */
async function looksLikeVideo(url: string): Promise<boolean> {
  try {
    const r = await fetch(url, { method: "HEAD" });
    if (!r.ok) return false;
    const ct = (r.headers.get("content-type") ?? "").toLowerCase();
    return !ct.includes("text/html");
  } catch {
    return false;
  }
}

export default function VideoShowcase() {
  const [src, setSrc] = useState<string | null>(null);
  const [state, setState] = useState<"probing" | "ready" | "missing">("probing");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (profile.videoUrl) {
        if (alive) {
          setSrc(profile.videoUrl);
          setState("ready");
        }
        return;
      }
      if (await looksLikeVideo("video.mp4")) {
        if (alive) {
          setSrc("video.mp4");
          setState("ready");
        }
        return;
      }
      if (alive) setState("missing");
    })();
    return () => {
      alive = false;
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  return (
    <Reveal>
      <div className="panel rounded-lg p-2">
        <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
          {state === "ready" && src ? (
            <>
              <video
                ref={videoRef}
                src={src}
                poster={portrait}
                loop
                muted
                playsInline
                preload="metadata"
                onError={() => setState("missing")}
              />
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={togglePlay}
                className="absolute inset-0 grid place-items-center bg-background/40 backdrop-blur-[2px] transition-colors hover:bg-background/25"
                aria-label="Play video"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full border border-border bg-background/70">
                  <Play className="ml-1 h-6 w-6 text-foreground" />
                </span>
              </motion.button>
            </>
          ) : (
            state === "missing" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-border">
                  <Play className="ml-0.5 h-5 w-5 text-muted-foreground" />
                </span>
                <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Add your reel at public/video.mp4
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </Reveal>
  );
}
