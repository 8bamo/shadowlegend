import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import { SITE } from "@/lib/site";

export const metadata = { title: "FAQ — SHADOWLEGEND" };

const FAQ = [
  {
    q: "Was ist SHADOWLEGEND?",
    a: "Eine kuratierte Linkliste. Ich sammle Finds, prüfe Qualität und Preis und stelle sie hier mit direktem Link ein — du sparst dir das Suchen.",
  },
  {
    q: "Wie bestelle ich?",
    a: "Produkt anklicken, du landest direkt beim Artikel beim Agent. Dort in den Warenkorb legen, bezahlen und später den Versand (Shipping) auslösen.",
  },
  {
    q: "Welchen Agent soll ich nehmen?",
    a: "Nimm den Agent deines Vertrauens. Die aktuellen Empfehlungen und Sign-Up-Links findest du in meinem Linktree — bei einem anderen Agent musst du den Artikel-Link selbst konvertieren.",
  },
  {
    q: "Wie lange dauert der Versand?",
    a: "Vom Verkäufer ins Warehouse meist 3–7 Tage. Der internationale Versand dauert je nach Linie typischerweise 7–20 Tage.",
  },
  {
    q: "Was kostet der Versand?",
    a: "Hängt an Gewicht, Volumen und Versandlinie. Grober Richtwert: 1,5–2 kg landen oft bei 20–40 €. Im Warehouse kannst du die Linien vergleichen.",
  },
  {
    q: "Was ist QC?",
    a: "Quality Check — Fotos deines Artikels im Warehouse, bevor du versendest. Immer anschauen: bei Mängeln kannst du reklamieren oder zurückgeben.",
  },
  {
    q: "Stimmen die Preise auf der Seite?",
    a: "Die Preise sind Momentaufnahmen aus meiner Liste. Verkäufer ändern Preise — maßgeblich ist immer der Preis auf der Zielseite.",
  },
  {
    q: "Welche Größe soll ich nehmen?",
    a: "Asiatische Größen fallen meist kleiner aus. Nimm eine Nummer größer und richte dich nach der Maßtabelle des Verkäufers, nicht nach dem Label.",
  },
  {
    q: "Ein Link geht nicht mehr — was tun?",
    a: "Verkäufer nehmen Artikel offline. Schreib mir über den Linktree, dann suche ich Ersatz und aktualisiere die Liste.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-40">
      <Reveal className="mb-14">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
          Support
        </p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
          F<span className="text-transparent [-webkit-text-stroke:1.5px_white]">A</span>Q
        </h1>
      </Reveal>

      <Accordion items={FAQ} />

      <Reveal delay={0.2}>
        <div className="mt-16 rounded-3xl border border-white/15 p-8 text-center">
          <p className="text-sm text-white/50">
            Frage nicht dabei? Schreib mir direkt.
          </p>
          <a
            href={SITE.linktree}
            target="_blank"
            rel="noreferrer"
            className="sweep mt-6 inline-block rounded-full bg-white px-9 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition-transform hover:scale-105"
          >
            Kontakt
          </a>
        </div>
      </Reveal>
    </div>
  );
}
