import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { MdAccessTimeFilled, MdOutlineStarPurple500 } from "react-icons/md";
import { Button } from "../ui/button";
interface SingleFeaturedQuizProps {
  creatorName: string;
  creatorImgUrl: string;
  isFavorite: boolean;
  quizId: string;
  title: string;
  image: string;
  category: string;
  subCategory: string;
  difficulty: string;
  duration: number;
  rating: number;
}

const SingleFeaturedQuiz = ({
  creatorName,
  creatorImgUrl,
  isFavorite,
  quizId,
  title,
  image,
  category,
  subCategory,
  difficulty,
  duration,
  rating,
}: SingleFeaturedQuizProps) => {
  const [isFavor, setIsFavor] = useState(isFavorite);
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-3xl border-2 bg-background hover:scale-105 transition-all duration-300 border-dark/50 dark:border-main/30 p-3 max-w-[320px]">
      <div className="relative">
        <Image
          className="rounded-3xl !w-[300px] !h-[150px]"
          src={image}
          width={300}
          height={300}
          alt="Quiz Image"
        />
        <div
          onClick={() => setIsFavor(!isFavor)}
          className="border-black bg-slate-100 border p-2 rounded-full duration-300 transition-all absolute top-2 right-2 cursor-pointer"
        >
          {isFavor ? (
            <FaBookmark className=" text-black" />
          ) : (
            <FaRegBookmark className=" text-black" />
          )}
        </div>
        <div className="absolute -bottom-4 left-2 p-1 border rounded-full bg-slate-100 flex items-center gap-2">
          <Image
            className="rounded-full w-[40px] h-[40px]"
            src={creatorImgUrl}
            width={50}
            height={50}
            alt="Creator Profile Image"
          />
          <span className="pr-2 dark:text-dark">{creatorName}</span>
        </div>
      </div>
      <span className="text-xl font-extrabold mt-2 text-dark dark:text-main uppercase">
        {title}
      </span>
      <span className="text-sm text-dark dark:text-main -mb-2">
        Category: <strong className="text-base">{category}</strong>
      </span>
      <span className="text-sm text-dark dark:text-main -mb-2">
        Sub Category: <strong className="text-base">{subCategory}</strong>
      </span>
      <span className="text-sm text-dark dark:text-main -mb-2">
        Difficulty: <strong className="text-base">{difficulty}</strong>
      </span>
      <div className="flex gap-3 items-center justify-between w-full">
        <div className="flex gap-1 items-center">
          <MdAccessTimeFilled size={20} />
          <span>{duration}</span>
        </div>
        <div className="flex gap-1 items-center">
          <MdOutlineStarPurple500 size={20} />
          <span>{rating}/5</span>
        </div>
        <Link href={`/quiz/featured/${quizId}`}>
          <Button className="bg-[#ee0022] text-white font-semibold rounded-3xl hover:bg-[#ee0022]/60">
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SingleFeaturedQuiz;
