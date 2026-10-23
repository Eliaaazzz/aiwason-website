#!/usr/bin/env node
// Minimal codemod for pages relocated to src/app/[locale]/*.
// Goal: make pages read locale from params (path-based routing) instead of
// searchParams.lang (query-based), and prerender both locales via
// generateStaticParams. Leaves inline `export const metadata` alone — it
// remains valid for Lighthouse SEO audits.
//
// Run: node scripts/convert-locale-pages.mjs
// Idempotent: skips files that already declare generateStaticParams.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = 'src/app/[locale]'

const ALREADY_DONE = /export\s+(async\s+)?function\s+generateStaticParams|export\s+const\s+generateStaticParams\b/
const HAS_PROD_SHAPE =
  /searchParams:\s*Promise<\{\s*lang\?:\s*string\s*\}>/

const TYPE_PAGEPROPS_OLD =
  /type\s+PageProps\s*=\s*\{\s*searchParams:\s*Promise<\{\s*lang\?:\s*string\s*\}>\s*\}/

const FN_SIG_OLD =
  /export default async function (\w+)\s*\(\s*\{\s*searchParams\s*\}\s*:\s*(?:PageProps|\{\s*searchParams:\s*Promise<\{\s*lang\?:\s*string\s*\}>\s*\})\s*\)\s*\{\s*\n\s*const\s+sp\s*=\s*await\s+searchParams\s*\n\s*const\s+lang\s*=\s*\(\s*sp\?\.lang\s*===\s*'zh'\s*\?\s*'zh'\s*:\s*'en'\s*\)\s*as\s*'en'\s*\|\s*'zh'/

// Some pages use `lang === 'zh' ? 'zh' : 'en'` without the `as` cast — try a looser match too.
const FN_SIG_LOOSE =
  /export default async function (\w+)\s*\(\s*\{\s*searchParams\s*\}\s*:\s*\{\s*searchParams:\s*Promise<\{\s*lang\?:\s*string\s*\}>\s*\}\s*\)/

const STATIC_PARAMS_INSERT = `
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }]
}
`

const files = []
function walk(dir) {
  if (!existsSync(dir)) return
  for (const ent of readdirSync(dir)) {
    const full = join(dir, ent)
    const s = statSync(full)
    if (s.isDirectory()) walk(full)
    else if (ent === 'page.tsx') files.push(full)
  }
}
walk(ROOT)

let converted = 0
let skippedAlready = 0
let skippedShape = 0
let skippedThin = 0
const shapeIssues = []

for (const file of files) {
  let src = readFileSync(file, 'utf8')

  if (ALREADY_DONE.test(src)) {
    skippedAlready++
    continue
  }

  // Thin re-exports: handled in a separate step.
  if (src.split('\n').filter((l) => l.trim()).length <= 3) {
    skippedThin++
    continue
  }

  if (!HAS_PROD_SHAPE.test(src)) {
    skippedShape++
    shapeIssues.push(`${file}: no searchParams.lang signature (custom page)`)
    continue
  }

  let changed = false

  // 1) Insert generateStaticParams after the import block.
  // Find the end of the last contiguous import line near the top
  // (allowing leading `//` comments or blank lines).
  const lines = src.split('\n')
  let lastImportIdx = -1
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim()
    if (t.startsWith('import ')) lastImportIdx = i
    // stop scanning once we hit non-import non-comment non-blank content
    if (
      lastImportIdx !== -1 &&
      t !== '' &&
      !t.startsWith('import ') &&
      !t.startsWith('//')
    ) {
      break
    }
  }
  if (lastImportIdx === -1) {
    shapeIssues.push(`${file}: no import block found`)
    skippedShape++
    continue
  }
  // Insert after lastImportIdx (i.e. before line lastImportIdx+1)
  lines.splice(lastImportIdx + 1, 0, STATIC_PARAMS_INSERT.trim())
  src = lines.join('\n')
  changed = true

  // 2) Rewrite the PageProps type if present.
  if (TYPE_PAGEPROPS_OLD.test(src)) {
    src = src.replace(
      TYPE_PAGEPROPS_OLD,
      'type PageProps = { params: Promise<{ locale: string }> }',
    )
    changed = true
  }

  // 3) Rewrite the function signature + lang extraction.
  if (FN_SIG_OLD.test(src)) {
    src = src.replace(FN_SIG_OLD, (m, fnName) => {
      return `export default async function ${fnName}({ params }: PageProps) {
  const { locale } = await params
  const lang = (locale === 'zh' ? 'zh' : 'en') as 'en' | 'zh'`
    })
    changed = true
  } else if (FN_SIG_LOOSE.test(src)) {
    // Page declares signature but the lang extraction differs — leave a marker.
    shapeIssues.push(`${file}: function signature matched loosely but body differs; needs manual check`)
  }

  if (changed) {
    writeFileSync(file, src)
    converted++
  } else {
    skippedShape++
    shapeIssues.push(`${file}: no changes applied`)
  }
}

console.log(`Converted: ${converted}`)
console.log(`Skipped (already converted): ${skippedAlready}`)
console.log(`Skipped (thin re-export, handled separately): ${skippedThin}`)
console.log(`Skipped (shape mismatch): ${skippedShape}`)
if (shapeIssues.length) {
  console.log('\nShape issues:')
  for (const m of shapeIssues) console.log('  ' + m)
}
