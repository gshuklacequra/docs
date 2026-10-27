# Threat reports site: maintainer guide

The threat reports in this folder are a [VuePress 2](https://vuejs.press/) site, published to GitHub Pages by `.github/workflows/deploy-docs.yml` whenever `docs/` changes on `master`.

Only the home page (`docs/README.md`) and **report folders** are published. A report folder is any folder here whose `README.md` has a `report:` block in its frontmatter. Everything else in `docs/` (templates, scripts, this guide, any notes you keep here) is never built.

```
docs/
├── README.md               home page (report cards are generated automatically)
├── .vuepress/              site config, styles, card component, logos, downloads
├── redtail-doc/            a report: six fixed pages + images/
├── templates/report/       the fixed report format
└── scripts/new-report.mjs  creates a report folder from the template
```

## Run locally

Needs Node 22.18 or later (`docs/.nvmrc`). All commands run from `docs/`:

```bash
cd docs
nvm use            # or: nvm install
npm install
npm run docs:dev   # http://localhost:8080
```

If you add a report folder while the dev server is running, restart it so the card and sidebar appear.

## Add a report

```bash
git switch -c <your-branch> origin/master
cd docs
npm run new-report -- malware-report-doc "Report title"
```

Fill in the six pages (hints are in `<!-- comments -->`), put figures in `malware-report-doc/images/`, check it with `npm run docs:dev`, then push your branch and merge it into `master`. The site redeploys automatically.

Rules:

- **Never publish honeypot IP addresses.** Use persona names, numbered when reused (`Cobham-decoy #1`). The analysis scripts' `--hide-honeypot-ip` flag does this for figures.
- Keep the six pages and their order.
- Downloads (e.g. IP lists, attacker IPs only) go in `.vuepress/public/downloads/`.

## GitHub Pages setup (once)

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Merge to `master` (or run the workflow from the **Actions** tab). The site is published at `https://<owner>.github.io/<repo>/`, here `https://gshuklacequra.github.io/docs/`.

This repository and the published site are public: review every report before merging, and never include honeypot IP addresses.
