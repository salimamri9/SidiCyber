# Coding Conventions

**Analysis Date:** 2026-02-15

## Naming Patterns

**Files:**
- React components: PascalCase, single file per component (e.g., `Navbar.tsx`, `PhoneFrame.tsx`, `RiskMeter.tsx`)
- Pages: lowercase with hyphens in directory, index file as `page.tsx` (e.g., `app/simulator/page.tsx`, `app/analyzer/page.tsx`)
- API routes: `route.ts` in feature-specific directories (e.g., `app/api/simulate/route.ts`, `app/api/analyze/route.ts`)
- Utility/library files: camelCase (e.g., `azure.ts`, `scenarios.ts`, `i18n.tsx`)
- Type definition files: inline with implementation or suffixed as needed (no separate `.types.ts` files)

**Functions:**
- Component names: PascalCase for React components (e.g., `export default function Home()`)
- Helper functions: camelCase (e.g., `analyzeChoice`, `nextScenario`, `getColor`)
- Callback functions: camelCase with "handle" prefix for event handlers (e.g., `onClick={() => analyzeChoice()}`)
- API route handlers: named exactly as HTTP method (e.g., `export async function POST(req: Request)`)

**Variables:**
- Constants (i18n keys, config objects, data arrays): camelCase and lowercase for keys (e.g., `const langLabels`, `const scenarios`, `"nav.home"`)
- State variables: camelCase (e.g., `const [mobileOpen, setMobileOpen] = useState(false)`)
- Type unions: camelCase (e.g., `type Choice = "safe" | "suspicious" | "scam"`)
- Objects/maps: Record types with string keys (e.g., `Record<Locale, string>`)

**Types:**
- Interfaces for React component props: PascalCase with "Props" suffix (e.g., `interface PhoneFrameProps`, `interface AnalysisResult`)
- Union types: lowercase or "type" keyword (e.g., `type Locale = "ar" | "en" | "fr"`)
- Zod schemas: defined inline in API routes, no separate schema files

## Code Style

**Formatting:**
- ESLint 9 with eslint-config-next core-web-vitals and TypeScript config
- No Prettier config visible; relies on ESLint
- Line width follows default ESLint rules
- Indentation: 2 spaces

**Linting:**
- eslint.config.mjs uses flat config format
- Extends: `nextVitals` (Core Web Vitals) and `nextTs` (TypeScript rules)
- Global ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

**TypeScript:**
- `strict: true` enabled
- Target: ES2017
- Module: esnext
- JSX: react-jsx (automatic)
- Path alias: `@/*` maps to project root (e.g., `@/lib/scenarios`)
- No null-assert (`!`) abuse; used minimally for environment variables

## Import Organization

**Order:**
1. External libraries (React, Next.js, third-party)
2. Relative imports from `@/` path aliases
3. Type imports if used

**Pattern examples from codebase:**
```typescript
// Example from page.tsx
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ... } from "lucide-react";
import { useI18n } from "@/lib/i18n";
```

**Path Aliases:**
- `@/*` points to project root
- Used consistently: `@/lib/i18n`, `@/components/Navbar`, `@/lib/scenarios`

## Error Handling

**API Routes:**
- Try-catch blocks wrapping async operations (e.g., `generateObject` calls)
- Errors logged to console with descriptive messages and ASCII separators
- Fallback responses in analyzer page when API fails (client-side regression testing)
- Error responses: `Response.json({ error, details }, { status: 500 })`
- Client-side error catching: empty catch blocks with comments (`catch { /* skip */ }`)

**Pattern from `app/api/simulate/route.ts`:**
```typescript
try {
  const result = await generateObject({...});
  console.log("✅ [SIMULATE API] AI Response:");
  return Response.json(result.object);
} catch (error) {
  console.error("❌ [SIMULATE API] Error:", error);
  return Response.json(
    { error: "AI generation failed", details: String(error) },
    { status: 500 }
  );
}
```

**Frontend:**
- Try-catch with fallback UI state (e.g., showing default analysis if API fails)
- No global error boundaries observed
- Silent failures in stream parsing: `catch { /* skip */ }`

## Logging

**Framework:** Native `console` logging (no logger library)

**Patterns:**
- Decorative separators for API calls: `console.log("══════════════════════════════════════════")`
- Success prefix: `✅ [API_NAME]`
- Error prefix: `❌ [API_NAME]`
- Request/response logging includes relevant data fields
- Input truncation for long messages: `message.substring(0, 200) + (length > 200 ? "..." : "")`

**Example from `app/api/analyze/route.ts`:**
```typescript
console.log("\n🔍 [ANALYZE API] Request received");
console.log("──────────────────────────────────────────");
console.log("Message length:", message.length);
```

## Comments

**When to Comment:**
- Used sparingly; code is largely self-documenting
- HTML comments mark major sections: `{/* ── Hero ── */}`, `{/* ── Features ── */}`
- No JSDoc observed in codebase; types handle documentation

**Special markers:**
- Section dividers in long components use comment blocks with emojis
- No inline comments for obvious code

## Function Design

**Size:** Generally under 100 lines for page components; utility functions are concise

**Parameters:**
- React components destructure props via interface types
- API handlers accept single `req: Request` parameter
- Callbacks use `useCallback` for stable references (e.g., `analyzeChoice` in simulator)
- Rest parameters not observed; explicit parameters preferred

**Return Values:**
- React components return JSX directly
- API handlers return `Response` objects
- Helper functions return typed values matching interfaces
- No implicit undefined returns; functions complete explicitly

## Module Design

**Exports:**
- React components: `export default function ComponentName() {}`
- Utilities: `export const` or `export function`
- Context/providers: Named exports (e.g., `export function I18nProvider()`)

**Barrel Files:**
- No barrel files (index.ts re-exports) observed in codebase
- Direct imports from specific files: `@/lib/i18n`, `@/components/Navbar`

**Structure:**
- `lib/` contains utility functions and context providers
- `components/` contains reusable React components
- `app/` contains page components and API routes
- No shared constants file; values inlined (e.g., threat arrays, feature objects)

---

*Convention analysis: 2026-02-15*
