import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import portrait from "@/assets/bhaskar-portrait.jpg";

/**
 * VideoShowcase — cinematic reel experience.
 *
 * Click the frame → it expands across the page (shared-layout animation)
 * into a full-screen stage where scrolling smoothly scales the reel
 * (200vh scroll runway). Esc or ✕ returns to the page.
 *
 * Video resolution order:
 *   1. `profile.videoUrl` in src/data/portfolio.ts (absolute URL)
 *   2. /video.mp4 in this project's public/ folder  ← drop your video there
 *   3. cinematic poster stage (portrait + gradient chrome) so the section
 *      still demos the full interaction without a file.
 *
 * A candidate "counts" only if the server returns a non-HTML response —
 * dev servers / GH Pages 404s answer unknown paths with index.html, and
 * mounting a <video> against that HTML throws "no supported sources".
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

/** Full-screen expanded stage — owns its own scroll-driven zoom. */
function ReelStage({
  src,
  hasVideo,
  onClose,
}: {
  src: string | null;
  hasVideo: boolean;
  onClose: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // scroll-driven scale inside the expanded stage
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.62, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.35], ["28px", "0px"]);
  const glow = useTransform(scrollYProgress, [0, 0.5], [0.12, 0.4]);

  // lock page scroll + esc handler while expanded
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] bg-background/97 backdrop-blur-md"
    >
      {/* 200vh runway → scroll drives the scale-in */}
      <div ref={scrollRef} className="h-full overflow-y-auto">
        <div className="relative h-[200vh]">
          <div className="sticky top-0 flex h-screen items-center justify-center px-4 sm:px-10">
            <motion.div
              layoutId="reel-stage"
              style={{ scale, borderRadius: radius }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl overflow-hidden border border-border"
            >
              <motion.div
                aria-hidden
                className="bg-grad absolute -inset-24 -z-10 blur-3xl"
                style={{ opacity: glow }}
              />
              <div className="relative aspect-video w-full bg-black">
                {hasVideo && src ? (
                  <>
                    <video
                      ref={videoRef}
                      src={src}
                      poster={portrait}
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      onClick={togglePlay}
                      className="h-full w-full object-contain"
                    />
                    {!playing && (
                      <button
                        onClick={togglePlay}
                        className="absolute inset-0 grid place-items-center bg-background/30"
                        aria-label="Play reel"
                      >
                        <span className="grid h-16 w-16 place-items-center rounded-full border border-border bg-background/80">
                          <Play className="ml-1 h-6 w-6 text-foreground" />
                        </span>
                      </button>
                    )}
                  </>
                ) : (
                  /* cinematic poster stage — full interaction without a file */
                  <div className="relative h-full w-full">
                    <img
                      src={portrait}
                      alt="Showreel poster"
                      className="h-full w-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                      <p className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        The reel is <span className="text-grad">rendering</span>
                      </p>
                      <p className="max-w-md font-mono2 text-[11px] uppercase leading-relaxed tracking-[0.25em] text-muted-foreground">
                        Drop your video at public/video.mp4 — or set profile.videoUrl — and
                        it plays right here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* stage chrome */}
            <div className="pointer-events-none absolute inset-x-0 bottom-8 flex items-center justify-between px-6 font-mono2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:px-10">
              <span>BHASKAR PAL — SHOWREEL</span>
              <span className="hidden sm:inline">SCROLL TO ZOOM · ESC TO CLOSE</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        aria-label="Close showreel"
        className="fixed right-5 top-5 z-[101] grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:border-primary/60 hover:text-primary"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export default function VideoShowcase() {
  const [src, setSrc] = useState<string | null>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [open, setOpen] = useState(false);

  // probe once
  useEffect(() => {
    let alive = true;
    (async () => {
      if (profile.videoUrl) {
        if (alive) {
          setSrc(profile.videoUrl);
          setHasVideo(true);
        }
        return;
      }
      if (await looksLikeVideo("video.mp4")) {
        if (alive) {
          setSrc("video.mp4");
          setHasVideo(true);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const closeStage = () => setOpen(false);

  return (
    <>
      {/* ── inline frame (the "poster" you click) ── */}
      <motion.div
        layoutId="reel-stage"
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="group relative mx-auto max-w-3xl cursor-pointer"
        onClick={() => setOpen(true)}
        role="button"
        aria-label="Open showreel"
      >
        <div className="panel relative aspect-video overflow-hidden rounded-xl">
          <img
            src={portrait}
            alt="Showreel poster — Bhaskar Pal"
            loading="lazy"
            className="h-full w-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90"
          />
          {/* gradient sheen + scanline */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <motion.span
            aria-hidden
            className="bg-grad absolute inset-x-0 h-px opacity-70"
            animate={{ top: ["12%", "88%", "12%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* play affordance */}
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-border bg-background/70 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 h-6 w-6 text-foreground" />
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-4 font-mono2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>REEL.MP4</span>
            <span className="text-grad font-semibold">CLICK TO EXPAND</span>
          </div>
        </div>
      </motion.div>

      {open && <ReelStage src={src} hasVideo={hasVideo} onClose={closeStage} />}
    </>
  );
}
