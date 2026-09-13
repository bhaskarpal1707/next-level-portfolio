import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, Loader2 } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal } from "./Primitives";
import portrait from "@/assets/bhaskar-portrait.jpg";

/**
 * VideoShowcase — plays Bhaskar's intro reel.
 *
 * Resolution order:
 *   1. `profile.videoUrl` in src/data/portfolio.ts (absolute URL)
 *   2. /video.mp4 in this project's public/ folder  ← drop your video there
 *   3. known paths on the old portfolio site (bhaskarpal1707.github.io)
 *   4. silent poster fallback (site still looks complete)
 */
const LOCAL_CANDIDATES = ["video.mp4"];
const REMOTE_BASE = "https://bhaskarpal1707.github.io/portfolio";
const REMOTE_CANDIDATES = [
  "/assets/video/video.mp4",
  "/assets/video/intro.mp4",
  "/assets/video/hero.mp4",
  "/assets/video/reel.mp4",
  "/assets/video.mp4",
];

async function findSource(): Promise<string | null> {
  if (profile.videoUrl) return profile.videoUrl;
  for (const p of LOCAL_CANDIDATES) {
    try {
      const r = await fetch(p, { method: "HEAD" });
      if (r.ok) return p;
    } catch {
      /* ignore */
    }
  }
  for (const p of REMOTE_CANDIDATES) {
    try {
      const r = await fetch(REMOTE_BASE + p, { method: "HEAD" });
      if (r.ok) return REMOTE_BASE + p;
    } catch {
      /* ignore */
    }
  }
  return null;
}

export default function VideoShowcase() {
  const [src, setSrc] = useState<string | null>(null);
  const [state, setState] = useState<"probing" | "ready" | "missing">("probing");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let alive = true;
    findSource().then((found) => {
      if (!alive) return;
      if (found) {
        setSrc(found);
        setState("ready");
      } else {
        setState("missing");
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <Reveal>
      <div className="conic-border glass rounded-3xl p-2">
        <div className="video-frame relative aspect-video rounded-[1.35rem]">
          {state === "probing" && (
            <div className="absolute inset-0 grid place-items-center">
              <Loader2 className="h-6 w-6 animate-spin text-sky-300/70" />
            </div>
          )}

          {state === "ready" && src && (
            <>
              <video
                ref={videoRef}
                src={src}
                poster={portrait}
                loop
                muted={muted}
                playsInline
                preload="metadata"
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
              />
              {!playing && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={togglePlay}
                  className="absolute inset-0 grid place-items-center bg-[#07080d]/45 backdrop-blur-[2px] transition-colors hover:bg-[#07080d]/30"
                  aria-label="Play video"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-sky-300/40 bg-sky-300/15 shadow-[0_0_50px_rgba(56,189,248,0.4)] backdrop-blur-md transition-transform hover:scale-105">
                    <Play className="ml-1 h-7 w-7 text-sky-200" />
                  </span>
                </motion.button>
              )}
              <button
                onClick={() => setMuted((m) => !m)}
                className="glass absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-slate-300"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </>
          )}

          {state === "missing" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/5">
                <Play className="ml-0.5 h-5 w-5 text-slate-400" />
              </span>
              <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                Add your reel at public/video.mp4
              </p>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
