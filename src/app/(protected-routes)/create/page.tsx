"use client";
import Sidebar from "@/components/commons/Sidebar";
import QuizCreationComplete from "@/components/create/QuizCreationComplete";
import QuizCreationForm from "@/components/create/QuizCreationForm";
import QuizQuestions from "@/components/create/QuizQuestion";
import { useToast } from "@/components/ui/use-toast";
import { useClerk } from "@clerk/nextjs";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const QuizCreationPage = () => {
  const { toast } = useToast();
  const { user } = useClerk();
  const [step, setStep] = useState<number>(1);
  const [quizCreationFormData, setQuizCreationFormData] = useState<any>({});
  const [questionData, setQuestionData] = useState<any>({});
  const [quizId, setQuizId] = useState<string>("");
  const handleContinue = () => {
    setStep(step + 1);
  };

  const handleQuizFormSubmit = (formData: any) => {
    setQuizCreationFormData(formData);
    console.log("Quiz Creation Form Data:", formData);
    handleContinue();
  };

  const handleQuizQuestionsSubmit = async (questions: any) => {
    setQuestionData(questions);
    const quizId = uuidv4();
    setQuizId(quizId);

    const mergedData = {
      quizId,
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
      userId: user?.id,
    };

    try {
      const quizDocRef = doc(getFirestore(), "quizzes", quizId);
      await setDoc(quizDocRef, mergedData);
      console.log("Quiz Data added to Firestore:", mergedData);
      toast({
        title: "Success",
        description: "Quiz created successfully!",
        variant: "success",
        duration: 3000,
      });
      handleContinue();
    } catch (error) {
      console.error("Error adding Quiz Data to Firestore:", error);
    }
  };

  const handleQuizQuestionsBack = () => {
    setStep(1);
  };

  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col items-center w-full py-10 gap-5 p-4">
        {step === 1 && (
          <>
            <h1 className="text-2xl lg:text-3xl font-semibold">
              Create A Quiz
            </h1>
            <QuizCreationForm
              onContinue={handleQuizFormSubmit}
              initialQuestionData={quizCreationFormData}
            />
          </>
        )}
        {step === 2 && (
          <QuizQuestions
            onSubmit={handleQuizQuestionsSubmit}
            onBack={handleQuizQuestionsBack}
          />
        )}
        {step === 3 && <QuizCreationComplete quizId={quizId} />}
      </div>
    </main>
  );
};

export default QuizCreationPage;
