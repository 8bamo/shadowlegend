"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Trailing ring that inverts whatever it passes over. Pointer devices only. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [big, setBig] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
      const el = e.target as HTMLElement | null;
      setBig(Boolean(el?.closest("a, button, input, [data-cursor]")));
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      animate={{ scale: big ? 1.9 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-white mix-blend-difference"
    />
  );
}
