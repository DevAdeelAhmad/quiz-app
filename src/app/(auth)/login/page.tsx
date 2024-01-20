"use client"
import React, { useEffect, useState } from 'react'
import { UserAuth } from '@/context/AuthContext'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const LoginPage = () => {
    const { user, googleSignIn, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);
    const handleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }
    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }
    let style = "p-3 bg-green-400 rounded-xl cursor-pointer font-semibold"
    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 500))
            setLoading(false);
        }
        checkAuthentication()
    }, [user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-full text-center gap-10'>
            {loading ? <AiOutlineLoading3Quarters className='animate-spin' size={30} /> : !user ? (<div className='flex gap-5'>
                <span className={style} onClick={handleSignIn}>Login With Google</span>
                <span className={style} onClick={handleSignIn}>SignUp With Google</span>
            </div>) : (
                <div className='flex gap-5 items-center'>
                    <span className={style}>Welcome {user.displayName}</span>
                    <span className={style} onClick={handleSignOut}>Sign Out</span>
                </div>
            )}
        </div>
    )
}

export default LoginPage