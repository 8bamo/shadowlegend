export type Seller = {
  name: string;
  focus: string;
  rating: number; // 1–5
  note: string;
  link: string;
};

/** Edit this list to change the seller overview on /sellers. */
export const SELLERS: Seller[] = [
  {
    name: "Kaisen",
    focus: "Sneaker",
    rating: 5,
    note: "Clean QC pictures, ships to the warehouse fast.",
    link: "",
  },
  {
    name: "Muks",
    focus: "Tracksuits & Hoodies",
    rating: 5,
    note: "Good fabric, sizes run true.",
    link: "",
  },
  {
    name: "Top Goods",
    focus: "Jackets",
    rating: 4,
    note: "Strong value, occasionally longer processing time.",
    link: "",
  },
  {
    name: "Sun Store",
    focus: "Accessories",
    rating: 4,
    note: "Caps, bags, socks — reliable for small items.",
    link: "",
  },
];
