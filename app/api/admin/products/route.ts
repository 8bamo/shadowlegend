import { NextResponse } from "next/server";
import { isLoggedIn } from "@/lib/auth";
import { readStore, storageMode, writeStore } from "@/lib/store";
import type { Product } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  const store = await readStore();
  return NextResponse.json({ ...store, storage: storageMode() });
}

/** Replaces the whole product list (used by delete / inline edit in the backend). */
export async function PUT(request: Request) {
  if (!(await isLoggedIn())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    products?: Product[];
  } | null;

  if (!body || !Array.isArray(body.products)) {
    return NextResponse.json({ error: "Invalid data." }, { status: 400 });
  }

  const store = await writeStore(body.products);
  return NextResponse.json({ ok: true, total: store.products.length });
}
