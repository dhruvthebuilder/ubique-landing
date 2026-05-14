#!/usr/bin/env node
/**
 * Build-time image pipeline for Ubique v1/v2.
 *
 * For each slot:
 *   1. Expand basePrompt through BRAND_SPINE via Claude Sonnet 4.5 → dense ~250-word image prompt
 *   2. Generate with OpenAI gpt-image-1 (GPT Image 2) at the slot's aspect/size
 *   3. Convert PNG → WebP via sharp at quality 88
 *   4. Write public/generated/<variant>/<slot>.webp + <slot>.prompt.txt
 *   5. Cache prompt hash so unchanged slots are skipped on rerun
 *
 * CLI:
 *   npm run generate-images                 # all slots, cached
 *   npm run generate-images -- --variant=v1
 *   npm run generate-images -- --slot=img-hero --variant=v1
 *   npm run generate-images -- --force      # ignore cache
 *
 * Env required: ANTHROPIC_API_KEY, OPENAI_API_KEY
 */
import * as dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config(); // fallback to .env
import { Anthropic } from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import sharp from 'sharp';
import { getAllSlots, type Slot } from './slot-discovery';
import { BRAND_SPINE, TECHNICAL_SUFFIX } from './brand-spine';

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY in environment. Add it to .env.local.');
  process.exit(1);
}
if (!process.env.OPENAI_API_KEY) {
  console.error('Missing OPENAI_API_KEY in environment. Add it to .env.local.');
  process.exit(1);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const OUTPUT_ROOT = path.resolve(process.cwd(), 'public', 'generated');
const CACHE_PATH = path.resolve(process.cwd(), '.image-cache.json');

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

async function expandPrompt(slot: Slot): Promise<string> {
  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1500,
    messages: [{
      role: 'user',
      content: `You are writing an image generation prompt for OpenAI gpt-image-1.

Your job: take the SCENE BRIEF and compose it with the BRAND SPINE into a single dense, vivid, image-generation-ready prompt of 200-350 words.

Rules:
- Lead with the subject and composition. Then lighting. Then texture and palette. Then technical notes (film grain, no text, no logos).
- Every sentence must add a specific visual detail. No abstract adjectives ("beautiful", "stunning") — only concrete description.
- Maintain the BRAND SPINE constraints throughout. Especially: no logos, no text, no Western startup tropes, no gradient blobs, Indian editorial context, theatrical-quiet-luxury aesthetic.
- Output the prompt only. No preamble, no explanation, no quotation marks.

BRAND SPINE:
${BRAND_SPINE}

SCENE BRIEF:
${slot.basePrompt}

ASPECT RATIO: ${slot.aspect}
ALT TEXT (helps you understand intent): ${slot.alt}

Now write the prompt.`
    }]
  });
  const text = msg.content
    .filter((b): b is Extract<typeof b, { type: 'text' }> => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
  return `${text}\n\n${TECHNICAL_SUFFIX}`;
}

async function generate(slot: Slot, prompt: string): Promise<Buffer> {
  const resp = await openai.images.generate({
    model: 'gpt-image-1',
    prompt,
    size: slot.size,
    quality: 'high',
    n: 1
  });
  const b64 = resp.data?.[0]?.b64_json;
  if (!b64) throw new Error(`No image returned for ${slot.variant}/${slot.slot}`);
  return Buffer.from(b64, 'base64');
}

async function processSlot(slot: Slot, cache: Cache, force: boolean): Promise<'cached' | 'generated' | 'failed'> {
  const key = `${slot.variant}/${slot.slot}`;
  const dir = path.join(OUTPUT_ROOT, slot.variant);
  const outPath = path.join(dir, `${slot.slot}.webp`);
  const promptPath = path.join(dir, `${slot.slot}.prompt.txt`);
  const h = hash(slot.basePrompt);
  const cached = cache[key];
  const exists = await fs.access(outPath).then(() => true).catch(() => false);

  if (!force && cached && cached.promptHash === h && exists) {
    console.log(`  cached    ${key}`);
    return 'cached';
  }

  console.log(`  generate  ${key} …`);
  await fs.mkdir(dir, { recursive: true });

  try {
    const expanded = await expandPrompt(slot);
    await fs.writeFile(promptPath, expanded);

    const raw = await generate(slot, expanded);
    await sharp(raw).webp({ quality: 88 }).toFile(outPath);

    cache[key] = { slot: slot.slot, variant: slot.variant, promptHash: h, generatedAt: new Date().toISOString() };
    console.log(`  ✓         ${key}`);
    return 'generated';
  } catch (err) {
    console.error(`  ✗         ${key}: ${(err as Error).message}`);
    return 'failed';
  }
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const variantArg = args.find((a) => a.startsWith('--variant='))?.split('=')[1] as 'v1' | 'v2' | undefined;
  const slotArg = args.find((a) => a.startsWith('--slot='))?.split('=')[1];

  const cache = await loadCache();
  let slots = getAllSlots();
  if (variantArg) slots = slots.filter((s) => s.variant === variantArg);
  if (slotArg) slots = slots.filter((s) => s.slot === slotArg);

  if (slots.length === 0) {
    console.error('No slots match the supplied filters. Aborting.');
    process.exit(1);
  }

  console.log(`Generating ${slots.length} image(s)${force ? ' (force mode)' : ''}.`);
  const tally = { cached: 0, generated: 0, failed: 0 };
  for (const slot of slots) {
    const res = await processSlot(slot, cache, force);
    tally[res]++;
    await saveCache(cache);
  }
  console.log('---');
  console.log(`cached:    ${tally.cached}`);
  console.log(`generated: ${tally.generated}`);
  console.log(`failed:    ${tally.failed}`);
  if (tally.failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
