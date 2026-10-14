# 2D Show

Russian podcast by Dan Kim and Dan Shevluk, published at [2dshow.dan.kim](https://2dshow.dan.kim).

## Development

```sh
npm install
npm run dev
```

`npm run build` generates the static site in `dist`. `npm run preview` serves that build locally.

Episodes live in `src/content/episodes`. Their Markdown, original dated URLs, and podcast metadata are preserved. `guid` and `enclosure_url` retain the published feed identities; `mp3_url` is the HTTPS URL used by the website's native audio players.

The podcast feed is generated at `/feed.xml`. Artwork remains at `/assets/artwork.png`, and audio stays on S3.

## Hosting

Cloudflare Pages builds `main` with `npm run build` and publishes `dist`.
