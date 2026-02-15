# External Integrations

**Analysis Date:** 2026-02-15

## APIs & External Services

**AI/LLM:**
- Azure OpenAI - AI-powered text generation and analysis capabilities
  - SDK/Client: `@ai-sdk/azure` (Vercel AI SDK provider)
  - Auth: Environment variables (`AZURE_RESOURCE_NAME`, `AZURE_API_KEY`, `AZURE_DEPLOYMENT_NAME`)
  - Usage locations: `lib/azure.ts` (provider setup), `app/api/analyze/route.ts`, `app/api/simulate/route.ts`
  - Model: GPT-4.1-mini (configurable via `AZURE_DEPLOYMENT_NAME`)

## Data Storage

**Databases:**
- Not detected - Application is stateless and does not persist data

**File Storage:**
- Not detected - No file upload/storage integration

**Caching:**
- None detected

## Authentication & Identity

**Auth Provider:**
- None detected - Application does not implement authentication
- No user sessions or login required for current features

## Monitoring & Observability

**Error Tracking:**
- Not detected - No error tracking service integrated

**Logs:**
- Console logging only - Console.log/console.error calls in API routes (`app/api/simulate/route.ts`, `app/api/analyze/route.ts`) for debugging

## CI/CD & Deployment

**Hosting:**
- Not detected - Ready for deployment to Node.js hosting (Vercel, AWS Lambda, Docker, etc.)

**CI Pipeline:**
- Not detected - No CI/CD configuration files present

## Environment Configuration

**Required env vars:**
- `AZURE_RESOURCE_NAME` - Azure OpenAI resource identifier (e.g., "salimamri9999-1389-resource")
- `AZURE_API_KEY` - Azure OpenAI API authentication key
- `AZURE_DEPLOYMENT_NAME` - Azure OpenAI deployment name (e.g., "gpt-4.1-mini")

**Secrets location:**
- `.env.local` - Local development secrets (git-ignored)
- Production: Expects environment variables to be set via hosting platform

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected - Application makes no outbound webhook calls

## API Endpoints

**POST `/api/analyze`:**
- Accepts: `{ message: string }`
- Returns: `{ riskScore: number, verdict: string, redFlags: string[], explanation: string, recommendation: string }`
- Purpose: Analyzes a user-provided message for phishing/fraud risk using Azure OpenAI
- Implementation: `app/api/analyze/route.ts`

**POST `/api/simulate`:**
- Accepts: `{ scenario: Scenario, userChoice: string }`
- Returns: `{ explanation: string, redFlags: string[], tactic: string, advice: string }`
- Purpose: Provides feedback on user's choice in a phishing simulation scenario
- Implementation: `app/api/simulate/route.ts`

## AI SDK Integration Details

**Vercel AI SDK (`ai` package):**
- Function used: `generateObject()` - Generates structured JSON responses from LLM
- Validation: Integrated with Zod schemas for type-safe responses
- Error handling: Returns 500 status with error details on generation failure
- Prompting: System prompts in Arabic targeting Tunisian cybersecurity context

**Azure OpenAI Configuration:**
- Provider setup: `lib/azure.ts` exports `model` instance and `azure` client
- Resource endpoint: Azure OpenAI REST API (handled by SDK)
- Deployment pattern: Single model instance used across both API routes

---

*Integration audit: 2026-02-15*
