"use client"
import Sidebar from "@/components/commons/Sidebar";
import FeaturedQuizzes from "@/components/homepage/FeaturedQuizzes";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
export default function Home() {
  const { user } = UserAuth()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setLoading(false);
    }
    checkAuthentication();
  }, [user])

  return (
    <main className="min-h-screen w-full flex">
      <Sidebar />
      <div className="flex flex-col min-h-screen w-full items-center">
        <FeaturedQuizzes />
        <div className="min-h-screen w-full"></div>
      </div>
    </main >
  );
}

{/* {loading ? null : !user ? (
    <Link href='/signin'>You{"'"}re not Signed In. Go to Sign In Page</Link>
  ) : (
    <div className="flex flex-col gap-2 items-center justify-center">
      <span>Welcome Back</span>
      <span>You{"'"}re signed in with email : {user.email}</span>
    </div>
  )} */}