export type Repo = {
  name: string
  description: string | null
  html_url: string
  pushed_at: string
  language: string | null
  stargazers_count: number
  fork: boolean
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572a5',
  PHP: '#777bb4',
  Vue: '#42b883',
  Dart: '#00b4ab',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Astro: '#ff5a03',
  Go: '#00add8',
  Rust: '#dea584',
}

export const FALLBACK_DESCRIPTION = 'No description yet — see the repo for details.'

export async function fetchRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      'https://api.github.com/users/fHpro0/repos?sort=pushed&per_page=20&type=owner',
      { headers: { 'User-Agent': 'freddo.dev/1.0' } }
    )
    if (!res.ok) return []
    const repos: Repo[] = await res.json()
    return repos.filter((r) => !r.fork && r.name !== 'fHpro0')
  } catch {
    return []
  }
}
