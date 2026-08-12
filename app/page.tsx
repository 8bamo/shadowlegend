import Link from "next/link";
import { readStore } from "@/lib/store";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import Albums from "@/components/Albums";
import { ALBUMS, albumFor } from "@/lib/categories";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const STEPS = [
  {
    title: "Find",
    text: "Search the list or filter by category.",
  },
  {
    title: "Click",
    text: "The link takes you straight to the item at the agent.",
  },
  {
    title: "Order",
    text: "Add to cart, ship it, done.",
  },
];

export default async function HomePage() {
  const { products } = await readStore();
  const hot = products.filter((p) => p.hot).slice(0, 10);
  const featured = (hot.length > 0 ? hot : products).slice(0, 10);
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))]
    .slice(0, 18) as string[];

  const counts: Record<string, number> = {};
  const covers: Record<string, string> = {};
  for (const album of ALBUMS) counts[album.slug] = 0;
  for (const product of products) {
    const slug = albumFor(product.category);
    if (!slug) continue;
    counts[slug] += 1;
    if (!covers[slug] && product.image) covers[slug] = product.image;
  }

  return (
    <>
      <Hero count={products.length} />

      {/* Ticker */}
      <div className="marquee overflow-hidden border-y border-white/10 bg-white text-black">
        <div className="marquee-track py-3 text-2xl font-black uppercase tracking-tight md:text-4xl">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap px-6">
              Daily Drops ✦ Direct Links ✦ Best Prices ✦
            </span>
          ))}
        </div>
      </div>

      {/* Albums */}
      <section id="albums" className="mx-auto max-w-7xl px-5 py-24">
        <Reveal className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
            Categories
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tighter md:text-6xl">
            Shop By Album
          </h2>
        </Reveal>
        <Albums counts={counts} covers={covers} />
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter md:text-6xl">
            Hot
            <br />
            Products
          </h2>
          <Link
            href="/products"
            className="group shrink-0 text-xs font-bold uppercase tracking-[0.25em] text-white/60 hover:text-white"
          >
            View all
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>

        {featured.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 px-6 py-20 text-center text-sm text-white/40">
            No products imported yet. Upload a spreadsheet in the{" "}
            <Link href="/backend" className="underline">
              Backend
            </Link>{" "}
            to get started.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Brands */}
      {brands.length > 0 && (
        <section id="brands" className="border-y border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-5">
            <Reveal>
              <p className="mb-8 text-xs uppercase tracking-[0.35em] text-white/40">
                Brands
              </p>
            </Reveal>
            <div className="flex flex-wrap gap-3">
              {brands.map((brand, i) => (
                <Reveal key={brand} delay={i * 0.03}>
                  <Link
                    href={`/products?q=${encodeURIComponent(brand)}`}
                    className="sweep block rounded-full border border-white/20 px-6 py-2.5 text-sm font-bold uppercase tracking-[0.15em] text-white/70 transition-colors hover:border-white hover:bg-white hover:text-black"
                  >
                    {brand}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How to */}
      <section id="how" className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <h2 className="mb-14 text-4xl font-black uppercase tracking-tighter md:text-6xl">
            How To Order
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12}>
              <div className="group h-full rounded-2xl border border-white/12 p-8 transition-colors hover:border-white/60">
                <span className="block text-6xl font-black text-white/15 transition-colors group-hover:text-white">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-xl font-black uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-y border-white/10 py-28">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <Reveal className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-7xl">
            Ready?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-white/50">
            All links, coupons and guides in one place.
          </p>
          <a
            href={SITE.linktree}
            target="_blank"
            rel="noreferrer"
            className="sweep mt-10 inline-block rounded-full bg-white px-12 py-5 text-xs font-black uppercase tracking-[0.3em] text-black transition-transform hover:scale-105"
          >
            Open Linktree
          </a>
        </Reveal>
      </section>
    </>
  );
}
