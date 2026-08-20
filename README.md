# Into the Sagebrush

A lightweight, community-run website for graduate students at the University of Nevada, Reno.
It gathers events, resources, a Discord community, and information for incoming and current
graduate students in one place.

The repository is still named `unr-grad-community` — renaming a GitHub repository is a bigger,
more disruptive step than renaming the site itself (it changes clone URLs), so that's left alone
unless requested. "Into the Sagebrush" is the site's public name.

This is an **independent, community-run project**. It is not officially operated, endorsed, or
maintained by the University of Nevada, Reno.

## Current status

**Live.** The repository is public and GitHub Pages is deployed from `main`:

**https://jamesmoore1998.github.io/unr-grad-community/**

See [Outstanding TODOs](#outstanding-todos) for what's still unresolved.

## Architecture

The site is plain, static HTML/CSS/JS with no build step, framework, or backend:

- Keeps the project understandable by someone who isn't working on it daily.
- Costs nothing to host beyond GitHub Pages.
- Avoids dependency rot — nothing to `npm install`, no framework version to keep current.
- GitHub Pages serves static files directly, so this is a natural fit.

Events and community discussion are intentionally **not** rebuilt on this site. The shared
Outlook Calendar stays the source of truth for event scheduling, and Discord stays the source of
truth for discussion. The site embeds both (`index.html`/`events.html` for the calendar,
`resources.html` for the Discord widget) rather than reproducing their functionality.

See [AGENTS.md](AGENTS.md) for the fuller set of standing engineering rules this project
follows (dependency policy, content-integrity rules, deployment constraints).

## Repository structure

```
/
├── index.html          Homepage
├── events.html          Events page (calendar area + event submission)
├── resources.html       Resources directory, organized by category
├── about.html            About / project explanation
├── css/styles.css        All site styling
├── js/main.js             Mobile nav toggle + placeholder-link handling (progressive enhancement)
├── assets/icons/           Favicon (original artwork, not UNR branding)
├── AGENTS.md               Standing instructions for AI coding agents
├── CONTRIBUTING.md          Contributor guide
├── LICENSE                   MIT
└── README.md                 This file
```

There is no `data/resources.json` — with only placeholder entries so far, plain HTML directly
in `resources.html` is simpler to read and edit than a JSON data layer. That can change later
if the resource list grows large enough to justify it (see AGENTS.md's dependency policy before
adding one).

## Local preview

No build step, so you can just open the site:

```bash
open index.html
```

Or, for behavior closer to how GitHub Pages actually serves files (recommended when testing
relative paths or the calendar embed), run a simple local server from the repository root:

```bash
# Python 3 (usually already installed on macOS/Linux)
python3 -m http.server 8000
# then open http://localhost:8000/
```

No Node.js, npm, or other tooling install is required either way.

## Updating content

- **Discord** — the "Join Discord" nav/CTA links currently point to `resources.html#community`,
  where a live Discord server widget (`discord.com/widget?id=...`) is embedded. If a direct
  invite URL (`discord.gg/...`) becomes available later, those links can point straight to it
  instead — that's an optional simplification, not a blocker.
- **Outlook Calendar** — the embed (`index.html`, `events.html`) and the "Open full
  calendar"/"Subscribe (.ics)" links all point at the published Outlook calendar URLs. To change
  calendars, update the `src` on both `<iframe>`s inside `.calendar-frame-wrap` and the
  `calendar.html`/`calendar.ics` links in `index.html` and `events.html`.
- **Event submissions** — the "Submit an event" links (`events.html` and the homepage "Get
  involved" section) point at a Microsoft Forms calendar access request form. To change it,
  update the `href` in both places.
- **Resource submissions** — the "Suggest a resource" links (`resources.html` and the homepage
  "Get involved" section) point at a Microsoft Forms resource suggestion form. To change it,
  update the `href` in both places.
- **Resources** — edit the relevant `<section class="resource-section" id="...">` block in
  `resources.html` directly. Each entry is a `.resource-item` with a title, an optional
  `<span class="todo-tag">TODO</span>`, and a note. Remove the TODO tag once a real, verified
  link is in place.
- **Navigation** — the nav list is duplicated at the top of each HTML file (no templating layer
  in a no-build-step static site). Update all four pages together when changing nav items.
- **Site text** — edit the relevant HTML file directly; there's no CMS or data layer for prose.

## Deployment

Live at **https://jamesmoore1998.github.io/unr-grad-community/**, deployed via GitHub Pages
("Deploy from a branch," `main`, `/ (root)`) as a **project** Pages site. The repository is
public, which Pages requires on the free plan.

To change how it's deployed: Repository Settings → Pages. If it ever needed to move to a
**user/organization** Pages site instead (`https://USERNAME.github.io/`), the repository would
need to be renamed to `USERNAME.github.io` — not done here, and not necessary unless requested.

### Custom domain

Not configured, and no domain has been chosen. If one is added later, it belongs in a `CNAME`
file at the repository root (GitHub Pages convention) plus matching DNS records — documented
here once a real domain exists. Nothing invented in the meantime.

## Contribution workflow

1. Create a branch off `main`.
2. Make a focused change (see [CONTRIBUTING.md](CONTRIBUTING.md)).
3. Preview locally (see above).
4. Open a pull request describing the change.
5. Merge after review. (No CI is currently configured — see AGENTS.md on why Actions hasn't
   been added for this project.)

## Outstanding TODOs

Nothing is currently outstanding. Every `resources.html` entry either links to a verified
official UNR page or plainly says so when no single official source exists, and the GitHub
repository link is live now that the repo is public.

Future additions without a verified link should still be marked `TODO` rather than guessed at
— see AGENTS.md. To check current status at any point:

```bash
grep -rn "TODO" --include="*.html" --include="*.md" .
```

## License

[MIT](LICENSE).
