import { firestore } from "@/lib/firebase";
import { Quiz } from "@/lib/interfaces";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const updateQuizRatings = async (quiz: Quiz, rating: number) => {
  try {
    const quizzesCollection = doc(
      firestore,
      `${
        quiz.userId === "featured" || quiz.quizVisibility === "Public"
          ? "featured"
          : "quizzes"
      }`,
      quiz.quizId
    );
    const docSnapshot = await getDoc(quizzesCollection);

    if (docSnapshot.exists()) {
      const quizData = docSnapshot.data();

      // Update quiz rating
      const prevRatings = quizData.quizRating || 0;
      const newRatings = (prevRatings + rating) / 2;
      quizData.quizRating = newRatings;

      // Update the specific quiz entry in the database
      await setDoc(quizzesCollection, quizData);

      return {
        status: true,
        message: "Quiz rated successfully",
      };
    } else {
      const message = "No quiz found against the given quizId.";
      return {
        status: false,
        message: message,
      };
    }
  } catch (error) {
    const message = "Error occurred while rating the quiz.";
    console.error(message, (error as Error).message);
    return {
      status: false,
      message: message,
    };
  }
};
