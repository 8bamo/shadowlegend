"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Outfit } from "@/lib/outfits";

export default function OutfitCard({
  outfit,
  index,
}: {
  outfit: Outfit;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: (index % 2) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      className="sweep group relative overflow-hidden rounded-3xl border border-white/12 transition-colors hover:border-white/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {outfit.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={outfit.image}
            alt={outfit.title}
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div className="grid-bg h-full w-full opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-5 left-6">
          <h2 className="text-3xl font-black uppercase leading-none tracking-tighter">
            {outfit.title}
          </h2>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/50">
            {outfit.vibe}
          </p>
        </div>
      </div>

      <ul className="divide-y divide-white/8">
        {outfit.pieces.map((piece) => (
          <li key={piece.name}>
            <Link
              href={piece.link}
              className="flex items-center justify-between px-6 py-4 text-sm text-white/65 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              {piece.name}
              <span aria-hidden className="text-white/30">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
