import { motion, useScroll, useSpring } from "framer-motion";

/** Gradient scroll-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />;
}
