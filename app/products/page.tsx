import { readStore } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export const metadata = { title: "Products — SHADOWLEGEND" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { products, updatedAt } = await readStore();
  const { q } = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-40">
      <Reveal className="mb-10">
        <h1 className="text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
          All
          <br />
          <span className="text-transparent [-webkit-text-stroke:1.5px_white]">
            Products
          </span>
        </h1>
        {updatedAt && (
          <p className="mt-5 text-xs uppercase tracking-[0.25em] text-white/35">
            Last updated:{" "}
            {new Date(updatedAt).toLocaleDateString("en-GB")}
          </p>
        )}
      </Reveal>

      <ProductGrid products={products} initialQuery={q ?? ""} />
    </div>
  );
}
