import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "../search/SkeletonCard";
import React, { useState, useEffect } from "react";
import { DeleteQuiz } from "@/lib/firebaseDelete";
import QuizUpdateForm from "./QuizUpdationForm";

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

const NewSingleQuiz: React.FC<SingleQuizProps> = ({
  quizId,
  title,
  image,
  category,
  subCategory,
  difficulty,
  duration,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const handleDelete = async () => {
    const deletedSuccessfully = await DeleteQuiz(quizId);

    if (deletedSuccessfully) {
      console.log(`Quiz with ID ${quizId} deleted successfully.`);
    } else {
      console.log(`Failed to delete quiz with ID ${quizId}.`);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted ? (
        <div className="relative w-72 p-4 rounded-3xl border-2 border-dark/30 dark:border-main/50 shadow-xl hover:shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="relative w-full h-40 mb-4">
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt={`${category} Category Image`}
              className="rounded-t-xl"
            />
          </div>
          <p className="text-xl font-extrabold mb-2 text-dark dark:text-main">
            {title}
          </p>
          <p className="text-sm text-dark dark:text-main mb-2">
            Category: {category}
          </p>
          <p className="text-sm text-dark dark:text-main mb-2">
            Sub Category: {subCategory}
          </p>
          <p className="text-sm text-dark dark:text-main mb-2">
            Difficulty: {difficulty}
          </p>
          <p className="text-sm text-dark dark:text-main mb-2">
            Duration: {duration} mins
          </p>

          {/* Delete and Update Buttons */}
          <div className="absolute bottom-5 right-4 flex space-x-1">
            <button
              className="rounded-full bg-red-500 text-white px-2 py-1 text-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
            <Link href={`/update/${quizId}`}>
              <button className="rounded-full bg-blue-500 text-white px-2 py-1 text-sm">
                Update
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex mt-6 justify-between gap-x-4 mx-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
    </>
  );
};
export default NewSingleQuiz;
