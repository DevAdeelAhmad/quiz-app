import { database } from "@/lib/firebase";
import {
  ref,
  get,
  set,
  child,
  getDatabase,
  DatabaseReference,
} from "firebase/database";
import { Quiz } from "@/lib/interfaces";

export const updateQuizRatings= async(quiz:Quiz,rating:number)=>{
    const prevRatings=quiz.quizRating;
    const newRatings=(prevRatings+rating)/2

    try {
      console.log("Abubakar - - -",quiz)
      const quizzesRef: DatabaseReference = ref(database, `${quiz.userId === 'featured' || quiz.quizVisibility === 'Public' ? 'featured' : 'quizzes'}`);
      const snapshot = await get(child(quizzesRef, '/'));
    
        if (snapshot.exists()) {
          const quizzesData = snapshot.val(); 
          // Find the quiz with the specified quizId
            const quizEntry:any = Object.entries(quizzesData).find(
              ([_, quizData]: [string, any]) => quizData.quizId === quiz.quizId
            );
            if(quizEntry){
                // update quiz rating
                quizEntry[1].quizRating=newRatings
                // Get the quizId from the entry
                const quizEntryId = quizEntry[0];
                // Update the specific quiz entry in the database
                await set(child(quizzesRef, quizEntryId), quizEntry[1]);
                
                const message= "Quiz rated successfully"
                return {
                    status:true,
                    message:message,
                }
            }else {
                const message="No quiz found against the given quizId.";
                return {
                    status:false,
                    message:message,
                }
              }
        } else {
          const message="No quiz found in the database";
          return {
            status:false,
            message:message,
        }
        }
      } catch (error) {
        const message="Error occured while rating the quiz."
        console.error(message, (error as Error).message);
        return {
            status:false,
            message:message,
        }
      }


}