"use client";

import { motion } from "framer-motion";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <motion.a
      href={product.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index, 8) * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="sweep group flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.02] transition-colors hover:border-white/60"
    >
      <div className="relative aspect-square overflow-hidden bg-white/[0.03]">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.3em] text-white/25">
            No Image
          </div>
        )}

        {product.hot && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black">
            Hot
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
          {product.brand ? `${product.brand} · ` : ""}
          {product.category}
        </span>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-black tabular-nums">
            {product.price > 0 ? `€${product.price}` : "—"}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 transition-all group-hover:gap-2 group-hover:text-white">
            Link <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </motion.a>
  );
}
