import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description:
    "Curated fashion finds with direct links. Black. White. Nothing in between.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise min-h-screen antialiased">
        <Cursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
