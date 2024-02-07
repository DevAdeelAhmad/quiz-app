"use client"
import { UserAuth } from '@/context/AuthContext';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/commons/Sidebar';
import QuestionCard from '@/components/quiz/questionCard';
import ReviewCard from '@/components/quiz/reviewCard';
import ResultCard from '@/components/quiz/resultCard';
import { getDatabase, ref, set, get } from "firebase/database";
import { useToast } from '@/components/ui/use-toast';


const calculateScore = (questions, selectedAnswers) => {
    let obtScore = 0;
    questions.forEach((question) => {
      const questionId = question.id;
      if (selectedAnswers.hasOwnProperty(questionId) &&
      question.correctOptions.includes( selectedAnswers[questionId]) ) {
        obtScore++;
      }
    });
    return obtScore;
};

const getMessage=(totalScore,obtainedScore)=>{
    const percentage=obtainedScore/totalScore
    if(percentage>=0.5){
      return "Congratulations, You are passed"
    }else{
      return "Sorry, You could not pass."
    }
}

export default function QuizComponent(props:any) {
    const quiz=props?.quiz
    const { user } = UserAuth();
    

        if(quiz.quizVisibility==="Private"){
            const allowedUsers=quiz?.accessEmails
            if(user && !allowedUsers.includes(user?.email))
            {
                console.log("unauthorized access");
                notFound()
            }else{
                console.log("access granted")
            }     
        }
    const { toast } = useToast();
    const [selectedAnswers,setSelectedAnswers]=useState({})
    const [isConfirm,setIsConfirm]=useState(false)
    const [isSubmitted,setIsSubmitted]=useState(false)
    const [obtainedMarks,setObtainedMarks]=useState(0)
    
    const handleOptionChange = (e:any) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
          ...prevSelectedAnswers,
          [e.target.name]: e.target.value,
        }));
    };
    const handleConfirm=()=>{
        setIsConfirm(!isConfirm)
    }

    const handleSubmit=async()=>{
        const obtainedMarks=calculateScore(quiz?.quizQuestions,selectedAnswers) 
        setObtainedMarks(obtainedMarks)
        const submittion={
            userId: user?.uid,
            userEmail: user?.email,
            quizId: quiz?.quizId,
            totalScore: quiz?.quizQuestions?.length,
            obtainedScore: obtainedMarks,
            selectedAnswers:selectedAnswers,
            message: getMessage(quiz?.quizQuestions?.length,obtainedMarks)
        }

        const quizSubmittionsRef = ref(getDatabase(), 'quizSubmittions');
        const existingSubmittions = (await get(quizSubmittionsRef)).val() || [];
        const updatedQuizzes = [...existingSubmittions, submittion];

        set(quizSubmittionsRef, updatedQuizzes)
            .then(() => {
                console.log('Quiz submittion Data added to the database:', submittion);
                toast({
                    title: "Success",
                    description: "Quiz submitted successfully!",
                    variant: "success",
                    duration: 3000
                })
               
            })
            .catch((error) => {
                console.error('Error adding Quiz Data to the database:', error);
            });

        setIsSubmitted(true)
        
    }


    return (
        <main className="flex min-h-screen w-full">
        <Sidebar />
        <div className="border border-red-700 w-full">
            <h1 className='text-4xl font-medium m-20 uppercase'>{quiz?.quizTitle}</h1>
            {!isConfirm &&<QuestionCard questions={quiz?.quizQuestions} selectedAnswers={selectedAnswers} handleOptionChange={handleOptionChange} handleConfirm={handleConfirm}/>}
            {isConfirm && !isSubmitted && <ReviewCard questions={quiz?.quizQuestions} selectedAnswers={selectedAnswers} handleSubmit={handleSubmit}/>}
            {isSubmitted&& <ResultCard quiz={quiz} totalScore={quiz?.quizQuestions?.length} obtainedScore={obtainedMarks} message={getMessage(quiz?.quizQuestions?.length,obtainedMarks)}/>}
        </div>
    </main>
    )
};