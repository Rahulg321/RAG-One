"use server";

import pc from "@/lib/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Tree } from "../data/trees";
import { v4 as uuidv4 } from 'uuid'; // Example of using UUIDs for IDs


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "text-embedding-004"});

export default async function generateStringEmbeddings(text:string){
    try {
        const result = await model.embedContent(text);
        console.log(result.embedding.values);

    return {
        type:"success",
        message:"Successfully generated embeddings"
    }

    } catch (error) {
        console.log("an error occured generating google embedding", error)
        return {
            type:"error",
            message:"error generating google embeddings"
        }
    }
}


export async function generateTreeEmbeddings(tree:Tree){
    try {
        const textToEmbed = `Tree Name: ${tree.name}, Tree Category: ${tree.category}, Tree Latitute: ${tree.position.lat} Tree longitude: ${tree.position.lng}`;
        console.log("text to embed is", textToEmbed)
        const result = await model.embedContent(textToEmbed);
        const embedding = result.embedding.values;

    return {
        type:"success",
        values:embedding,
        message:"Successfully generated embeddings"
    }
    } catch (error) {
        console.log("an error occured generating google tree embedding", error)
        return {
            type:"error",
            message:"error generating google tree embeddings"
        }
    }
}


export async function createPineconeIndex(){
   try {
    const index = pc.index("INDEX_NAME", "INDEX_HOST")

    await index.namespace('example-namespace').upsert([
      {
        id: 'vec1',
        values: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
        sparseValues: {
            indices: [1, 5],
            values: [0.5, 0.5]
        },
        metadata: {'genre': 'drama'},
      },
      {
        id: 'vec2',
        values: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
        metadata: {'genre': 'action'},
        sparseValues: {
            indices: [5, 6],
            values: [0.4, 0.5]
        }
      }
    ])

    return {
        type:"success",
        message:"Successfully inserted embeddings"
    }

} catch (error) {
    console.log("an error occured inserting embedding", error)
    return {
        type:"error",
        message:"error inserting embeddings"
    }
   }
}


export async function storeTreesEmbeddings(trees:Tree[]){

    const index = pc.index("sample_trees", "https://sample-trees-5xrm1p7.svc.aped-4627-b74a.pinecone.io")


   try {
    const upsertRequests = trees.map(async (tree) => {
        // 1. Generate Embeddings (using a hypothetical 'generateEmbeddings' function)
        const result = await generateTreeEmbeddings(tree);
        if (result.type === "error" || !result.values) {
            throw new Error("Failed to generate embeddings for");
        }

        // 2. Create a unique ID for each tree
        const treeId = uuidv4(); // Or use a different ID generation method

        // 3. Construct upsert request
        return {
          id: treeId,
          values: result.values,
          metadata: {
            name: tree.name,
            category: tree.category,
            longitude: tree.position.lng,
            latitude: tree.position.lat,
          },
        };
      });


    console.log("awaiting all promises")
   // Await all upsert requests
   const resolvedUpsertRequests = await Promise.all(upsertRequests);

   console.log("uploading to pinecone")
   // Upsert the vectors
   await index.upsert(resolvedUpsertRequests);
   console.log("successfully uploaded to pinecone")

    return {
        type:"success",
        message:"Successfully inserted embeddings"
    }

} catch (error) {
    console.log("an error occured inserting embedding", error)
    return {
        type:"error",
        message:"error inserting embeddings"
    }
   }
}


export async function storeVectorsInsidePinecone(){
   try {
    const index = pc.index("INDEX_NAME", "INDEX_HOST")

    await index.namespace('example-namespace').upsert([
      {
        id: 'vec1',
        values: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
        sparseValues: {
            indices: [1, 5],
            values: [0.5, 0.5]
        },
        metadata: {'genre': 'drama'},
      },
      {
        id: 'vec2',
        values: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
        metadata: {'genre': 'action'},
        sparseValues: {
            indices: [5, 6],
            values: [0.4, 0.5]
        }
      }
    ])

    return {
        type:"success",
        message:"Successfully inserted embeddings"
    }

} catch (error) {
    console.log("an error occured inserting embedding", error)
    return {
        type:"error",
        message:"error inserting embeddings"
    }
   }
}


export async function storeVectors(){
   try {
    const index = pc.index("INDEX_NAME", "INDEX_HOST")

    await index.namespace('example-namespace').upsert([
      {
        id: 'vec1',
        values: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
        sparseValues: {
            indices: [1, 5],
            values: [0.5, 0.5]
        },
        metadata: {'genre': 'drama'},
      },
      {
        id: 'vec2',
        values: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
        metadata: {'genre': 'action'},
        sparseValues: {
            indices: [5, 6],
            values: [0.4, 0.5]
        }
      }
    ])

    return {
        type:"success",
        message:"Successfully inserted embeddings"
    }

} catch (error) {
    console.log("an error occured inserting embedding", error)
    return {
        type:"error",
        message:"error inserting embeddings"
    }
   }
}
