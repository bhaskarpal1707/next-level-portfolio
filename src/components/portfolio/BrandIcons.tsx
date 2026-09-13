import { useState } from "react";
import { Linkedin, Github, Facebook, Mail } from "lucide-react";
import { socials, type Social } from "@/data/portfolio";

/** X (Twitter) — bold crossing strokes. */
function XMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M4.5 3.5L20.5 20.5M19.5 3.5L4.5 20.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="square"
        fill="none"
      />
    </svg>
  );
}

/** Hugging Face — the brand IS the emoji. */
function HfMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex items-center justify-center leading-none ${className}`}
      style={{ fontSize: "0.95em" }}
    >
      🤗
    </span>
  );
}

const ICONS = {
  linkedin: Linkedin,
  github: Github,
  facebook: Facebook,
  x: XMark,
  huggingface: HfMark,
  mail: Mail,
} as const;

/** Single brand glyph. */
export function SocialGlyph({
  icon,
  className = "",
}: {
  icon: Social["icon"];
  className?: string;
}) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden />;
}

/**
 * Icon-only social button used in the hero / footer. Sits on a hairline
 * square, ember on hover, with the handle as tooltip text.
 */
export function SocialButton({
  social,
  className = "",
}: {
  social: Social;
  className?: string;
}) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noreferrer"
      title={`${social.label} — ${social.handle}`}
      aria-label={social.label}
      className={`panel group grid h-10 w-10 place-items-center text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary ${className}`}
    >
      <SocialGlyph icon={social.icon} className="h-4 w-4" />
    </a>
  );
}

/** Row of all socials. */
export default function Socials({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {socials.map((s) => (
        <SocialButton key={s.label} social={s} />
      ))}
    </div>
  );
}

/**
 * Image with graceful fallback: renders a monogram tile if the source
 * ever fails (no broken-image icons anywhere on the site).
 */
export function SafeImg({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <span
        className={`grid place-items-center bg-muted font-mono2 text-[10px] uppercase tracking-widest text-muted-foreground ${className}`}
        role="img"
        aria-label={alt}
      >
        {alt.slice(0, 2)}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
