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
    quizRating: number,
    accessEmails:String[] | null
  }
  export interface QuizSubmittion {
    quizId: string;
    message:string,
    obtainedScore:number,
    totalScore:number,
    userEmail:string,
    userId:string,
    selectedAnswers:object
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

  export interface QuizSubmittionWithQuizAndCategory extends QuizSubmittion, QuizWithCategory{
    
  }