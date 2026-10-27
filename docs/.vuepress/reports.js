// Reports are discovered automatically: every folder under docs/ whose README.md
// has a `report:` block in its frontmatter becomes a report (home page card +
// sidebar) and is the only content published. Adding a report = adding a folder.

import { fs, path } from 'vuepress/utils'
import matter from 'gray-matter'

// Fixed report format: same pages, same order, same sidebar groups for every report.
// [file name without .md ('' = README.md, the page the report opens on), sidebar label]
export const REPORT_LAYOUT = [
  {
    text: 'Overview',
    pages: [
      ['', 'Summary'],
      ['data-and-method', 'Data & Method'],
    ],
  },
  {
    text: 'Analysis',
    pages: [
      ['activity', 'Activity Overview'],
      ['attack-breakdown', 'Attack Breakdown'],
      ['campaign-analysis', 'Campaign Analysis'],
    ],
  },
  {
    text: 'Response',
    pages: [['indicators', 'Indicators & Detection']],
  },
]

/** Report folders under `docsDir`, newest first, with their card metadata and existing pages. */
export const discoverReports = (docsDir) =>
  fs
    .readdirSync(docsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules')
    .map((entry) => {
      const dir = path.join(docsDir, entry.name)
      const readme = path.join(dir, 'README.md')
      if (!fs.existsSync(readme)) return null
      const { report } = matter(fs.readFileSync(readme, 'utf8')).data
      if (!report) return null
      const published = report.published instanceof Date
        ? report.published.toISOString().slice(0, 10)
        : String(report.published ?? '')
      return {
        slug: entry.name,
        ...report,
        published,
        // Only link pages that exist, so a report missing a section never breaks the sidebar.
        layout: REPORT_LAYOUT.map((group) => ({
          ...group,
          pages: group.pages.filter(([file]) => !file || fs.existsSync(path.join(dir, `${file}.md`))),
        })).filter((group) => group.pages.length),
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.published.localeCompare(a.published))
