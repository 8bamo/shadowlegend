import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata = { title: "Contact — SHADOWLEGEND" };

const CHANNELS = [
  {
    label: "Linktree",
    value: "All links in one place",
    href: SITE.linktree,
  },
];

export default function ContactPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-40">
      <Reveal className="mb-14">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
          Say hi
        </p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
          Con
          <span className="text-transparent [-webkit-text-stroke:1.5px_white]">
            tact
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/50">
          Questions about a product, a dead link, a collab, or a find you want
          me to add — write me. I usually reply within 24 hours.
        </p>
      </Reveal>

      <div className="grid gap-4">
        {CHANNELS.map((channel, i) => (
          <Reveal key={channel.label} delay={i * 0.08}>
            <a
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className="sweep group flex h-full flex-col justify-between rounded-3xl border border-white/12 p-8 transition-colors hover:border-white"
            >
              <span className="text-3xl font-black uppercase tracking-tighter">
                {channel.label}
              </span>
              <span className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/45 transition-all group-hover:gap-3 group-hover:text-white">
                {channel.value}
                <span aria-hidden>→</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-6 rounded-3xl border border-white/12 p-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            Before you write
          </p>
          <ul className="mt-5 space-y-3 text-sm text-white/55">
            <li className="flex gap-3">
              <span className="text-white/25">01</span> Check the{" "}
              <a href="/faq" className="underline hover:text-white">
                FAQ
              </a>{" "}
              first — most questions are answered there.
            </li>
            <li className="flex gap-3">
              <span className="text-white/25">02</span> For product questions,
              include the link or a screenshot — it saves a lot of back and
              forth.
            </li>
            <li className="flex gap-3">
              <span className="text-white/25">03</span> I am not an agent and I
              do not handle orders — payment and shipping always go through the
              agent.
            </li>
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
