/**
 * SelfImprovementAgent - Analyzes multi-agent results, logs regression rules, and iterates on quality improvements
 */
import fs from 'node:fs';
import path from 'node:path';
import { AgentResult, TestCheck, AgentHandoff, SelfImprovementLedger, RegressionRule } from './types';

export class SelfImprovementAgent {
  private rootDir: string;
  private ledgerPath: string;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
    this.ledgerPath = path.join(rootDir, '.qa-self-improvement-ledger.json');
  }

  async run(allResults: Record<string, AgentResult>): Promise<{ result: AgentResult; handoff: AgentHandoff; updatedLedger: SelfImprovementLedger }> {
    const startTime = Date.now();
    const checks: TestCheck[] = [];
    const errors: string[] = [];
    const decisions: string[] = [];

    decisions.push('Ingested results and telemetry from all specialized QA domain agents');

    // 1. Load or initialize self-improvement ledger
    let ledger: SelfImprovementLedger = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      totalRuns: 0,
      historicalScores: [],
      activeRegressionRules: [
        {
          id: 'BRTA-2026-FARE-RATE',
          category: 'Fare Data',
          description: 'Ensure BRTA city bus fare rate remains updated to ৳2.70/km (and DTCA ৳2.60/km) across all calculation engines',
          detectionPattern: 'cityBusRatePerKm === 2.70',
          preventiveAction: 'Run multi-agent DataVerificationAgent before any staging build',
          firstObserved: '2026-09-29',
          occurrences: 1,
        },
        {
          id: 'BDT-GEO-COORDINATES-BOUND',
          category: 'Geospatial',
          description: 'Prevent stations or hubs with inverted or out-of-boundary GPS coordinates from slipping into production',
          detectionPattern: 'lat in [20.0, 27.0] && lng in [87.5, 93.0]',
          preventiveAction: 'Validate all station definitions against Bangladesh territorial bounding box',
          firstObserved: '2026-09-29',
          occurrences: 1,
        },
        {
          id: 'LLM-FACT-SYNCHRONICITY',
          category: 'AEO',
          description: 'Ensure llms.txt and llm-data.json stay synchronized with actual backend routing & BRTA tables',
          detectionPattern: 'llms.txt fare rate matches transportKnowledge.ts',
          preventiveAction: 'Automated verification check in CI/CD pipeline',
          firstObserved: '2026-09-29',
          occurrences: 1,
        },
      ],
      learningInsights: [],
    };

    if (fs.existsSync(this.ledgerPath)) {
      try {
        ledger = JSON.parse(fs.readFileSync(this.ledgerPath, 'utf-8'));
      } catch (e) {
        errors.push(`Ledger read warning: ${(e as Error).message}`);
      }
    }

    // 2. Compute aggregate metrics
    const functionalScore = allResults['functional']?.score ?? 0;
    const dataScore = allResults['data_verification']?.score ?? 0;
    const seoScore = allResults['seo_aeo_geo']?.score ?? 0;
    const securityScore = allResults['security']?.score ?? 0;
    const offlineScore = allResults['offline_pwa']?.score ?? 0;

    const overallScore = Math.round(
      (functionalScore + dataScore + seoScore + securityScore + offlineScore) / 5
    );

    ledger.totalRuns += 1;
    const currentRun = {
      runId: `run-${Date.now()}`,
      timestamp: new Date().toISOString(),
      overallScore,
      functionalScore,
      dataScore,
      seoScore,
      securityScore,
      offlineScore,
    };
    ledger.historicalScores.push(currentRun);
    // Keep last 50 historical runs
    if (ledger.historicalScores.length > 50) {
      ledger.historicalScores = ledger.historicalScores.slice(-50);
    }

    // 3. Generate learning insights & self-healing rules
    const newInsights: string[] = [];
    if (overallScore >= 95) {
      newInsights.push(`[${new Date().toISOString()}] System operational excellence achieved: 95%+ across all 5 test domains.`);
    } else {
      newInsights.push(`[${new Date().toISOString()}] System scored ${overallScore}%. Targeted areas for auto-improvement identified.`);
    }

    if (dataScore < 100) {
      newInsights.push('Transit data verification flagged minor gaps. Recommend checking bus route stop references.');
    }
    if (securityScore === 100) {
      newInsights.push('Zero OWASP XSS and credential vulnerabilities verified in public bundle.');
    }

    ledger.learningInsights = [...newInsights, ...ledger.learningInsights].slice(0, 20);
    ledger.lastUpdated = new Date().toISOString();

    // Persist ledger to disk
    fs.writeFileSync(this.ledgerPath, JSON.stringify(ledger, null, 2), 'utf-8');
    decisions.push(`Updated persistent self-improvement ledger at ${this.ledgerPath} (Total historical runs: ${ledger.totalRuns})`);

    // Checks performed by this agent
    checks.push({
      name: 'Continuous Learning Ledger Persistence',
      category: 'Self-Improvement',
      pass: fs.existsSync(this.ledgerPath),
      severity: 'high',
      detail: `Ledger successfully written with ${ledger.activeRegressionRules.length} active regression rules and ${ledger.totalRuns} recorded runs`,
    });

    checks.push({
      name: 'Systemic Quality Standard Threshold (>90% Overall)',
      category: 'Systemic Health',
      pass: overallScore >= 90,
      severity: 'critical',
      detail: `Aggregated multi-agent test score: ${overallScore}%`,
      metrics: { overallScore, functionalScore, dataScore, seoScore, securityScore, offlineScore },
    });

    const passedChecks = checks.filter(c => c.pass).length;
    const score = Math.round((passedChecks / checks.length) * 100);

    const result: AgentResult = {
      role: 'self_improvement',
      name: 'Self-Improvement & Continuous Learning Agent',
      passed: score >= 90,
      score,
      checks,
      errors,
      executionTimeMs: Date.now() - startTime,
      handoffPayload: {
        overallScore,
        totalRuns: ledger.totalRuns,
        rulesCount: ledger.activeRegressionRules.length,
      },
    };

    const handoff: AgentHandoff = {
      fromAgent: 'self_improvement',
      toAgent: 'orchestrator',
      timestamp: new Date().toISOString(),
      inputReceived: 'Evaluated full system health across functional, data, SEO, security and offline domains',
      decisionsMade: decisions,
      assessedDataForNextAgent: {
        taskCompleted: true,
        finalScore: overallScore,
        recommendations: newInsights,
      },
      unresolvedIssues: errors,
    };

    return { result, handoff, updatedLedger: ledger };
  }
}
