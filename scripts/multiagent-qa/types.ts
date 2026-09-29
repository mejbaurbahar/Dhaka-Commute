/**
 * Multi-Agent AI QA System Types & Contracts for KoyJabo
 */

export type AgentRole =
  | 'orchestrator'
  | 'functional'
  | 'data_verification'
  | 'seo_aeo_geo'
  | 'security'
  | 'offline_pwa'
  | 'self_improvement';

export type CheckSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface TestCheck {
  name: string;
  category: string;
  pass: boolean;
  severity: CheckSeverity;
  detail: string;
  metrics?: Record<string, number | string | boolean>;
}

export interface AgentResult {
  role: AgentRole;
  name: string;
  passed: boolean;
  score: number; // 0 - 100
  checks: TestCheck[];
  errors: string[];
  executionTimeMs: number;
  handoffPayload: Record<string, any>;
}

export interface AgentHandoff {
  fromAgent: AgentRole;
  toAgent: AgentRole;
  timestamp: string;
  inputReceived: string;
  decisionsMade: string[];
  assessedDataForNextAgent: Record<string, any>;
  unresolvedIssues: string[];
}

export interface RegressionRule {
  id: string;
  category: string;
  description: string;
  detectionPattern: string;
  preventiveAction: string;
  firstObserved: string;
  occurrences: number;
}

export interface SelfImprovementLedger {
  version: string;
  lastUpdated: string;
  totalRuns: number;
  historicalScores: {
    runId: string;
    timestamp: string;
    overallScore: number;
    functionalScore: number;
    dataScore: number;
    seoScore: number;
    securityScore: number;
    offlineScore: number;
  }[];
  activeRegressionRules: RegressionRule[];
  learningInsights: string[];
}

export interface FullQASummary {
  runId: string;
  timestamp: string;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  overallScore: number;
  agentResults: Record<AgentRole, AgentResult>;
  handoffTimeline: AgentHandoff[];
  improvementLedger: SelfImprovementLedger;
}
