import Link from "next/link";
import Reveal from "@/components/Reveal";
import OutfitCard from "@/components/OutfitCard";
import { OUTFITS } from "@/lib/outfits";

export const metadata = { title: "Outfit Inspiration — SHADOWLEGEND" };

export default function OutfitsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-40">
      <Reveal className="mb-14">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
          Inspiration
        </p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
          Outfit
          <br />
          <span className="text-transparent [-webkit-text-stroke:1.5px_white]">
            Inspiration
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/50">
          Fertige Kombinationen zum Nachbauen. Jedes Teil führt in die
          Produktliste.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {OUTFITS.map((outfit, i) => (
          <OutfitCard key={outfit.title} outfit={outfit} index={i} />
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-16 rounded-3xl border border-dashed border-white/15 p-10 text-center">
          <p className="text-sm text-white/50">
            Mehr Fits gibt es täglich in meinen Channels.
          </p>
          <Link
            href="/contact"
            className="sweep mt-6 inline-block rounded-full border border-white px-9 py-4 text-xs font-black uppercase tracking-[0.25em] transition-colors hover:bg-white hover:text-black"
          >
            Folgen
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
