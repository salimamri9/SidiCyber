# Codebase Structure

**Analysis Date:** 2026-02-15

## Directory Layout

```
test-app/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Landing page (home)
│   ├── layout.tsx          # Root layout with providers
│   ├── globals.css         # Global styles
│   ├── simulator/          # Phishing simulator feature
│   │   └── page.tsx
│   ├── analyzer/           # AI scam analyzer feature
│   │   └── page.tsx
│   ├── legal/              # Legal awareness feature
│   │   └── page.tsx
│   └── api/                # API routes
│       ├── simulate/       # Scenario analysis endpoint
│       │   └── route.ts
│       └── analyze/        # Free-form message analysis endpoint
│           └── route.ts
├── components/             # Reusable React components
│   ├── Navbar.tsx          # Navigation bar (fixed top)
│   ├── PhoneFrame.tsx      # Mobile message display
│   ├── RiskMeter.tsx       # Risk score gauge visualization
│   └── DirUpdater.tsx      # Direction/RTL updater
├── lib/                    # Utilities and data
│   ├── azure.ts            # Azure OpenAI SDK config
│   ├── i18n.tsx            # Internationalization context and translations
│   ├── scenarios.ts        # Phishing simulator scenarios data
│   └── legal-questions.ts  # Legal awareness questions
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
├── next.config.ts          # Next.js config
└── .planning/              # GSD planning documents
    └── codebase/
        ├── ARCHITECTURE.md
        └── STRUCTURE.md
```

## Directory Purposes

**app/:**
- Purpose: Next.js 13+ App Router directory with file-based routing
- Contains: Page components (`.tsx` files), API routes, root layout, global styles
- Key files: `layout.tsx` (root provider setup), `page.tsx` (home page), `globals.css` (Tailwind base)

**app/simulator/:**
- Purpose: Phishing simulation training module
- Contains: Interactive scenario-based learning with AI feedback
- Key files: `page.tsx` renders flow, calls `/api/simulate`

**app/analyzer/:**
- Purpose: Free-form message analysis tool
- Contains: Text input, AI-powered risk assessment, real-time feedback
- Key files: `page.tsx` renders form, calls `/api/analyze`

**app/legal/:**
- Purpose: Legal awareness quiz about Tunisian cyber laws
- Contains: Multi-choice questions, explanations, scoring
- Key files: `page.tsx` renders flow, imports `lib/legal-questions.ts`

**app/api/:**
- Purpose: Backend API endpoints
- Contains: POST handlers for AI-powered analysis
- Pattern: Each endpoint is a directory with `route.ts` file

**components/:**
- Purpose: Reusable, composable UI components
- Contains: Navigation, messaging visualization, gauges, utilities
- Pattern: One component per file, named with PascalCase
- Exported as named exports used in pages via `import { ComponentName } from "@/components/ComponentName"`

**lib/:**
- Purpose: Shared utilities, configuration, and data
- Contains: Azure SDK config, i18n system, static scenario/question data
- Pattern: Utilities exported as named or default exports; constants as exported arrays/objects

**public/:**
- Purpose: Static assets served at root
- Contains: Favicon, images, fonts (if any)
- Note: Google Fonts loaded from CDN in `layout.tsx`

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root layout with Navbar, I18nProvider, DirUpdater, global styles
- `app/page.tsx`: Landing page (hero, features, stats, footer)

**Configuration:**
- `package.json`: Dependencies (Next.js 16.1.6, React 19.2.3, AI SDK, Framer Motion, Tailwind CSS 4)
- `tsconfig.json`: TypeScript configuration with path alias `@/` pointing to project root
- `next.config.ts`: Next.js configuration (minimal setup)

**Core Logic:**
- `lib/azure.ts`: Azure OpenAI client initialization
- `lib/i18n.tsx`: I18n context provider and hook for translations
- `lib/scenarios.ts`: Array of 8 phishing scenarios with metadata
- `lib/legal-questions.ts`: Array of 6 legal awareness questions

**API Endpoints:**
- `app/api/simulate/route.ts`: POST `/api/simulate` - Analyzes user's phishing scenario choice
- `app/api/analyze/route.ts`: POST `/api/analyze` - Analyzes free-form user message

**Page Components:**
- `app/page.tsx`: Landing page with feature cards
- `app/simulator/page.tsx`: Multi-step scenario flow (8 scenarios)
- `app/analyzer/page.tsx`: Text input form and results
- `app/legal/page.tsx`: Quiz flow (6 questions)

**Components:**
- `components/Navbar.tsx`: Fixed top navigation with language switcher
- `components/PhoneFrame.tsx`: Mobile phone UI mockup for message display
- `components/RiskMeter.tsx`: Animated circular gauge showing risk score 0-100
- `components/DirUpdater.tsx`: Client-side RTL/LTR direction updater

**Testing:**
- Not detected (no test files found)

**Styling:**
- `app/globals.css`: Global Tailwind CSS imports and custom classes
- Utility-first Tailwind CSS 4 throughout all components
- Custom color palette: `cyber-*` classes for theme (cyan, red, yellow, green, purple)

## Naming Conventions

**Files:**
- Page components: `page.tsx` (Next.js convention)
- API routes: `route.ts` (Next.js convention)
- Reusable components: PascalCase with `.tsx` extension (e.g., `PhoneFrame.tsx`)
- Utilities: camelCase with `.ts` extension (e.g., `scenarios.ts`, `i18n.tsx`)
- Styling: Global styles use `globals.css`; component styles inline via Tailwind classes

**Directories:**
- Feature directories: kebab-case inside `app/` (e.g., `simulator/`, `analyzer/`, `legal/`)
- Component exports: Named exports matching filename (e.g., `Navbar` from `Navbar.tsx`)

**Functions & Variables:**
- Functions: camelCase (e.g., `useI18n`, `generateObject`)
- Type/Interface names: PascalCase (e.g., `Scenario`, `AnalysisResult`, `Locale`)
- Constants: camelCase or UPPER_SNAKE_CASE for config (env vars: UPPER_SNAKE_CASE)
- React hooks: `use` prefix (e.g., `useI18n`)

**Classes & CSS:**
- Tailwind utility classes: kebab-case (e.g., `flex`, `items-center`, `rounded-xl`)
- Custom color prefixes: `cyber-*` (e.g., `cyber-cyan`, `cyber-border`, `cyber-card`)
- Animation classes: prefixed with animate- (e.g., `animate-spin`, `animate-pulse-glow`)

## Where to Add New Code

**New Feature Page:**
- Create directory: `app/[feature-name]/`
- Create file: `app/[feature-name]/page.tsx`
- Use Client Component directive if interactive: `"use client"`
- Import i18n: `const { t, locale } = useI18n()`
- Style with Tailwind: Apply `cyber-*` color classes, use `cyber-grid` for backgrounds

**New Component:**
- Create file: `components/FeatureName.tsx`
- Use Client Component if interactive: `"use client"`
- Export as named export: `export function FeatureName() { ... }`
- Import in pages: `import { FeatureName } from "@/components/FeatureName"`
- Add TypeScript interfaces for props at top of file

**New API Endpoint:**
- Create directory: `app/api/[endpoint-name]/`
- Create file: `app/api/[endpoint-name]/route.ts`
- Export async `POST` (or GET, PUT, etc.): `export async function POST(req: Request) { ... }`
- Use Zod for schema validation: `schema: z.object({ ... })`
- Call Azure AI SDK: `await generateObject({ model, schema, prompt })`
- Return JSON: `return Response.json(result.object)` or error response

**New Utility/Library:**
- Create file: `lib/[utility-name].ts`
- Export functions/constants: `export const X = ...` or `export function x() { ... }`
- No default exports; use named exports for clarity
- Import in other files: `import { x } from "@/lib/[utility-name]"`

**New Scenario (Phishing Simulator):**
- Edit: `lib/scenarios.ts`
- Add entry to scenarios array following `Scenario` interface:
  - id: unique string
  - title: display name (will be translated)
  - category: "sms" | "whatsapp" | "email"
  - sender: message source
  - message: Arabic message text
  - answer: "scam" | "suspicious" | "safe"
  - difficulty: "easy" | "medium" | "hard"

**New Translation:**
- Edit: `lib/i18n.tsx`
- Add key-value pair to all three language objects (ar, en, fr) in translations object (lines 9-338)
- Use namespace: "feature.key" format (e.g., "analyzer.title", "sim.analyzing")
- Access in components: `const { t } = useI18n(); t("feature.key")`

**New Legal Question:**
- Edit: `lib/legal-questions.ts`
- Add entry to legalQuestions array following `LegalQuestion` interface:
  - id: sequential number
  - question: Record<Locale, string> - question in ar/en/fr
  - options: array of { label: Record<Locale, string>, correct: boolean }
  - explanation: Record<Locale, string> - answer explanation in ar/en/fr
  - law: relevant Tunisian law reference string

## Special Directories

**app/api/:**
- Purpose: Backend API routes
- Generated: No (source code)
- Committed: Yes
- Pattern: Each endpoint is a folder with route.ts file exporting handler functions

**.next/:**
- Purpose: Next.js build output
- Generated: Yes (during `npm run build`)
- Committed: No (in .gitignore)
- Note: Remove before committing if accidentally included

**node_modules/:**
- Purpose: npm dependencies
- Generated: Yes (via `npm install`)
- Committed: No (in .gitignore)

---

*Structure analysis: 2026-02-15*
