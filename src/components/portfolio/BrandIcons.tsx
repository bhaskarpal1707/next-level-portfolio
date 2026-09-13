import { useState } from "react";
import {
  TbBrandLinkedin,
  TbBrandGithub,
  TbBrandFacebook,
  TbBrandX,
} from "react-icons/tb";
import { SiHuggingface } from "react-icons/si";
import { FiMail } from "react-icons/fi";
import { socials, type Social } from "@/data/portfolio";

const ICONS = {
  linkedin: TbBrandLinkedin,
  github: TbBrandGithub,
  facebook: TbBrandFacebook,
  x: TbBrandX,
  huggingface: SiHuggingface,
  mail: FiMail,
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
 * Skill logo with graceful fallback: renders the verified brand mark, or a
 * monogram tile if the remote SVG ever fails (no broken-image icons).
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
