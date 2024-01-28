"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { LuAlertTriangle } from "react-icons/lu";
import { UserAuth } from '@/context/AuthContext';

const ForgotPasswordPage = () => {
    const router = useRouter();
    const { user } = UserAuth()
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorMessage(null);
    }

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            router.push('/signin');
        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                setErrorMessage('User not found.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }
    if (user) {
        if (typeof window !== 'undefined') {
            router.push('/');
        }
        return null;
    }
    return (
        <main className='flex items-center justify-between min-h-screen w-full'>
            <Link href='/' className='hidden lg:flex flex-col gap-2 items-center justify-center absolute top-10 right-10'>
                <Image src='/assets/logo-transparent.png' width={100} height={100} alt='Logo' />
                <span className='font-semibold'>Find and Take</span>
            </Link>
            {/* Left */}
            <div className="flex-1 hidden lg:flex flex-col items-center justify-center min-h-screen gap-10 bg-[#ee0022]">
                <Image src="/assets/auth/auth-illustration.png" width={400} height={400} alt='Illustration' />
                <h1 className='text-white font-bold text-5xl'>Welcome to Quizify!</h1>
                <span className='text-white'>Easy to create and take quizzes online</span>
            </div>
            {/* Right */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-screen gap-10 px-2">
                <Image className='flex lg:hidden' src='/assets/logo-transparent.png' width={100} height={100} alt='Logo' />
                <h1 className='font-bold text-4xl text-center'>Forgot Your Password</h1>
                <span className='text-base md:text-lg italic text-center'>Password Recovery Link will be sent to the email</span>
                <form className='flex flex-col gap-5' onSubmit={handlePasswordReset}>
                    <Input className='border-gray-800 w-[300px] rounded-full' type='email' required placeholder='Enter your Email' value={email} onChange={handleEmailChange} />
                    {errorMessage && (
                        <div className="flex items-center gap-2 text-red-600">
                            <LuAlertTriangle color='red' size={25} />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                    <Button type="submit">Get Recovery Link</Button>
                </form>
            </div>
        </main>
    )
}

export default ForgotPasswordPage