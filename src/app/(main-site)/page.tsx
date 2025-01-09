import React from 'react'
import Link from 'next/link'

const HomePage = () => {
    return (
        <section className='block-space big-container'>
            <h1>Climate Connect</h1>
            <div>
                <Link href="/custom-map">Map</Link>
            </div>
        </section>
    )
}

export default HomePage
