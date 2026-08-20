# AGENTS.md

Persistent instructions for AI coding agents (and human contributors) working on this
repository. Read this before making changes.

## Project purpose

Into the Sagebrush is a lightweight, community-run website for graduate students at the
University of Nevada, Reno. It brings together events, resources, a Discord community, and
information for incoming and current graduate students. It is **not** an official University
of Nevada, Reno publication or service unless explicitly stated otherwise with verified
evidence. (The repository itself is still named `unr-grad-community`; "Into the Sagebrush" is
the site's public name.)

## Architecture

- Static site: plain HTML5, CSS, and minimal vanilla JavaScript.
- No build step, no framework, no bundler, no package manager, no backend.
- Deployed via GitHub Pages, potentially at a project path (`https://USERNAME.github.io/REPO/`),
  not necessarily at a domain root. See "GitHub Pages compatibility" below.
- `index.html` at the repository root is the deployable entry point.

## Source-of-truth rules

Don't duplicate what another service should own:

- **GitHub repository** — website code, styling, navigation, curated resource listings,
  explanatory content.
- **Outlook Calendar** — event schedule, dates, times (a published, publicly viewable calendar —
  not a login-gated resource). The site embeds/links to it; it does not maintain its own event
  database.
- **Discord** — community discussion, informal communication. The site embeds Discord's public
  server widget (`resources.html`, Community & Social section) rather than maintaining its own
  member list or chat.
- **Google Form (or similar)** — event/resource submissions, once a form URL is supplied.

Link to or embed these services. Do not try to reproduce their functionality on this site.

## Development philosophy

- Semantic HTML5 first. Reach for ARIA only when native semantics fall short.
- Modern, plain CSS. Custom properties for tokens (see top of `css/styles.css`).
- Vanilla JavaScript only where it adds real functionality (currently: accessible mobile nav
  toggle, disabling placeholder links). Core navigation must work with JavaScript disabled.
- Progressive enhancement: the `.js` class is added to `<html>` by an inline script so CSS can
  gate JS-dependent behavior (like hiding the nav behind a hamburger) behind "JS is actually
  present," not just "viewport is narrow."
- Relative internal links only (`events.html`, `css/styles.css`, etc.) — never root-absolute
  paths like `/css/styles.css`. This site may be served from a subdirectory.

## Dependency policy

Do not add frameworks (React, Vue, Svelte, Angular, etc.), Node as a runtime dependency, npm
packages, bundlers, server-side rendering, databases, authentication systems, serverless
functions, custom backends, Docker, or CI/CD infrastructure beyond what's already here, unless
there is a compelling technical requirement. If you believe one exists, explain it in a PR
description and get explicit approval before adding it — don't add it silently.

## Content integrity

Never invent UNR-specific facts: office names, links, phone numbers, policies, deadlines,
eligibility rules, personnel, events, or endorsements. If information isn't verified, write an
explicit `TODO:` (or use one of the named placeholders below) instead of guessing. This applies
equally to AI agents and human contributors.

No named `TODO_*` placeholders remain unresolved as of this writing (grep for `TODO_` to check
current status). If a new one is needed, follow the same pattern: `TODO_SOME_DESCRIPTIVE_NAME`.

## Privacy

Never commit passwords, API keys, tokens, OAuth secrets, private Discord invite links, private
calendar credentials, private email addresses, student records, or other non-public personal
information. This repo may become public — treat everything committed to it accordingly. If
you find existing credentials in the repo, flag it and recommend rotation/removal; do not
silently rewrite Git history to remove it without explicit approval.

Note: the Outlook Calendar URL and Discord widget ID currently embedded in `index.html` and
`events.html`/`resources.html` are intentionally public, unguessable-but-shareable identifiers
(Microsoft's "Publish a calendar" feature and Discord's server-widget feature, respectively) —
not login-gated secrets. Don't confuse a public identifier like these with a credential.

## Deployment

Preserve GitHub Pages project-path compatibility:

- Use relative paths for all internal links, CSS, JS, and images.
- Don't assume the site is served from `/`.
- No server-side routing or logic that depends on the deployed origin.

The site is live via GitHub Pages at https://jamesmoore1998.github.io/unr-grad-community/,
deployed from `main`. Don't change deployment settings (branch source, visibility, custom
domain, disabling Pages) or publish a release without explicit approval from the repository
owner.

## Testing expectations

After any meaningful change, check:

- Internal navigation across all pages (relative links resolve correctly).
- Responsive behavior at mobile, tablet, and desktop widths.
- Browser console is free of errors.
- Basic accessibility: heading order, focus visibility, label/alt text, keyboard operability of
  the nav toggle.
- No new fabricated content, no new unmarked placeholder URLs.

## Change philosophy

- Inspect before editing. Check what already exists and why before changing it.
- Make the smallest maintainable change that accomplishes the goal.
- Preserve working functionality; don't refactor beyond the scope of the task at hand.
- Do not perform destructive Git operations (force-push, history rewrite, branch deletion,
  hard reset discarding work) without explicit approval.
- Do not change repository visibility, branch protection, collaborator access, or GitHub Pages
  settings without explicit approval.
