import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'

import { discoverReports } from './reports.js'

const reports = discoverReports(path.resolve(getDirname(import.meta.url), '..'))

// Each report gets the same grouped sidebar; '' is the report's README (Summary).
const sidebar = Object.fromEntries(
  reports.map(({ slug, layout }) => [
    `/${slug}/`,
    layout.map((group) => ({
      text: group.text,
      collapsible: false,
      children: group.pages.map(([file, text]) => ({
        text,
        link: `/${slug}/${file ? `${file}.md` : ''}`,
      })),
    })),
  ]),
)

export default defineUserConfig({
  lang: 'en-US',
  // The navbar shows the Cequra wordmark, so the site title only needs to say what the site is.
  title: 'Threat Reports',
  description: 'Cequra honeypot and Suricata threat research from the CequraIQ sensor network',
  // GitHub Pages serves a project site from /<repo-name>/; the deploy workflow sets DOCS_BASE.
  base: process.env.DOCS_BASE || '/',

  // Only the home page and report folders are ever built and published, so notes,
  // templates or other files kept in docs/ never end up on the public site.
  pagePatterns: ['README.md', ...reports.map(({ slug }) => `${slug}/**/*.md`)],

  // Card data for the home page (components/ReportCards.vue).
  define: {
    __REPORTS__: reports.map(({ layout, ...card }) => card),
  },

  bundler: viteBundler(),

  theme: defaultTheme({
    // logo.svg is the official logo with its white "q" darkened for light backgrounds.
    logo: '/logo.svg',
    logoDark: '/logo-dark.svg',
    logoAlt: 'Cequra',
    navbar: [
      { text: 'Reports', link: '/#reports' },
      { text: 'CequraIQ', link: 'https://dashboard.cequraiq.io/login' },
    ],
    sidebar,
    sidebarDepth: 1,
    contributors: false,
    lastUpdated: false,
    editLink: false,
  }),

  plugins: [searchPlugin({ maxSuggestions: 10 })],
})
