import { database } from "@/lib/firebase";
import {
  ref,
  get,
  child,
  getDatabase,
  DatabaseReference,
} from "firebase/database";
import { Quiz, QuizQuestion } from "@/lib/interfaces";

export const getFeaturedQuizzes = async (): Promise<Quiz[]> => {
  try {
    const quizzesRef: DatabaseReference = ref(database, "featured");
    const snapshot = await get(child(quizzesRef, "/"));

    if (snapshot.exists()) {
      const quizzes: Quiz[] = Object.entries(snapshot.val()).map(
        ([quizId, quizData]: [string, any]) => {
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
            quizRating: quizData.quizRating,
            userId: quizData.userId,
          };
          return quiz;
        }
      );
      return quizzes;
    } else {
      console.error("No quizzes found in the database.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching quizzes:", (error as Error).message);
    throw error;
  }
};
