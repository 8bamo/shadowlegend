"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SITE } from "@/lib/site";

const WORDS = ["SHADOW", "LEGEND"];

export default function Hero({ count }: { count: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-32"
    >
      <div className="grid-bg absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#000_78%)]" />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-7xl px-5"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-[11px] font-bold uppercase tracking-[0.4em] text-white/50"
        >
          {SITE.tagline}
        </motion.p>

        <h1 className="text-[13vw] font-black uppercase leading-[0.82] tracking-tighter md:text-[9vw]">
          {WORDS.map((word, wi) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + wi * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`block ${
                  wi === 1
                    ? "text-transparent [-webkit-text-stroke:1.5px_white]"
                    : ""
                }`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/60"
        >
          {count > 0 ? `${count} curated finds` : "Curated finds"} — every entry
          takes you straight to the link. No searching, no guessing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/products"
            className="sweep rounded-full bg-white px-9 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition-transform hover:scale-[1.03]"
          >
            All Products
          </Link>
          <a
            href={SITE.linktree}
            target="_blank"
            rel="noreferrer"
            className="sweep rounded-full border border-white/40 px-9 py-4 text-xs font-black uppercase tracking-[0.25em] transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            Linktree
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-white/30"
      >
        Scroll
      </motion.div>
    </section>
  );
}
