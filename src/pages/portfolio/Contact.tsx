import { ArrowUpRight, Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";

const channels = [
  {
    icon: MapPin,
    label: "Address",
    value: "Kolkata, West Bengal, India",
    sub: "22.5726° N / 88.3639° E",
    href: "https://maps.google.com/?q=Kolkata,West+Bengal,India",
  },
  {
    icon: Phone,
    label: "Call me",
    value: "+91-73188285978",
    sub: "Mon–Sat · 10:00–20:00 IST",
    href: "tel:+9173188285978",
  },
  {
    icon: Mail,
    label: "Email me",
    value: "bhaskarpal.official@gmail.com",
    sub: "Replies within 24 hours",
    href: "mailto:bhaskarpal.official@gmail.com",
  },
];

export default function Contact() {
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let's make your data <span className="text-primary">talk</span>
            </>
          }
          description="For any queries, feel free to reach out — I'm ready to connect and discuss collaboration, career opportunities, or data-driven projects with HR, managers, IT, and business professionals."
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14 sm:px-10">
        <div className="divide-y divide-border border-y border-border">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-7 transition-colors duration-300 sm:grid-cols-[3rem_12rem_1fr_2rem] sm:gap-6"
              >
                <c.icon className="h-4 w-4 translate-y-0.5 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {c.label}
                </span>
                <span>
                  <span className="font-display block text-lg font-semibold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                    {c.value}
                  </span>
                  <span className="mt-0.5 block font-mono2 text-[11px] tracking-wide text-muted-foreground">
                    {c.sub}
                  </span>
                </span>
                <ArrowUpRight className="hidden h-4 w-4 translate-y-0.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-20 border-t border-border pt-16 text-center">
            <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Direct line
            </p>
            <h3 className="font-display mx-auto mt-4 max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
              One email away from{" "}
              <span className="text-primary">better decisions</span>
            </h3>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                Write me now
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="link-sweep inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-sweep inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
