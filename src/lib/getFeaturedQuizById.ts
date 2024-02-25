import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { Quiz, QuizQuestion } from "@/lib/interfaces";

export const getFeaturedQuizById = async (
  quizId: string
): Promise<Quiz | null> => {
  try {
    const quizzesCollection = collection(firestore, "featured");
    const q = query(quizzesCollection, where("quizId", "==", quizId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const quizData = doc.data();

      const quiz: Quiz = {
        quizId: quizData.quizId,
        quizCategory: quizData.quizCategory,
        quizDescription: quizData.quizDescription,
        quizDifficulty: quizData.quizDifficulty,
        quizDuration: quizData.quizDuration,
        quizQuestions: quizData.quizQuestions as QuizQuestion[],
        quizSubCategory: quizData.quizSubCategory,
        quizTags: quizData.quizTags,
        quizTitle: quizData.quizTitle,
        quizVisibility: quizData.quizVisibility,
        categoryImage: "",
        accessEmails: quizData.accessEmails,
        quizRating: quizData.quizRating,
      };

      return quiz;
    } else {
      console.error("No quiz found in the database against this Id.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching quiz.", (error as Error).message);
    throw error;
  }
};
