import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { QuizSubmission } from "@/lib/interfaces";

export const getQuizSubmissionsByUserId = async (
  userId: string
): Promise<QuizSubmission[]> => {
  try {
    console.log("Fecthing quiz submissions for :", userId);
    const submissionsCollection = collection(firestore, "quizSubmissions");
    const userSubmissionsQuery = query(
      submissionsCollection,
      where("userId", "==", userId)
    );
    console.log("Query parameters:", userSubmissionsQuery);

    const querySnapshot = await getDocs(userSubmissionsQuery);
    console.log("Query results:", querySnapshot.docs);
    const submissionsData: QuizSubmission[] = [];
    querySnapshot.forEach((doc) => {
      const submissionData = doc.data() as QuizSubmission;
      submissionsData.push(submissionData);
    });

    console.log("Submission data in the hook", submissionsData);

    return submissionsData;
  } catch (error) {
    console.error("Error fetching submissions:", (error as Error).message);
    throw error;
  }
};
