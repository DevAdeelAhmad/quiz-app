import Sidebar from '@/components/commons/Sidebar'
import React from 'react'

const SearchPage = () => {
    return (
        <main className='flex min-h-screen w-full'>
            <Sidebar />
            <div className='flex items-center justify-center w-full'>
                <h1 className='text-2xl lg:text-3xl font-semibold'>Search Page</h1>
            </div>
        </main>
    )
}

export default SearchPage