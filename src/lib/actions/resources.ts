"use server";

import { generateEmbeddings } from "../ai/embedding";
import db from "../db";

export const createResource = async (input: string) => {
  try {
    // adding the resource to the database

    console.log("value of input is ", input);
    const resource = await db.resource.create({
      data: {
        content: input,
      },
    });

    const insertedEmbedding = await db.embedding.create({
      data: {
        resourceId: resource.id,
        content: input,
      },
    });

    console.log("resource created", resource);

    const embeddings = await generateEmbeddings(input);

    console.log("embeddings created", embeddings);

    console.log("inserting to db");

    // Insert embeddings using raw SQL
    for (const data of embeddings) {
      console.log("inserting data", data);
      const response = await db.$executeRaw`
        UPDATE embedding 
        SET embedding = ${data.embedding}::vector
        WHERE id = ${insertedEmbedding.id}
      `;

      console.log("Response from db", response);
      //   await db.$executeRaw`
      //     INSERT INTO "embedding" ("resourceId", "content", "embedding")
      //     VALUES (${resource.id}, ${data.content}, ${data.embedding}::vector)
      //   `;
    }

    console.log("successfully inserted to db");

    return "Resource successfully created and embeddings saved to the db.";
  } catch (e) {
    console.log("an error occured while creating the resource", e);
    if (e instanceof Error)
      return e.message.length > 0 ? e.message : "Error, please try again.";
  }
};
