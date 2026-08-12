import fs from "node:fs/promises";
import path from "node:path";
import { EMPTY_STORE, type Product, type ProductStore } from "./types";

const BLOB_KEY = "shadowlegend/products.json";
const LOCAL_FILE = path.join(process.cwd(), "data", "products.json");

function hasBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Seed shipped in the repo — used as fallback and as the base on first write. */
async function readSeed(): Promise<ProductStore> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    return normalize(JSON.parse(raw));
  } catch {
    return EMPTY_STORE;
  }
}

function normalize(value: unknown): ProductStore {
  if (!value || typeof value !== "object") return EMPTY_STORE;
  const obj = value as Partial<ProductStore>;
  if (!Array.isArray(obj.products)) return EMPTY_STORE;
  return { products: obj.products, updatedAt: obj.updatedAt ?? "" };
}

export async function readStore(): Promise<ProductStore> {
  if (hasBlob()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 });
    const blob = blobs.find((b) => b.pathname === BLOB_KEY);
    if (blob) {
      const res = await fetch(blob.url, { cache: "no-store" });
      if (res.ok) return normalize(await res.json());
    }
    return readSeed();
  }
  return readSeed();
}

export async function writeStore(products: Product[]): Promise<ProductStore> {
  const store: ProductStore = { products, updatedAt: new Date().toISOString() };
  const body = JSON.stringify(store, null, 2);

  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    await put(BLOB_KEY, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return store;
  }

  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, body, "utf8");
  return store;
}

export function storageMode(): "blob" | "file" {
  return hasBlob() ? "blob" : "file";
}
