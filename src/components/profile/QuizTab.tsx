"use client";
import SingleQuiz from "@/components/search/SingleQuiz";
import { UserAuth } from "@/context/AuthContext";
import getCategories from "@/lib/getCategories";
import { getFeaturedQuizzes } from "@/lib/getFeaturedQuizzes";
import { getQuizzes } from "@/lib/getPublicQuizzes";
import { getQuizSubmittionsByUserId } from "@/lib/getQuizSubmittions";
import {
  Quiz,
  QuizSubmissionWithQuizAndCategory,
  QuizWithCategory,
} from "@/lib/interfaces";
import { useEffect, useState } from "react";
import SingleSubmittionCard from "./SingleSubmittionCard";

const QuizTab = () => {
  const { user } = UserAuth();
  const [myQuizzes, setMyQuizzes] = useState<QuizWithCategory[]>([]);
  const [mySubmittions, setMySubmittions] = useState<
    QuizSubmissionWithQuizAndCategory[]
  >([]);
  const [allQuizes, setAllQuizzes] = useState<QuizWithCategory[]>([]);

  useEffect(() => {
    const fetchQuizzesAndCategories = async () => {
      let fetchedQuizzes: Quiz[] = await getQuizzes();
      let fetchFeaturedQuizzes: Quiz[] = await getFeaturedQuizzes();
      let allQuizes: Quiz[] = [...fetchFeaturedQuizzes, ...fetchedQuizzes];
      const categoriesData = await getCategories();
      const quizzesWithCategory: QuizWithCategory[] = allQuizes.map((quiz) => {
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
          quiz?.accessEmails?.includes(user?.email)
        );
        setMyQuizzes(filteredQuizzes);
      }
    };
    fetchQuizzesAndCategories();
  }, [user]);

  useEffect(() => {
    const fetchSubmitions = async (userId: string) => {
      const submitions = await getQuizSubmittionsByUserId(userId);
      if (submitions) {
        const submittionsWithQuizes = submitions.map((submition) => {
          const quiz = allQuizes.find(
            (quiz) => quiz.quizId === submition.quizId
          );
          return {
            ...submition,
            ...quiz,
          };
        });
        setMySubmittions(submittionsWithQuizes);
      }
    };

    fetchSubmitions(user.uid);
  }, [allQuizes, user]);

  return (
    <>
      {myQuizzes && (
        <div className="m-5">
          <h1 className="text-xl lg:text-2xl font-semibold text-center m-5 underline">
            My Quizes
          </h1>
          <div className="flex flex-wrap items-center justify-center p-2 gap-5">
            {myQuizzes.map((quiz, index) => (
              <SingleQuiz
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
      )}

      {mySubmittions && (
        <div className="m-5">
          <h1 className="text-xl lg:text-2xl font-semibold text-center m-5 underline">
            My Submittions
          </h1>
          <div className="flex flex-wrap items-center justify-center p-2 gap-5">
            {mySubmittions.map((submittion, index) => (
              <SingleSubmittionCard
                key={index}
                quizId={submittion.quizId}
                title={submittion.quizTitle}
                image={submittion.categoryImage}
                category={submittion.quizCategory}
                subCategory={submittion.quizSubCategory}
                difficulty={submittion.quizDifficulty}
                duration={submittion.quizDuration}
                totalScore={submittion.totalScore}
                obtainedScore={submittion.obtainedScore}
                type={submittion.userId ?? ""}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default QuizTab;
