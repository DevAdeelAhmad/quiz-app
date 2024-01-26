"use client"
import React, { useState } from 'react';
import Sidebar from '@/components/commons/Sidebar';
import QuizCreationForm from '@/components/create/QuizCreationForm';
import QuizQuestions from '@/components/create/QuizQuestion';
import QuizCreationComplete from '@/components/create/QuizCreationComplete';
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
const QuizCreationPage: React.FC = () => {
    const { user } = UserAuth();
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [quizCreationFormData, setQuizCreationFormData] = useState<any>({});
    const [questionData, setQuestionData] = useState<any>({});
    const handleContinue = () => {
        setStep(step + 1);
    };
    const handleQuizFormSubmit = (formData: any) => {
        setQuizCreationFormData(formData);
        console.log('Quiz Creation Form Data:', formData);
        handleContinue();
    };
    const handleQuizQuestionsSubmit = (questions: any) => {
        setQuestionData(questions);
        const quizId = uuidv4();
        const mergedData = {
            quizId,
            quizTitle: quizCreationFormData.quizTitle,
            quizDescription: quizCreationFormData.quizDescription,
            quizCategory: quizCreationFormData.selectedCategory,
            quizSubCategory: quizCreationFormData.subCategory,
            quizDifficulty: quizCreationFormData.selectedDifficulty,
            quizDuration: quizCreationFormData.duration,
            quizVisibility: quizCreationFormData.visibility,
            quizTags: quizCreationFormData.tags,
            quizQuestions: questions,
        };
        const quizzesRef = ref(getDatabase(), 'quizzes');
        set(quizzesRef, [mergedData])
            .then(() => {
                console.log('Quiz Data added to the database:', mergedData);
                handleContinue();
            })
            .catch((error) => {
                console.error('Error adding Quiz Data to the database:', error);
            });
    };
    const handleQuizQuestionsBack = () => {
        setStep(1);
    };
    if (!user) {
        return router.push('/signin')
    }
    return (
        <main className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex flex-col items-center w-full py-10 gap-5 p-4">
                {step === 1 && (
                    <>
                        <h1 className='text-2xl lg:text-3xl font-semibold'>Create A Quiz</h1>
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
                {step === 3 && (
                    <QuizCreationComplete />
                )}
            </div>
        </main>
    );
};

export default QuizCreationPage;