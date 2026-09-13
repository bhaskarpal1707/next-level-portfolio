import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, profile, fileMeta } from "@/data/portfolio";

/**
 * File-chrome header: the site presents itself as an open data file.
 * Left = filename + status dot, center = sheet nav, right = meta + resume.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono2 text-xs font-medium tracking-[0.18em] text-foreground">
              {fileMeta.filename}
            </span>
            <span className="hidden font-mono2 text-[10px] tracking-[0.15em] text-muted-foreground sm:inline">
              — {fileMeta.handle}
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-[13px] transition-colors duration-300 ${
                    isActive
                      ? "link-active text-foreground"
                      : "link-sweep text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono2 text-[10px] tracking-[0.2em] text-muted-foreground xl:inline">
              {fileMeta.city}
            </span>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-primary hidden rounded-md px-3.5 py-2 text-[13px] font-medium text-foreground sm:block"
            >
              Resume ↗
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center text-foreground lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-background lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-1 px-8">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `flex items-baseline justify-between border-b border-border py-4 font-display text-3xl font-semibold tracking-tight ${
                        isActive ? "text-primary" : "text-foreground"
                      }`
                    }
                  >
                    {l.label}
                    <span className="font-mono2 text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </div>
            <div className="px-8 pb-10 font-mono2 text-xs tracking-widest text-muted-foreground">
              {fileMeta.city} · 22.5726° N, 88.3639° E
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
