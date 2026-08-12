"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.05 }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center gap-6 py-6 text-left"
            >
              <span className="text-xs tabular-nums text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-lg font-bold uppercase tracking-tight transition-colors group-hover:text-white md:text-xl">
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-light text-white/50 group-hover:text-white"
                aria-hidden
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-12 text-sm leading-relaxed text-white/55">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
