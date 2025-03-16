# Personal Page for Freddo

## 🧑‍💻 Development Setup

🚨 **Dieses Projekt verwendet [Bun](https://bun.sh) als Paketmanager.**

1. Bun installieren: [bun.sh/docs/installation](https://bun.sh/docs/installation)
2. `bun install` ausführen um Abhängigkeiten zu installieren
3. `bun --bun run dev` ausführen um den lokalen Entwicklungsserver zu starten

## 🚀 Projektstruktur

Innerhalb deines Astro-Projekts findest du die folgenden Ordner und Dateien:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro sucht nach `.astro` oder `.md` Dateien im `src/pages/` Verzeichnis. Jede Seite wird basierend auf ihrem Dateinamen als Route bereitgestellt.

Es gibt nichts Besonderes an `src/components/`, aber dort legen wir gerne alle Astro/React/Vue/Svelte/Preact Komponenten ab.

Alle statischen Assets, wie Bilder, können im `public/` Verzeichnis abgelegt werden.

## 🧞 Befehle

🚨 **Dieses Projekt verwendet [Bun](https://bun.sh) als Paketmanager.**

Alle Befehle werden vom Root-Verzeichnis des Projekts aus in einem Terminal ausgeführt:

| Befehl                    | Aktion                                                      |
| :------------------------ | :---------------------------------------------------------- |
| `bun install`             | Installiert Abhängigkeiten                                  |
| `bun run dev`             | Startet den lokalen Entwicklungsserver auf `localhost:4321` |
| `bun run build`           | Baut deine Produktionsseite in `./dist/`                    |
| `bun run preview`         | Vorschau deines Builds lokal anzeigen, vor dem Deployment   |
| `bun run astro ...`       | Führt CLI-Befehle wie `astro add`, `astro check` aus        |
| `bun run astro -- --help` | Hilfe zur Nutzung der Astro CLI anzeigen                    |

## 👀 Möchtest du mehr erfahren?

Schau gerne in unsere [Dokumentation](https://docs.astro.build) oder besuche unseren [Discord-Server](https://astro.build/chat).
