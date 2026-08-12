"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/types";

type ImportResult = {
  imported: number;
  skipped: number;
  total: number;
  storage: string;
};

export default function Dashboard({
  initialProducts,
  updatedAt,
  storage,
}: {
  initialProducts: Product[];
  updatedAt: string;
  storage: "blob" | "file";
}) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState(initialProducts);
  const [mode, setMode] = useState<"replace" | "merge">("replace");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.brand ?? "").toLowerCase().includes(q),
    );
  }, [products, query]);

  async function upload(file: File) {
    setBusy(true);
    setError("");
    setMessage("");

    const form = new FormData();
    form.append("file", file);
    form.append("mode", mode);

    const res = await fetch("/api/admin/import", { method: "POST", body: form });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error ?? "Import fehlgeschlagen.");
      setBusy(false);
      return;
    }

    const result = data as ImportResult;
    setMessage(
      `${result.imported} Produkte importiert${
        result.skipped ? `, ${result.skipped} Zeilen übersprungen` : ""
      }. Gesamt: ${result.total}.`,
    );
    setBusy(false);
    router.refresh();

    const fresh = await fetch("/api/admin/products").then((r) => r.json());
    setProducts(fresh.products ?? []);
  }

  async function persist(next: Product[]) {
    setProducts(next);
    await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: next }),
    });
    router.refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-36">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter md:text-6xl">
            Backend
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/40">
            {products.length} Produkte · Speicher: {storage}
            {updatedAt &&
              ` · ${new Date(updatedAt).toLocaleString("de-DE")}`}
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-full border border-white/25 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:border-white hover:text-white"
        >
          Logout
        </button>
      </div>

      {storage === "file" && (
        <p className="mt-6 rounded-2xl border border-white/15 px-5 py-4 text-xs leading-relaxed text-white/50">
          Kein Vercel-Blob-Token gesetzt — Änderungen landen lokal in{" "}
          <code className="text-white/80">data/products.json</code>. Auf Vercel
          ist das Dateisystem schreibgeschützt: dort brauchst du einen Blob-Store
          (Env <code className="text-white/80">BLOB_READ_WRITE_TOKEN</code>),
          sonst gehen Imports beim nächsten Deploy verloren.
        </p>
      )}

      {/* Import */}
      <section className="mt-10 rounded-3xl border border-white/15 p-6 md:p-8">
        <h2 className="text-xl font-black uppercase tracking-[0.15em]">
          Excel-Import
        </h2>
        <p className="mt-2 text-sm text-white/50">
          Spalten: <b className="text-white/80">Name</b> und{" "}
          <b className="text-white/80">Link</b> sind Pflicht. Optional:
          Kategorie, Marke, Preis, Bild, Hot, ID. Deutsche und englische
          Überschriften werden erkannt.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {(["replace", "merge"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full border px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                mode === m
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/60 hover:border-white/60"
              }`}
            >
              {m === "replace" ? "Ersetzen" : "Zusammenführen"}
            </button>
          ))}
          <a
            href="/api/admin/template"
            className="ml-auto text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 underline hover:text-white"
          >
            Vorlage herunterladen
          </a>
        </div>

        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) void upload(file);
          }}
          className="sweep mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/25 px-6 py-16 text-center transition-colors hover:border-white"
        >
          <input
            ref={fileInput}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void upload(file);
              e.target.value = "";
            }}
          />
          <span className="text-sm font-bold uppercase tracking-[0.25em]">
            {busy ? "Wird importiert…" : "Datei ablegen oder klicken"}
          </span>
          <span className="mt-2 text-xs text-white/40">.xlsx · .xls · .csv</span>
        </label>

        <AnimatePresence>
          {(message || error) && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                error
                  ? "border-white/40 text-white"
                  : "border-white/15 text-white/60"
              }`}
            >
              {error || message}
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      {/* Liste */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-black uppercase tracking-[0.15em]">
            Produkte
          </h2>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtern…"
            className="ml-auto w-56 rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-white/30 focus:border-white"
          />
          {products.length > 0 && (
            <button
              onClick={() => {
                if (confirm("Wirklich ALLE Produkte löschen?")) void persist([]);
              }}
              className="rounded-full border border-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:border-white hover:text-white"
            >
              Alle löschen
            </button>
          )}
        </div>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/12">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <tr>
                <th className="px-4 py-3">Bild</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Kategorie</th>
                <th className="px-4 py-3">Preis</th>
                <th className="px-4 py-3">Link</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 300).map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 transition-colors hover:bg-white/[0.04]"
                >
                  <td className="px-4 py-2">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image}
                        alt=""
                        className="h-10 w-10 rounded-md object-cover grayscale"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-md border border-white/10" />
                    )}
                  </td>
                  <td className="max-w-[260px] truncate px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2 text-white/50">{p.category}</td>
                  <td className="px-4 py-2 tabular-nums">
                    {p.price > 0 ? `€${p.price}` : "—"}
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/50 underline hover:text-white"
                    >
                      öffnen
                    </a>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() =>
                        void persist(products.filter((x) => x.id !== p.id))
                      }
                      className="text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white"
                    >
                      löschen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="px-4 py-14 text-center text-sm text-white/40">
              Keine Produkte.
            </p>
          )}
        </div>

        {filtered.length > 300 && (
          <p className="mt-3 text-xs text-white/35">
            Zeige die ersten 300 von {filtered.length} — zum Eingrenzen filtern.
          </p>
        )}
      </section>
    </div>
  );
}
