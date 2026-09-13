import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col items-start justify-center px-6 text-left sm:px-10">
      <div className="flex w-full flex-wrap items-center justify-between gap-2 border-b border-border pb-3 font-mono2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span className="text-primary">ERROR 404</span>
        <span>FILE NOT FOUND</span>
        <span className="hidden sm:inline">STATE: UNRECOVERABLE</span>
      </div>
      <h1 className="font-display mt-10 text-7xl font-semibold tracking-tight sm:text-9xl">
        4<span className="text-primary">0</span>4
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        This route doesn't exist in the file. The rest of the dataset is intact —
        head back home and keep browsing.
      </p>
      <Link
        to="/"
        className="btn-primary group mt-8 inline-flex items-center gap-2 rounded-md px-5 py-3 font-display text-sm font-semibold text-foreground"
      >
        <ArrowLeft className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-x-1" />
        Back to base
      </Link>
    </div>
  );
}
