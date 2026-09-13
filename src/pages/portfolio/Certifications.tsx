import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { Reveal, SectionHeading } from "@/components/portfolio/Primitives";

export default function Certifications() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Certifications"
          title={
            <>
              Verified, <span className="text-gradient">always learning</span>
            </>
          }
          description="A curated collection of verified professional certifications from reputable platforms — dedication to continuous learning and validated expertise across technical and professional skills."
        />
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-14 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-white/8">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className={`group relative flex items-center gap-4 overflow-hidden px-5 py-5 transition-colors duration-300 hover:bg-amber-400/[0.05] sm:px-7 ${
                  i !== certifications.length - 1 ? "border-b border-white/8" : ""
                }`}
              >
                {/* sheen */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -transtone-x-full bg-gradient-to-r from-transparent via-amber-400/[0.07] to-transparent transition-transform duration-700 ease-out group-hover:transtone-x-full"
                />

                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-400/25 bg-amber-400/[0.07] text-amber-400 transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(94,234,212,0.35)]">
                  <BadgeCheck className="h-5 w-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-base font-semibold text-stone-100 sm:text-lg">
                    {c.title}
                  </span>
                  <span className="mt-0.5 block font-mono2 text-[11px] uppercase tracking-[0.2em] text-stone-500">
                    {c.issuer}
                  </span>
                </span>

                <span className="hidden shrink-0 font-mono2 text-[11px] tracking-[0.2em] text-stone-500 sm:block">
                  {c.year}
                </span>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-stone-600 transition-all duration-300 group-hover:-transtone-y-0.5 group-hover:transtone-x-0.5 group-hover:text-amber-400" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center font-mono2 text-[11px] tracking-[0.2em] text-stone-600">
            FULL CREDENTIAL LINKS AVAILABLE ON LINKEDIN → /IN/BHASKAR-PAL-2K02
          </p>
        </Reveal>
      </section>
    </div>
  );
}
