"use client"
import React, { useState } from 'react';
import Sidebar from '@/components/commons/Sidebar';
import QuizCreationForm from '@/components/create/QuizCreationForm';
import QuizQuestionsComponent from '@/components/create/QuizQuestion';
const QuizCreationPage: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [quizData, setQuizData] = useState<any>({});
    const [questionData, setQuestionData] = useState<any>({});
    const handleContinue = () => {
        setStep(step + 1);
    };
    const handleQuizFormSubmit = (formData: any) => {
        console.log('Form Data:', formData);
        setQuizData(formData);
        handleContinue();
    };
    const handleQuizQuestionsSubmit = (questions: any) => {
        setQuestionData(questions);
        setQuizData((prevData: any) => ({ ...prevData, questions }));
        console.log('Quiz Data:', quizData);
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
                        <h1 className='text-2xl lg:text-3xl font-semibold'>Create A Quiz</h1>
                        <QuizCreationForm
                            onContinue={handleQuizFormSubmit}
                            initialQuestionData={quizData}
                        />
                    </>
                )}
                {step === 2 && (
                    <QuizQuestionsComponent
                        onSubmit={handleQuizQuestionsSubmit}
                        onBack={handleQuizQuestionsBack}
                    />
                )}
            </div>
        </main>
    );
};

export default QuizCreationPage;
