import React, { useMemo, useEffect, useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  QuizWithCategory,
  QuizSubmissionWithQuizAndCategory,
} from "@/lib/interfaces";
import { getQuizzes } from "@/lib/getPublicQuizzes";
import getCategories from "@/lib/getCategories";
import { getQuizSubmittionsByUserId } from "@/lib/getQuizSubmittions";
import { UserAuth } from "@/context/AuthContext";
import { ArcElement, CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { getFeaturedQuizzes } from "@/lib/getFeaturedQuizzes";
Chart.register(CategoryScale);
Chart.register(ArcElement);

const QuizzesStats: React.FC = () => {
  const { user } = UserAuth();
  const [myQuizzes, setMyQuizzes] = useState<QuizWithCategory[]>([]);
  const [mySubmittions, setMySubmittions] = useState<
    QuizSubmissionWithQuizAndCategory[]
  >([]);
  const [allQuizzes, setAllQuizzes] = useState<QuizWithCategory[]>([]);

  useEffect(() => {
    const fetchQuizzesAndCategories = async () => {
      let fetchedQuizzes = await getQuizzes();
      let fetchFeaturedQuizzes = await getFeaturedQuizzes();
      let allQuizes = [...fetchFeaturedQuizzes, ...fetchedQuizzes];
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
          const quiz = allQuizzes.find((q) => q.quizId === submition.quizId);
          return {
            ...submition,
            ...quiz,
          };
        });
        setMySubmittions(submittionsWithQuizes);
      }
    };

    user && fetchSubmitions(user.uid);
  }, [allQuizzes, user]);

  const getTotalMarks = (quizzes: QuizSubmissionWithQuizAndCategory[]) => {
    return quizzes.reduce(
      (total, quiz) => total + (quiz.obtainedScore || 0),
      0
    );
  };

  const doughnutChartData = useMemo(() => {
    const unattemptedCount = myQuizzes.length - mySubmittions.length;
    const attemptedCount = mySubmittions.length;

    return {
      labels: ["Unattempted", "Attempted"],
      datasets: [
        {
          data: [unattemptedCount, attemptedCount],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };
  }, [myQuizzes, mySubmittions]);

  const barChartData = useMemo(() => {
    const categories = myQuizzes.map((quiz) => quiz.quizCategory);
    const uniqueCategories = Array.from(new Set(categories));
    const quizCountByCategory = uniqueCategories.map(
      (category) =>
        myQuizzes.filter((quiz) => quiz.quizCategory === category).length
    );

    return {
      labels: uniqueCategories,
      datasets: [
        {
          label: "Quiz Count by Category",
          data: quizCountByCategory,
          backgroundColor: "#4CAF50",
          borderColor: "#4CAF50",
          borderWidth: 1,
        },
      ],
    };
  }, [myQuizzes]);

  const doughnutOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const barOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Quiz Categories",
        },
      },
      y: {
        title: {
          display: true,
          text: "Quiz Count",
        },
      },
    },
  };

  return (
    <div className="m-5 flex-1">
      <h1 className="text-2xl font-bold text-center mb-10">
        Quizzes Statistics
      </h1>
      <div className="flex flex-row justify-center items-start gap-16">
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Accessible vs Unattempted Quizzes
          </h2>
          <div className="h-80 flex items-center justify-center">
            <Doughnut
              className="max-w-64 max-h-64"
              data={doughnutChartData}
              options={doughnutOptions}
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Quiz Count by Category</h2>
          <div className="flex h-80 items-center justify-center">
            <Bar
              className="max-w-64 max-h-64"
              data={barChartData}
              options={barOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzesStats;
