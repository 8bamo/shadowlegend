export type Seller = {
  name: string;
  focus: string;
  rating: number; // 1–5
  note: string;
  link: string;
};

/** Editiere diese Liste für die Seller-Übersicht auf /sellers. */
export const SELLERS: Seller[] = [
  {
    name: "Kaisen",
    focus: "Sneaker",
    rating: 5,
    note: "Saubere QC-Bilder, versendet schnell ins Warehouse.",
    link: "",
  },
  {
    name: "Muks",
    focus: "Tracksuits & Hoodies",
    rating: 5,
    note: "Guter Stoff, Größen fallen normal aus.",
    link: "",
  },
  {
    name: "Top Goods",
    focus: "Jackets",
    rating: 4,
    note: "Preis-Leistung stark, gelegentlich längere Bearbeitungszeit.",
    link: "",
  },
  {
    name: "Sun Store",
    focus: "Accessoires",
    rating: 4,
    note: "Caps, Bags, Socken — zuverlässig für Kleinteile.",
    link: "",
  },
];
