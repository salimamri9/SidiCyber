# Technology Stack

**Analysis Date:** 2026-02-15

## Languages

**Primary:**
- TypeScript 5 - Full codebase including frontend pages, API routes, and utilities
- JavaScript/JSX - React components and configuration files

**Secondary:**
- CSS - Styling with Tailwind (PostCSS-based)

## Runtime

**Environment:**
- Node.js (version not explicitly pinned, inferred from Next.js 16.1.6 compatibility)

**Package Manager:**
- npm - Lockfile present: `package-lock.json`

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework for pages, API routes, and server-side rendering
- React 19.2.3 - UI component library with hooks
- React DOM 19.2.3 - DOM rendering for React

**Styling:**
- Tailwind CSS 4 - Utility-first CSS framework via PostCSS
- @tailwindcss/postcss 4 - PostCSS plugin for Tailwind compilation

**Animation:**
- Framer Motion 12.34.0 - Component animation and gesture library for interactive UI

**Testing:**
- Not detected

**Build/Dev:**
- TypeScript 5 - Compilation of .ts/.tsx files
- PostCSS 4 - CSS processing pipeline
- ESLint 9 - Code linting with Next.js configuration presets
- eslint-config-next 16.1.6 - Next.js specific linting rules

## Key Dependencies

**Critical:**
- ai 6.0.86 - Vercel AI SDK for unified LLM integration, used in both `/api/simulate` and `/api/analyze` routes
- @ai-sdk/azure 3.0.30 - Azure OpenAI provider for the AI SDK, enables Azure GPT-4 integration

**Infrastructure:**
- zod 4.3.6 - TypeScript-first schema validation library, used for API response typing and validation in both analysis routes
- lucide-react 0.564.0 - React icon library for UI components

**Development:**
- @types/react 19 - TypeScript definitions for React 19
- @types/react-dom 19 - TypeScript definitions for React DOM 19
- @types/node 20 - TypeScript definitions for Node.js APIs used in API routes

## Configuration

**Environment:**
- `.env.local` - Local environment variables (git-ignored)
- Required variables:
  - `AZURE_RESOURCE_NAME` - Azure OpenAI resource name
  - `AZURE_API_KEY` - Azure OpenAI API authentication key
  - `AZURE_DEPLOYMENT_NAME` - Azure OpenAI deployment identifier (defaults to "gpt-4.1-mini")

**Build:**
- `tsconfig.json` - TypeScript compiler configuration with paths alias `@/*` pointing to root directory
- `next.config.ts` - Next.js build configuration (currently empty)
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS
- `eslint.config.mjs` - ESLint configuration extending next/core-web-vitals and next/typescript

## Platform Requirements

**Development:**
- Node.js runtime (version matching Next.js 16.1.6 compatibility, typically 18+)
- npm package manager
- TypeScript 5 (installed as dev dependency)

**Production:**
- Node.js server capable of running Next.js applications
- Environment variables for Azure OpenAI integration must be set
- No external databases or storage backends required in current implementation

---

*Stack analysis: 2026-02-15*
