import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

/** Shared chrome: plain background + nav + routed page + footer. */
export default function PageShell() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
