import React from "react";
import SingleQuiz from "./SingleQuiz";
import { Quiz } from "@/lib/interfaces";

interface SearchResultsProps {
  quizzes: Quiz[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ quizzes }) => {
  return (
    <div className="flex flex-wrap items-center justify-center p-2 gap-5 w-full">
      {quizzes.length === 0 ? (
        <p>No results found.</p>
      ) : (
        quizzes.map((quiz, index) => (
          <SingleQuiz
            key={index}
            quizId={quiz.quizId}
            title={quiz.quizTitle}
            image={quiz.categoryImage}
            category={quiz.quizCategory}
            subCategory={quiz.quizSubCategory}
            difficulty={quiz.quizDifficulty}
            duration={quiz.quizDuration}
            rating={quiz.quizRating}
          />
        ))
      )}
    </div>
  );
};

export default SearchResults;
