"use server";


import { embed, embedMany } from 'ai';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import db from '@/lib/db';
import pc from '@/lib/pinecone';
import { v4 as uuidv4 } from 'uuid';


const embeddingModel = google.textEmbeddingModel('text-embedding-004');

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split('.')
    .filter(i => i !== '');
};



export const generateEmbeddings = async (
    value: string,
  ): Promise<Array<{ embedding: number[]; content: string }>> => {
    const chunks = generateChunks(value);
    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: chunks,
    });
    return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
  };

  export const generateEmbedding = async (value: string): Promise<number[]> => {
    const input = value.replaceAll('\\n', ' ');
    const { embedding } = await embed({
      model: embeddingModel,
      value: input,
    });
    return embedding;
  };

  export const findRelevantContent = async (userQuery: string) => {
    try {
        const index = pc.index("sample_trees", "https://sample-trees-5xrm1p7.svc.aped-4627-b74a.pinecone.io")


    const userQueryEmbedded = await generateEmbedding(userQuery);

    const queryResult1 = await index.query({
        vector: userQueryEmbedded!,
        topK: 2,
        includeMetadata: true,
    });

    console.log("query result 1", queryResult1)

    // 3. Extract resourceIds from the query results' metadata
    const resourceIds = queryResult1.matches?.map(match => match.metadata?.resourceId as string).filter((id): id is string => id !== undefined) || [];

    if (resourceIds.length === 0) {
      return []; // No relevant content found
    }

     // 4. Retrieve corresponding resources from the database
     const relevantResources = await db.resource.findMany({
        where: {
          id: {
            in: resourceIds,
          },
        },
      });

      return relevantResources;
    } catch (e) {
        console.log(e)
        if (e instanceof Error)
            return e.message.length > 0 ? e.message : 'Error, please try again.';
    }
  };


  export async function createResource(content:string){
    const index = pc.index("sample_trees", "https://sample-trees-5xrm1p7.svc.aped-4627-b74a.pinecone.io")


    try {
        console.log("create resource function was called", content)
        const newResource = await db.resource.create({
            data:{
                content
            }
        })

        console.log("Creating embeddings")
        const embeddings = await generateEmbeddings(content)
        const embeddingValues = embeddings.flatMap(e => e.embedding);


        console.log("inserting to pinecone")
        const pineconeId = uuidv4();
        await index.upsert([
            {
                id: pineconeId,
                values: embeddingValues,
                metadata: {
                    resourceId: newResource.id,
                    // Add any other relevant metadata here
                },
            },
        ]);

    console.log("inserting to embeddings table")
         // 5. Store embedding details in the database
    await db.embedding.create({
        data: {
          resourceId: newResource.id,
          content,
          pineconeId,
        },
      });

      console.log('Resource and embedding successfully created.');
      return "resource successfully created and embedded"
    } catch (e) {
        console.log(e)
        if (e instanceof Error)
            return e.message.length > 0 ? e.message : 'Error, please try again.';
    }
  }
