import React from 'react'
import Link from 'next/link'
import GenerateEmbeddingButton from '@/components/Buttons/generate-embedding-button'
import { loadLessTreeDataset } from '../(server)/data/trees'
import GenerateTreeEmbeddingButton from '@/components/Buttons/generate-tree-embedding-button'
import TestEmbeddingButton from '@/components/Buttons/test-embedding-button'

const HomePage = async () => {
    const lessTrees = await loadLessTreeDataset()
    return (
        <section className='block-space big-container'>
            <h1>Climate Connect</h1>
            <div className='space-y-4'>
                {
                    lessTrees.map(e => <div key={e.key} className='border p-4'>
                        <h2>Name:- {e.name}</h2>
                        <h4>Category:- {e.category}</h4>
                    </div>)
                }
            </div>
            <div className='mt-4 space-x-4'>
                <h3>Generating</h3>
                <GenerateEmbeddingButton />
                <GenerateTreeEmbeddingButton trees={lessTrees} />
            </div>

            <div className='mt-4 space-x-4'>
                <h3>Testing</h3>
                <TestEmbeddingButton />
            </div>

        </section>
    )
}

export default HomePage
