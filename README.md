# SHADOWLEGEND

Schwarz-weiße Produkt-/Linkseite mit Backend und Excel-Import. Next.js 16 (App
Router) + Tailwind 4 + Framer Motion, gebaut für Vercel.

## Start

```bash
npm install
```

```bash
npm run dev
```

## Seiten

| Route             | Inhalt                                             |
| ----------------- | -------------------------------------------------- |
| `/`               | Hero, Alben, Hot Products, Brands, How To Order    |
| `/album/[slug]`   | Shoes · Pants · Tops · Accessories                  |
| `/products`       | Alle Produkte mit Suche und Kategoriefilter         |
| `/outfits`        | Outfit Inspiration                                  |
| `/sellers`        | Seller List mit Bewertung                           |
| `/faq`            | FAQ-Akkordeon                                       |
| `/contact`        | Kontaktkanäle                                       |
| `/backend`        | Admin: Login, Excel-Import, Produktverwaltung       |

## Backend

Passwort per Env `ADMIN_PASSWORD`, Default `shadowbamo`.

Excel-Spalten — **Name** und **Link** sind Pflicht, der Rest optional:

| Feld      | Erkannte Überschriften                    |
| --------- | ----------------------------------------- |
| Name      | Name, Produkt, Product, Titel, Title      |
| Link      | Link, URL, Mulebuy, Kauflink, Buylink     |
| Kategorie | Kategorie, Category, Typ, Type            |
| Preis     | Preis, Price, EUR, Kosten                 |
| Bild      | Bild, Image, Img, Foto, Picture           |
| Marke     | Marke, Brand, Hersteller                  |
| Hot       | Hot, Featured, Top (`ja`/`x`/`1`/`true`)  |
| ID        | ID, SKU, Nr                               |

Preise dürfen deutsch formatiert sein (`€ 42,50` → `42.5`). Zeilen ohne Name
oder Link werden übersprungen und im Import-Ergebnis gezählt. Eine Vorlage gibt
es im Backend über „Vorlage herunterladen".

Import-Modi: **Ersetzen** (Liste komplett neu) oder **Zusammenführen** (bestehende
Einträge mit gleicher ID werden überschrieben, neue kommen dazu).

## Speicher

- **Lokal**: `data/products.json`.
- **Vercel**: Das Dateisystem ist schreibgeschützt. Lege einen Blob-Store an
  (Vercel → Storage → Blob) und setze `BLOB_READ_WRITE_TOKEN`. Ohne den Token
  gehen Imports beim nächsten Deploy verloren.

## Env

Siehe `.env.example`:

- `ADMIN_PASSWORD` — Backend-Passwort
- `ADMIN_SECRET` — Signatur des Login-Cookies (langer Zufallsstring)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob

## Inhalte pflegen

Ohne Excel direkt im Code editierbar:

- Outfits → `lib/outfits.ts`
- Seller → `lib/sellers.ts`
- FAQ → `app/faq/page.tsx`
- Kategorie-Zuordnung der Alben → `lib/categories.ts`
- Name, Linktree, Agent-Link → `lib/site.ts`
