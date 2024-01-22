"use client"
import Sidebar from "@/components/commons/Sidebar";
import FeaturedQuizzes from "@/components/homepage/FeaturedQuizzes";
import MyQuizzes from "@/components/homepage/MyQuizzes";
import QuizCategories from "@/components/homepage/QuizCategories";
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
        <QuizCategories />
        <MyQuizzes />
      </div>
    </main >
  );
}
