"use client"
import React from 'react'
import { UserAuth } from '@/context/AuthContext'
const LoginPage = () => {
    const { user, googleSignIn, logOut } = UserAuth();
    const handleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-full text-center gap-10'>
            <span className='p-3 bg-green-400 rounded-xl' onClick={handleSignIn}>Login With Google</span>
            <span className='p-3 bg-red-400 rounded-xl'>Logout</span>
        </div>
    )
}

export default LoginPage