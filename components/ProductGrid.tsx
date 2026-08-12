"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

const PAGE = 24;

export default function ProductGrid({
  products,
  initialQuery = "",
}: {
  products: Product[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("Alle");
  const [limit, setLimit] = useState(PAGE);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["Alle", ...[...set].sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCat = category === "Alle" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.brand ?? "").toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [products, query, category]);

  const visible = filtered.slice(0, limit);

  return (
    <div>
      <div className="sticky top-[104px] z-30 -mx-5 mb-8 border-y border-white/10 bg-black/70 px-5 py-4 backdrop-blur-xl">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(PAGE);
          }}
          placeholder="Suchen — Name, Brand, Kategorie…"
          className="w-full rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-white"
        />

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setLimit(PAGE);
              }}
              className={`relative whitespace-nowrap rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                category === cat
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/60 hover:border-white/60 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/40">
        {filtered.length} Produkte
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 px-6 py-20 text-center text-sm text-white/40">
          Nichts gefunden. Andere Suche probieren.
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {limit < filtered.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setLimit((l) => l + PAGE)}
            className="sweep rounded-full border border-white px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] transition-colors hover:bg-white hover:text-black"
          >
            Mehr laden
          </button>
        </div>
      )}
    </div>
  );
}
