# AGENTS.md

Guidance for agents/humans working on **freddo.dev** (Astro 5, static SSG, Tailwind + SCSS).

## Internationalization (English default + German)

The site is bilingual: **English at no prefix** (`/`, `/blog`, …) and **German under `/de`** (`/de`, `/de/blog`, …). Config lives in `astro.config.mjs` (`i18n: { locales: ['en','de'], defaultLocale: 'en', routing.prefixDefaultLocale: false }`).

### Add or change a UI string
1. Edit `src/i18n/ui.ts` — add the key under **both** `en` and `de`. The `satisfies` at the bottom fails the build if the two drift.
2. In a page/component: `const t = useTranslations(getLangFromUrl(Astro.url))` then `t('your.key')`. Helpers are in `src/i18n/utils.ts`.
3. Code-style tags (e.g. `about.me`, `// reads.archive`) are intentionally language-neutral and stay hardcoded.

### Add a blog post (one file, both languages)
Create one `.mdx` in `src/content/post/`:
```mdx
---
title:
  en: 'English Title'
  de: 'Deutscher Titel'
excerpt:
  en: '...'
  de: '...'
publishDate: 2026-01-01
tags: ['x']
draft: false
---

<Lang code="en">
English markdown…
</Lang>

<Lang code="de">
Deutscher Markdown…
</Lang>
```
`<Lang>` renders only the active locale's block. It's provided to MDX automatically via `<Content components={{ Lang }} />` in `ArticlePage.astro` — **no import needed in the post**. Schema is in `src/content/config.ts`.

### Routing model
Every page has an English wrapper in `src/pages/…` and a German mirror in `src/pages/de/…`, both rendering the same component in `src/components/pages/*.astro` (`HomePage`, `BlogPage`, `ReadsPage`, `WorkPage`, `ArticlePage`). Language is read from the URL via `getLangFromUrl(Astro.url)` — never hardcode it. Add a new page → add both wrappers + one shared component. Dynamic routes (`blog/[...slug]`) keep `getStaticPaths` in the route file and pass props to the component.

### Switcher & auto-detection
- `src/components/LanguageSwitcher.astro` (in the nav) links between locales and writes `localStorage.lang` on click.
- `DefaultLayout.astro` renders an `is:inline` head script **only on English pages** that redirects first-time German browsers to `/de`. A stored `localStorage.lang` always wins, so a manual choice is never overridden.
- `<html lang>`, `og:locale`, and `hreflang` alternates are all derived from the locale in `DefaultLayout.astro`.
- `src/pages/404.astro` is a single file; it swaps to German client-side (host can't pick a locale for a 404).

### Adding a third locale later
Add it to `i18n.locales` in `astro.config.mjs`, add a column in `src/i18n/ui.ts`, add a `<Lang code>` block per post, extend `getLangFromUrl`/`localizedPath`, and mirror the page wrappers under `src/pages/<locale>/`.

## Dev
`bun run dev` · `bun run build` · `bun run preview`. Package manager is **Bun**.
