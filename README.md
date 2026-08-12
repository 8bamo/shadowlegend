# SHADOWLEGEND

Black-and-white product/link site with a backend and Excel import. Next.js 16
(App Router) + Tailwind 4 + Framer Motion, built for Vercel.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

## Pages

| Route           | Content                                        |
| --------------- | ---------------------------------------------- |
| `/`             | Hero, albums, hot products, brands, how to order |
| `/album/[slug]` | Shoes · Pants · Tops · Accessories              |
| `/products`     | All products with search and category filter    |
| `/outfits`      | Outfit inspiration                              |
| `/sellers`      | Seller list with ratings                        |
| `/faq`          | FAQ accordion                                   |
| `/contact`      | Contact channels                                |
| `/backend`      | Admin: login, Excel import, product management  |

## Backend

Password comes from the `ADMIN_PASSWORD` env var, default `shadowbamo`.

Excel columns — **Name** and **Link** are required, everything else optional:

| Field    | Recognised headers                          |
| -------- | ------------------------------------------- |
| Name     | Name, Product, Produkt, Title, Titel        |
| Link     | Link, URL, Buylink, Kauflink, Produktlink   |
| Category | Category, Kategorie, Type, Typ              |
| Price    | Price, Preis, EUR, Cost, Kosten             |
| Image    | Image, Bild, Img, Foto, Picture             |
| Brand    | Brand, Marke, Hersteller                    |
| Hot      | Hot, Featured, Top (`yes`/`ja`/`x`/`1`)     |
| ID       | ID, SKU, Nr                                 |

Prices may be German-formatted (`€ 42,50` → `42.5`). Rows without a name or
link are skipped and counted in the import result. A template is available in
the backend via "Download template".

Import modes: **Replace** (rebuild the whole list) or **Merge** (entries with a
matching ID are overwritten, new ones are added).

## Storage

- **Local**: `data/products.json`.
- **Vercel**: the filesystem is read-only there. Create a Blob store (Vercel →
  Storage → Blob) and set `BLOB_READ_WRITE_TOKEN`. Without that token, imports
  are lost on the next deploy.

## Environment

See `.env.example`:

- `ADMIN_PASSWORD` — backend password
- `ADMIN_SECRET` — signs the login cookie (long random string)
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob

## Editing content

Editable in code, no spreadsheet needed:

- Outfits → `lib/outfits.ts`
- Sellers → `lib/sellers.ts`
- FAQ → `app/faq/page.tsx`
- Album category mapping → `lib/categories.ts`
- Site name, Linktree, legal domain → `lib/site.ts`
- Legal notice → `components/LegalNotice.tsx`
