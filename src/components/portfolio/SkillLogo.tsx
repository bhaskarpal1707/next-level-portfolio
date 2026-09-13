import { useState } from "react";
import { DiPython, DiMysql, DiPostgresql, DiGithub } from "react-icons/di";
import {
  ChartLine,
  Boxes,
  Sigma,
  Network,
  Crosshair,
  Database,
  AudioWaveform,
  Table,
} from "lucide-react";

type LogoComp = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
}>;

/**
 * Skill logo registry. Zero mega icon packs (the si/tb bundles are 9 MB
 * combined and blank the dev preview while parsing): brand marks come from
 * the small Devicon pack + lucide glyphs, and hand-drawn inline SVGs carry
 * the rest — in the brands' own colors, so nothing can break.
 */
const LOGOS: Record<string, { Comp: LogoComp; color?: string }> = {
  python: { Comp: DiPython, color: "#3776ab" },
  mysql: { Comp: DiMysql, color: "#00758f" },
  postgresql: { Comp: DiPostgresql, color: "#336791" },
  github: { Comp: DiGithub },
  sql: { Comp: Database },
  supervised: { Comp: Network },
  unsupervised: { Comp: Boxes },
  stats: { Comp: Sigma },
  validation: { Comp: Crosshair },
  librosa: { Comp: AudioWaveform },
  spreadsheet: { Comp: Table },
};

/* ── hand-drawn brand SVGs (not available in small icon packs) ── */

function NumPyMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="5" y="4" width="9" height="24" fill="#4dabcf" />
      <rect x="18" y="4" width="9" height="24" fill="#4d77cf" opacity=".85" />
      <path d="M7 26 25 6" stroke="#fff" strokeWidth="2.4" />
    </svg>
  );
}

function PandasMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="6" y="4" width="8" height="24" fill="#150458" />
      <rect x="18" y="4" width="8" height="24" fill="#150458" />
      <rect x="10" y="4" width="3" height="24" fill="#e70488" />
      <rect x="22" y="4" width="3" height="24" fill="#e70488" />
    </svg>
  );
}

function MatplotlibMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M4 24c3-1 5-6 7-10s4-8 7-8 5 6 6 11 2 7 4 7"
        fill="none"
        stroke="#ece9e2"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="2.2" fill="#f9c440" />
      <circle cx="7" cy="7" r="2.2" fill="#779ecb" />
    </svg>
  );
}

function SeabornMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="3" y="18" width="5" height="10" fill="#4c72b0" />
      <rect x="10" y="10" width="5" height="18" fill="#dd8452" />
      <rect x="17" y="14" width="5" height="14" fill="#55a868" />
      <rect x="24" y="6" width="5" height="22" fill="#c44e52" />
    </svg>
  );
}

function SklearnMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="11" cy="20" r="8" fill="#f89939" />
      <circle cx="21" cy="11" r="7" fill="#3499cd" />
    </svg>
  );
}

function TensorflowMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 3 29 10v5l-9-5v19h-8V10l-9 5v-5z" fill="#ff8f00" />
    </svg>
  );
}

function PytorchMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M16 3c1 6-7 8-7 15a7 7 0 0 0 14 0c0-3-1.6-4.6-3-6-.4 2-1.6 3-3 3.4C18.6 12 19 7 16 3z"
        fill="none"
        stroke="#ee4c2c"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OpencvMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="10" cy="10" r="5.5" fill="none" stroke="#e33" strokeWidth="3" strokeDasharray="26 9" />
      <circle cx="22" cy="10" r="5.5" fill="none" stroke="#5c3" strokeWidth="3" strokeDasharray="26 9" />
      <circle cx="16" cy="21" r="5.5" fill="none" stroke="#38f" strokeWidth="3" strokeDasharray="26 9" />
    </svg>
  );
}

function JupyterMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M5 11a11 6.5 0 0 1 22 0" stroke="#f37726" strokeWidth="2.5" fill="none" />
      <path d="M27 21a11 6.5 0 0 1-22 0" stroke="#9e9e9e" strokeWidth="2.5" fill="none" />
      <circle cx="16" cy="16" r="3.2" fill="#f37726" />
    </svg>
  );
}

function ColabMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="13" cy="16" r="7.5" fill="none" stroke="#f9ab00" strokeWidth="3" />
      <circle cx="21" cy="16" r="4.5" fill="#e37400" />
    </svg>
  );
}

function PycharmMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="2" fill="#21d789" />
      <path d="M28 4v24H15L28 4z" fill="#fe2857" />
      <rect x="9" y="19" width="8" height="6" fill="#0f0e0c" />
    </svg>
  );
}

function VscodeMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M22 3 10 13 5 9l-3 2 5 5-5 5 3 2 5-4 12 10 6-3V6z" fill="#0078d4" />
    </svg>
  );
}

function PowerBiMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="3" y="8" width="9" height="21" rx="1.5" fill="#e6ad10" />
      <rect x="14" y="3" width="9" height="26" rx="1.5" fill="#f2c811" />
      <rect x="25" y="13" width="4" height="16" rx="1.5" fill="#e6ad10" />
    </svg>
  );
}

function ExcelMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="10" y="4" width="19" height="24" rx="2" fill="#21a366" />
      <rect x="10" y="4" width="9.5" height="24" fill="#107c41" />
      <path d="M2 12h10v10H2a1 1 0 0 1-1-1V13a1 1 0 0 1 1-1z" fill="#185c37" />
      <path
        d="M4.5 14.5h2l1.7 3 1.7-3h2L9.2 18l2.7 4.5h-2L8.2 19.6l-1.7 2.9h-2L7.2 18z"
        fill="#fff"
      />
    </svg>
  );
}

function TableauMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <g fill="#e8762d">
        <rect x="14.4" y="6" width="3.2" height="11" rx=".6" />
        <rect x="10.5" y="9.9" width="11" height="3.2" rx=".6" />
      </g>
      <g fill="#5b879b">
        <rect x="14.4" y="18" width="3.2" height="8" rx=".6" />
        <rect x="12" y="20.4" width="8" height="3.2" rx=".6" />
      </g>
      <g fill="#5c6692">
        <rect x="3.5" y="12" width="2.6" height="8" rx=".5" />
        <rect x=".8" y="14.7" width="8" height="2.6" rx=".5" />
      </g>
      <g fill="#eb912d">
        <rect x="25.9" y="12" width="2.6" height="8" rx=".5" />
        <rect x="23.2" y="14.7" width="8" height="2.6" rx=".5" />
      </g>
      <g fill="#7099a6">
        <rect x="7.6" y="22.8" width="2.2" height="6" rx=".5" />
        <rect x="5.7" y="24.7" width="6" height="2.2" rx=".5" />
      </g>
      <g fill="#c72035">
        <rect x="22.2" y="22.8" width="2.2" height="6" rx=".5" />
        <rect x="20.3" y="24.7" width="6" height="2.2" rx=".5" />
      </g>
      <g fill="#1f447e">
        <rect x="7.6" y="3.2" width="2.2" height="6" rx=".5" />
        <rect x="5.7" y="5.1" width="6" height="2.2" rx=".5" />
      </g>
    </svg>
  );
}

function WekaMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="12" fill="none" stroke="#4d82b8" strokeWidth="2.4" />
      <circle cx="12" cy="13" r="4.4" fill="#4d82b8" />
      <circle cx="21" cy="19" r="3" fill="#76b7e4" />
    </svg>
  );
}

function StarumlMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="10" fill="none" stroke="#8ca6c8" strokeWidth="2" />
      <path d="M16 4v24M4 16h24M7 7l18 18M25 7 7 25" stroke="#4a6687" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="3" fill="#8ca6c8" />
    </svg>
  );
}

function FijiMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="3" fill="none" stroke="#7fb3d5" strokeWidth="2" />
      <circle cx="12" cy="13" r="4" fill="#f9c440" />
      <circle cx="20" cy="19" r="5" fill="#2f6db3" opacity=".85" />
    </svg>
  );
}

function CvatMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M5 6l7 4 9-5 6 8-8 7 3 9-10-3-4 5-5-9z"
        fill="none"
        stroke="#f9c440"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LabelStudioMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="8" width="18" height="4" rx="2" fill="#ffd600" />
      <rect x="8" y="15" width="20" height="4" rx="2" fill="#ffd600" opacity=".75" />
      <rect x="4" y="22" width="13" height="4" rx="2" fill="#ffd600" opacity=".5" />
    </svg>
  );
}

const HAND: Record<string, LogoComp> = {
  numpy: NumPyMark,
  pandas: PandasMark,
  matplotlib: MatplotlibMark,
  seaborn: SeabornMark,
  scikitlearn: SklearnMark,
  tensorflow: TensorflowMark,
  pytorch: PytorchMark,
  opencv: OpencvMark,
  jupyter: JupyterMark,
  colab: ColabMark,
  pycharm: PycharmMark,
  vscode: VscodeMark,
  powerbi: PowerBiMark,
  excel: ExcelMark,
  tableau: TableauMark,
  weka: WekaMark,
  staruml: StarumlMark,
  fiji: FijiMark,
  cvat: CvatMark,
  labelstudio: LabelStudioMark,
};

/** Registry lookup — any unlisted logo key falls back to a chart-line glyph. */
function resolve(logo: string): { Comp: LogoComp; color?: string } {
  if (HAND[logo]) return { Comp: HAND[logo] };
  if (LOGOS[logo]) return LOGOS[logo];
  return { Comp: ChartLine };
}

/**
 * Interactive skill tile: logo + name, lifts and glows ember on hover.
 * The ember accent keeps the monochrome ink palette coherent.
 */
export function SkillTile({ name, logo, index }: { name: string; logo: string; index: number }) {
  const { Comp, color } = resolve(logo);
  const [hover, setHover] = useState(false);
  const tint = hover ? "var(--primary)" : color || "currentColor";

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="panel group relative flex flex-col items-center gap-3 px-3 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-muted"
    >
      <span className="absolute left-2 top-2 font-mono2 text-[9px] tracking-widest text-muted-foreground/50">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className="grid h-12 w-12 place-items-center transition-transform duration-300 group-hover:scale-110"
        style={{ color: tint }}
      >
        <Comp className="h-10 w-10" />
      </span>
      <span className="text-center text-xs font-medium tracking-wide text-foreground/90 transition-colors group-hover:text-foreground">
        {name}
      </span>
    </div>
  );
}

export default SkillTile;
