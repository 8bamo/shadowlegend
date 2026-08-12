import crypto from "node:crypto";
import { cookies } from "next/headers";

export const COOKIE = "sl_admin";
const MAX_AGE = 60 * 60 * 12; // 12h

function password() {
  return process.env.ADMIN_PASSWORD || "shadowbamo";
}

function secret() {
  return process.env.ADMIN_SECRET || password();
}

function sign(expiresAt: number) {
  const mac = crypto
    .createHmac("sha256", secret())
    .update(String(expiresAt))
    .digest("hex");
  return `${expiresAt}.${mac}`;
}

export function checkPassword(input: string) {
  const a = Buffer.from(input || "");
  const b = Buffer.from(password());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function makeToken() {
  return sign(Date.now() + MAX_AGE * 1000);
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expRaw, mac] = token.split(".");
  const exp = Number(expRaw);
  if (!exp || !mac || Date.now() > exp) return false;
  const expected = sign(exp).split(".")[1];
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function isLoggedIn() {
  const jar = await cookies();
  return verifyToken(jar.get(COOKIE)?.value);
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};
