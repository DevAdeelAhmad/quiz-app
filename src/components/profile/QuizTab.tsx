"use client";
import { getQuizSubmissionsByUserId } from "@/lib/getQuizSubmissions";
import {
  Quiz,
  QuizSubmissionWithQuizAndCategory,
  QuizWithCategory,
} from "@/lib/interfaces";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import SkeletonCard from "../search/SkeletonCard";
import NewSingleQuiz from "./NewSingleQuiz";
import SingleSubmissionCard from "./SingleSubmissionCard"; // Corrected spelling here
import { getQuizzes } from "@/lib/getPublicQuizzes";
import { getFeaturedQuizzes } from "@/lib/getFeaturedQuizzes";
import getCategories from "@/lib/getCategories";

const QuizTab = () => {
  const { user } = useClerk();
  const [myQuizzes, setMyQuizzes] = useState<QuizWithCategory[]>([]);
  const [mySubmissions, setMySubmissions] = useState<
    QuizSubmissionWithQuizAndCategory[]
  >([]);
  const [allQuizzes, setAllQuizzes] = useState<QuizWithCategory[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchQuizzesAndCategories = async () => {
      let fetchedQuizzes: Quiz[] = await getQuizzes();
      let fetchFeaturedQuizzes: Quiz[] = await getFeaturedQuizzes();
      let allQuizzes: Quiz[] = [...fetchFeaturedQuizzes, ...fetchedQuizzes];
      const categoriesData = await getCategories();
      const quizzesWithCategory: QuizWithCategory[] = allQuizzes.map((quiz) => {
        const category = categoriesData.find(
          (cat) => cat.name === quiz.quizCategory
        );
        return {
          ...quiz,
          categoryImage: category?.imageUrl || "",
        };
      });
      setAllQuizzes(quizzesWithCategory);
      if (user) {
        const filteredQuizzes = quizzesWithCategory.filter((quiz) =>
          quiz?.accessEmails?.includes(user.emailAddresses[0].toString())
        );
        setMyQuizzes(filteredQuizzes);
      }
    };
    fetchQuizzesAndCategories();
  }, [user]);

  useEffect(() => {
    const fetchSubmissions = async (userId: string) => {
      const submissions = await getQuizSubmissionsByUserId(userId);
      console.log(submissions);
      // if (submissions) {
      //   const submissionsWithQuizzes = submissions.map((submission: any) => {
      //     const quiz = allQuizzes.find((q) => q.quizId === submission.quizId);
      //     return {
      //       ...submission,
      //       ...quiz,
      //     };
      //   });
      //   //@ts-ignore
      //   setMySubmissions(submissionsWithQuizzes);
      // }
    };

    user && fetchSubmissions(user.id);
  }, [allQuizzes, user]);

  return (
    <>
      {isMounted ? (
        myQuizzes && Array.isArray(myQuizzes) && myQuizzes.length > 0 ? (
          <div className="m-5">
            <h1 className="text-xl lg:text-2xl font-semibold text-center m-5">
              My Quizzes
            </h1>
            <div className="flex flex-wrap items-center justify-center p-2 gap-5">
              {myQuizzes.map((quiz, index) => (
                <NewSingleQuiz
                  key={index}
                  quizId={quiz.quizId}
                  title={quiz.quizTitle}
                  image={quiz.categoryImage}
                  category={quiz.quizCategory}
                  subCategory={quiz.quizSubCategory}
                  difficulty={quiz.quizDifficulty}
                  duration={quiz.quizDuration}
                  rating={quiz.quizRating}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-6 gap-x-4 mx-auto">
            <h1 className="text-xl lg:text-2xl font-semibold text-center m-5">
              My Quizzes
            </h1>
            <div className="flex w-full flex-wrap items-center">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        )
      ) : null}

      {isMounted ? (
        mySubmissions &&
        Array.isArray(mySubmissions) &&
        mySubmissions.length > 0 ? (
          <div className="m-5">
            <h1 className="text-xl lg:text-2xl font-semibold text-center m-5">
              My Submissions
            </h1>
            <div className="flex flex-wrap items-center justify-center p-2 gap-5">
              {mySubmissions.map((submission, index) => (
                <SingleSubmissionCard
                  key={index}
                  quizId={submission.quizId}
                  title={submission.quizTitle}
                  image={submission.categoryImage}
                  category={submission.quizCategory}
                  subCategory={submission.quizSubCategory}
                  difficulty={submission.quizDifficulty}
                  duration={submission.quizDuration}
                  //@ts-ignore
                  totalScore={submission.totalScore}
                  //@ts-ignore
                  obtainedScore={submission.obtainedScore}
                  type={submission.userId ?? ""}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-6 gap-x-4 mx-auto">
            <h1 className="text-xl lg:text-2xl font-semibold text-center m-5">
              My Submissions
            </h1>
            <div className="flex w-full flex-wrap items-center">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        )
      ) : null}
    </>
  );
};

export default QuizTab;
