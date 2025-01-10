import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';
import { createResource, findRelevantContent } from '../../actions/embeddings';
import { tools } from '@/lib/ai/tools';

const google = createGoogleGenerativeAI({
  // custom settings
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, customKey } = await req.json();
  console.log("messages", messages)
  console.log("customKey on the backend is", customKey)
  const result = streamText({
    model: google('gemini-1.5-pro-latest'),
    system: `You are a helpful friendly  assistant. Check your knowledge base before answering any questions.
    If you dont have information related to a prompt use tools to find the relevant information. Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
    messages,
    tools,
  });

  return result.toDataStreamResponse({
    getErrorMessage: error => {
        if (error == null) {
          return 'unknown error';
        }

        if (typeof error === 'string') {
          return error;
        }

        if (error instanceof Error) {
          return error.message;
        }

        return JSON.stringify(error);
      },
  });
}
