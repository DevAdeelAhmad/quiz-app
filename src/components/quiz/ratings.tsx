import React, { useState } from "react";
import { Quiz } from "@/lib/interfaces";
import { updateQuizRatings } from "@/lib/updateQuizRatings";
import { useToast } from "../ui/use-toast";
interface Ratings {
  quiz: Quiz;
  className: string;
}

const Ratings = ({ className, quiz }: Ratings) => {
  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const { toast } = useToast();
  const handleRatingClick = async (selectedRating: any) => {
    if (!isRated) {
      setRating(selectedRating);
      const response = await updateQuizRatings(quiz, selectedRating);
      toast({
        title: response.status === true ? "Success" : "Failed",
        description: response.message,
        variant: response.status === true ? "success" : "destructive",
      });
      response.status === true ? setIsRated(true) : null;
    }
  };

  return (
    <div className={className}>
      {!isRated ? (
        <>
          <span className="text-2xl mr-5">Rate us:</span>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingClick(star)}
                style={{ cursor: "pointer", fontSize: "24px" }}
              >
                {star <= rating ? "★" : "☆"}
              </span>
            ))}
          </div>
        </>
      ) : (
        <span className="text-2xl mr-5">Thank You for your feedback.</span>
      )}
    </div>
  );
};

export default Ratings;
