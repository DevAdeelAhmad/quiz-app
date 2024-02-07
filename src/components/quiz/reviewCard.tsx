import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ReviewCardProps {
  questions: {
    id: string;
  }[];
  selectedAnswers: Record<string, string>;
  handleSubmit: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ questions, selectedAnswers, handleSubmit }) => {
  return (
    <Card className="mx-20 w-[90%] rounded-3xl bg-main dark:bg-dark text-dark dark:text-main border-dark dark:border-main">
      <CardContent className="m-10  rounded-xl grid gap-4 bg-dark dark:bg-main text-main dark:text-dark">
        <h2 className="my-5 font-medium uppercase leading-none">
          Question Review
        </h2>

        <div>
          {questions?.map((question, index) => {
            return (
              <div key={index}>
                <h3 className="my-2">
                  Question {question.id}:{" "}
                  <span className="ml-3">{selectedAnswers[question.id]}</span>
                </h3>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-10">
        <Button
          className="rounded-full text-main px-10 bg-red-600 hover:bg-green-600"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
