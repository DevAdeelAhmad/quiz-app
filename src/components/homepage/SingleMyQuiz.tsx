import Image from "next/image";

import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useState } from "react";
interface SingleFeaturedQuizProps {
  creatorName: string;
  quizName: string;
  percentage?: number;
  quizImageUrl: string;
  isFavorite: boolean;
}

const SingleMyQuiz = ({
  creatorName,
  quizName,
  percentage,
  quizImageUrl,
  isFavorite,
}: SingleFeaturedQuizProps) => {
  const [isFavor, setIsFavor] = useState(isFavorite);
  const possible = "!w-[0%] !w-[25%] !w-[50%] !w-[75%] !w-[100%]";
  return (
    <div className="flex md:flex-col gap-4 rounded-3xl border hover:shadow-lg p-3 cursor-pointer relative">
      <Image
        className="rounded-3xl"
        src={quizImageUrl}
        width={300}
        height={300}
        alt="Quiz Image"
      />
      <div
        onClick={() => setIsFavor(!isFavor)}
        className="border-black border bg-white p-2 rounded-full duration-300 transition-all absolute top-2 right-2 cursor-pointer"
      >
        {isFavor ? (
          <FaBookmark className=" text-black" />
        ) : (
          <FaRegBookmark className=" text-black" />
        )}
      </div>
      <div className="flex flex-col justify-evenly gap-4 pr-10">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-xl">{quizName}</span>
          <span className="text-black/70 text-base italic">{creatorName}</span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div
            className={`w-full border bg-gray-300 rounded-xl flex items-center justify-start`}
          >
            <div
              className={`!w-[${percentage}%] p-2 bg-gray-800 rounded-xl`}
            ></div>
          </div>
          <span className="text-black/60 text-base">
            {percentage}% complete
          </span>
        </div>
      </div>
    </div>
  );
};

export default SingleMyQuiz;
