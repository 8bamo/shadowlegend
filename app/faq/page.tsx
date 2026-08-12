import Reveal from "@/components/Reveal";
import Accordion from "@/components/Accordion";
import { SITE } from "@/lib/site";

export const metadata = { title: "FAQ — SHADOWLEGEND" };

const FAQ = [
  {
    q: "What is SHADOWLEGEND?",
    a: "A curated link list. I collect finds, check quality and price, and post them here with a direct link — so you don't have to search.",
  },
  {
    q: "How do I order?",
    a: "Click a product and you land directly on the item at the agent. Add it to your cart, pay, and ship it later from the warehouse.",
  },
  {
    q: "Which agent should I use?",
    a: "Use the agent you trust. Current recommendations and sign-up links are in my Linktree — with a different agent you'll have to convert the item link yourself.",
  },
  {
    q: "How long does shipping take?",
    a: "From the seller to the warehouse usually takes 3–7 days. International shipping typically runs 7–20 days depending on the line.",
  },
  {
    q: "What does shipping cost?",
    a: "It depends on weight, volume and shipping line. Rough guide: 1.5–2 kg often lands between €20 and €40. You can compare lines in the warehouse.",
  },
  {
    q: "What is QC?",
    a: "Quality Check — photos of your item taken in the warehouse before you ship. Always look at them: if something is off, you can complain or return it.",
  },
  {
    q: "Are the prices on this site accurate?",
    a: "Prices are snapshots from my list. Sellers change them — the price on the destination page is always the one that counts.",
  },
  {
    q: "Which size should I take?",
    a: "Asian sizes usually run small. Go one size up and follow the seller's measurement chart rather than the label.",
  },
  {
    q: "A link is dead — what now?",
    a: "Sellers take items offline. Message me through the Linktree and I'll find a replacement and update the list.",
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
            Question not covered? Message me directly.
          </p>
          <a
            href={SITE.linktree}
            target="_blank"
            rel="noreferrer"
            className="sweep mt-6 inline-block rounded-full bg-white px-9 py-4 text-xs font-black uppercase tracking-[0.25em] text-black transition-transform hover:scale-105"
          >
            Contact
          </a>
        </div>
      </Reveal>
    </div>
  );
}
