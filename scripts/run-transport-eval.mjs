#!/usr/bin/env node
/**
 * KoyJabo transport correctness eval runner.
 * Bundles data modules + dataset via esbuild, runs Layer-1 assertions, reports.
 * Layer-2 (LLM cases) printed for manual/live eval.
 *
 * Usage: node scripts/run-transport-eval.mjs [--llm]
 */
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, '.eval-out');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const entry = path.join(root, 'scripts/eval/aiEvalDataset.ts');
execSync(
  `npx esbuild ${entry} --bundle --platform=node --format=cjs --outfile=${path.join(out, 'dataset.cjs')}`,
  { stdio: 'inherit', cwd: root }
);

const { assertions, llmCases } = await import(path.join(out, 'dataset.cjs'));

let pass = 0, fail = 0;
const failures = [];
for (const a of assertions) {
  try {
    const r = a.check();
    if (r.pass) { pass++; }
    else { fail++; failures.push(`  ✗ ${a.name}\n    → ${r.detail}`); }
  } catch (e) {
    fail++;
    failures.push(`  ✗ ${a.name}\n    → THREW: ${e.message}`);
  }
}

console.log(`\n═══ TRANSPORT EVAL: ${pass} passed / ${fail} failed / ${assertions.length} total ═══`);
if (failures.length) {
  console.log('\nFAILURES:');
  console.log(failures.join('\n'));
}

if (process.argv.includes('--llm')) {
  console.log(`\n═══ LLM CASES (${llmCases.length}) — run in live AI chat ═══`);
  for (const c of llmCases) {
    console.log(`\n[${c.lang}] ${c.question}`);
    console.log(`  must contain: ${c.mustContain.join(' | ')}`);
    if (c.mustNotContain.length) console.log(`  must NOT contain: ${c.mustNotContain.join(' | ')}`);
    console.log(`  note: ${c.sourceNote}`);
  }
}

process.exit(fail > 0 ? 1 : 0);
