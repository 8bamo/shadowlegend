import * as XLSX from "xlsx";
import type { Product } from "./types";

/** Accepted spellings per field — matched case-insensitively, ignoring spaces. */
const FIELD_ALIASES: Record<keyof Product, string[]> = {
  id: ["id", "sku", "nr", "nummer"],
  name: ["name", "produkt", "product", "title", "titel", "bezeichnung"],
  category: ["category", "kategorie", "cat", "type", "typ"],
  price: ["price", "preis", "eur", "cost", "kosten"],
  link: ["link", "url", "kauflink", "buylink", "produktlink"],
  image: ["image", "bild", "img", "imageurl", "bildurl", "picture", "foto"],
  brand: ["brand", "marke", "hersteller"],
  hot: ["hot", "featured", "highlight", "top"],
};

const key = (s: string) => s.toLowerCase().replace(/[\s._-]/g, "");

function buildMap(headers: string[]) {
  const map = new Map<keyof Product, string>();
  for (const header of headers) {
    const h = key(header);
    for (const [field, aliases] of Object.entries(FIELD_ALIASES) as [
      keyof Product,
      string[],
    ][]) {
      if (!map.has(field) && aliases.includes(h)) map.set(field, header);
    }
  }
  return map;
}

function toPrice(value: unknown): number {
  if (typeof value === "number") return value;
  const cleaned = String(value ?? "")
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3}\b)/g, "")
    .replace(",", ".");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function toBool(value: unknown): boolean {
  const v = String(value ?? "").trim().toLowerCase();
  return ["1", "true", "ja", "yes", "x", "hot"].includes(v);
}

export type ParseResult = {
  products: Product[];
  skipped: number;
  headers: string[];
  missing: string[];
};

export function parseWorkbook(buffer: ArrayBuffer): ParseResult {
  const wb = XLSX.read(buffer, { type: "array" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  if (!sheet) throw new Error("Die Datei enthält kein Tabellenblatt.");

  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
  });
  if (rows.length === 0) throw new Error("Die Tabelle enthält keine Zeilen.");

  const headers = Object.keys(rows[0]);
  const map = buildMap(headers);
  const missing = (["name", "link"] as const).filter((f) => !map.has(f));
  if (missing.length > 0) {
    return { products: [], skipped: rows.length, headers, missing };
  }

  const get = (row: Record<string, unknown>, field: keyof Product) => {
    const col = map.get(field);
    return col ? row[col] : undefined;
  };

  const products: Product[] = [];
  let skipped = 0;

  rows.forEach((row, i) => {
    const name = String(get(row, "name") ?? "").trim();
    const link = String(get(row, "link") ?? "").trim();
    if (!name || !link) {
      skipped++;
      return;
    }
    const rawId = String(get(row, "id") ?? "").trim();
    products.push({
      id: rawId || `${key(name).slice(0, 40)}-${i}`,
      name,
      link,
      category: String(get(row, "category") ?? "Sonstiges").trim() || "Sonstiges",
      price: toPrice(get(row, "price")),
      image: String(get(row, "image") ?? "").trim(),
      brand: String(get(row, "brand") ?? "").trim() || undefined,
      hot: toBool(get(row, "hot")),
    });
  });

  return { products, skipped, headers, missing: [] };
}

export function buildTemplate(): Buffer {
  const rows = [
    {
      ID: "nike-tracksuit-01",
      Name: "Nike Miler Tracksuit Pink / Grey",
      Kategorie: "Tracksuits",
      Marke: "Nike",
      Preis: 41,
      Link: "https://agent.example.com/product?id=123456",
      Bild: "https://example.com/bild.jpg",
      Hot: "ja",
    },
  ];
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Produkte");
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
}
