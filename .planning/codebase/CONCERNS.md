# Codebase Concerns

**Analysis Date:** 2026-02-15

## Security Considerations

**Exposed API Credentials in Environment File:**
- Risk: Critical secrets stored in `.env.local` and readable in version control
- Files: `.env.local`
- Current mitigation: `.env.local` listed in `.gitignore` (correct)
- Recommendations:
  - Audit git history to ensure credentials were never committed
  - Rotate Azure API key immediately (visible in provided .env.local)
  - Use `.env.example` with placeholder values as documentation
  - Never share .env files; use secure secret management (GitHub Secrets, Azure Key Vault, etc.)

**Unsafe Console Logging of Sensitive Data:**
- Risk: Sensitive request details (scenario data, user input) logged to console in production
- Files: `app/api/simulate/route.ts` (lines 8-16, 44-46), `app/api/analyze/route.ts` (lines 8-13, 45-47)
- Current mitigation: None; console output is development-only in practice
- Recommendations:
  - Remove or gate console.log statements behind `process.env.NODE_ENV === 'development'`
  - Use proper structured logging (pino, winston) for production
  - Never log full request/response bodies; only log IDs or hashes

**No Input Validation on API Routes:**
- Risk: API routes accept arbitrary input without schema validation
- Files: `app/api/simulate/route.ts` (line 6), `app/api/analyze/route.ts` (line 6)
- Current mitigation: Basic try-catch for AI generation failure
- Recommendations:
  - Validate request body with zod schema before processing
  - Validate message length (currently no upper bound in `/api/analyze`)
  - Return 400 Bad Request for invalid input, not 500

**Missing Error Detail Disclosure:**
- Risk: Error details exposed to client in API responses
- Files: `app/api/simulate/route.ts` (line 53), `app/api/analyze/route.ts` (line 53)
- Current mitigation: None
- Recommendations:
  - Return generic error messages to client in production
  - Log detailed errors server-side only
  - Don't expose internal error strings to frontend

## Tech Debt

**Hardcoded Fallback Logic in Analyzer:**
- Issue: Client-side fallback analysis with hardcoded regex patterns duplicates AI analysis logic
- Files: `app/analyzer/page.tsx` (lines 100-122)
- Impact: If AI API fails, users get inconsistent analysis based on simple heuristics; duplication makes maintenance harder
- Fix approach:
  - Decouple fallback logic into separate utility with clear documentation
  - Create `lib/fallback-analyzer.ts` with shared pattern rules
  - Sync rules between client-side and AI prompts

**Incomplete Error Handling in Simulator:**
- Issue: Catch block in `analyzeChoice` silently falls back to hardcoded analysis without distinguishing API errors from parsing errors
- Files: `app/simulator/page.tsx` (lines 60-81)
- Impact: Real API failures masked as normal; users see potentially wrong explanations without knowing API failed
- Fix approach:
  - Distinguish between network errors, parse errors, and timeout scenarios
  - Show user-facing error message (not silent fallback)
  - Log errors to observability service

**Hardcoded AI Model Selection:**
- Issue: Azure deployment name defaulted to `gpt-4.1-mini` with no fallback or versioning strategy
- Files: `lib/azure.ts` (line 8)
- Impact: Model deprecation or API changes could break app with no warning
- Fix approach:
  - Define supported model versions in configuration
  - Add feature flags for model rollout
  - Plan migration path for deprecated models

**Monolithic I18n Translation Object:**
- Issue: All 337 translation strings in single object with no structure or organization
- Files: `lib/i18n.tsx` (lines 9-337)
- Impact: Difficult to maintain; no clear mapping of which translations belong to which feature
- Fix approach:
  - Split translations by feature/page into separate files
  - Create `lib/i18n/` directory with `navbar.ts`, `simulator.ts`, `analyzer.ts`, etc.
  - Use nested key structure (e.g., `navbar.home` instead of `nav.home`)

## Performance Bottlenecks

**Synchronous Translation Lookup:**
- Problem: String-based translation key lookups with nested object access on every render
- Files: `lib/i18n.tsx` (line 358)
- Cause: `t()` function does object key lookup without memoization per translation key
- Improvement path:
  - Pre-compile translation object to Map for O(1) lookup
  - Memoize `t()` function results per key
  - Consider using `i18next` or similar mature library instead of custom solution

**No Caching of Scenario/Legal Question Data:**
- Problem: Scenarios and legal questions loaded fresh on every page render
- Files: `lib/scenarios.ts`, `lib/legal-questions.ts`
- Cause: No client-side caching or memoization; datasets could grow large
- Improvement path:
  - Cache in sessionStorage or Context for reuse across page navigations
  - Pre-load data in parent layout component
  - Consider lazy-loading questions for long assessments

**Repeated Animation Calculations:**
- Problem: Framer Motion animations recalculated on every render in large lists
- Files: `app/page.tsx` (lines 152-169), `app/simulator/page.tsx` (lines 233-277)
- Cause: Inline variant objects defined in component scope
- Improvement path:
  - Extract animation variants to component-level constants
  - Use CSS keyframe animations for simple effects
  - Profile with React DevTools Profiler to measure impact

## Fragile Areas

**Tightly Coupled i18n with Component Rendering:**
- Files: `app/page.tsx`, `app/simulator/page.tsx`, `app/analyzer/page.tsx`, `app/legal/page.tsx`
- Why fragile: Changing translation keys requires code changes; no type safety for translation keys
- Safe modification:
  - Create TypeScript type for translation keys: `type TranslationKey = keyof typeof translations.ar`
  - Use `const` assertion for keys: `const key = 'sim.title' as const`
  - Add linting rule to catch missing keys
- Test coverage: No tests verify all translation keys exist in all locales

**Tight Coupling of Analyzer Fallback Logic:**
- Files: `app/analyzer/page.tsx` (lines 100-122)
- Why fragile: Fallback rules hardcoded in component; changes require code reload
- Safe modification:
  - Extract fallback analyzer to `lib/fallback-analyzer.ts`
  - Add unit tests for each rule
  - Document expected pattern matches with examples
- Test coverage: No tests for fallback analysis logic

**No Validation of Scenario/Question Data:**
- Files: `lib/scenarios.ts`, `lib/legal-questions.ts`
- Why fragile: No runtime checks that scenarios match interface; typos silently become undefined fields
- Safe modification:
  - Use zod schemas to validate data at import time
  - Add tests that verify each scenario/question has required fields
  - Use TypeScript as const for stricter type inference
- Test coverage: No tests verify data structure completeness

## Scaling Limits

**No Rate Limiting on AI API Calls:**
- Current capacity: Unlimited calls to Azure AI per request (no quota enforcement)
- Limit: Will hit Azure quota or incur unexpected costs with heavy usage
- Scaling path:
  - Implement rate limiting per user (cookie-based or IP-based)
  - Add call counting and quota enforcement
  - Cache repetitive analysis results
  - Use Azure rate limiting features

**No Pagination for Scenarios/Questions:**
- Current capacity: 8 scenarios + 10+ legal questions hard-coded
- Limit: UI assumes all questions fit in memory; adding 100+ would cause performance issues
- Scaling path:
  - Move data to database (Supabase, Firebase)
  - Implement pagination/lazy-loading
  - Add difficulty filtering and question categories

## Dependencies at Risk

**Framer Motion Animation Library:**
- Risk: Large bundle impact for animations; dependency on maintained external library
- Impact: Breaking changes in major versions; animations could degrade in old browsers
- Migration plan:
  - Audit animation usage; replace simple transitions with CSS
  - Keep Framer Motion for complex multi-step animations only
  - Track library version compatibility with React 19

**Custom i18n Implementation:**
- Risk: Home-grown solution lacks features of established libraries
- Impact: Missing translation namespacing, pluralization, date formatting, number formatting
- Migration plan:
  - Consider `next-i18n-router` or `i18next` for production-grade i18n
  - Feature parity: implement namespaces, fallback chains, dynamic loading
  - Plan phased migration: add library alongside custom solution

## Missing Critical Features

**No Offline Support:**
- Problem: All features require Azure API (simulator, analyzer, legal)
- Blocks: Users cannot train when network is unavailable
- Recommendations:
  - Pre-cache scenarios and legal questions for offline access
  - Use Service Workers + IndexedDB for offline storage
  - Disable AI-powered analysis when offline

**No User Progress Tracking:**
- Problem: Scores/progress reset on page reload; no persistent history
- Blocks: Can't build learning paths or see improvement over time
- Recommendations:
  - Add localStorage-based session tracking
  - Build user accounts with database-backed progress
  - Create learning dashboard showing historical scores

**No Mobile-Optimized Phone Frame:**
- Problem: PhoneFrame component hardcoded dimensions; doesn't respect viewport
- Blocks: Unusable on small screens or tablets
- Recommendations:
  - Implement responsive phone dimensions
  - Test on actual mobile devices
  - Consider modal/full-screen mode on mobile instead of side-by-side layout

**No Accessibility (a11y) Audit:**
- Problem: ARIA labels missing; no semantic HTML in places; animations not disruptable
- Blocks: Screen reader users, keyboard-only users, motion-sensitive users excluded
- Recommendations:
  - Run axe DevTools audit on all pages
  - Add `aria-label` to icon buttons and containers
  - Implement `prefers-reduced-motion` media query for animations
  - Test with keyboard navigation only
  - Add skip links for navigation

## Test Coverage Gaps

**No Unit Tests for Core Logic:**
- What's not tested: Fallback analyzer logic, translation system, scenario data validation
- Files: `lib/fallback-analyzer.ts` (doesn't exist), `lib/i18n.tsx`, `lib/scenarios.ts`
- Risk: Breaking changes go unnoticed; refactoring dangerous
- Recommendations:
  - Add Jest config to `jest.config.mjs`
  - Test fallback analysis rules against known inputs
  - Test i18n returns correct translations and handles missing keys
  - Validate scenario/question data structure

**No Integration Tests for API Routes:**
- What's not tested: `/api/simulate` and `/api/analyze` with invalid inputs, network failures
- Files: `app/api/simulate/route.ts`, `app/api/analyze/route.ts`
- Risk: Silent failures, unexpected error responses sent to client
- Recommendations:
  - Use Next.js built-in API testing or `supertest`
  - Test: valid requests, missing fields, oversized payloads, API timeout
  - Mock Azure AI SDK for deterministic testing

**No E2E Tests for User Flows:**
- What's not tested: Complete simulator flow, analyzer flow, legal quiz flow
- Files: All page components
- Risk: Regressions in user-facing flows discovered by users, not CI
- Recommendations:
  - Use Playwright or Cypress for E2E tests
  - Test: navigation between pages, scenario progression, result calculation, language switching
  - Test error states: API failure, network timeout, invalid input

**No Visual Regression Tests:**
- What's not tested: Layout, styling, animation playback across browsers/devices
- Files: CSS in `app/globals.css`, component JSX
- Risk: CSS changes silently break layout on certain devices
- Recommendations:
  - Use Percy or Chromatic for visual diffs
  - Test on multiple viewport sizes (mobile, tablet, desktop)
  - Test dark mode (if implemented)

---

*Concerns audit: 2026-02-15*
