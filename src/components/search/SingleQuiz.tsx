import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SingleQuizProps {
    quizId: string;
    title: string;
    image: string;
    category: string;
    subCategory: string;
    difficulty: string;
    duration: number;
    rating: number;
}

const SingleQuiz: React.FC<SingleQuizProps> = ({ quizId, title, image, category, subCategory, difficulty, duration, rating }) => {
    return (
        <Link href={`/quiz/${quizId}`}>
            <div className='w-72 p-4 rounded-3xl border-2 border-dark/30 dark:border-main/50 shadow-xl hover:shadow-lg transform hover:scale-105 transition-transform duration-300'>
                <div className='relative w-full h-40 mb-4'>
                    <Image
                        src={image}
                        layout='fill'
                        objectFit='cover'
                        alt={`${category} Category Image`}
                        className='rounded-t-xl'
                    />
                </div>
                <p className='text-xl font-extrabold mb-2 text-dark dark:text-main'>{title}</p>
                <p className='text-sm text-dark dark:text-main mb-2'>Category: {category}</p>
                <p className='text-sm text-dark dark:text-main mb-2'>Sub Category: {subCategory}</p>
                <p className='text-sm text-dark dark:text-main mb-2'>Difficulty: {difficulty}</p>
                <p className='text-sm text-dark dark:text-main mb-2'>Duration: {duration} mins</p>
            </div>
        </Link>
    );
};

export default SingleQuiz;
