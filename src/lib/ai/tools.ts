import { createResource, findRelevantContent } from '@/app/(server)/actions/embeddings';
import { tool as createTool } from 'ai';
import { z } from 'zod';

export const weatherTool = createTool({
  description: 'Display the weather for a location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async function ({ location }) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { weather: 'Sunny', temperature: 75, location };
  },
});

export const getWeatherTool = createTool({
    description: 'Get the weather in a location',
    parameters: z.object({
      location: z.string().describe('The location to get the weather for'),
    }),
    execute: async ({ location }) => ({
      location,
      temperature: 72 + Math.floor(Math.random() * 21) - 10,
    }),
  })

export const resourceTool = createTool({
            description: `add a resource to your knowledge base.
              If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
            parameters: z.object({
              content: z
                .string()
                .describe('the content or resource to add to the knowledge base'),
            }),
            execute: async ({ content }) => createResource(content),
        })

export const informationTool = createTool({
            description:`get information from your current knowledge base to answer the users question accurately...`,
            parameters:z.object({
                question:z.string().describe("the users query or question")
            }),
            execute:async({question})=> findRelevantContent(question)
        })

export const stockTool = createTool({
    description: 'Get price for a stock',
    parameters: z.object({
      symbol: z.string().describe('The stock symbol to get the price for'),
    }),
    execute: async function ({ symbol }) {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { symbol, price: 100 };
    },
  });


        // Update the tools object
export const tools = {
    displayWeather: weatherTool,
    getStockPrice: stockTool,
    addResourceTool:resourceTool,
    getInformation:informationTool
  };
