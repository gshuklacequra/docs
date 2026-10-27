#!/usr/bin/env node
// Create a new report folder (docs/<folder-name>) from templates/report. Run from docs/:
//   npm run new-report -- <folder-name> "<Report title>"
//   npm run new-report -- malware-report-doc "Mirai variant targets port 23"
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [slug, title] = process.argv.slice(2)

if (!slug || !title || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error('Usage: npm run new-report -- <folder-name> "<Report title>"')
  console.error('  folder-name: lowercase letters, numbers and dashes, e.g. malware-report-doc')
  process.exit(1)
}

const target = path.join(docsDir, slug)
if (fs.existsSync(target)) {
  console.error(`docs/${slug} already exists`)
  process.exit(1)
}

const now = new Date()
const values = {
  '{{TITLE}}': title.replace(/'/g, "''"),
  '{{SLUG}}': slug,
  '{{DATE}}': now.toISOString().slice(0, 10),
  '{{DATE_LONG}}': now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
}

const templateDir = path.join(docsDir, 'templates', 'report')
fs.mkdirSync(path.join(target, 'images'), { recursive: true })
fs.writeFileSync(path.join(target, 'images', '.gitkeep'), '')
for (const file of fs.readdirSync(templateDir)) {
  let text = fs.readFileSync(path.join(templateDir, file), 'utf8')
  for (const [key, value] of Object.entries(values)) text = text.replaceAll(key, value)
  // The title placeholder sits in YAML quotes in the frontmatter but in plain text in the H1.
  text = text.replace(`# ${values['{{TITLE}}']}`, `# ${title}`)
  fs.writeFileSync(path.join(target, file), text)
}

console.log(`Created docs/${slug}/ with ${fs.readdirSync(templateDir).length} pages.`)
console.log('Next: fill in the pages, add figures to images/, then run `npm run docs:dev`.')
