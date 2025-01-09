"use client";

import React, { useTransition } from 'react'
import { Button } from "@/components/ui/button"
import generateEmbeddings from '@/app/(server)/actions/ai';

const GenerateEmbeddingButton = () => {
    const [isPending, startTransition] = useTransition()
    return (
        <Button onClick={async () => {
            startTransition(async () => {

                await generateEmbeddings("this is love")
            })
        }}
            disabled={isPending}
        >
            {
                isPending ? "Generating...." : "GenerateEmbeddingButton"
            }
        </Button>
    )
}

export default GenerateEmbeddingButton
