"use client";

import React, { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import generateEmbeddings, { storeTreesEmbeddings } from '@/app/(server)/actions/ai';
import { Tree } from '@/app/(server)/data/trees';
import { useToast } from '@/hooks/use-toast';
import { treeTestingRAG } from '@/app/(server)/actions/rag-testing';

const TestEmbeddingButton = () => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()


    return (
        <Button onClick={async () => {
            startTransition(async () => {
                // Example 2: Query using a hypothetical tree
                const hypotheticalTree = {
                    name: "Oak, red", // Hypothetical tree
                    category: "oak",
                    position: { lat: 43.7, lng: -79.4 }, // Hypothetical location
                };
                const response = await treeTestingRAG(hypotheticalTree as Tree)
                if (response.type === "success") {
                    toast({
                        title: "Upload Embeddings to Pinecone"
                    })
                }

                if (response.type === "error") {
                    toast({
                        title: "Error creating and uploading embeddings",
                        variant: "destructive"
                    })
                }

            })
        }}
            disabled={isPending}
        >
            {
                isPending ? "Testing...." : "Test"
            }
        </Button>
    )
}

export default TestEmbeddingButton
