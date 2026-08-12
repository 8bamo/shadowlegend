export type Outfit = {
  title: string;
  vibe: string;
  image: string;
  /** Product names / links that make up the fit. */
  pieces: { name: string; link: string }[];
};

/** Edit this list to change the outfit inspiration shown on /outfits. */
export const OUTFITS: Outfit[] = [
  {
    title: "All Black Everything",
    vibe: "Clean, dark, always works",
    image: "",
    pieces: [
      { name: "Tech Fleece Hoodie Black", link: "/products?q=hoodie" },
      { name: "Cargo Pants Black", link: "/products?q=cargo" },
      { name: "Runner Sneaker Black", link: "/products?q=sneaker" },
    ],
  },
  {
    title: "Monochrome Street",
    vibe: "White on black, hard edges",
    image: "",
    pieces: [
      { name: "Oversized Tee White", link: "/products?q=tee" },
      { name: "Denim Baggy Black", link: "/products?q=jeans" },
      { name: "Canvas Cap", link: "/products?q=cap" },
    ],
  },
  {
    title: "Winter Layers",
    vibe: "Puffer over hoodie, warm and wide",
    image: "",
    pieces: [
      { name: "Puffer Jacket Black", link: "/products?q=jacket" },
      { name: "Heavy Hoodie Grey", link: "/products?q=hoodie" },
      { name: "Beanie", link: "/products?q=beanie" },
    ],
  },
  {
    title: "Tracksuit Season",
    vibe: "One set, zero effort",
    image: "",
    pieces: [
      { name: "Full Tracksuit", link: "/products?q=tracksuit" },
      { name: "Low Sneaker White", link: "/products?q=sneaker" },
      { name: "Crossbody Bag", link: "/products?q=bag" },
    ],
  },
];
