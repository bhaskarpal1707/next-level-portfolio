import { certifications } from "@/data/portfolio";
import { FiExternalLink, FiCheck } from "react-icons/fi";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";
import { SafeImg } from "@/components/portfolio/BrandIcons";

/** Derive a display issuer from the credential's own text. */
function issuerOf(title: string, description: string): string {
  const t = `${title} ${description}`.toLowerCase();
  if (t.includes("linkedin learning")) return "LinkedIn · Microsoft";
  if (t.includes("microsoft")) return "Microsoft";
  if (t.includes("meta")) return "Meta";
  if (t.includes("google")) return "Google";
  if (t.includes("ibm")) return "IBM";
  if (t.includes("cisco")) return "Cisco";
  if (t.includes("udemy")) return "Udemy";
  if (t.includes("pluralsight")) return "Pluralsight";
  if (t.includes("tcs")) return "TCS iON";
  return "Certified";
}

/**
 * Certifications — a credential wall of the real certificate images.
 * Hover a card to lift the overlay; "Show Certificate" opens the exact
 * credential link from the old portfolio's data source.
 */
export default function Certifications() {
  const issuers = new Set(
    certifications.map((c) => issuerOf(c.title, c.description)),
  );

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionHeading
          eyebrow="07 — Certifications"
          title={
            <>
              Verified <span className="text-primary">credentials</span>
            </>
          }
          description="A curated collection of verified professional certifications from reputable platforms — hover a card and open the live credential."
        />
      </section>

      {/* registry strip */}
      <section className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <Reveal>
          <div className="panel flex flex-wrap items-center justify-between gap-3 px-5 py-4 font-mono2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <FiCheck className="text-primary" /> {certifications.length} credentials on file
            </span>
            <span>{issuers.size} issuers</span>
          </div>
        </Reveal>

        {/* credential wall */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => {
            const issuer = issuerOf(c.title, c.description);
            return (
              <Reveal key={c.url + c.title} delay={Math.min(0.3, (i % 6) * 0.05)}>
                <article className="tilt-card panel group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-primary/40">
                  {/* certificate image with hover overlay */}
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    title={`Show certificate — ${c.title}`}
                    className="relative block aspect-[16/10] overflow-hidden border-b border-border"
                  >
                    <SafeImg
                      src={c.image}
                      alt={`${c.title} certificate`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {/* overlay — lifts on hover, like the old portfolio card */}
                    <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 px-5 pb-4 font-mono2 text-[11px] uppercase tracking-[0.2em] text-primary">
                        Show certificate <FiExternalLink className="h-3 w-3" />
                      </span>
                    </span>
                  </a>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {c.title}
                      </h3>
                      <span className="shrink-0 rounded-sm border border-border px-2 py-0.5 font-mono2 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                        {issuer}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <span className="font-mono2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                        CRED · {String(i + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono2 text-[11px] uppercase tracking-[0.2em] text-primary transition-opacity hover:opacity-80"
                      >
                        Verify <FiExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
