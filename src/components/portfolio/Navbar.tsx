import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, FileDown } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";

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
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-[0_8px_40px_-16px_rgba(0,0,0,0.8)]" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-teal-300/40 bg-teal-300/10 font-display text-sm font-bold text-teal-200 transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(94,234,212,0.4)]">
              BP
              <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-teal-300" />
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-[0.22em] text-slate-200 sm:block">
              BHASKAR<span className="text-teal-300">.PAL</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    isActive ? "text-teal-200" : "text-slate-400 hover:text-slate-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-teal-300/30 bg-teal-300/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-neon hidden items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-teal-200 transition-all duration-300 hover:shadow-[0_0_28px_rgba(94,234,212,0.35)] sm:inline-flex"
            >
              <FileDown className="h-3.5 w-3.5" />
              Resume
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="glass grid h-9 w-9 place-items-center rounded-xl text-slate-200 lg:hidden"
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#05060a]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-1 px-8">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `group flex items-center justify-between border-b border-white/5 py-4 font-display text-3xl font-semibold tracking-tight transition-colors ${
                        isActive ? "text-teal-300" : "text-slate-300 hover:text-white"
                      }`
                    }
                  >
                    {l.label}
                    <ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </NavLink>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-8 pb-10 font-mono2 text-xs tracking-widest text-slate-500"
            >
              KOLKATA · 22.5726° N, 88.3639° E
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
