import { certifications } from "@/data/portfolio";
import { FiAward, FiExternalLink, FiCheck } from "react-icons/fi";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";
import { SafeImg } from "@/components/portfolio/BrandIcons";

/**
 * Certifications — a credential registry. Each card carries an award
 * seal, issuer, credential ID, and hover image flip-up; both the
 * credential link and the issuer link are exposed.
 */
export default function Certifications() {
  const issuers = new Set(certifications.map((c) => c.issuer));

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
          description="Eight certificates across data analytics, BI tooling and machine learning — hover a card to preview, click VERIFY for the credential."
        />
      </section>

      {/* registry strip */}
      <section className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <Reveal>
          <div className="panel flex flex-wrap items-center justify-between gap-3 px-5 py-4 font-mono2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <FiCheck className="text-primary" /> {certifications.length} credentials on file
            </span>
            <span>{issuers.size} issuers · 2024 → 2025</span>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={Math.min(0.3, i * 0.05)}>
              <article className="panel group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                {/* seal header */}
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <span className="grid h-9 w-9 place-items-center border border-primary/30 text-primary">
                    <FiAward className="h-4 w-4" />
                  </span>
                  <span className="font-mono2 text-[10px] tracking-[0.2em] text-muted-foreground">
                    {c.year}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold leading-snug text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.issuer}</p>
                  <p className="mt-3 font-mono2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                    ID · {c.credId}
                  </p>

                  {/* image flip-up */}
                  <div className="mt-4 h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:h-24 group-hover:opacity-100">
                    <SafeImg
                      src={c.image}
                      alt={`${c.title} — related work`}
                      className="h-24 w-full border border-border object-cover object-top"
                    />
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono2 text-[11px] uppercase tracking-[0.2em] text-primary transition-opacity hover:opacity-80"
                    >
                      Verify <FiExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href={c.issuerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Issuer ↗
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
