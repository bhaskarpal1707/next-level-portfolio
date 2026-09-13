import { Link } from "react-router";
import { ArrowUpRight, Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Let's build something
            </p>
            <Link
              to="/contact"
              className="group mt-4 inline-flex items-baseline gap-2 font-display text-4xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary sm:text-5xl"
            >
              Start a project
              <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Open to collaborations, career opportunities, and data-driven projects with
              HR, managers, IT, and business professionals.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
              {profile.phone}
            </a>
            <p className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </p>
            <div className="flex gap-5 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 font-mono2 text-[11px] tracking-[0.25em] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} BHASKAR PAL</span>
          <span>KOLKATA · 22.5726° N / 88.3639° E</span>
          <span>DESIGNED MINIMAL</span>
        </div>
      </div>
    </footer>
  );
}
