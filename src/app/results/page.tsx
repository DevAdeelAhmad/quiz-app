import Sidebar from '@/components/commons/Sidebar'
import React from 'react'

const ResultsPage = () => {
    return (
        <main className='flex min-h-screen w-full'>
            <Sidebar />
            <div className='flex items-center justify-center w-full'>
                <h1 className='text-2xl lg:text-3xl font-semibold'>Results Page</h1>
            </div>
        </main>
    )
}

export default ResultsPage