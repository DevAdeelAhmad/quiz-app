export interface Quiz {
  categoryImage: string;
  quizId: string;
  quizCategory: string;
  quizDescription: string;
  quizDifficulty: string;
  quizDuration: number;
  quizQuestions: QuizQuestion[];
  quizSubCategory: string;
  quizTags: string[];
  quizTitle: string;
  quizVisibility: string;
  quizRating: number;
  accessEmails: string[] | null;
  userId?: string;
  isFeatured?: boolean;
}

export interface QuizSubmission {
  [x: string]: never[];
  //@ts-ignore
  quizId: string;
  //@ts-ignore
  message: string;
  //@ts-ignore
  obtainedScore: number;
  //@ts-ignore
  totalScore: number;
  //@ts-ignore
  userEmail: string;
  //@ts-ignore
  userId: string;
  //@ts-ignore
  selectedAnswers: object;
}

export interface QuizQuestion {
  correctOptions: string[];
  id: number;
  options: string[];
  question: string;
}

export interface Category {
  id: string;
  categoryLink: string;
  imageUrl: string;
  name: string;
}

export interface QuizWithCategory extends Quiz {
  categoryImage: string;
}
//@ts-ignore
export interface QuizSubmissionWithQuizAndCategory
extends Omit<QuizSubmission, "userId">,
QuizWithCategory {
      //@ts-ignore
  userId?: string;
}
