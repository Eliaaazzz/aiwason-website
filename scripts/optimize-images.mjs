#!/usr/bin/env node
// scripts/optimize-images.mjs
// One-shot pre-build pass that:
//   1. Re-encodes oversized JPG/PNG files in public/projects/ and public/res/ down to
//      a sensible max width (default 1920px) so next/image doesn't have to chew on
//      9MB photos at request time.
//   2. Emits a `.optimized.json` sidecar manifest so subsequent runs are idempotent.
//   3. Emits low-quality base64 placeholder strings for every image into
//      src/lib/data/imagePlaceholders.generated.ts so callers can pass them straight
//      to <Image placeholder="blur" blurDataURL={...}/>.
//
// Run via `npm run prebuild` (chained into `npm run build`).

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const TARGET_DIRS = ['public/projects', 'public/res'];
const MAX_WIDTH = 1920;
const JPG_QUALITY = 82;
const PNG_COMPRESSION = 9;
const SKIP_BELOW_BYTES = 500 * 1024; // already-small files are left alone
const MANIFEST_NAME = '.optimized.json';
const PLACEHOLDER_OUT = path.join(
  projectRoot,
  'src/lib/data/imagePlaceholders.generated.ts',
);

/** Encode a sharp Buffer to a data: URI suitable for blurDataURL. */
function toDataURI(buffer, mime) {
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

async function loadManifest(dir) {
  const file = path.join(dir, MANIFEST_NAME);
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch {
    return {};
  }
}

async function saveManifest(dir, manifest) {
  const file = path.join(dir, MANIFEST_NAME);
  await fs.writeFile(file, JSON.stringify(manifest, null, 2), 'utf8');
}

async function listImages(dir) {
  const absDir = path.join(projectRoot, dir);
  try {
    const entries = await fs.readdir(absDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => /\.(jpe?g|png)$/i.test(name));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

// On Windows, sharp cannot open paths containing non-ASCII characters via libuv.
// Workaround: read the file into a Node Buffer (which uses a different open path) and
// feed the Buffer to sharp.
async function loadSharpInput(absPath) {
  return fs.readFile(absPath);
}

async function optimizeFile(absPath) {
  const stat = await fs.stat(absPath);
  if (stat.size < SKIP_BELOW_BYTES) {
    return { skipped: true, reason: 'already-small', sizeBefore: stat.size };
  }

  const input = await loadSharpInput(absPath);
  const isPng = absPath.toLowerCase().endsWith('.png');
  const pipeline = sharp(input, { failOn: 'none' }).rotate();
  const metadata = await pipeline.metadata();

  const needsResize = (metadata.width ?? 0) > MAX_WIDTH;
  const work = pipeline.clone();
  if (needsResize) work.resize({ width: MAX_WIDTH, withoutEnlargement: true });

  const buffer = isPng
    ? await work
        .png({ compressionLevel: PNG_COMPRESSION, palette: true })
        .toBuffer()
    : await work.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer();

  if (buffer.length >= stat.size) {
    return {
      skipped: true,
      reason: 'no-improvement',
      sizeBefore: stat.size,
      sizeAfter: buffer.length,
    };
  }

  await fs.writeFile(absPath, buffer);
  return { skipped: false, sizeBefore: stat.size, sizeAfter: buffer.length };
}

async function generatePlaceholder(absPath) {
  const input = await loadSharpInput(absPath);
  const buf = await sharp(input)
    .rotate()
    .resize({ width: 16, fit: 'inside' })
    .jpeg({ quality: 50 })
    .toBuffer();
  const meta = await sharp(input).metadata();
  return {
    blurDataURL: toDataURI(buf, 'image/jpeg'),
    width: meta.width ?? 0,
    height: meta.height ?? 0,
  };
}

function formatBytes(n) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / 1024 / 1024).toFixed(2)}MB`;
}

async function main() {
  const allPlaceholders = {};
  let totalBefore = 0;
  let totalAfter = 0;

  for (const relDir of TARGET_DIRS) {
    const absDir = path.join(projectRoot, relDir);
    const images = await listImages(relDir);
    if (!images.length) {
      console.log(`[optimize-images] ${relDir}: no images, skipping.`);
      continue;
    }

    const manifest = await loadManifest(absDir);
    console.log(`[optimize-images] ${relDir}: ${images.length} files`);

    for (const name of images) {
      const absPath = path.join(absDir, name);
      const stat = await fs.stat(absPath);
      const fingerprint = `${stat.mtimeMs}-${stat.size}`;

      let result;
      if (manifest[name]?.fingerprint === fingerprint) {
        result = { skipped: true, reason: 'cached', sizeBefore: stat.size };
      } else {
        try {
          result = await optimizeFile(absPath);
        } catch (err) {
          console.warn(`  ! ${name}: optimize failed: ${err.message}`);
          continue;
        }
      }

      const finalStat = await fs.stat(absPath);
      manifest[name] = {
        fingerprint: `${finalStat.mtimeMs}-${finalStat.size}`,
        sizeBefore: result.sizeBefore,
        sizeAfter: finalStat.size,
        optimizedAt: new Date().toISOString(),
      };

      const before = result.sizeBefore ?? finalStat.size;
      const after = finalStat.size;
      totalBefore += before;
      totalAfter += after;

      const label = result.skipped
        ? `skip (${result.reason})`
        : `${formatBytes(before)} → ${formatBytes(after)} (-${Math.round(
            ((before - after) / before) * 100,
          )}%)`;
      console.log(`  • ${name}: ${label}`);

      try {
        const placeholder = await generatePlaceholder(absPath);
        const publicPath = '/' + path.posix.join(relDir.replace(/^public\//, ''), name);
        allPlaceholders[publicPath] = placeholder;
      } catch (err) {
        console.warn(`  ! ${name}: placeholder failed: ${err.message}`);
      }
    }

    await saveManifest(absDir, manifest);
  }

  await fs.mkdir(path.dirname(PLACEHOLDER_OUT), { recursive: true });
  const entries = Object.entries(allPlaceholders)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([key, val]) =>
        `  ${JSON.stringify(key)}: { blurDataURL: ${JSON.stringify(
          val.blurDataURL,
        )}, width: ${val.width}, height: ${val.height} },`,
    )
    .join('\n');

  const ts = `// AUTO-GENERATED by scripts/optimize-images.mjs — do not edit by hand.
// Run \`npm run prebuild\` (or \`npm run images\`) to regenerate.

export interface ImagePlaceholder {
  readonly blurDataURL: string;
  readonly width: number;
  readonly height: number;
}

export const imagePlaceholders: Readonly<Record<string, ImagePlaceholder>> = {
${entries}
} as const;

export function getPlaceholder(src: string): ImagePlaceholder | undefined {
  return imagePlaceholders[src];
}
`;

  await fs.writeFile(PLACEHOLDER_OUT, ts, 'utf8');

  console.log(
    `[optimize-images] done. total: ${formatBytes(totalBefore)} → ${formatBytes(
      totalAfter,
    )} (saved ${formatBytes(Math.max(0, totalBefore - totalAfter))}). placeholders: ${
      Object.keys(allPlaceholders).length
    }`,
  );
}

main().catch((err) => {
  console.error('[optimize-images] fatal:', err);
  process.exit(1);
});
