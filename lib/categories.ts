/** The four albums shown on the homepage. Each maps loosely onto the raw
 *  category values coming from the Excel import. */
export const ALBUMS = [
  {
    slug: "shoes",
    title: "Shoes",
    match: ["shoes", "schuhe", "sneaker", "sneakers", "slides", "boots", "footwear"],
  },
  {
    slug: "pants",
    title: "Pants",
    match: ["pants", "hosen", "hose", "shorts", "jeans", "trousers", "cargo"],
  },
  {
    slug: "tops",
    title: "Tops",
    match: [
      "tops",
      "oberteile",
      "t-shirts",
      "tshirt",
      "shirt",
      "hoodies",
      "hoodie",
      "sweater",
      "jackets",
      "jacken",
      "jacket",
      "vests",
      "tracksuits",
      "longsleeve",
    ],
  },
  {
    slug: "accessories",
    title: "Accessories",
    match: [
      "accessories",
      "accessoires",
      "hats",
      "cap",
      "caps",
      "bags",
      "bag",
      "belt",
      "belts",
      "socks",
      "jewelry",
      "glasses",
      "watch",
      "watches",
    ],
  },
] as const;

export type AlbumSlug = (typeof ALBUMS)[number]["slug"];

const norm = (s: string) => s.toLowerCase().trim();

export function albumFor(category: string): AlbumSlug | null {
  const c = norm(category);
  for (const album of ALBUMS) {
    if (album.match.some((m) => c === m || c.includes(m))) return album.slug;
  }
  return null;
}

export function getAlbum(slug: string) {
  return ALBUMS.find((a) => a.slug === slug) ?? null;
}
