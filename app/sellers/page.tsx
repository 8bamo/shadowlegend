import Reveal from "@/components/Reveal";
import { SELLERS } from "@/lib/sellers";
import { SITE } from "@/lib/site";

export const metadata = { title: "Seller List — SHADOWLEGEND" };

export default function SellersPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-40">
      <Reveal className="mb-14">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
          Trusted
        </p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
          Seller
          <br />
          <span className="text-transparent [-webkit-text-stroke:1.5px_white]">
            List
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/50">
          Verkäufer, mit denen ich selbst bestellt habe. Bewertung nach
          Qualität, Kommunikation und Bearbeitungszeit.
        </p>
      </Reveal>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {SELLERS.map((seller, i) => (
          <Reveal key={seller.name} delay={i * 0.06}>
            <div className="group flex flex-wrap items-center gap-4 py-7 transition-colors hover:bg-white/[0.03]">
              <span className="w-10 text-xs tabular-nums text-white/25">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-[180px] flex-1">
                <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">
                  {seller.name}
                </h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/40">
                  {seller.focus}
                </p>
              </div>

              <p className="min-w-[200px] flex-[2] text-sm text-white/50">
                {seller.note}
              </p>

              <div
                className="text-sm tracking-[0.2em] text-white"
                aria-label={`${seller.rating} von 5`}
              >
                {"★".repeat(seller.rating)}
                <span className="text-white/20">
                  {"★".repeat(5 - seller.rating)}
                </span>
              </div>

              {seller.link && (
                <a
                  href={seller.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/25 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  Store
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-10 text-xs leading-relaxed text-white/35">
          Ich verdiene an manchen Links eine kleine Provision — für dich ändert
          sich am Preis nichts. Alle Bewertungen basieren auf eigenen
          Bestellungen. Aktuelle Links immer im{" "}
          <a
            href={SITE.linktree}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-white"
          >
            Linktree
          </a>
          .
        </p>
      </Reveal>
    </div>
  );
}
