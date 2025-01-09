"use client";

import React, { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import generateEmbeddings, { storeTreesEmbeddings } from '@/app/(server)/actions/ai';
import { Tree } from '@/app/(server)/data/trees';
import { useToast } from '@/hooks/use-toast';

const GenerateTreeEmbeddingButton = ({ trees }: { trees: Tree[] }) => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()

    return (
        <Button onClick={async () => {
            startTransition(async () => {
                const response = await storeTreesEmbeddings(trees)
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
                isPending ? "Creating/Uploading...." : "CreateUploadTreesEmbeddings"
            }
        </Button>
    )
}

export default GenerateTreeEmbeddingButton
