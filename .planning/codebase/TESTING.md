# Testing Patterns

**Analysis Date:** 2026-02-15

## Test Framework

**Runner:**
- Not configured. No test runner (Jest, Vitest, etc.) in package.json devDependencies
- No test files found in codebase (only node_modules test files from dependencies like zod)

**Assertion Library:**
- Not applicable (no testing framework installed)

**Run Commands:**
- None. Package.json has no test script
- Current available scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`

**ESLint for code quality (only linting tool):**
```bash
npm run lint              # Run ESLint
```

## Test File Organization

**Location:**
- No test files currently exist in the codebase
- Convention would place tests in `__tests__` directories or alongside source files with `.test.ts` or `.spec.ts` suffix

**Naming:**
- Not established

**Structure:**
- Not established

## Test Structure

**Current State:**
- Application is not test-driven
- No test suites, test cases, or assertion patterns defined

**Recommendation for testing (not currently implemented):**
Tests should follow Next.js and React testing conventions if added:
- Use vitest or Jest for unit/integration tests
- React Testing Library for component tests
- Playwright or Cypress for E2E tests

## Mocking

**Framework:**
- Not used (no test framework installed)

**Patterns:**
- Not established

**What would be mocked (if testing existed):**
- Azure API calls via `@ai-sdk/azure` in API routes
- I18n context in component tests
- Motion/framer-motion animations (if testing visual behavior)
- usePathname from Next.js navigation

**What should NOT be mocked:**
- DOM elements rendered by React
- User interactions (click, input, etc.)
- i18n translation mechanism itself (test with real translations)

## Fixtures and Factories

**Test Data:**
- Not established

**Pattern available for reference:**
- `lib/scenarios.ts` contains `scenarios: Scenario[]` - could serve as test fixtures
- Example: 8 predefined SMS/email/WhatsApp phishing scenarios with known correct answers
- Could be extended with factory functions for creating test scenarios dynamically

**Suggested location for test fixtures:**
- `lib/__fixtures__/scenarios.test.ts`
- Or alongside each feature: `app/simulator/__fixtures__/`

## Coverage

**Requirements:**
- None enforced (no coverage tool configured)

**View Coverage:**
- Not available

**Recommendation:**
If testing is added, consider setting coverage thresholds for:
- API routes (100% - critical security)
- Page components (>80% - user-facing)
- Utilities (>80% - shared logic)
- Hooks (>90% - business logic)

## Test Types

**Unit Tests (Not Implemented):**
- Should test utility functions in `lib/`:
  - i18n translation lookups (`lib/i18n.tsx`)
  - Scenario data structure (`lib/scenarios.ts`)
  - Azure SDK initialization (`lib/azure.ts`)

**Integration Tests (Not Implemented):**
- Should test:
  - API routes (`app/api/simulate/route.ts`, `app/api/analyze/route.ts`) with mock Azure calls
  - I18n context and useI18n hook integration
  - State management flows in page components

**E2E Tests (Not Implemented):**
- Would test:
  - Complete simulator flow: scenario display → user choice → AI analysis → results
  - Analyzer page: input → API call → risk display
  - Language switching across pages
  - RTL/LTR rendering for Arabic/French/English

## Common Patterns

**Async Testing (When Testing is Added):**
```typescript
// Recommendation based on API structure
describe("Simulator API", () => {
  it("should analyze scenario and return structured result", async () => {
    const mockScenario = scenarios[0];
    const mockChoice = "scam";

    const res = await POST(new Request(/* ... */));
    const data = await res.json();

    expect(data).toHaveProperty("explanation");
    expect(data).toHaveProperty("redFlags");
    expect(Array.isArray(data.redFlags)).toBe(true);
  });
});
```

**Error Testing (When Testing is Added):**
```typescript
// Based on error handling pattern in API routes
describe("API Error Handling", () => {
  it("should return 500 when Azure API fails", async () => {
    // Mock generateObject to throw
    jest.mock("ai", () => ({
      generateObject: jest.fn().mockRejectedValue(new Error("API error"))
    }));

    const res = await POST(new Request(/* ... */));
    expect(res.status).toBe(500);
  });
});
```

**Component Testing Pattern (When Testing is Added):**
```typescript
// For interactive components like PhoneFrame
import { render, screen } from "@testing-library/react";
import { PhoneFrame } from "@/components/PhoneFrame";

describe("PhoneFrame", () => {
  it("renders message content", () => {
    render(
      <PhoneFrame sender="BIAT Bank" type="sms">
        Test message content
      </PhoneFrame>
    );

    expect(screen.getByText("Test message content")).toBeInTheDocument();
  });
});
```

## Testing Gaps & Critical Areas

**Currently Untested (High Priority):**
- API routes (`app/api/simulate/route.ts`, `app/api/analyze/route.ts`)
  - Azure generateObject calls
  - Error responses
  - Zod schema validation

- Interactive state management
  - Simulator state transitions: choice → loading → analysis
  - Score calculation logic
  - Analyzer input validation

- i18n functionality
  - Context provider initialization
  - Translation key lookups
  - Locale switching persistence

**Partially Exposed to Testing:**
- Component rendering (no visual regression tests)
- Animation behavior (framer-motion)
- Accessibility (no a11y testing)

**Recommendations for test setup (if adding tests):**

1. **Install testing dependencies:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
npm install -D playwright @playwright/test  # For E2E
```

2. **Create test configuration:**
- `vitest.config.ts` - configure for Next.js
- `playwright.config.ts` - configure for E2E tests

3. **Create test utilities:**
- `lib/__test__/setup.ts` - test helpers and mocks
- `lib/__test__/mocks/azure.ts` - mock @ai-sdk/azure

4. **Prioritize tests by impact:**
- Start with API routes (external dependency)
- Then state management (user flow)
- Then utilities (coverage and maintainability)

---

*Testing analysis: 2026-02-15*
