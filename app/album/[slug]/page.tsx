import { notFound } from "next/navigation";
import { readStore } from "@/lib/store";
import { ALBUMS, albumFor, getAlbum } from "@/lib/categories";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return ALBUMS.map((a) => ({ slug: a.slug }));
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = getAlbum(slug);
  if (!album) notFound();

  const { products } = await readStore();
  const items = products.filter((p) => albumFor(p.category) === album.slug);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-40">
      <Reveal className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
          Album
        </p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
          {album.title}
        </h1>
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/40">
          {items.length} Items
        </p>
      </Reveal>

      <ProductGrid products={items} />
    </div>
  );
}
