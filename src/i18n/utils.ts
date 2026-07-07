import { ui, defaultLang, type Lang } from './ui'

/** Locale from the URL path: `/de/...` → 'de', everything else → 'en'. */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/')[1]
  return seg === 'de' ? 'de' : 'en'
}

/** Translator bound to a language; falls back to English for missing keys. */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return ui[lang][key] ?? ui[defaultLang][key]
  }
}

/** Rewrite a pathname to the given locale (en = no prefix, de = `/de` prefix). */
export function localizedPath(path: string, lang: Lang): string {
  const stripped = path.replace(/^\/de(?=\/|$)/, '') || '/'
  if (lang === 'de') return stripped === '/' ? '/de' : '/de' + stripped
  return stripped
}
