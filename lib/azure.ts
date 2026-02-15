import { createAzure } from "@ai-sdk/azure";

export const azure = createAzure({
  resourceName: process.env.AZURE_RESOURCE_NAME!,
  apiKey: process.env.AZURE_API_KEY!,
});

export const model = azure(process.env.AZURE_DEPLOYMENT_NAME || "gpt-4.1-mini");
