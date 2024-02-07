import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { GrRefresh } from "react-icons/gr";

interface SingleSubmittionCard {
    quizId: String
    title: string;
    image: string;
    category?: string;
    subCategory?: string;
    difficulty: string;
    duration: number;
    totalScore: number;
    obtainedScore: number
}

const SingleSubmittionCard: React.FC<SingleSubmittionCard> = ({ quizId, title, image, category, subCategory, difficulty, duration, totalScore, obtainedScore }) => {
    return (
        <div className='w-72 flex flex-col border border-gray-300 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300'>
            <div className='relative w-full h-40 mb-4'>
                <Image
                    src={image}
                    layout='fill'
                    objectFit='cover'
                    alt={`${category} Category Image`}
                    className='rounded-t-xl'
                />
            </div>
            <p className='text-xl font-extrabold mb-2 text-gray-800'>{title}</p>
            {category && <p className='text-sm text-gray-600 mb-2'>Quiz Category : {category}</p>}
            {subCategory && <p className='text-sm text-gray-600 mb-2'>Sub Category: {subCategory}</p>}
            <p className='text-sm text-gray-600 mb-2'>Difficulty: {difficulty}</p>
            <p className='text-sm text-gray-600 mb-2'>Duration: {duration} mins</p>
            <p className='text-sm text-gray-600 mb-2'>Total Score : {totalScore}</p>
            <p className='text-sm text-gray-600 mb-2'>ObtainedScore : {obtainedScore}</p>
            <Link className='flex justify-center align-middle' href={`/quiz/${quizId}`}>
                <Button className='bg-[#ee0022] w-full text-white font-semibold rounded-3xl hover:bg-[#ee0022]/60'>Attempt Again<GrRefresh className="mr-2 ml-2 h-4 w-4" /></Button>
            </Link>
        </div>
    );
};

export default SingleSubmittionCard;
