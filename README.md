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

## Writing a New Blog Post

1. Scaffold a new post from the repo root:

```bash
npm run new-post -- "Your Post Title"
```

For Chinese or non-Latin titles, provide a slug manually:

```bash
npm run new-post -- "你的标题" --slug your-slug
```

Options: `--tags tag1,tag2` to add tags, `--publish` to skip draft mode.

2. Preview locally:

```bash
npm start
```

Draft posts are visible in dev mode but excluded from production builds.

3. Edit `blog/<year>/<date>-<slug>/index.md`. Drop images into the `img/` subfolder.

4. When ready to publish, set `draft: false` in the frontmatter and merge to `main`.

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
