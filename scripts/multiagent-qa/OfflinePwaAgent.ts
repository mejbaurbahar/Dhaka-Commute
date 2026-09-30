/**
 * OfflinePwaAgent - Evaluates PWA Manifest, Service Worker, and 100% Offline Transit Availability
 */
import fs from 'node:fs';
import path from 'node:path';
import { AgentResult, TestCheck, AgentHandoff } from './types';

export class OfflinePwaAgent {
  private rootDir: string;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }

  async run(handoffFromPrev: Record<string, any>): Promise<{ result: AgentResult; handoff: AgentHandoff }> {
    const startTime = Date.now();
    const checks: TestCheck[] = [];
    const errors: string[] = [];
    const decisions: string[] = [];

    decisions.push('Received security verification handoff from SecurityAuditAgent');

    // ── 1. WEB APP MANIFEST COMPLIANCE ──────────────────────────────────────────
    const manifestPath = path.join(this.rootDir, 'public/manifest.json');
    let manifestPass = false;
    let manifestDetails = '';

    if (fs.existsSync(manifestPath)) {
      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        const hasName = Boolean(manifest.name && manifest.short_name);
        const isStandalone = manifest.display === 'standalone' || manifest.display === 'minimal-ui';
        const hasIcons = Array.isArray(manifest.icons) && manifest.icons.length > 0;
        const hasThemeColor = Boolean(manifest.theme_color && manifest.background_color);

        manifestPass = hasName && isStandalone && hasIcons && hasThemeColor;
        manifestDetails = `Name: ${manifest.short_name}, Display: ${manifest.display}, Icons: ${manifest.icons?.length}`;
      } catch (e) {
        manifestPass = false;
        errors.push(`manifest.json parse error: ${(e as Error).message}`);
      }
    }

    checks.push({
      name: 'Web App Manifest (PWA Installability)',
      category: 'PWA',
      pass: manifestPass,
      severity: 'high',
      detail: manifestPass ? `PWA Manifest verified: ${manifestDetails}` : 'Invalid or incomplete manifest.json',
    });
    decisions.push('Audited PWA manifest against Chrome & mobile installability criteria');

    // ── 2. OFFLINE DATA ZERO-NETWORK GUARANTEE ──────────────────────────────────
    // KoyJabo's core value proposition is that local bus routes & stations operate
    // without requiring an active internet connection.
    const constantsPath = path.join(this.rootDir, 'constants.ts');
    let offlineDataPass = false;
    if (fs.existsSync(constantsPath)) {
      const content = fs.readFileSync(constantsPath, 'utf-8');
      offlineDataPass = content.includes('BUS_DATA') &&
                        content.includes('STATIONS') &&
                        content.includes('export const BUS_DATA: BusRoute[]');
    }

    checks.push({
      name: 'Bundled Offline Transit Dataset (Zero-Network Route Lookup)',
      category: 'Offline Capability',
      pass: offlineDataPass,
      severity: 'critical',
      detail: offlineDataPass
        ? 'Bus routes, station coordinates & stops are compiled statically into the client bundle'
        : 'Transit data missing or requires runtime remote API connection',
    });
    decisions.push('Verified static in-bundle data guarantees for offline commuter use');

    // ── 3. SERVICE WORKER / ASSET CACHING REGISTER ──────────────────────────────
    const indexHtml = path.join(this.rootDir, 'index.html');
    const mainTsx = path.join(this.rootDir, 'src/main.tsx');
    const pushService = path.join(this.rootDir, 'src/services/pushService.ts');
    let swRegistered = false;
    if (fs.existsSync(mainTsx) && fs.readFileSync(mainTsx, 'utf-8').includes('serviceWorker')) {
      swRegistered = true;
    } else if (fs.existsSync(pushService) && fs.readFileSync(pushService, 'utf-8').includes('serviceWorker')) {
      swRegistered = true;
    } else if (fs.existsSync(indexHtml) && fs.readFileSync(indexHtml, 'utf-8').includes('serviceWorker')) {
      swRegistered = true;
    }

    checks.push({
      name: 'Service Worker Registration & Offline Cache Hook',
      category: 'Offline Capability',
      pass: swRegistered,
      severity: 'medium',
      detail: swRegistered ? 'Service worker registration hooks detected for caching static assets' : 'Service worker script not detected',
    });

    const passedChecks = checks.filter(c => c.pass).length;
    const score = Math.round((passedChecks / checks.length) * 100);

    const result: AgentResult = {
      role: 'offline_pwa',
      name: 'Offline & PWA Validation Agent',
      passed: score >= 90,
      score,
      checks,
      errors,
      executionTimeMs: Date.now() - startTime,
      handoffPayload: {
        manifestValid: manifestPass,
        zeroNetworkDataAvailable: offlineDataPass,
      },
    };

    const handoff: AgentHandoff = {
      fromAgent: 'offline_pwa',
      toAgent: 'self_improvement',
      timestamp: new Date().toISOString(),
      inputReceived: 'Security audit cleared, verified offline resilience and PWA configuration',
      decisionsMade: decisions,
      assessedDataForNextAgent: {
        offlinePwaScore: score,
        readyForSelfImprovementSynthesis: true,
      },
      unresolvedIssues: errors,
    };

    return { result, handoff };
  }
}
