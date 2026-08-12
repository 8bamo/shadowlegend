"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/outfits", label: "Outfits" },
  { href: "/sellers", label: "Sellers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="marquee overflow-hidden border-b border-white/15 bg-white text-black">
        <div className="marquee-track py-1.5 text-[11px] font-bold uppercase tracking-[0.28em]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="px-6 whitespace-nowrap">
              {SITE.name} · Daily Finds · Direct Links · No Bullshit ·
            </span>
          ))}
        </div>
      </div>

      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="glitch text-lg font-black uppercase tracking-[0.2em]"
            data-text={SITE.name}
          >
            {SITE.name}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <a
              href={SITE.linktree}
              target="_blank"
              rel="noreferrer"
              className="sweep rounded-full border border-white px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:bg-white hover:text-black"
            >
              Linktree
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>

        <motion.div
          animate={{ height: open ? "auto" : 0 }}
          initial={false}
          className="overflow-hidden border-t border-white/10 bg-black/95 md:hidden"
        >
          <div className="flex flex-col gap-1 px-5 py-4">
            {[...LINKS, { href: SITE.linktree, label: "Linktree" }].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>

      <motion.div
        style={{ scaleX: progress }}
        className="h-[2px] origin-left bg-white"
      />
    </header>
  );
}
