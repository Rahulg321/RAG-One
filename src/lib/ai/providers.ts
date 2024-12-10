import { createOpenAI } from "@ai-sdk/openai";

export const openai = createOpenAI({
  // custom settings, e.g.
  apiKey: process.env.AI_API_KEY,
  compatibility: "strict", // strict mode, enable when using the OpenAI API
});
