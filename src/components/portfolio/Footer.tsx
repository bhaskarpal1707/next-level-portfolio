import { Link } from "react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { profile, socials, fileMeta } from "@/data/portfolio";
import Socials from "@/components/portfolio/BrandIcons";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              End of file
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
            <Socials className="mt-6" />
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
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 font-mono2 text-[11px] tracking-[0.2em] text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} BHASKAR PAL</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            UNSAVED CHANGES: NONE — ALWAYS SHIPPING
          </span>
          <span>
            {socials.length} NETWORKS · {fileMeta.handle}
          </span>
        </div>
      </div>
    </footer>
  );
}
