import React from 'react';
import Image from 'next/image';

interface SingleQuizProps {
    title: string;
    image: string;
    category: string;
    subCategory: string;
    difficulty: string;
    duration: number;
}

const SingleQuiz: React.FC<SingleQuizProps> = ({ title, image, category, subCategory, difficulty, duration }) => {
    return (
        <div className='flex flex-col border border-black bg-fuchsia-200 p-2 rounded-xl'>
            <Image src={image} width={300} height={300} alt={`${category} Category Image`} />
            <span>Quiz Title : {title}</span>
            <span>Quiz Category : {category}</span>
            <span>Quiz Sub Category : {subCategory}</span>
            <span>Quiz Difficulty : {difficulty}</span>
            <span>Quiz Duration : {duration}</span>
        </div>
    );
};

export default SingleQuiz;
