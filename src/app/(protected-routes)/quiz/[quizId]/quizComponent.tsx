"use client";
import { useToast } from "@/components/ui/use-toast";
import { useClerk } from "@clerk/nextjs";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import Sidebar from "@/components/commons/Sidebar";
import QuestionCard from "@/components/quiz/questionCard";
import ResultCard from "@/components/quiz/resultCard";
import ReviewCard from "@/components/quiz/reviewCard";

const calculateScore = (
  questions: any[],
  selectedAnswers: { [x: string]: any; hasOwnProperty?: any }
) => {
  let obtScore = 0;
  questions.forEach((question) => {
    const questionId = question.id;
    if (
      selectedAnswers.hasOwnProperty(questionId) &&
      question.correctOptions.includes(selectedAnswers[questionId])
    ) {
      obtScore++;
    }
  });
  return obtScore;
};

const getMessage = (totalScore: number, obtainedScore: number) => {
  const percentage = obtainedScore / totalScore;
  if (percentage >= 0.5) {
    return "Congratulations, You passed!";
  } else {
    return "Sorry, You could not pass.";
  }
};

export default function QuizComponent(props: { quiz: any }) {
  const quiz = props?.quiz;
  const { user } = useClerk();
  const { toast } = useToast();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [obtainedMarks, setObtainedMarks] = useState(0);

  const handleOptionChange = (e: any) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [e.target.name]: e.target.value,
    }));
  };
  const handleConfirm = () => {
    setIsConfirm(!isConfirm);
  };

  const handleSubmit = async () => {
    const obtainedMarks = calculateScore(
      quiz?.quizQuestions || [],
      selectedAnswers
    );
    setObtainedMarks(obtainedMarks);
    const submittion = {
      userId: user?.id,
      userEmail: user?.emailAddresses[0].toString(),
      quizId: quiz?.quizId,
      totalScore: quiz?.quizQuestions?.length || 0,
      obtainedScore: obtainedMarks,
      selectedAnswers: selectedAnswers,
      quizCategory: quiz.quizCategory,
      message: getMessage(quiz?.quizQuestions?.length || 0, obtainedMarks),
      quizTitle: quiz?.quizTitle,
    };

    try {
      const firestore = getFirestore();
      const quizSubmissionsCollection = collection(
        firestore,
        "quizSubmissions"
      );
      const docRef = doc(quizSubmissionsCollection, user?.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          submissions: arrayUnion(submittion),
        });
      } else {
        await setDoc(docRef, { userId: user?.id, submissions: [submittion] });
      }
      toast({
        title: "Success",
        description: "Quiz submitted successfully!",
        variant: "success",
        duration: 3000,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error adding quiz data to Firestore:", error);
    }
  };
  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div className="border flex flex-col justify-center items-center w-full">
        <h1 className="text-4xl font-medium m-20 uppercase">
          {quiz?.quizTitle}
        </h1>
        {!isConfirm && (
          <QuestionCard
            questions={quiz?.quizQuestions}
            selectedAnswers={selectedAnswers}
            handleOptionChange={handleOptionChange}
            handleConfirm={handleConfirm}
          />
        )}
        {isConfirm && !isSubmitted && (
          <ReviewCard
            questions={quiz?.quizQuestions}
            selectedAnswers={selectedAnswers}
            handleSubmit={handleSubmit}
          />
        )}
        {isSubmitted && (
          <ResultCard
            quiz={quiz}
            totalScore={quiz?.quizQuestions?.length}
            obtainedScore={obtainedMarks}
            message={getMessage(quiz?.quizQuestions?.length, obtainedMarks)}
          />
        )}
      </div>
    </main>
  );
}
