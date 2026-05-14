#!/usr/bin/env node
/**
 * Replace %NEXT_PUBLIC_*% tokens inside public/v1/index.html and public/v2/index.html
 * with values from the environment. Runs as a `prebuild` step so production deploys
 * always have current keys; safe to re-run idempotently because the snippet's runtime
 * check (`charAt(0) !== '%'`) handles both substituted and untouched states.
 *
 * Only NEXT_PUBLIC_* keys are inlined here; server-only secrets never appear in HTML.
 */
import * as dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config(); // fallback to .env

const TARGETS = [
  {
    template: path.resolve(process.cwd(), 'public/v1/index.template.html'),
    output: path.resolve(process.cwd(), 'public/v1/index.html')
  },
  {
    template: path.resolve(process.cwd(), 'public/v2/index.template.html'),
    output: path.resolve(process.cwd(), 'public/v2/index.html')
  }
];

const PUBLIC_KEYS = [
  'NEXT_PUBLIC_POSTHOG_KEY',
  'NEXT_PUBLIC_POSTHOG_HOST',
  'NEXT_PUBLIC_META_PIXEL_ID',
  'NEXT_PUBLIC_GOOGLE_ADS_ID',
  'NEXT_PUBLIC_GOOGLE_ADS_LABEL'
];

async function buildFromTemplate(t: { template: string; output: string }): Promise<void> {
  let html: string;
  try {
    html = await fs.readFile(t.template, 'utf8');
  } catch {
    console.warn(`skip ${path.relative(process.cwd(), t.template)}: not found (run unpack-v2 first if this is v2)`);
    return;
  }
  let changes = 0;
  for (const key of PUBLIC_KEYS) {
    const token = `%${key}%`;
    const val = process.env[key] ?? '';
    if (html.includes(token)) {
      html = html.split(token).join(val);
      changes++;
    }
  }
  await fs.writeFile(t.output, html);
  console.log(`  ${path.relative(process.cwd(), t.output)}: ${changes} key(s) substituted`);
}

async function main() {
  console.log('Building variants from templates with NEXT_PUBLIC_* keys…');
  for (const t of TARGETS) await buildFromTemplate(t);
  console.log('Done.');
}

main().catch((err) => {
  console.error('inject-keys failed:', err);
  process.exit(1);
});
