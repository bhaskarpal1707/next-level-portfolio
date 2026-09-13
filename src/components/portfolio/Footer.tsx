import { Link } from "react-router";
import { ArrowUpRight, Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative mt-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-amber-400/80">
              Let's build something
            </p>
            <Link
              to="/contact"
              className="group mt-4 inline-flex items-baseline gap-2 font-display text-4xl font-semibold tracking-tight text-stone-100 transition-colors hover:text-amber-400 sm:text-5xl"
            >
              Start a project
              <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:-transtone-y-1 group-hover:transtone-x-1" />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Open to collaborations, career opportunities, and data-driven projects with
              HR, managers, IT, and business professionals.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-stone-300 transition-colors hover:text-amber-400"
            >
              <Mail className="h-4 w-4 text-amber-400/70" />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-3 text-stone-300 transition-colors hover:text-amber-400"
            >
              <Phone className="h-4 w-4 text-amber-400/70" />
              {profile.phone}
            </a>
            <p className="flex items-center gap-3 text-stone-300">
              <MapPin className="h-4 w-4 text-amber-400/70" />
              {profile.location}
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="glass glass-hover grid h-10 w-10 place-items-center rounded-xl text-stone-300"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass glass-hover grid h-10 w-10 place-items-center rounded-xl text-stone-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 font-mono2 text-[11px] tracking-[0.25em] text-stone-600 sm:flex-row">
          <span>© {new Date().getFullYear()} BHASKAR PAL</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            22.5726° N / 88.3639° E — KOLKATA
          </span>
          <span>DESIGNED IN THE FUTURE</span>
        </div>
      </div>
    </footer>
  );
}
