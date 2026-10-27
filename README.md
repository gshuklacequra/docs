# Cequra Threat Reports

Source of the Cequra threat reports site: honeypot and Suricata threat research from the CequraIQ sensor network, built with [VuePress 2](https://vuejs.press/) and published to GitHub Pages at <https://gshuklacequra.github.io/docs/>.

| Path | What it is |
|---|---|
| `docs/README.md` | Home page; report cards are generated automatically |
| `docs/<report>/` | One folder per report (six fixed pages + `images/`), e.g. `docs/redtail-doc/`, `docs/maritime-doc/` |
| `docs/templates/report/` | The fixed report format; `npm run new-report` copies it |
| `docs/.vuepress/` | Site config, styles, logos, downloadable files |
| `.github/workflows/deploy-docs.yml` | Builds and deploys the site whenever `docs/` changes on `master` |

## Quick start

```bash
cd docs
nvm use            # Node 22.18 or later
npm install
npm run docs:dev   # http://localhost:8080
```

New report: `npm run new-report -- <folder-name> "<Report title>"` from `docs/`, fill in the pages, then open a pull request into `master`. Full details are in [docs/DOCS_GUIDE.md](docs/DOCS_GUIDE.md).
