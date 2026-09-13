import { useState } from "react";
import { DiPython } from "react-icons/di";
import {
  SiMysql,
  SiPostgresql,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiJupyter,
  SiGooglecolab,
  SiGithub,
  SiPycharm,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbBrandMysql } from "react-icons/tb";
import {
  ChartLine,
  Boxes,
  Sigma,
  Network,
  Crosshair,
  Database,
  AudioWaveform,
  Table,
  FileSpreadsheet,
} from "lucide-react";

/**
 * Skill logo registry. Brand marks come from react-icons (Devicon /
 * Simple Icons / Tabler — bundled, no external requests). Marks that no
 * icon set ships anymore (Power BI, Excel, Tableau, Matplotlib, Seaborn,
 * Weka, StarUML, Fiji, CVAT, Label Studio) are hand-drawn inline SVGs in
 * the brands' own colors, so nothing can ever render as a broken image.
 */
const LOGOS: Record<
  string,
  { Comp: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color?: string }
> = {
  python: { Comp: DiPython, color: "#3776ab" },
  mysql: { Comp: SiMysql, color: "#4479a1" },
  postgresql: { Comp: SiPostgresql, color: "#4169e1" },
  numpy: { Comp: SiNumpy, color: "#4dabcf" },
  pandas: { Comp: SiPandas, color: "#150458" },
  scikitlearn: { Comp: SiScikitlearn, color: "#f89939" },
  tensorflow: { Comp: SiTensorflow, color: "#ff8f00" },
  pytorch: { Comp: SiPytorch, color: "#ee4c2c" },
  opencv: { Comp: SiOpencv, color: "#5c3ee8" },
  jupyter: { Comp: SiJupyter, color: "#f37726" },
  colab: { Comp: SiGooglecolab, color: "#f9ab00" },
  github: { Comp: SiGithub, color: "#ece9e2" },
  pycharm: { Comp: SiPycharm, color: "#21d789" },
  vscode: { Comp: VscVscode, color: "#0078d4" },
  "sql-engine": { Comp: TbBrandMysql, color: "#00758f" },

  // hand-drawn / icon-backed concepts
  sql: { Comp: Database },
  supervised: { Comp: Network },
  unsupervised: { Comp: Boxes },
  stats: { Comp: Sigma },
  validation: { Comp: Crosshair },
  librosa: { Comp: AudioWaveform },
  spreadsheet: { Comp: Table },
};

/* ── hand-drawn brand SVGs (not available in icon packs) ── */

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
      <path d="M4.5 14.5h2l1.7 3 1.7-3h2L9.2 18l2.7 4.5h-2L8.2 19.6l-1.7 2.9h-2L7.2 18z" fill="#fff" />
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

function MatplotlibMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M4 24c3-1 5-6 7-10s4-8 7-8 5 6 6 11 2 7 4 7" fill="none" stroke="#ece9e2" strokeWidth="2" strokeLinecap="round" />
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
      <path d="M5 6l7 4 9-5 6 8-8 7 3 9-10-3-4 5-5-9z" fill="none" stroke="#f9c440" strokeWidth="2" strokeLinejoin="round" />
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

const HAND: Record<string, React.ComponentType<{ className?: string }>> = {
  powerbi: PowerBiMark,
  excel: ExcelMark,
  tableau: TableauMark,
  matplotlib: MatplotlibMark,
  seaborn: SeabornMark,
  weka: WekaMark,
  staruml: StarumlMark,
  fiji: FijiMark,
  cvat: CvatMark,
  labelstudio: LabelStudioMark,
};

/** Registry lookup — any unlisted logo key falls back to a chart-line glyph. */
function resolve(logo: string) {
  if (HAND[logo]) return { kind: "hand" as const, Comp: HAND[logo], color: undefined };
  if (LOGOS[logo]) return { kind: "icon" as const, ...LOGOS[logo] };
  return { kind: "icon" as const, Comp: ChartLine, color: undefined };
}

/**
 * Interactive skill tile: logo + name, lifts and glows ember on hover.
 * The ember accent keeps the monochrome ink palette coherent.
 */
export function SkillTile({ name, logo, index }: { name: string; logo: string; index: number }) {
  const { kind, Comp, color } = resolve(logo);
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
