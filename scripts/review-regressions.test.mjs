import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import ts from 'typescript'
import { NextRequest } from 'next/server.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Compile the small server modules with the project's existing TypeScript dependency.
function loadTs(relativePath) {
  const filename = path.resolve(__dirname, '..', relativePath)
  const source = readFileSync(filename, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  })
  const exports = {}
  const localRequire = createRequire(filename)
  const resolve = (id) => {
    if (id.startsWith('@/')) return loadTs(`src/${id.slice(2)}.ts`)
    if (id.startsWith('.')) {
      return loadTs(path.relative(path.resolve(__dirname, '..'), path.resolve(path.dirname(filename), `${id}.ts`)))
    }
    return localRequire(id)
  }
  new Function('require', 'exports', outputText)(resolve, exports)
  return exports
}

const { middleware } = loadTs('src/middleware.ts')
const { buildMetadata } = loadTs('src/lib/seo.ts')
const sitemap = loadTs('src/app/sitemap.ts')

for (const locale of ['en', 'zh']) {
  test(`middleware forwards ${locale} request headers and updates the cookie`, () => {
    const response = middleware(new NextRequest(`https://example.com/${locale}/about`, {
      headers: { 'x-locale': 'spoofed', 'x-pathname': '/wrong', 'x-custom': 'preserved' },
    }))
    assert.equal(response.headers.get('x-middleware-request-x-locale'), locale)
    assert.equal(response.headers.get('x-middleware-request-x-pathname'), `/${locale}/about`)
    assert.equal(response.headers.get('x-middleware-request-x-custom'), 'preserved')
    assert.equal(response.cookies.get('NEXT_LOCALE').value, locale)
  })

  test(`metadata uses ${locale} canonical, hreflang and social image paths`, () => {
    const metadata = buildMetadata({
      locale, path: '/news/airport-upgrade',
      title: { en: 'Airport', zh: '机场' },
      description: { en: 'Airport upgrade', zh: '机场升级' },
    })
    assert.equal(metadata.alternates.canonical, `/${locale}/news/airport-upgrade`)
    assert.deepEqual(metadata.alternates.languages, {
      en: '/en/news/airport-upgrade', 'zh-CN': '/zh/news/airport-upgrade',
      'x-default': '/zh/news/airport-upgrade',
    })
    assert.equal(metadata.openGraph.images[0].url, `/${locale}/opengraph-image`)
    assert.deepEqual(metadata.twitter.images, [`/${locale}/opengraph-image`])
    assert.equal(metadata.title.absolute, locale === 'en' ? 'Airport' : '机场')
  })
}

test('dotted slugs redirect using the locale cookie and preserve query strings', () => {
  const response = middleware(new NextRequest('https://example.com/news/v1.0-release?source=test', {
    headers: { cookie: 'NEXT_LOCALE=en', 'accept-language': 'zh' },
  }))
  assert.equal(response.status, 307)
  assert.equal(response.headers.get('location'), 'https://example.com/en/news/v1.0-release?source=test')
})

test('static assets bypass locale routing', () => {
  for (const route of ['/res/photo.jpg', '/sitemap.xml', '/images/logo.svg']) {
    const response = middleware(new NextRequest(`https://example.com${route}`))
    assert.equal(response.headers.get('location'), null)
    assert.equal(response.headers.get('x-middleware-next'), '1')
  }
})

test('explicit social image overrides remain supported', () => {
  const metadata = buildMetadata({
    locale: 'en', path: '', title: { en: 'Home', zh: '主页' },
    description: { en: 'Home', zh: '主页' }, image: '/res/custom.png',
  })
  assert.equal(metadata.openGraph.images[0].url, '/res/custom.png')
  assert.deepEqual(metadata.twitter.images, ['/res/custom.png'])
})

test('sitemap covers every localized page on disk', () => {
  const root = path.resolve(__dirname, '../src/app/[locale]')
  const routes = readdirSync(root, { recursive: true })
    .filter((file) => path.basename(file) === 'page.tsx')
    .map((file) => path.dirname(file) === '.' ? '' : path.dirname(file).split(path.sep).map(encodeURIComponent).join('/'))
  const urls = new Set(sitemap.default().map((entry) => entry.url))
  for (const route of routes) {
    for (const locale of ['en', 'zh']) {
      assert.ok(urls.has(`https://aiwasontech.com/${locale}${route ? `/${route}` : ''}`), route)
    }
  }
})
