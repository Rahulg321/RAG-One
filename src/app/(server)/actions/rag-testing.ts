"use server";

import pc from "@/lib/pinecone";
import { generateTreeEmbeddings } from "./ai";
import { Tree } from "../data/trees";


export async function treeTestingRAG(tree:Tree) {
    try {
        const index = pc.index("sample_trees", "https://sample-trees-5xrm1p7.svc.aped-4627-b74a.pinecone.io");

        // Generate embedding for the query tree
        const { values, type } = await generateTreeEmbeddings(tree);

        if (type === "error"){
            throw new Error("Could not generate embeddings while testing")
        }

        const queryResult1 = await index.query({
            vector: values!,
            topK: 2, // Get the top 3 most similar trees
            includeMetadata: true, // Include metadata in the results
        });

        console.log("Query 1 Results (using existing tree):", queryResult1);
        queryResult1.matches.forEach((e)=>{
            console.log(e.metadata)
            console.log(e.values)
        })

        return {
            type:"success",
            results:queryResult1,
            message:"successfully tested query"
        }
    } catch (error) {
        console.error("Error during testing:", error);
        return {
            type:"error",
            message:"error during testing"
        }
    }
}
