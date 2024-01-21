import Image from 'next/image';
import { MdAccessTimeFilled, MdOutlineStarPurple500 } from "react-icons/md";
import { Button } from '../ui/button';
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useState } from 'react';
interface SingleFeaturedQuizProps {
    creatorName: string,
    creatorImgUrl: string,
    quizName: string,
    time: string,
    rating: number,
    quizImageUrl: string
    isFavorite: boolean
}

const SingleFeaturedQuiz = ({ creatorName, quizName, time, rating, quizImageUrl, creatorImgUrl, isFavorite }: SingleFeaturedQuizProps) => {
    const [isFavor, setIsFavor] = useState(isFavorite);

    return (
        <div className='flex flex-1 flex-col gap-4 rounded-3xl border shadow-lg p-3 max-w-[320px]'>
            <div className="relative">
                <Image className='rounded-3xl !w-[300px] !h-[150px]' src={quizImageUrl} width={300} height={300} alt='Quiz Image' />
                <div onClick={() => setIsFavor(!isFavor)} className='border-black border bg-white p-2 rounded-full duration-300 transition-all absolute top-2 right-2 cursor-pointer'>
                    {isFavor ? <FaBookmark className=' text-black' /> : <FaRegBookmark className=' text-black' />}
                </div>
                <div className='absolute -bottom-4 left-2 p-1 border rounded-full bg-white flex items-center gap-2'>
                    <Image className='rounded-full w-[40px] h-[40px]' src={creatorImgUrl} width={50} height={50} alt='Creator Profile Image' />
                    <span className='pr-2'>{creatorName}</span>
                </div>
            </div>
            <h1 className='font-semibold uppercase'>{quizName}</h1>
            <div className="flex gap-3 items-center justify-between w-full">
                <div className='flex gap-1 items-center'>
                    <MdAccessTimeFilled size={20} color='black' />
                    <span>{time}</span>
                </div>
                <div className='flex gap-1 items-center'>
                    <MdOutlineStarPurple500 size={20} color='black' />
                    <span>{rating}/5</span>
                </div>
                <Button className='bg-[#ee0022] text-white font-semibold rounded-3xl hover:bg-[#ee0022]/60'>Start</Button>
            </div>
        </div>
    )
}

export default SingleFeaturedQuiz