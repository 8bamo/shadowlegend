"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Login fehlgeschlagen.");
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-black/70 p-8 backdrop-blur-xl"
      >
        <h1 className="text-2xl font-black uppercase tracking-[0.2em]">
          Backend
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/40">
          Zugang nur für Admins
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort"
          autoFocus
          className="mt-8 w-full rounded-full border border-white/20 bg-transparent px-5 py-3 text-sm outline-none transition-colors placeholder:text-white/30 focus:border-white"
        />

        {error && (
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: [0, -6, 6, -3, 0] }}
            className="mt-3 text-xs text-white/70"
          >
            {error}
          </motion.p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="sweep mt-6 w-full rounded-full bg-white py-3 text-xs font-black uppercase tracking-[0.3em] text-black transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          {busy ? "…" : "Einloggen"}
        </button>
      </motion.form>
    </div>
  );
}
