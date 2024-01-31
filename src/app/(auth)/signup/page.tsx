"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LuAlertTriangle } from "react-icons/lu";
import { useToast } from '@/components/ui/use-toast';
const SignUpPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { user, googleSignIn } = UserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSignUpWithGoogle = async () => {
        try {
            await googleSignIn();
            await new Promise<void>((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        unsubscribe();
                        resolve();
                    }
                });
            });
        } catch (error) {
            console.log(error);
            setErrorMessage('Error signing up with Google. Please try again.');
        }
    };

    const handleSignUpWithEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: displayName });
            toast({
                title: "Success",
                description: "Sign up Success!",
                variant: "success"
            })
        } catch (error: any) {
            if (error.code === 'auth/invalid-email') {
                setErrorMessage('Invalid email format.');
            } else if (error.code === 'auth/weak-password') {
                setErrorMessage('Weak password.');
            } else if (error.code === 'auth/email-already-in-use') {
                setErrorMessage('Email address is already in use.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorMessage(null);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorMessage(null);
    };
    const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayName(e.target.value);
        setErrorMessage(null);
    };
    return (
        <main className='flex items-center justify-between min-h-screen w-full text-center'>
            <Link href='/' className='hidden lg:flex flex-col gap-2 items-center justify-center absolute top-10 right-10'>
                <Image src='/assets/logo-transparent.png' width={100} height={100} alt='Logo' />
                <span className='font-semibold'>Find and Take</span>
            </Link>
            {/* Left */}
            <div className="flex-1 hidden lg:flex flex-col items-center justify-center min-h-screen gap-10 bg-[#ee0022] px-2">
                <Image src="/assets/auth/auth-illustration.png" width={400} height={400} alt='Illustration' />
                <h1 className='text-white font-bold text-5xl'>Welcome to Quizzy!</h1>
                <span className='text-white'>Easy to create and take quizzes online</span>
            </div>
            {/* Right */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-screen gap-10 px-2">
                <Image className='flex lg:hidden' src='/assets/logo-transparent.png' width={100} height={100} alt='Logo' />
                <h1 className='font-bold text-4xl'>Sign Up</h1>
                <div className="flex items-center justify-between gap-5 px-4 py-2 rounded-full border-gray-700 border cursor-pointer hover:shadow-md"
                    onClick={handleSignUpWithGoogle}>
                    <Image src='/assets/auth/google-icon.png' alt='Google Icon' width={30} height={30} />
                    <span className='font-semibold'>Sign Up With Google</span>
                </div>
                <span className='font-semibold text-xl'>or</span>
                <form className='flex flex-col gap-5' onSubmit={handleSignUpWithEmail}>
                    <Input className='border-gray-800 w-[300px] rounded-full' type='text' required placeholder='Enter your Display Name' value={displayName} onChange={handleDisplayNameChange} />
                    <Input className='border-gray-800 w-[300px] rounded-full' type='email' required placeholder='Enter your Email Here' value={email} onChange={handleEmailChange} />
                    <Input className='border-gray-800 w-[300px] rounded-full' type='password' required placeholder='Enter your Password Here' value={password} onChange={handlePasswordChange} />
                    <div className='flex items-center justify-center'>
                        {errorMessage && (
                            <div className="flex items-center gap-2 text-red-600">
                                <LuAlertTriangle color='red' size={25} />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                    </div>
                    <Button type="submit">Sign Up</Button>
                    <div className="flex flex-col items-center text-center font-semibold gap-3">
                        <Link className='hover:underline hover:text-blue-600 transition-colors duration-200' href='/signin'>Already have an account?</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default SignUpPage