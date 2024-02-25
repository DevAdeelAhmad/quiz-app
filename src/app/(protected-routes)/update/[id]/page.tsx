"use client";
import QuizQuestionUpdate from "@/components/profile/QuizQuestionUpdate";
import QuizUpdateForm from "@/components/profile/QuizUpdationForm";
import { useToast } from "@/components/ui/use-toast";
import { getQuizById } from "@/lib/getQuizById";
import { Quiz } from "@/lib/interfaces";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import QuizUpdationComplete from "@/components/profile/QuizUpdationComplete";
import Sidebar from "@/components/commons/Sidebar";

const UpdatePage = ({ params }: { params: { id: string } }) => {
  const toast = useToast();
  const { user } = useClerk();
  const [data, setData] = useState<Quiz>();
  const [step, setStep] = useState<number>(1);
  const [quizCreationFormData, setQuizCreationFormData] = useState<any>({});
  const [questionData, setQuestionData] = useState<any>({});
  const [quizId, setQuizId] = useState<string>("");

  const handleContinue = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    const getData = async () => {
      const quizData = await getQuizById(params.id);
      setData(quizData);
      console.log(quizData);
    };

    getData();
  }, [params.id]);

  const handleQuizQuestionsSubmit = async (questions: any) => {
    setQuestionData(questions);

    const mergedData = {
      quizId: params.id,
      quizTitle: quizCreationFormData.quizTitle,
      quizDescription: quizCreationFormData.quizDescription,
      quizCategory: quizCreationFormData.selectedCategory,
      quizSubCategory: quizCreationFormData.subCategory,
      quizDifficulty: quizCreationFormData.selectedDifficulty,
      quizDuration: parseInt(quizCreationFormData.duration, 10),
      quizVisibility: quizCreationFormData.visibility,
      ...(quizCreationFormData.visibility === "Public" && {
        quizTags: quizCreationFormData.tags,
      }),
      ...(quizCreationFormData.visibility === "Private" && {
        accessEmails: quizCreationFormData.accessEmails,
      }),
      quizQuestions: questions,
      quizRating: 5,
      userId: data?.userId,
    };

    try {
      await updateDoc(doc(getFirestore(), "quizzes", params.id), mergedData);
      console.log("Quiz Data updated in Firestore:", mergedData);
      handleContinue();
    } catch (error) {
      console.error("Error updating Quiz Data in Firestore:", error);
    }
  };
  if (!data) {
    return (
      <main className="min-h-screen w-full items-center justify-center flex">
        <Loader2 className="animate-spin w-10 h-10" />
      </main>
    );
  }

  return (
    <main className="flex gap-4 items-center min-h-screen w-full justify-center">
      <Sidebar />
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="mx-auto text-3xl font-semibold py-5">Quiz Updation</h1>
        <div className="py-5 w-full flex items-center justify-center">
          {step === 1 && (
            <>
              <QuizUpdateForm
                existingQuizData={data}
                handleContinue={handleContinue}
                setQuizCreationFormData={setQuizCreationFormData}
              />
            </>
          )}
          {step === 2 && (
            <QuizQuestionUpdate
              existingQuizData={data?.quizQuestions}
              onSubmit={handleQuizQuestionsSubmit}
            />
          )}
          {step === 3 && <QuizUpdationComplete />}
        </div>
      </div>
    </main>
  );
};

export default UpdatePage;
