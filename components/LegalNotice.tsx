"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

const D = SITE.domain;

const SECTIONS = [
  {
    title: "Independence from mulebuy.com",
    body: `The website ${D} is an independent platform with no affiliation to or endorsement from the mulebuy.com website or brand. Our platform solely facilitates the discovery of products available on the mulebuy website and is intended strictly for private users. ${D} is not a marketplace and does not offer any products for sale.`,
  },
  {
    title: "No Trading Activities",
    body: `This website does not sell physical products and is not involved in any trading activities. The sole purpose of ${D} is to provide information to visitors. We do not act as an intermediary or participate in any supply chain.`,
  },
  {
    title: "No Advice or Recommendations",
    body: `The information provided on ${D} is not intended as advice of any kind. We neither endorse nor recommend the purchase of any products. Any purchasing decisions are made solely at the user's own discretion and risk. Product names and their identification are presented solely for informational purposes, and ${D} maintains no affiliations with any mentioned products or brands.`,
  },
  {
    title: "Affiliate Disclosure",
    body: "This website contains affiliate links, through which we may earn a small commission for facilitating parcel shipping. We do not earn commissions on individual product sales. These commissions support the maintenance and development of our website at no additional cost to you. We appreciate your support.",
  },
  {
    title: "Disclaimer for External Content",
    body: `Content on external websites is beyond our control, and we accept no responsibility for it. ${D} has no association with Weidian.com, Taobao.com, 1688.com, tmall.com, or any other online shopping platforms.`,
  },
  {
    title: "Important",
    body: `Please note that ${D} does not control the authenticity, legality, or quality of the products sold on these marketplaces. The responsibility for these factors rests solely with the sellers and the platforms themselves. We strongly advise users to conduct thorough research and exercise caution when making purchases. ${D} is not liable for any counterfeit, misrepresented, or otherwise unsatisfactory items encountered on these marketplaces.`,
  },
];

export default function LegalNotice() {
  const [open, setOpen] = useState(true);

  return (
    <section
      id="legal"
      className="border-t border-white/10 bg-white/[0.015] px-5 py-10"
    >
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group flex w-full items-center gap-4 text-left"
        >
          <span className="flex-1 text-[11px] font-bold uppercase tracking-[0.3em] text-white/45 transition-colors group-hover:text-white">
            Legal Notice and Disclaimer
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden
            className="text-xl font-light text-white/40 group-hover:text-white"
          >
            +
          </motion.span>
        </button>

        {/* Always mounted so the disclaimer stays in the markup — the toggle
            only collapses it visually. */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!open}
          className="overflow-hidden"
        >
          <div className="grid gap-6 pt-8 md:grid-cols-2">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                  {section.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/40">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
