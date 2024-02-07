import React, { useEffect, useState } from 'react';
import { getQuizzes } from '@/lib/getPublicQuizzes';
import {getQuizById} from "@/lib/getQuizById"
import { Quiz } from '@/lib/interfaces';
import QuizComponent from './quizComponent';

export default async function SingleQuizPage({ params }: {
    params: { quizId: string }
}) {
    
    const quiz= await getQuizById(params?.quizId)
   
    return (
       <QuizComponent quiz={quiz}/>
    )
};


export async function generateStaticParams() {
    const fetchedQuizzes: Quiz[] = await getQuizzes();
    const params=fetchedQuizzes.map((quiz)=>{
        return { quizId: quiz.quizId }
    })
    return params
  }