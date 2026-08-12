import { NextResponse } from "next/server";
import { COOKIE, COOKIE_OPTIONS, checkPassword, makeToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };

  if (!checkPassword(password ?? "")) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, makeToken(), COOKIE_OPTIONS);
  return res;
}
