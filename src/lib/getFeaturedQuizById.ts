import { database } from "@/lib/firebase";
import {
  ref,
  get,
  child,
  getDatabase,
  DatabaseReference,
} from "firebase/database";
import { Quiz, QuizQuestion } from "@/lib/interfaces";

export const getFeaturedQuizById = async (quizId: string): Promise<Quiz|null> => {
  try {
    const quizzesRef: DatabaseReference = ref(database, "featured");
    const snapshot = await get(child(quizzesRef, '/'));

    if (snapshot.exists()) {
      const quizzesData = snapshot.val(); 
      // Find the quiz with the specified quizId
        const quizEntry = Object.entries(quizzesData).find(
          ([_, quizData]: [string, any]) => quizData.quizId === quizId
        );

        if (quizEntry) {
          const [_, quizData]: [string, any] = quizEntry;
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
            accessEmails:quizData.accessEmails,
            quizRating: quizData.quizRating
          };
          return quiz;
        }
        else {
          console.error("No quiz found in the database against this Id.");
          return null;
        }
    } else {
      console.error("No quiz found in the database");
      return null;
    }
  } catch (error) {
    console.error("Error fetching quiz.", (error as Error).message);
    throw error;
  }
};
