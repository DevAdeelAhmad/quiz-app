import { getFirestore, doc, deleteDoc } from "firebase/firestore";

// Create a Firestore instance
const db = getFirestore();

// Function to delete a quiz by quizId from Firestore
export const DeleteQuiz = async (quizId: string) => {
  try {
    const quizDocRef = doc(db, "quizzes", quizId);
    await deleteDoc(quizDocRef);
    console.log(`Quiz with ID ${quizId} deleted successfully.`);
    return true; // Indicate success
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return false; // Indicate failure
  }
};
