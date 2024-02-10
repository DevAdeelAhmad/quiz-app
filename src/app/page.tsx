"use client";
import Sidebar from "@/components/commons/Sidebar";
import FeaturedQuizzes from "@/components/homepage/FeaturedQuizzes";
import MyQuizzes from "@/components/homepage/MyQuizzes";
import QuizCategories from "@/components/homepage/QuizCategories";
import { UserAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../components/lamp";
export default function Home() {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <main className="min-h-screen w-full flex">
      <Sidebar />
      <div className="flex flex-col min-h-screen w-full items-center lg:ml-[-65px]">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Quizzy
          </motion.h1>
        </LampContainer>
        <FeaturedQuizzes />
        <QuizCategories />
        <MyQuizzes />
      </div>
    </main>
  );
}
