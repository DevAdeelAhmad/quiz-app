import { getFirestore, doc, deleteDoc } from "firebase/firestore";
const db = getFirestore();
export const DeleteQuiz = async (quizId: string) => {
  try {
    const quizDocRef = doc(db, "quizzes", quizId);
    await deleteDoc(quizDocRef);
    console.log(`Quiz with ID ${quizId} deleted successfully.`);
    return true;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return false;
  }
};
