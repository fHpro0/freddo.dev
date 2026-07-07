export const languages = { en: 'English', de: 'Deutsch' } as const

export const defaultLang = 'en'

export type Lang = keyof typeof languages

// One flat dictionary per language. en and de MUST share the same keys —
// `satisfies` below fails the build if they drift. Code-style tags
// (e.g. "about.me", "// reads.archive") stay language-neutral, not keyed here.
export const ui = {
  en: {
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.featured': 'Featured',
    'nav.reads': 'Reads',

    'footer.role': 'Full-Stack Developer',
    'footer.madeWith': 'Made with',

    'home.meta.title': 'Frederick Hörner — Full-Stack Developer',
    'home.meta.description':
      'Personal portfolio of Frederick Hörner, a Full-Stack Developer at TMT. Specializing in TypeScript, Vue.js, Python, Astro, and AI/LLM integrations.',
    'home.hero.eyebrow': "Hey, I'm",
    'home.hero.role': 'Full-Stack Developer',
    'home.hero.desc':
      'Building modern web applications with a passion for clean, scalable code and great developer experiences.',
    'home.stats.experience': 'Years Experience',
    'home.stats.technologies': 'Technologies',
    'home.stats.projects': 'Projects Shipped',
    'home.stats.curiosity': 'Curiosity',
    'home.about.title': 'About Me',
    'home.about.p1':
      'I developed an interest in programming at 15, starting with HTML, JavaScript, and CSS. After a detour into industrial mechanics at {scherdel}, I found my path — completing a 3-year apprenticeship (2019–2022) as a Specialist in Application Development at {tmt}, where I now work as a Full-Stack Developer.',
    'home.about.p2':
      "I'm passionate about building clean, modern software — from full-stack web applications to AI-assisted tooling. Always expanding my skills and exploring what's next.",
    'home.skills.title': 'Skills & Tools',
    'home.skills.sub': 'Technologies I work with regularly',
    'home.skills.languages': 'Languages',
    'home.skills.frameworks': 'Frameworks',
    'home.skills.ai': 'AI & LLM',
    'home.skills.tools': 'Tools & Platforms',
    'home.skills.databases': 'Databases',
    'home.featured.sub': "A project I'm proud of",
    'home.featured.desc':
      'This very site — my personal portfolio. Built with Astro, Tailwind CSS, and SCSS: dark neon design, an ASCII water canvas, and zero JS shipped by default.',
    'home.featured.cta': 'Visit Project',
    'home.featured.badge': 'featured',

    'reads.meta.title': 'Reads — Frederick Hörner',
    'reads.meta.description':
      "Blog posts, thoughts, and projects from Frederick Hörner's development journey.",
    'reads.subtitle': 'Posts I wrote. Projects I built.',
    'reads.desc':
      'A collection of thoughts, tutorials, and open-source work from my journey as a full-stack developer.',
    'reads.empty': 'Nothing here yet.',
    'reads.post': 'post',
    'reads.posts': 'posts',
    'reads.project': 'project',
    'reads.projects': 'projects',

    'blog.meta.title': 'Blog — Frederick Hörner',
    'blog.meta.description':
      "Thoughts, projects, and experiences from Frederick Hörner's development journey.",
    'blog.subtitle': 'Thoughts, projects, and experiences',
    'blog.empty': 'No posts yet. Check back soon!',
    'blog.back': '← Back to blog',

    'work.meta.title': 'Work — Frederick Hörner',
    'work.meta.description':
      'Full project portfolio of Frederick Hörner — open-source work, side projects, and professional builds.',
    'work.title': 'All Projects',
    'work.subBefore': "Everything I've built on ",
    'work.subAfter': '',
    'work.fallback': "Couldn't load projects right now.",

    'notfound.meta.title': '404 — Page adrift',
    'notfound.tag': 'page adrift',
    'notfound.copy': "This page drifted off into the void. Let's get you back to shore.",
    'notfound.cta': 'Swim home 🏊',
  },
  de: {
    'nav.about': 'Über mich',
    'nav.skills': 'Skills',
    'nav.featured': 'Highlight',
    'nav.reads': 'Reads',

    'footer.role': 'Full-Stack Entwickler',
    'footer.madeWith': 'Erstellt mit',

    'home.meta.title': 'Frederick Hörner — Full-Stack Entwickler',
    'home.meta.description':
      'Persönliches Portfolio von Frederick Hörner, Full-Stack Entwickler bei TMT. Spezialisiert auf TypeScript, Vue.js, Python, Astro und KI/LLM-Integrationen.',
    'home.hero.eyebrow': 'Hey, ich bin',
    'home.hero.role': 'Full-Stack Entwickler',
    'home.hero.desc':
      'Ich baue moderne Webanwendungen — mit Leidenschaft für sauberen, skalierbaren Code und gute Developer Experience.',
    'home.stats.experience': 'Jahre Erfahrung',
    'home.stats.technologies': 'Technologien',
    'home.stats.projects': 'Projekte umgesetzt',
    'home.stats.curiosity': 'Neugier',
    'home.about.title': 'Über mich',
    'home.about.p1':
      'Mit 15 begann mein Interesse am Programmieren — zuerst mit HTML, JavaScript und CSS. Nach einem Abstecher in die Industriemechanik bei {scherdel} fand ich meinen Weg: eine 3-jährige Ausbildung (2019–2022) zum Fachinformatiker für Anwendungsentwicklung bei {tmt}, wo ich heute als Full-Stack Entwickler arbeite.',
    'home.about.p2':
      'Ich liebe es, saubere, moderne Software zu bauen — von Full-Stack-Webanwendungen bis zu KI-gestützten Tools. Immer dabei, meine Skills zu erweitern und zu erkunden, was als Nächstes kommt.',
    'home.skills.title': 'Skills & Tools',
    'home.skills.sub': 'Technologien, mit denen ich regelmäßig arbeite',
    'home.skills.languages': 'Sprachen',
    'home.skills.frameworks': 'Frameworks',
    'home.skills.ai': 'KI & LLM',
    'home.skills.tools': 'Tools & Plattformen',
    'home.skills.databases': 'Datenbanken',
    'home.featured.sub': 'Ein Projekt, auf das ich stolz bin',
    'home.featured.desc':
      'Diese Seite selbst — mein persönliches Portfolio. Gebaut mit Astro, Tailwind CSS und SCSS: dunkles Neon-Design, ein ASCII-Wasser-Canvas und standardmäßig null ausgeliefertes JS.',
    'home.featured.cta': 'Projekt ansehen',
    'home.featured.badge': 'highlight',

    'reads.meta.title': 'Reads — Frederick Hörner',
    'reads.meta.description':
      'Blogbeiträge, Gedanken und Projekte aus Frederick Hörners Entwickler-Reise.',
    'reads.subtitle': 'Beiträge, die ich schrieb. Projekte, die ich baute.',
    'reads.desc':
      'Eine Sammlung von Gedanken, Tutorials und Open-Source-Arbeit aus meiner Reise als Full-Stack Entwickler.',
    'reads.empty': 'Hier gibt es noch nichts.',
    'reads.post': 'Beitrag',
    'reads.posts': 'Beiträge',
    'reads.project': 'Projekt',
    'reads.projects': 'Projekte',

    'blog.meta.title': 'Blog — Frederick Hörner',
    'blog.meta.description':
      'Gedanken, Projekte und Erfahrungen aus Frederick Hörners Entwickler-Reise.',
    'blog.subtitle': 'Gedanken, Projekte und Erfahrungen',
    'blog.empty': 'Noch keine Beiträge. Schau bald wieder vorbei!',
    'blog.back': '← Zurück zum Blog',

    'work.meta.title': 'Projekte — Frederick Hörner',
    'work.meta.description':
      'Vollständiges Projekt-Portfolio von Frederick Hörner — Open-Source-Arbeit, Nebenprojekte und professionelle Builds.',
    'work.title': 'Alle Projekte',
    'work.subBefore': 'Alles, was ich auf ',
    'work.subAfter': ' gebaut habe',
    'work.fallback': 'Projekte konnten gerade nicht geladen werden.',

    'notfound.meta.title': '404 — Seite abgetrieben',
    'notfound.tag': 'seite abgetrieben',
    'notfound.copy': 'Diese Seite ist in die Leere abgedriftet. Zurück ans Ufer.',
    'notfound.cta': 'Heimschwimmen 🏊',
  },
} as const satisfies Record<Lang, Record<string, string>>
