import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { parseWorkbook } from "@/lib/excel";
import { readStore, storageMode, writeStore } from "@/lib/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const mode = String(form.get("mode") ?? "replace");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  let parsed;
  try {
    parsed = parseWorkbook(await file.arrayBuffer());
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not read the file.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (parsed.missing.length > 0) {
    return NextResponse.json(
      {
        error: `Missing required columns: ${parsed.missing.join(", ")}. Columns found: ${parsed.headers.join(", ")}`,
      },
      { status: 400 },
    );
  }

  let products = parsed.products;
  if (mode === "merge") {
    const existing = (await readStore()).products;
    const byId = new Map(existing.map((p) => [p.id, p]));
    for (const p of products) byId.set(p.id, p);
    products = [...byId.values()];
  }

  const store = await writeStore(products);

  return NextResponse.json({
    ok: true,
    imported: parsed.products.length,
    skipped: parsed.skipped,
    total: store.products.length,
    storage: storageMode(),
    updatedAt: store.updatedAt,
  });
}
