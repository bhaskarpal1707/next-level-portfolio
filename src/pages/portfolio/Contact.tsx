import { FiMail, FiPhone, FiMapPin, FiDownload } from "react-icons/fi";
import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";
import { SocialButton } from "@/components/portfolio/BrandIcons";

/**
 * Contact — one big call to action: a headline you can't miss, a mailto
 * button, the resume, every social with its handle, and direct rows.
 */
export default function Contact() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="08 — Contact"
          title={
            <>
              Have data? <br className="sm:hidden" />
              <span className="text-primary">Let's make it talk.</span>
            </>
          }
          description="Open to data analyst roles, research collaborations, and dashboard/ML freelance work. The fastest route is email — everything else is below."
        />

        {/* primary CTAs */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${profile.email}?subject=Let's%20work%20together`}
              className="btn-primary group inline-flex items-center gap-2.5 rounded-md px-6 py-3.5 font-display text-sm font-semibold text-foreground"
            >
              <FiMail className="h-4 w-4 text-primary" />
              {profile.email}
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="btn-primary group inline-flex items-center gap-2.5 rounded-md px-6 py-3.5 font-display text-sm font-semibold text-foreground"
            >
              <FiDownload className="h-4 w-4 text-primary" />
              Download resume
            </a>
          </div>
        </Reveal>
      </section>

      {/* social tiles — every handle visible */}
      <section className="mx-auto max-w-6xl px-6 pt-14 sm:px-10">
        <div className="grid gap-px border border-border sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.04}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full items-center justify-between gap-4 bg-background p-5 transition-colors duration-300 hover:bg-muted"
              >
                <span className="flex items-center gap-4">
                  <SocialButton social={s} />
                  <span>
                    <span className="block font-display text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {s.label}
                    </span>
                    <span className="block font-mono2 text-[11px] text-muted-foreground">
                      {s.handle}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* direct rows */}
      <section className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <div className="grid gap-px border border-border sm:grid-cols-3">
          {[
            { icon: <FiPhone className="h-4 w-4" />, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
            { icon: <FiMapPin className="h-4 w-4" />, label: "Location", value: profile.location },
            { icon: <FiMail className="h-4 w-4" />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
          ].map((row, i) => (
            <Reveal key={row.label} delay={i * 0.05}>
              {row.href ? (
                <a
                  href={row.href}
                  className="flex h-full items-center gap-4 bg-background p-5 transition-colors hover:bg-muted"
                >
                  <span className="text-primary">{row.icon}</span>
                  <span>
                    <span className="block font-mono2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="block text-sm text-foreground">{row.value}</span>
                  </span>
                </a>
              ) : (
                <div className="flex h-full items-center gap-4 bg-background p-5">
                  <span className="text-primary">{row.icon}</span>
                  <span>
                    <span className="block font-mono2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="block text-sm text-foreground">{row.value}</span>
                  </span>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* availability strip */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <Reveal>
          <div className="tile-dashed flex flex-col items-center gap-3 px-8 py-12 text-center">
            <span className="flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              status: open to opportunities
            </span>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              The next insight could start with <span className="text-primary">your message.</span>
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
