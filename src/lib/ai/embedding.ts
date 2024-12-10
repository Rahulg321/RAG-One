import { embed, embedMany } from "ai";
import { openai } from "./providers";
import db from "../db";

const embeddingModel = openai.embedding("text-embedding-ada-002");

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (
  value: string
): Promise<Array<{ embedding: number[]; content: string }>> => {
  try {
    console.log("chunks are being generated");
    const chunks = generateChunks(value);
    console.log("chunks generated successfully");

    console.log("generating embeddings....");
    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: chunks,
    });
    console.log("embeddings generated successfully....");

    return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
  } catch (error) {
    console.log("an error occured while generating embeddings", error);
    return [];
  }
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  try {
    console.log("generating single embedding");
    const userQueryEmbedded = await generateEmbedding(userQuery);
    console.log("successfully generated single embedding");

    console.log("single embedding is", userQueryEmbedded);

    const results = await db.$queryRaw`
    SELECT content, 1 - (embedding <=> ${userQueryEmbedded}::vector) AS similarity
    FROM embeddings
    WHERE 1 - (embedding <=> ${userQueryEmbedded}::vector) > 0.5
    ORDER BY similarity DESC
    LIMIT 4;
  `;

    console.log("results are", results);

    return results;
  } catch (error) {
    console.log(
      "an error occurred while trying to find relevant content",
      error
    );
    return "Sorry, I don't know.";
  }
};
