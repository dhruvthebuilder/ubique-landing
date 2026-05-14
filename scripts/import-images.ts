#!/usr/bin/env node
/**
 * Convert any PNG/JPG/WebP dropped into _pending-images/<variant>/ into the
 * canonical /public/generated/<variant>/<slot>.webp location, then delete the
 * source file. Updates .image-cache.json so the slot is treated as cached on
 * future generate-images runs.
 *
 * Workflow:
 *   1. Run generate-images with the live keys. Some slots fail (billing, rate
 *      limit, content policy).
 *   2. Open _pending-images/<variant>/<slot>.prompt.txt, paste into ChatGPT,
 *      generate the image, save as <slot>.png|jpg|jpeg|webp in the same folder.
 *   3. Run `npm run import-images`. The image lands in production output, the
 *      cache records it, and the source is removed.
 */
import * as dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();
import sharp from 'sharp';
import { getAllSlots } from './slot-discovery';

const INTAKE_ROOT = path.resolve(process.cwd(), '_pending-images');
const OUTPUT_ROOT = path.resolve(process.cwd(), 'public', 'generated');
const CACHE_PATH = path.resolve(process.cwd(), '.image-cache.json');

const VALID_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

type CacheEntry = { slot: string; variant: string; promptHash: string; generatedAt: string };
type Cache = Record<string, CacheEntry>;

async function loadCache(): Promise<Cache> {
  try { return JSON.parse(await fs.readFile(CACHE_PATH, 'utf8')); } catch { return {}; }
}
async function saveCache(c: Cache) {
  await fs.writeFile(CACHE_PATH, JSON.stringify(c, null, 2));
}
function hash(s: string): string {
  return crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
}

async function processFile(variant: string, file: string, slotIndex: Map<string, string>, cache: Cache): Promise<boolean> {
  const slot = path.basename(file, path.extname(file));
  const basePrompt = slotIndex.get(`${variant}/${slot}`);
  if (!basePrompt) {
    console.warn(`  skip ${variant}/${file}: no slot named "${slot}" in slot-discovery (typo?)`);
    return false;
  }
  const src = path.join(INTAKE_ROOT, variant, file);
  const outDir = path.join(OUTPUT_ROOT, variant);
  const outPath = path.join(outDir, `${slot}.webp`);

  await fs.mkdir(outDir, { recursive: true });
  await sharp(src).webp({ quality: 88 }).toFile(outPath);
  await fs.unlink(src);

  cache[`${variant}/${slot}`] = {
    slot,
    variant,
    promptHash: hash(basePrompt),
    generatedAt: new Date().toISOString()
  };

  const stat = await fs.stat(outPath);
  console.log(`  ✓ ${variant}/${slot}.webp (${Math.round(stat.size / 1024)}K)`);
  return true;
}

async function main() {
  const slotIndex = new Map(getAllSlots().map((s) => [`${s.variant}/${s.slot}`, s.basePrompt]));
  const cache = await loadCache();

  const variants = await fs.readdir(INTAKE_ROOT).catch(() => []);
  let count = 0;

  for (const variant of variants) {
    const variantDir = path.join(INTAKE_ROOT, variant);
    const stat = await fs.stat(variantDir).catch(() => null);
    if (!stat?.isDirectory()) continue;

    const files = await fs.readdir(variantDir);
    const images = files.filter((f) => VALID_EXT.has(path.extname(f).toLowerCase()));
    if (images.length === 0) continue;

    console.log(`${variant}/ — ${images.length} image(s) to import`);
    for (const file of images) {
      const ok = await processFile(variant, file, slotIndex, cache);
      if (ok) count++;
      await saveCache(cache);
    }
  }

  if (count === 0) {
    console.log('Nothing to import. Drop PNG/JPG/WebP files into _pending-images/<variant>/ first.');
    return;
  }

  console.log(`---\nImported ${count} image(s). Commit public/generated/ and redeploy.`);
}

main().catch((err) => {
  console.error('import-images failed:', err);
  process.exit(1);
});
