# herbertyang.xyz

Personal blog and portfolio by Herbert Yang, built with [Docusaurus](https://docusaurus.io/).

Live site: [herbertyang.xyz](https://herbertyang.xyz)

## Development

```bash
npm install
npm run start
```

The site runs at http://localhost:3000. For mobile testing on the same network:

```bash
npm run start -- --host 0.0.0.0
```

## Build

```bash
npm run build
npm run serve   # preview the build locally
```

## Deployment

Deployed on [Vercel](https://vercel.com). Pushes to `main` trigger automatic production deployments.

## Photo Gallery

Galleries live in `docs/gallery/`. Use the `make-gallery` script to process photos:

```bash
cd docs/gallery/2025/album-name
make-gallery
```

The script processes `img/originals/` into web-optimized images (`img/web/`) and thumbnails (`img/thumbs/`), then generates `album.ts` and `index.mdx`.

## Project Structure

```
├── blog/           Blog posts
├── docs/           Site content (articles, galleries, cookbook)
├── public/         Additional content pages
├── src/            React components and CSS
├── static/         Static assets (images, favicon)
├── scripts/        Build and gallery processing scripts
└── vercel.json     Deployment configuration
```
