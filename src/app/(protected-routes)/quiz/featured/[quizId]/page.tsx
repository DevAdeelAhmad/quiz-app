import { getFeaturedQuizById } from "@/lib/getFeaturedQuizById";
import { getFeaturedQuizzes } from "@/lib/getFeaturedQuizzes";
import { Quiz } from "@/lib/interfaces";
import QuizComponent from "./quizComponent";

export default async function SingleQuizPage({
  params,
}: {
  params: { quizId: string };
}) {
  const quiz = await getFeaturedQuizById(params?.quizId);
  return <QuizComponent quiz={quiz} />;
}

export async function generateStaticParams() {
  const fetchedQuizzes: Quiz[] = await getFeaturedQuizzes();
  const params = fetchedQuizzes.map((quiz) => {
    return { quizId: quiz.quizId };
  });
  return params;
}
