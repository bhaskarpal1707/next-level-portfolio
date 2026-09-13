import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cursor from "./Cursor";
import ScrollProgress from "./ScrollProgress";

/** Shared chrome: animated background layers + nav + routed page + footer. */
export default function PageShell() {
  return (
    <div className="relative min-h-screen">
      {/* background layers */}
      <div className="aurora-bg" aria-hidden />
      <div className="grid-overlay" aria-hidden />
      <div
        className="beam left-[12%] hidden md:block"
        style={{ animationDelay: "0s" }}
        aria-hidden
      />
      <div
        className="beam left-[38%] hidden md:block"
        style={{ animationDelay: "3.2s" }}
        aria-hidden
      />
      <div
        className="beam left-[71%] hidden md:block"
        style={{ animationDelay: "5.6s" }}
        aria-hidden
      />
      <div
        className="beam left-[88%] hidden lg:block"
        style={{ animationDelay: "1.8s" }}
        aria-hidden
      />

      <Cursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
