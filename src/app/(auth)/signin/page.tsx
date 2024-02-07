"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { LuAlertTriangle } from "react-icons/lu";
import { useToast } from "@/components/ui/use-toast"
const SignInPage = () => {
    const { toast } = useToast()
    const router = useRouter();
    const { user, googleSignIn } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [loading, setLoading] = useState(false); // New loading state

    const handleSignInWithGoogle = async () => {
        try {
            setLoading(true);
            await googleSignIn();
            await new Promise<void>((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        unsubscribe();
                        resolve();
                    }
                });
            });
            router.push("/")
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorMessage('Error signing in with Google. Please try again.');
        }
    };

    const handleSignInWithEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
            toast({
                title: 'Success',
                description: 'Sign in Success!',
                variant: 'success',
            });
        } catch (error: any) {
            setLoading(false);
            if (error.code === 'auth/invalid-credential') {
                setErrorMessage('Wrong email or password entered.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
        }
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorMessage(null);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
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
                <h1 className='text-white font-bold text-5xl'>Welcome Back to Quizzy!</h1>
                <span className='text-white'>Easy to create and take quizzes online</span>
            </div>
            {/* Right */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-screen gap-10 px-2">
                <Image className='flex lg:hidden' src='/assets/logo-transparent.png' width={100} height={100} alt='Logo' />
                <h1 className='font-bold text-4xl'>Sign In</h1>
                <div className="flex items-center justify-between gap-5 px-4 py-2 rounded-full border-gray-700 border cursor-pointer hover:shadow-md"
                    onClick={handleSignInWithGoogle}>
                    <Image src='/assets/auth/google-icon.png' alt='Google Icon' width={30} height={30} />
                    <span className='font-semibold'>Sign In With Google</span>
                </div>
                <span className='font-semibold text-xl'>or</span>
                <form className='flex flex-col gap-5' onSubmit={handleSignInWithEmail}>
                    <Input className='border-gray-800 w-[300px] rounded-full' type='email' required placeholder='Enter your Email Here' value={email} onChange={handleEmailChange} />
                    <Input className='border-gray-800 w-[300px] rounded-full' type='password' required placeholder='Enter your Password Here' value={password} onChange={handlePasswordChange} />
                    {errorMessage && (
                        <div className="flex items-center gap-2 text-red-600">
                            <LuAlertTriangle color='red' size={25} />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                    <Button type='submit' disabled={loading}> {/* Disable the button when loading */}
                        {loading ? (
                            <div className='w-6 h-6 border-2 border-blue-600 rounded-full border-solid animate-spin'></div>
                        ) : (
                            'Sign In'
                        )}
                    </Button>                    <div className="flex flex-col items-center text-center font-semibold gap-3">
                        <Link className='hover:underline hover:text-blue-600 transition-colors duration-200' href='/forgot-password'>Forgot Your Password?</Link>
                        <Link className='hover:underline hover:text-blue-600 transition-colors duration-200' href='/signup'>Don{"'"}t have an account?</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default SignInPage