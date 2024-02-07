import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

interface QuestionCardProps {
  questions: {
    id: string;
    question: string;
    options: string[];
  }[];
  selectedAnswers: Record<string, string>;
  handleOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirm: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questions,
  selectedAnswers,
  handleOptionChange,
  handleConfirm,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <Card className="lg:mx-20 w-[90%] mb-28 rounded-3xl bg-main dark:bg-dark text-dark dark:text-main border-dark dark:border-main">
      <CardContent className="m-10 grid gap-4 ">
        <div className=" p-5  rounded-xl">
          <h2 className="my-5 font-medium uppercase leading-none">Question</h2>
          <p className="my-5 text-sm">{questions[currentIndex]?.question}</p>
        </div>

        {questions[currentIndex]?.options.map(
          (option: string, index: number) => {
            return (
              <div
                key={index}
                className=" p-5 bg-dark dark:bg-main  rounded-xl border"
              >
                <div className="flex flex-col space-y-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={questions[currentIndex]?.id}
                      onChange={handleOptionChange}
                      checked={
                        selectedAnswers[questions[currentIndex]?.id] === option
                      }
                      value={option}
                      className="form-radio text-indigo-600 dark:text-dark"
                    />
                    <span className="text-main dark:text-dark">{option}</span>
                  </label>
                </div>
              </div>
            );
          }
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-10">
        <Button
          className="rounded-full bg-dark dark:bg-main text-main dark:text-dark"
          disabled={currentIndex <= 0}
          onClick={handlePrev}
        >
          Previous
        </Button>
        <Button
          className="rounded-full text-main bg-red-600 hover:bg-green-600"
          disabled={Object.keys(selectedAnswers).length !== questions.length}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
        <Button
          className="rounded-full bg-dark dark:bg-main text-main dark:text-dark"
          disabled={currentIndex >= questions?.length - 1}
          onClick={handleNext}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
