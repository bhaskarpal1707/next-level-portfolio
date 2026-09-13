import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Atmosphere from "./Atmosphere";

/** Shared chrome: atmosphere layer + nav + routed page + footer. */
export default function PageShell() {
  return (
    <div className="relative min-h-screen">
      <Atmosphere />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
