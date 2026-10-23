import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash, randomBytes } from 'node:crypto';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');

test('image cache survives timestamp changes and invalidates changed content', async () => {
  const fixture = await fs.mkdtemp(path.join(os.tmpdir(), 'aiwason-images-'));
  try {
    await fs.mkdir(path.join(fixture, 'scripts'));
    await fs.mkdir(path.join(fixture, 'public/res'), { recursive: true });
    await fs.symlink(path.join(root, 'node_modules'), path.join(fixture, 'node_modules'), 'junction');
    await fs.copyFile(path.join(root, 'scripts/optimize-images.mjs'), path.join(fixture, 'scripts/optimize-images.mjs'));
    const imagePath = path.join(fixture, 'public/res/test.png');
    const manifestPath = path.join(fixture, 'public/res/.optimized.json');
    const encoded = await sharp({ create: { width: 64, height: 64, channels: 3, background: '#76b900' } }).png().toBuffer();
    const image = Buffer.concat([encoded, Buffer.alloc(4096 - encoded.length)]);
    await fs.writeFile(imagePath, image);
    const largePath = path.join(fixture, 'public/res/large.png');
    const large = await sharp(randomBytes(2200 * 40 * 3), {
      raw: { width: 2200, height: 40, channels: 3 },
    }).png({ compressionLevel: 0 }).toBuffer();
    await fs.writeFile(largePath, large);
    const run = () => execFileSync(process.execPath, [path.join(fixture, 'scripts/optimize-images.mjs')], { encoding: 'utf8' });

    run();
    const initialManifest = await fs.readFile(manifestPath, 'utf8');
    assert.equal(JSON.parse(initialManifest)['test.png'].fingerprint, hash(image));
    const optimized = await fs.readFile(largePath);
    assert.ok(optimized.length < large.length);
    assert.equal((await sharp(optimized).metadata()).width, 1920);
    assert.equal(JSON.parse(initialManifest)['large.png'].fingerprint, hash(optimized));
    const placeholderPath = path.join(fixture, 'src/lib/data/imagePlaceholders.generated.ts');
    const initialPlaceholders = await fs.readFile(placeholderPath, 'utf8');

    await fs.utimes(imagePath, new Date('2020-01-01'), new Date('2020-01-01'));
    assert.match(run(), /skip \(cached\)/);
    assert.equal(await fs.readFile(manifestPath, 'utf8'), initialManifest);
    assert.equal(await fs.readFile(placeholderPath, 'utf8'), initialPlaceholders);
    assert.deepEqual(await fs.readFile(imagePath), image);

    const replacement = await sharp({ create: { width: 64, height: 64, channels: 3, background: '#000000' } }).png().toBuffer();
    // Pad to equal lengths so a size-only cache would miss the replacement.
    const padded = Buffer.concat([replacement, Buffer.alloc(image.length - replacement.length)]);
    await fs.writeFile(imagePath, padded);
    await fs.utimes(imagePath, new Date('2020-01-01'), new Date('2020-01-01'));
    assert.match(run(), /test\.png: skip \(already-small\)/);
    assert.equal(JSON.parse(await fs.readFile(manifestPath, 'utf8'))['test.png'].fingerprint, hash(padded));
    assert.notEqual(await fs.readFile(placeholderPath, 'utf8'), initialPlaceholders);
    assert.match(run(), /skip \(cached\)/);
  } finally {
    assert.equal(path.dirname(path.resolve(fixture)), path.resolve(os.tmpdir()));
    assert.ok(path.basename(fixture).startsWith('aiwason-images-'));
    await fs.rm(fixture, { recursive: true, force: true });
  }
});
