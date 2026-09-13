import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono2 text-[11px] uppercase tracking-[0.35em] text-teal-300/90">
        Signal lost
      </p>
      <h1 className="font-display mt-4 text-[26vw] font-bold leading-none text-gradient sm:text-9xl">
        404
      </h1>
      <p className="mt-4 max-w-md text-sm text-slate-400">
        This route drifted out of orbit. The page you're looking for doesn't exist —
        but the rest of the constellation is intact.
      </p>
      <Link
        to="/"
        className="btn-neon mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold text-teal-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to base
      </Link>
    </div>
  );
}
