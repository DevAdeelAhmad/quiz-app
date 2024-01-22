import Image from 'next/image'
import React from 'react'
import SingleMyQuiz from './SingleMyQuiz'
import { Button } from '../ui/button'

const data = [
    {
        creatorName: "John Doe",
        quizName: "HTML Basics 1",
        percentage: 25,
        quizImageUrl: "/assets/quiz-img-temp.jpg",
        isFavorite: true
    },
    {
        creatorName: "John Doe",
        quizName: "HTML Basics 2",
        percentage: 50,
        quizImageUrl: "/assets/quiz-img-temp.jpg",
        isFavorite: false
    },
    {
        creatorName: "John Doe",
        quizName: "HTML Basics 3",
        percentage: 75,
        quizImageUrl: "/assets/quiz-img-temp.jpg",
        isFavorite: true
    }
]

const MyQuizzes = () => {
    return (
        <section className='flex flex-col gap-10 py-5 items-center'>
            <h1 className='text-3xl font-semibold'>My Quizzes</h1>
            <div className="flex gap-5 flex-wrap items-center justify-center w-full px-2">
                {data.map((quiz, index) => (
                    <SingleMyQuiz key={index} creatorName={quiz.creatorName} quizName={quiz.quizName}
                        percentage={quiz.percentage} isFavorite={quiz.isFavorite} quizImageUrl={quiz.quizImageUrl} />
                ))}
            </div>
            <Button className='bg-[#ee0022] hover:bg-[#ee0022]/60 text-white font-semibold text-xl px-10 rounded-3xl'>View All</Button>
        </section>
    )
}

export default MyQuizzes