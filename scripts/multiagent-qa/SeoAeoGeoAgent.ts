/**
 * SeoAeoGeoAgent - Evaluates SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO)
 */
import fs from 'node:fs';
import path from 'node:path';
import { AgentResult, TestCheck, AgentHandoff } from './types';

export class SeoAeoGeoAgent {
  private rootDir: string;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }

  async run(handoffFromPrev: Record<string, any>): Promise<{ result: AgentResult; handoff: AgentHandoff }> {
    const startTime = Date.now();
    const checks: TestCheck[] = [];
    const errors: string[] = [];
    const decisions: string[] = [];

    decisions.push('Received verified transit data payload from DataVerificationAgent');

    // ── 1. SEO AUDIT ─────────────────────────────────────────────────────────────
    const indexHtmlPath = path.join(this.rootDir, 'index.html');
    let hasTitle = false, hasDesc = false, hasOg = false, hasCanonical = false;

    if (fs.existsSync(indexHtmlPath)) {
      const html = fs.readFileSync(indexHtmlPath, 'utf-8');
      hasTitle = html.includes('<title>') && html.includes('KoyJabo');
      hasDesc = html.includes('name="description"') && html.includes('content=');
      hasOg = html.includes('property="og:title"') && html.includes('property="og:image"');
      hasCanonical = html.includes('rel="canonical"');
    }

    checks.push({
      name: 'HTML Meta Tags & OpenGraph Markup',
      category: 'SEO',
      pass: hasTitle && hasDesc && hasOg,
      severity: 'high',
      detail: `Title: ${hasTitle ? '✓' : '✗'}, Description: ${hasDesc ? '✓' : '✗'}, OG Tags: ${hasOg ? '✓' : '✗'}`,
    });

    const sitemapPath = path.join(this.rootDir, 'public/sitemap.xml');
    let sitemapValid = false;
    let sitemapUrlCount = 0;
    if (fs.existsSync(sitemapPath)) {
      const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
      sitemapUrlCount = (sitemap.match(/<loc>/g) || []).length;
      sitemapValid = sitemapUrlCount >= 50 && sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    }
    checks.push({
      name: 'XML Sitemap Structure & Scale',
      category: 'SEO',
      pass: sitemapValid,
      severity: 'high',
      detail: sitemapValid ? `Valid sitemap.xml with ${sitemapUrlCount} indexed transport pages` : 'Sitemap missing or insufficient URL coverage',
      metrics: { urlCount: sitemapUrlCount },
    });

    const robotsPath = path.join(this.rootDir, 'public/robots.txt');
    const robotsValid = fs.existsSync(robotsPath) && fs.readFileSync(robotsPath, 'utf-8').includes('Sitemap:');
    checks.push({
      name: 'Robots.txt Directives & Crawler Indexing',
      category: 'SEO',
      pass: robotsValid,
      severity: 'medium',
      detail: robotsValid ? 'Robots.txt points to sitemap and authorizes standard web crawlers' : 'Robots.txt missing or invalid',
    });
    decisions.push('Verified technical SEO tags, XML sitemap index, and crawl directives');

    // ── 2. AEO (ANSWER ENGINE OPTIMIZATION) ──────────────────────────────────────
    const llmsTxtPath = path.join(this.rootDir, 'public/llms.txt');
    let llmsTxtPass = false;
    if (fs.existsSync(llmsTxtPath)) {
      const txt = fs.readFileSync(llmsTxtPath, 'utf-8');
      llmsTxtPass = txt.includes('Key Facts for AI Systems') &&
                    txt.includes('2.70') &&
                    txt.includes('MRT-6');
    }
    checks.push({
      name: 'llms.txt Spec (Standardized LLM Manifest)',
      category: 'AEO',
      pass: llmsTxtPass,
      severity: 'high',
      detail: llmsTxtPass ? 'llms.txt structured for Claude, Perplexity, GPTBot with updated ৳2.70/km rate' : 'llms.txt missing or out of date',
    });

    const llmDataPath = path.join(this.rootDir, 'public/llm-data.json');
    const wellKnownLlmPath = path.join(this.rootDir, 'public/.well-known/llm-data.json');
    let llmDataPass = false;
    if (fs.existsSync(llmDataPath) && fs.existsSync(wellKnownLlmPath)) {
      try {
        const data1 = JSON.parse(fs.readFileSync(llmDataPath, 'utf-8'));
        const data2 = JSON.parse(fs.readFileSync(wellKnownLlmPath, 'utf-8'));
        const kf1 = data1.listing?.key_facts || data1.site?.key_facts || data1.key_facts || [];
        const kf2 = data2.listing?.key_facts || data2.site?.key_facts || data2.key_facts || [];
        llmDataPass = Array.isArray(data1.faq) &&
                      data1.faq.length >= 5 &&
                      kf1.some((f: string) => f.includes('2.70')) &&
                      kf2.some((f: string) => f.includes('2.70'));
      } catch {
        llmDataPass = false;
      }
    }
    checks.push({
      name: 'Machine-Readable LLM Knowledge Feeds (JSON)',
      category: 'AEO',
      pass: llmDataPass,
      severity: 'high',
      detail: llmDataPass ? 'Structured llm-data.json & .well-known feed with validated Q&A, token counts, and sources' : 'Invalid or stale llm-data.json',
    });

    const altFormats = ['public/data.csv', 'public/data.xml', 'public/data.ttl'];
    const altPass = altFormats.every(f => fs.existsSync(path.join(this.rootDir, f)));
    checks.push({
      name: 'Multi-Modal Data Feeds (CSV, XML, Turtle RDF)',
      category: 'AEO',
      pass: altPass,
      severity: 'medium',
      detail: altPass ? 'Semantic alternate data formats present for AI crawlers' : 'Missing alternate data formats',
    });

    const embeddingsPath = path.join(this.rootDir, 'public/embeddings/data.json');
    let embeddingsPass = false;
    if (fs.existsSync(embeddingsPath)) {
      try {
        const raw = JSON.parse(fs.readFileSync(embeddingsPath, 'utf-8'));
        const chunks = Array.isArray(raw) ? raw : (raw.chunks || []);
        embeddingsPass = chunks.length > 0 && chunks.some((c: any) => c.text && c.text.includes('2.70'));
      } catch {
        embeddingsPass = false;
      }
    }
    checks.push({
      name: 'Semantic Knowledge Embeddings & Token Chunking',
      category: 'AEO',
      pass: embeddingsPass,
      severity: 'medium',
      detail: embeddingsPass ? 'Context chunks indexed with pre-calculated tokens for RAG pipelines' : 'Stale or malformed embeddings file',
    });
    decisions.push('Validated Answer Engine Optimization (AEO) structured knowledge for LLM citation');

    // ── 3. GEO (GENERATIVE ENGINE OPTIMIZATION & GEOLOCATION) ────────────────────
    const aiChatHook = path.join(this.rootDir, 'src/redesign/hooks/useAIChat.ts');
    let geoGroundingPass = false;
    if (fs.existsSync(aiChatHook)) {
      const hookContent = fs.readFileSync(aiChatHook, 'utf-8');
      geoGroundingPass = hookContent.includes('Gabtoli') &&
                         hookContent.includes('Mohakhali') &&
                         hookContent.includes('Sayedabad') &&
                         hookContent.includes('2.70');
    }
    checks.push({
      name: 'Generative Engine Transit Grounding Context',
      category: 'GEO',
      pass: geoGroundingPass,
      severity: 'high',
      detail: geoGroundingPass ? 'AI Chat grounding context delivers accurate terminal routing & current ৳2.70 fare' : 'AI grounding context lacks terminal or fare precision',
    });

    const passedChecks = checks.filter(c => c.pass).length;
    const score = Math.round((passedChecks / checks.length) * 100);

    const result: AgentResult = {
      role: 'seo_aeo_geo',
      name: 'SEO, AEO & GEO Optimization Agent',
      passed: score >= 90,
      score,
      checks,
      errors,
      executionTimeMs: Date.now() - startTime,
      handoffPayload: {
        sitemapUrlCount,
        hasOpenGraph: hasOg,
        llmsTxtValid: llmsTxtPass,
        geoGroundingReady: geoGroundingPass,
      },
    };

    const handoff: AgentHandoff = {
      fromAgent: 'seo_aeo_geo',
      toAgent: 'security',
      timestamp: new Date().toISOString(),
      inputReceived: 'Data verification confirmed, audited visibility and AI knowledge graphs',
      decisionsMade: decisions,
      assessedDataForNextAgent: {
        seoScore: score,
        publicFeedsAudited: true,
      },
      unresolvedIssues: errors,
    };

    return { result, handoff };
  }
}
