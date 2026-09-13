import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiDownload, FiSend } from "react-icons/fi";
import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";
import { SocialButton } from "@/components/portfolio/BrandIcons";

type FormState = "idle" | "sending" | "sent" | "error";

/**
 * Contact — one big call to action: a headline you can't miss, a working
 * message form (same Google Apps Script pipeline as the old portfolio),
 * the resume, every social with its handle, and direct rows.
 */
export default function Contact() {
  const [state, setState] = useState<FormState>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    try {
      // GET with query params — the same contract the old site used,
      // which avoids Apps Script CORS preflight issues.
      await fetch(`${profile.formEndpoint}?${new URLSearchParams(data as unknown as Record<string, string>)}`, {
        method: "GET",
      });
      setState("sent");
      form.reset();
      setTimeout(() => setState("idle"), 6000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 6000);
    }
  }

  const inputCls =
    "w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary/60";

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
          description="For any queries, feel free to reach out — I'm ready to connect and discuss collaboration, career opportunities, or data-driven projects."
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

      {/* form + direct info */}
      <section className="mx-auto max-w-6xl px-6 pt-14 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* direct rows */}
          <div className="grid content-start gap-px border border-border">
            {[
              { icon: <FiMapPin className="h-4 w-4" />, label: "Address", value: profile.location },
              { icon: <FiPhone className="h-4 w-4" />, label: "Call me", value: profile.phone, href: `tel:${profile.phone}` },
              { icon: <FiMail className="h-4 w-4" />, label: "Email me", value: profile.email, href: `mailto:${profile.email}` },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-4 bg-background p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center border border-primary/30 text-primary">
                  {row.icon}
                </span>
                <span>
                  <span className="block font-mono2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {row.label}
                  </span>
                  {row.href ? (
                    <a href={row.href} className="text-sm text-foreground transition-colors hover:text-primary">
                      {row.value}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground">{row.value}</span>
                  )}
                </span>
              </div>
            ))}
            <div className="bg-background p-5">
              <span className="flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                status: open to opportunities
              </span>
            </div>
          </div>

          {/* message form */}
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="tile-dashed rounded-lg p-6 sm:p-8">
              <p className="font-display text-xl font-semibold tracking-tight text-foreground">
                Send a <span className="text-primary">message</span>
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input required name="name" type="text" placeholder="Your Name" className={inputCls} />
                <input required name="email" type="email" placeholder="Your Email" className={inputCls} />
                <input required name="subject" type="text" placeholder="Subject" className={`${inputCls} sm:col-span-2`} />
                <textarea required name="message" rows={5} placeholder="Message" className={`${inputCls} resize-none sm:col-span-2`} />
              </div>
              <button
                type="submit"
                disabled={state === "sending"}
                className="btn-primary group mt-6 inline-flex items-center gap-2.5 rounded-md px-6 py-3 font-display text-sm font-semibold text-foreground disabled:opacity-60"
              >
                <FiSend className="h-4 w-4 text-primary" />
                {state === "sending" ? "Sending…" : "Send message"}
              </button>
              {state === "sent" && (
                <p className="mt-4 font-mono2 text-xs tracking-wide text-primary">
                  ✓ Your message has been sent. Thank you!
                </p>
              )}
              {state === "error" && (
                <p className="mt-4 font-mono2 text-xs tracking-wide text-red-400">
                  Something went wrong — please email me directly at {profile.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
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

      {/* availability strip */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <Reveal>
          <div className="flex flex-col items-center gap-3 px-8 text-center">
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              The next insight could start with <span className="text-primary">your message.</span>
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
