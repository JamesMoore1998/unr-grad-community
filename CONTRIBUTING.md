# Contributing

Thanks for helping build UNR Graduate Community. This is a small, static site maintained by
volunteers — the process is intentionally lightweight.

## Philosophy

- Prefer semantic HTML, plain CSS, and minimal vanilla JavaScript over frameworks or build
  tools. See [AGENTS.md](AGENTS.md) for the full dependency policy.
- Keep changes as small and focused as the task allows. Don't refactor unrelated code while
  fixing something else.
- This site links to and embeds Discord and Google Calendar rather than rebuilding their
  functionality — don't add features that duplicate what those services already do well.

## Making a small change

1. Fork or branch the repository.
2. Edit the relevant HTML/CSS/JS file(s) directly.
3. If you're changing navigation or shared layout, update it consistently across
   `index.html`, `events.html`, `resources.html`, and `about.html` — there's no shared template
   layer.
4. Preview locally (below) before opening a pull request.
5. Open a pull request with a short description of what changed and why.

## Local preview

No installation required:

```bash
open index.html
```

or, to more closely match how GitHub Pages serves the site:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Accessibility expectations

- Keep heading levels in order (don't skip from `<h2>` to `<h4>`).
- Every image needs meaningful `alt` text, or `alt=""` if it's purely decorative.
- Every form control needs an associated `<label>`.
- Interactive elements must be reachable and operable by keyboard, with a visible focus state.
- Don't rely on color alone to convey meaning.
- Don't add ARIA attributes where native HTML semantics already do the job.
- If you add animation, respect `prefers-reduced-motion`.

## Content accuracy

Do not invent University of Nevada, Reno information: office names, links, phone numbers,
policies, deadlines, eligibility criteria, personnel, events, or endorsements. If you don't have
a verified source, add an explicit `TODO:` note (or one of the named placeholders listed in
[AGENTS.md](AGENTS.md)) instead of guessing. Reviewers should reject content that looks
plausible but isn't sourced.

## Never commit secrets

No passwords, API keys, tokens, OAuth secrets, private Discord invite links, private calendar
credentials, or personally identifying information that hasn't clearly been designated public.
If you accidentally commit something sensitive, flag it in your pull request rather than trying
to silently rewrite history.

## Pull requests

Use a pull request for any change beyond a trivial typo fix — it gives the maintainer a chance
to review before anything lands on `main`. No formal template or CI gate is required for a
project this size; a clear description of what changed and why is enough.
