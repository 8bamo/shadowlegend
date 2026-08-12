import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3">
        <div>
          <p className="text-2xl font-black uppercase tracking-[0.2em]">
            {SITE.name}
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/50">
            Kuratierte Finds, direkte Links, keine Umwege. Alles schwarz auf
            weiß.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-xs uppercase tracking-[0.25em] text-white/40">
            Navigation
          </span>
          <Link href="/products" className="w-fit text-white/70 hover:text-white">
            Alle Produkte
          </Link>
          <Link href="/outfits" className="w-fit text-white/70 hover:text-white">
            Outfit Inspiration
          </Link>
          <Link href="/sellers" className="w-fit text-white/70 hover:text-white">
            Seller List
          </Link>
          <Link href="/faq" className="w-fit text-white/70 hover:text-white">
            FAQ
          </Link>
          <Link href="/contact" className="w-fit text-white/70 hover:text-white">
            Kontakt
          </Link>
          <Link href="/backend" className="w-fit text-white/40 hover:text-white">
            Backend
          </Link>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="text-xs uppercase tracking-[0.25em] text-white/40">
            Links
          </span>
          <a
            href={SITE.linktree}
            target="_blank"
            rel="noreferrer"
            className="w-fit text-white/70 hover:text-white"
          >
            Linktree
          </a>
          <a
            href={SITE.mulebuy}
            target="_blank"
            rel="noreferrer"
            className="w-fit text-white/70 hover:text-white"
          >
            Mulebuy
          </a>
        </div>
      </div>

      <p className="select-none whitespace-nowrap text-center text-[18vw] font-black leading-[0.8] tracking-tighter text-white/[0.04]">
        {SITE.name}
      </p>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/30">
        © {new Date().getFullYear()} {SITE.name}. Alle Preise ohne Gewähr.
      </div>
    </footer>
  );
}
