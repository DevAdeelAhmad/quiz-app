"use client";
import { getQuizSubmissionsByUserId } from "@/lib/getQuizSubmissions";
import {
  QuizSubmissionWithQuizAndCategory,
  QuizWithCategory
} from "@/lib/interfaces";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import SingleSubmittionCard from "../profile/SingleSubmissionCard";
import SkeletonCard from "../search/SkeletonCard";
import { Button } from "../ui/button";

const ResultCards = () => {
  const { user } = useClerk();
  const [myQuizzes, setMyQuizzes] = useState<QuizWithCategory[]>([]);
  const [mySubmittions, setMySubmittions] = useState<
    QuizSubmissionWithQuizAndCategory[]
  >([]);
  const [allQuizzes, setAllQuizzes] = useState<QuizWithCategory[]>([]);
  const [categories, setCategories] = useState([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchSubmittions = async (userId: string) => {
      const submittions = await getQuizSubmissionsByUserId(userId);
      if (submittions) {
        const submittionsWithQuizzes = submittions.map((submittion) => {
          const quiz = allQuizzes.find(
            (quiz) => quiz.quizId === submittion.quizId
          );
          return {
            ...submittion,
            ...quiz,
          };
        });
        //@ts-ignore
        setMySubmittions(submittionsWithQuizzes);
      }
    };

    user && fetchSubmittions(user.id);
  }, [user, allQuizzes]);
  return (
    <>
      {isMounted ? (
        mySubmittions.length > 0 ? (
          <div className="m-5 flex-1">
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 md:w-full">
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl md:pl-56 font-semibold text-center">
                  My Quizzes Results
                </h1>
              </div>
              <Link href="/search">
                <Button className="bg-[#ee0022] text-white font-semibold rounded-3xl hover:bg-[#ee0022]/60">
                  Explore More Quizzes{" "}
                  <GrFormNextLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center p-2 gap-5 py-5">
              {mySubmittions.map((submittion, index) => (
                <SingleSubmittionCard
                  key={index}
                  quizId={submittion.quizId}
                  title={submittion.quizTitle}
                  image={submittion.categoryImage}
                  difficulty={submittion.quizDifficulty}
                  duration={submittion.quizDuration}
                  //@ts-ignore
                  totalScore={submittion.totalScore}
                  //@ts-ignore
                  obtainedScore={submittion.obtainedScore}
                />
              ))}
            </div>
          </div>
        ) : (
          <main className="flex items-center justify-center min-h-screen w-full">
            <h1 className="text-2xl lg:text-3xl text-dark dark:text-main font-semibold text-center">
              There is no any quiz submissions!
            </h1>
          </main>
        )
      ) : (
        <div className="flex flex-col mt-6 gap-4 mx-3">
          <h1 className="text-2xl lg:text-3xl text-dark dark:text-main font-semibold text-center">
            Submissions
          </h1>
          <div className="flex gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      )}
    </>
  );
};

export default ResultCards;
