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
    quizRating: number
  }
  
export interface QuizQuestion {
    correctOptions: string[];
    id: number;
    options: string[];
    question: string;
  }
  