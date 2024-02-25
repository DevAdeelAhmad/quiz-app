import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { GrRefresh } from "react-icons/gr";

interface SingleSubmittionCard {
  quizId: String;
  title: string;
  image: string;
  category?: string;
  totalScore: number;
  obtainedScore: number;
}

const SingleSubmittionCard: React.FC<SingleSubmittionCard> = ({
  quizId,
  title,
  image,
  category,
  totalScore,
  obtainedScore,
}) => {
  return (
    <div className="w-72 flex flex-col p-4 rounded-3xl border-2 border-dark/30 dark:border-main/50 shadow-xl transform hover:scale-105 transition-transform duration-300">
      <div className="relative w-full h-40 mb-4">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt={`${category} Category Image`}
          className="rounded-t-xl"
        />
      </div>
      <p className="text-xl font-extrabold mb-2 text-dark dark:text-main uppercase">
        {title}
      </p>
      <p className="text-sm text-dark dark:text-main mb-2">
        Total Score : {totalScore}
      </p>
      <p className="text-sm text-dark dark:text-main mb-2">
        Obtained Score : {obtainedScore}
      </p>
      <Link
        className="flex justify-center align-middle"
        href={`/quiz/${quizId}`}
      >
        <Button className="bg-[#ee0022] w-full text-white font-semibold rounded-3xl hover:bg-[#ee0022]/60">
          Attempt Again
          <GrRefresh className="mr-2 ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
};

export default SingleSubmittionCard;
