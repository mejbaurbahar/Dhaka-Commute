/**
 * OrchestratorAgent - Master Controller of the KoyJabo Multi-Agent QA System
 */
import { AgentRole, AgentResult, AgentHandoff, FullQASummary } from './types';
import { FunctionalTestingAgent } from './FunctionalTestingAgent';
import { DataVerificationAgent } from './DataVerificationAgent';
import { SeoAeoGeoAgent } from './SeoAeoGeoAgent';
import { SecurityAuditAgent } from './SecurityAuditAgent';
import { OfflinePwaAgent } from './OfflinePwaAgent';
import { SelfImprovementAgent } from './SelfImprovementAgent';

export class OrchestratorAgent {
  private rootDir: string;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }

  async executeAutonomousPipeline(): Promise<FullQASummary> {
    const runId = `qa-run-${Date.now()}`;
    const startTime = Date.now();
    const handoffTimeline: AgentHandoff[] = [];
    const agentResults: Partial<Record<AgentRole, AgentResult>> = {};

    console.log(`\n🤖 [OrchestratorAgent] Initializing Autonomous Multi-Agent QA Mission: ${runId}`);
    console.log(`🧭 Root Directory: ${this.rootDir}\n`);

    // ── STAGE 1: FUNCTIONAL TESTING ──────────────────────────────────────────
    console.log('▶ [Stage 1] Launching FunctionalTestingAgent...');
    const functionalAgent = new FunctionalTestingAgent(this.rootDir);
    const { result: functionalRes, handoff: functionalHandoff } = await this.retryWithBackoff(
      () => functionalAgent.run({ mission: 'full-system-functional-audit' }),
      'FunctionalTestingAgent'
    );
    agentResults['functional'] = functionalRes;
    handoffTimeline.push(functionalHandoff);
    console.log(`  ✓ FunctionalTestingAgent finished (${functionalRes.score}%) in ${functionalRes.executionTimeMs}ms`);

    // ── STAGE 2: DATA VERIFICATION ───────────────────────────────────────────
    console.log('▶ [Stage 2] Launching DataVerificationAgent...');
    const dataAgent = new DataVerificationAgent(this.rootDir);
    const { result: dataRes, handoff: dataHandoff } = await this.retryWithBackoff(
      () => dataAgent.run(functionalHandoff.assessedDataForNextAgent),
      'DataVerificationAgent'
    );
    agentResults['data_verification'] = dataRes;
    handoffTimeline.push(dataHandoff);
    console.log(`  ✓ DataVerificationAgent finished (${dataRes.score}%) in ${dataRes.executionTimeMs}ms`);

    // ── STAGE 3: SEO / AEO / GEO OPTIMIZATION ────────────────────────────────
    console.log('▶ [Stage 3] Launching SeoAeoGeoAgent...');
    const seoAgent = new SeoAeoGeoAgent(this.rootDir);
    const { result: seoRes, handoff: seoHandoff } = await this.retryWithBackoff(
      () => seoAgent.run(dataHandoff.assessedDataForNextAgent),
      'SeoAeoGeoAgent'
    );
    agentResults['seo_aeo_geo'] = seoRes;
    handoffTimeline.push(seoHandoff);
    console.log(`  ✓ SeoAeoGeoAgent finished (${seoRes.score}%) in ${seoRes.executionTimeMs}ms`);

    // ── STAGE 4: SECURITY AUDIT ──────────────────────────────────────────────
    console.log('▶ [Stage 4] Launching SecurityAuditAgent...');
    const securityAgent = new SecurityAuditAgent(this.rootDir);
    const { result: secRes, handoff: secHandoff } = await this.retryWithBackoff(
      () => securityAgent.run(seoHandoff.assessedDataForNextAgent),
      'SecurityAuditAgent'
    );
    agentResults['security'] = secRes;
    handoffTimeline.push(secHandoff);
    console.log(`  ✓ SecurityAuditAgent finished (${secRes.score}%) in ${secRes.executionTimeMs}ms`);

    // ── STAGE 5: OFFLINE & PWA VERIFICATION ──────────────────────────────────
    console.log('▶ [Stage 5] Launching OfflinePwaAgent...');
    const offlineAgent = new OfflinePwaAgent(this.rootDir);
    const { result: offRes, handoff: offHandoff } = await this.retryWithBackoff(
      () => offlineAgent.run(secHandoff.assessedDataForNextAgent),
      'OfflinePwaAgent'
    );
    agentResults['offline_pwa'] = offRes;
    handoffTimeline.push(offHandoff);
    console.log(`  ✓ OfflinePwaAgent finished (${offRes.score}%) in ${offRes.executionTimeMs}ms`);

    // ── STAGE 6: SELF-IMPROVEMENT & CONTINUOUS LEARNING ──────────────────────
    console.log('▶ [Stage 6] Launching SelfImprovementAgent...');
    const selfImprovementAgent = new SelfImprovementAgent(this.rootDir);
    const { result: siRes, handoff: siHandoff, updatedLedger } = await this.retryWithBackoff(
      () => selfImprovementAgent.run(agentResults as Record<string, AgentResult>),
      'SelfImprovementAgent'
    );
    agentResults['self_improvement'] = siRes;
    handoffTimeline.push(siHandoff);
    console.log(`  ✓ SelfImprovementAgent finished (${siRes.score}%) in ${siRes.executionTimeMs}ms`);

    // ── STAGE 7: AGGREGATE SUMMARY ───────────────────────────────────────────
    const allChecks = Object.values(agentResults).flatMap(r => r?.checks || []);
    const passedChecks = allChecks.filter(c => c.pass).length;
    const failedChecks = allChecks.filter(c => !c.pass).length;
    const overallScore = Math.round((passedChecks / allChecks.length) * 100);

    const orchestratorResult: AgentResult = {
      role: 'orchestrator',
      name: 'Orchestrator Agent',
      passed: overallScore >= 90,
      score: overallScore,
      checks: allChecks,
      errors: Object.values(agentResults).flatMap(r => r?.errors || []),
      executionTimeMs: Date.now() - startTime,
      handoffPayload: { runId, overallScore },
    };
    agentResults['orchestrator'] = orchestratorResult;

    const summary: FullQASummary = {
      runId,
      timestamp: new Date().toISOString(),
      totalChecks: allChecks.length,
      passedChecks,
      failedChecks,
      overallScore,
      agentResults: agentResults as Record<AgentRole, AgentResult>,
      handoffTimeline,
      improvementLedger: updatedLedger,
    };

    console.log(`\n============================================================`);
    console.log(`🏆 AUTONOMOUS QA MISSION COMPLETE: ${passedChecks}/${allChecks.length} CHECKS PASSED (${overallScore}%)`);
    console.log(`⏱️ Total Execution Time: ${orchestratorResult.executionTimeMs}ms`);
    console.log(`============================================================\n`);

    return summary;
  }

  private async retryWithBackoff<T>(fn: () => Promise<T>, agentName: string, maxRetries = 2): Promise<T> {
    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err as Error;
        console.warn(`  ⚠️ [${agentName}] Attempt ${attempt} failed: ${lastError.message}. Backing off...`);
        await new Promise(r => setTimeout(r, 200 * attempt));
      }
    }
    throw lastError || new Error(`${agentName} failed after ${maxRetries} attempts`);
  }
}
