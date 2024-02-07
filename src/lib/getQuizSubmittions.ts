import { database } from "@/lib/firebase";
import {
  ref,
  get,
  child,
  getDatabase,
  DatabaseReference,
} from "firebase/database";
import { Quiz, QuizSubmission } from "@/lib/interfaces";

export const getQuizSubmittionsByUserId = async (
  userId: String
): Promise<any[]> => {
  try {
    const submittionRef: DatabaseReference = ref(database, "quizSubmittions");
    const snapshot = await get(child(submittionRef, "/"));
    if (snapshot.exists()) {
      const submittionsData: QuizSubmission[] = snapshot.val();
      const submittions = submittionsData.filter(
        (submission) => submission.userId === userId
      );
      return submittions;
    } else {
      console.error("No submittions found in the database.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching submittions:", (error as Error).message);
    throw error;
  }
};
