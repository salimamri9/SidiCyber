# Architecture

**Analysis Date:** 2026-02-15

## Pattern Overview

**Overall:** Full-stack Next.js application with a client-server model using App Router and API Routes.

**Key Characteristics:**
- Server-side rendering with client-side interactivity using React 19
- API routes for AI-powered analysis backed by Azure OpenAI
- Context-based state management for internationalization
- Component-driven UI with motion and visual feedback
- Progressive disclosure pattern for multi-step flows

## Layers

**Presentation Layer (Client):**
- Purpose: Render UI, handle user interactions, manage visual feedback
- Location: `app/page.tsx`, `app/*/page.tsx`, `components/`
- Contains: Page components, interactive components, styling via Tailwind CSS
- Depends on: React, Framer Motion, Lucide icons, i18n utilities
- Used by: Browser clients

**API Layer:**
- Purpose: Process user requests, delegate to AI models for analysis
- Location: `app/api/*/route.ts`
- Contains: POST handlers for simulate and analyze endpoints
- Depends on: AI SDK, Zod validation, Azure OpenAI
- Used by: Client-side fetch calls

**Business Logic & Data Layer:**
- Purpose: Define scenarios, translations, legal questions, AI model configuration
- Location: `lib/`
- Contains: Scenario definitions, internationalization strings, legal content, Azure SDK config
- Depends on: Standard libraries, environment variables
- Used by: Components and API routes

**Component Library:**
- Purpose: Reusable UI components with consistent styling
- Location: `components/`
- Contains: Navigation, phone frame mockup, risk meter visualization, layout wrapper
- Depends on: React, Framer Motion, Lucide icons, i18n
- Used by: Page components

## Data Flow

**Simulator Flow:**

1. User lands on `/simulator` (client-side page)
2. `SimulatorPage` component renders with initial scenario from `lib/scenarios`
3. User selects choice (safe/suspicious/scam)
4. Component calls POST `/api/simulate` with scenario data and user choice
5. API route extracts request body, constructs Arabic prompt, calls Azure OpenAI via AI SDK
6. AI returns structured object: explanation, redFlags, tactic, advice
7. Component displays analysis result with correctness feedback
8. User progresses to next scenario or views final results screen

**Analyzer Flow:**

1. User lands on `/analyzer` (client-side page)
2. User pastes message or selects example
3. `AnalyzerPage` calls POST `/api/analyze` with message text
4. API route constructs prompt with analysis rules (suspicious domains, urgency language, personal info requests)
5. Azure OpenAI returns structured analysis: riskScore, verdict, redFlags, explanation, recommendation
6. Component renders RiskMeter component with animated gauge and displays analysis details
7. Fallback: if API fails, client-side heuristics calculate risk score

**Legal Awareness Flow:**

1. User lands on `/legal` (client-side page)
2. `LegalPage` renders question from `lib/legal-questions`
3. User selects option
4. Component checks if correct and increments score
5. Displays explanation and relevant law reference
6. User progresses through all questions to results screen

**State Management:**

- I18n context (`lib/i18n.tsx`): Manages locale, translations, RTL/LTR direction
- Page-level state: Each page component (simulator, analyzer, legal) manages its own local state via React hooks
- No global state manager (Redux, Zustand, etc.) - context and props sufficient for scope

## Key Abstractions

**Scenario:**
- Purpose: Represents a phishing simulator test case
- Location: `lib/scenarios.ts`
- Pattern: TypeScript interface + data array
- Structure: `{ id, title, category, sender, message, answer, difficulty }`

**AnalysisResult:**
- Purpose: Structured output from AI analysis
- Pattern: TypeScript interface defined in both API handler and page component
- Fields: `{ riskScore, verdict, redFlags, explanation, recommendation }` or `{ explanation, redFlags, tactic, advice }`

**I18n Context:**
- Purpose: Centralized language and translation management
- Location: `lib/i18n.tsx`
- Pattern: React Context with Provider and useI18n hook
- Supports: Arabic (ar), English (en), French (fr) with RTL/LTR direction

**PhoneFrame Component:**
- Purpose: Consistent mobile message visualization across scenarios
- Location: `components/PhoneFrame.tsx`
- Pattern: Presentational component accepting content, sender, and message type
- Renders: SMS/WhatsApp/Email styles with status bar, sender header, message content

**RiskMeter Component:**
- Purpose: Visual risk score gauge (0-100) with color coding
- Location: `components/RiskMeter.tsx`
- Pattern: Animated SVG-based circular gauge
- Colors: Green (safe ≤30), Yellow (suspicious 31-60), Red (dangerous >60)

## Entry Points

**Landing Page:**
- Location: `app/page.tsx`
- Triggers: Browser navigation to `/`
- Responsibilities: Hero section, feature highlights, stats, CTAs to simulator/analyzer/legal pages

**Simulator Page:**
- Location: `app/simulator/page.tsx`
- Triggers: User clicks training button or navigates to `/simulator`
- Responsibilities: Multi-step scenario flow, AI analysis, scoring, results display

**Analyzer Page:**
- Location: `app/analyzer/page.tsx`
- Triggers: User clicks analyzer button or navigates to `/analyzer`
- Responsibilities: Free-form message input, AI risk analysis, real-time verdict

**Legal Awareness Page:**
- Location: `app/legal/page.tsx`
- Triggers: User clicks legal button or navigates to `/legal`
- Responsibilities: Question flow, answer validation, legal reference display

**Layout Wrapper:**
- Location: `app/layout.tsx`
- Responsibilities: Root HTML setup, metadata, font loading (Cairo + Inter), provider setup (I18nProvider), persistent Navbar and DirUpdater

**API Endpoints:**
- `/api/simulate`: POST handler at `app/api/simulate/route.ts`
- `/api/analyze`: POST handler at `app/api/analyze/route.ts`

## Error Handling

**Strategy:** Graceful fallback with client-side heuristics.

**Patterns:**
- API errors caught in try-catch; component implements fallback analysis
- Simulator: If API fails, uses hardcoded explanations based on correct answer
- Analyzer: If API fails, heuristic scoring based on URL patterns, urgency language, personal info requests
- No error boundaries currently implemented; errors logged to console
- User sees loading state during AI processing

## Cross-Cutting Concerns

**Logging:**
- API routes: Console.log with visual separators (═══) for request/response tracking
- Client: Error logging in catch blocks, no centralized logging library
- No persistent logging infrastructure

**Validation:**
- API routes: Zod schema definitions for AI output structure (schema parameter in generateObject)
- Client: Form validation for text input (empty check before submit)
- Type safety: Full TypeScript throughout; interfaces for Scenario, AnalysisResult, LegalQuestion

**Authentication:**
- None implemented; application is public
- No user accounts or session management
- Azure API key secured via environment variables

**Internationalization:**
- Context-based i18n system in `lib/i18n.tsx`
- All user-facing text stored in translations object (lines 9-338)
- Three languages: Arabic (RTL), English (LTR), French (LTR)
- Direction (dir prop) set on html element based on locale
- Components use useI18n hook to access translations: `const { t, locale } = useI18n()`

---

*Architecture analysis: 2026-02-15*
