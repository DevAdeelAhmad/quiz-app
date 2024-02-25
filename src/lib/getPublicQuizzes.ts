import { firestore } from "@/lib/firebase";
import { Quiz, QuizQuestion } from "@/lib/interfaces";
import { collection, getDocs } from "firebase/firestore";

export const getQuizzes = async (
  visibilityType: string | null = null
): Promise<Quiz[]> => {
  try {
    const quizzesCollection = collection(firestore, "quizzes");
    const snapshot = await getDocs(quizzesCollection);

    if (!snapshot.empty) {
      const quizzes: Quiz[] = snapshot.docs.map((doc) => {
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
      });

      if (visibilityType) {
        const filteredQuizzes = quizzes.filter(
          (quiz) => quiz.quizVisibility === visibilityType
        );
        return filteredQuizzes;
      }

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
