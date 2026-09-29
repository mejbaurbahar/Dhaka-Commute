/**
 * KoyJabo Multi-Agent QA Autonomous Test Runner
 *
 * Usage:
 *   npx tsx scripts/multiagent-qa/runner.ts
 *   node --loader ts-node/esm scripts/multiagent-qa/runner.ts
 */
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { OrchestratorAgent } from './OrchestratorAgent';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');

async function main() {
  const orchestrator = new OrchestratorAgent(rootDir);
  const summary = await orchestrator.executeAutonomousPipeline();

  // Print summary tables
  console.log('📊 MULTI-AGENT SCORECARD:');
  for (const [role, res] of Object.entries(summary.agentResults)) {
    if (role === 'orchestrator') continue;
    const badge = res.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`  ${badge} [${res.score}%] ${res.name.padEnd(38)} (${res.checks.length} checks in ${res.executionTimeMs}ms)`);
  }

  // Print Handoff Timeline
  console.log('\n🔄 AGENT DECISION & HANDOFF TRACE:');
  summary.handoffTimeline.forEach((h, i) => {
    console.log(`  [Step ${i + 1}] ${h.fromAgent} ➔ ${h.toAgent}`);
    h.decisionsMade.forEach(d => console.log(`      • ${d}`));
  });

  // Save report to markdown
  const reportPath = path.join(rootDir, 'QA_MULTIAGENT_REPORT.md');
  const mdReport = generateMarkdownReport(summary);
  fs.writeFileSync(reportPath, mdReport, 'utf-8');
  console.log(`\n📄 Complete Markdown Report written to: ${reportPath}`);

  if (summary.failedChecks > 0) {
    process.exitCode = 1;
  }
}

function generateMarkdownReport(summary: any): string {
  return `# 🛡️ KoyJabo Autonomous Multi-Agent QA Audit Report
**Run ID:** \`${summary.runId}\`  
**Timestamp:** \`${summary.timestamp}\`  
**Overall System Quality Score:** **${summary.overallScore}%**  
**Total Checks:** ${summary.totalChecks} | **Passed:** ${summary.passedChecks} | **Failed:** ${summary.failedChecks}

---

## 1. Multi-Agent System Architecture & Roles

| Agent Name | Architectural Role | Focus Domain | Hand-off Output to Next Agent |
| :--- | :--- | :--- | :--- |
| **OrchestratorAgent** | Mission Controller & Pipeline Director | End-to-end task scheduling & retries | Directs domain agents in ordered DAG |
| **FunctionalTestingAgent** | UI & User Journey Validator | 16+ core pages, themes, i18n, bus routing | Screen readiness & algorithm verification |
| **DataVerificationAgent** | Ground Truth & Geospatial Auditor | BRTA fare rates (৳2.70), coordinates, 313 routes | Validated dataset invariants & GPS boundaries |
| **SeoAeoGeoAgent** | Visibility & Generative AI Indexer | SEO tags, sitemap, llms.txt, AI Q&A | Machine-readable feeds for Claude/GPT/Perplexity |
| **SecurityAuditAgent** | Application Hardening & Defense | OWASP Top 10, XSS fuzzing, secret leak scan | Verified sanitization & zero-leak posture |
| **OfflinePwaAgent** | Zero-Network Commuter Engine | PWA manifest, service worker, offline assets | Offline capability guarantees |
| **SelfImprovementAgent** | Feedback Loop & Continuous Learner | Regression ledger, auto-tuning heuristics | Updated persistent memory & learning rules |

---

## 2. Agent Scorecard & Domain Breakdown

${Object.entries(summary.agentResults)
  .filter(([role]) => role !== 'orchestrator')
  .map(([_, r]: [string, any]) => `### ${r.passed ? '✅' : '❌'} ${r.name} — **${r.score}%** (${r.executionTimeMs}ms)
${r.checks.map((c: any) => `- [${c.pass ? 'x' : ' '}] **${c.name}** (${c.category}): ${c.detail}`).join('\n')}`)
  .join('\n\n')}

---

## 3. Decision & Handoff Audit Trail
Each agent inspects its assigned scope, makes autonomous decisions, and structures data payloads for the subsequent agent:

${summary.handoffTimeline.map((h: any, idx: number) => `### Handoff ${idx + 1}: \`${h.fromAgent}\` ➔ \`${h.toAgent}\`
- **Input Received:** ${h.inputReceived}
- **Decisions Made:**
${h.decisionsMade.map((d: string) => `  - ${d}`).join('\n')}
- **Assessed Data Passed:** \`${JSON.stringify(h.assessedDataForNextAgent)}\`
`).join('\n')}

---

## 4. Self-Improvement & Continuous Learning Engine
- **Total Historical Test Runs Tracked:** ${summary.improvementLedger.totalRuns}
- **Active Regression Rules Guarded:** ${summary.improvementLedger.activeRegressionRules.length}

### Active Prevention Rules:
${summary.improvementLedger.activeRegressionRules.map((r: any) => `- **${r.id}** (${r.category}): ${r.description}  
  *Pattern:* \`${r.detectionPattern}\` | *Action:* ${r.preventiveAction}`).join('\n')}

### Autonomous Quality Insights:
${summary.improvementLedger.learningInsights.map((insight: string) => `- ${insight}`).join('\n')}
`;
}

main().catch(err => {
  console.error('Fatal error in multi-agent QA runner:', err);
  process.exit(1);
});
