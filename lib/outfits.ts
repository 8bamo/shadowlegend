export type Outfit = {
  title: string;
  vibe: string;
  image: string;
  /** Product names / links that make up the fit. */
  pieces: { name: string; link: string }[];
};

/** Editiere diese Liste, um die Outfit-Inspiration auf /outfits zu ändern. */
export const OUTFITS: Outfit[] = [
  {
    title: "All Black Everything",
    vibe: "Clean, dunkel, funktioniert immer",
    image: "",
    pieces: [
      { name: "Tech Fleece Hoodie Black", link: "/products?q=hoodie" },
      { name: "Cargo Pants Black", link: "/products?q=cargo" },
      { name: "Runner Sneaker Black", link: "/products?q=sneaker" },
    ],
  },
  {
    title: "Monochrome Street",
    vibe: "Weiß auf Schwarz, harte Kanten",
    image: "",
    pieces: [
      { name: "Oversized Tee White", link: "/products?q=tee" },
      { name: "Denim Baggy Black", link: "/products?q=jeans" },
      { name: "Canvas Cap", link: "/products?q=cap" },
    ],
  },
  {
    title: "Winter Layers",
    vibe: "Puffer über Hoodie, warm und breit",
    image: "",
    pieces: [
      { name: "Puffer Jacket Black", link: "/products?q=jacket" },
      { name: "Heavy Hoodie Grey", link: "/products?q=hoodie" },
      { name: "Beanie", link: "/products?q=beanie" },
    ],
  },
  {
    title: "Tracksuit Season",
    vibe: "Ein Set, null Aufwand",
    image: "",
    pieces: [
      { name: "Full Tracksuit", link: "/products?q=tracksuit" },
      { name: "Low Sneaker White", link: "/products?q=sneaker" },
      { name: "Crossbody Bag", link: "/products?q=bag" },
    ],
  },
];
