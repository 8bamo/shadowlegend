"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ALBUMS } from "@/lib/categories";

export default function Albums({
  counts,
  covers,
}: {
  counts: Record<string, number>;
  covers: Record<string, string>;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {ALBUMS.map((album, i) => (
        <motion.div
          key={album.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href={`/album/${album.slug}`}
            className="sweep group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl border border-white/12 p-5 transition-colors hover:border-white"
          >
            {covers[album.slug] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={covers[album.slug]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
              />
            ) : (
              <div className="grid-bg absolute inset-0 opacity-60" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="relative">
              <h3 className="text-2xl font-black uppercase leading-none tracking-tighter md:text-3xl">
                {album.title}
              </h3>
              <p className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 transition-all group-hover:gap-3 group-hover:text-white">
                {counts[album.slug] ?? 0} Items
                <span aria-hidden>→</span>
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
