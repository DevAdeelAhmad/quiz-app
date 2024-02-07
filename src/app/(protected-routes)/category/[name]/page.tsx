"use client"
import { UserAuth } from "@/context/AuthContext";
import getCategories from "@/lib/getCategories";
import { getQuizzes } from "@/lib/getPublicQuizzes";
import {
    Quiz,
    QuizWithCategory,
} from "@/lib/interfaces";
import { useEffect, useState } from "react";
import SingleQuiz from "@/components/search/SingleQuiz";
import Sidebar from "@/components/commons/Sidebar";
import { getFeaturedQuizzes } from "@/lib/getFeaturedQuizzes";


const SingleCategoryPage = ({ params }: {
    params: { name: string }
}) => {
    const capitalizedCategoryName = params.name.charAt(0).toUpperCase() + params.name.slice(1);
    const { user } = UserAuth();
    const [myQuizzes, setMyQuizzes] = useState<QuizWithCategory[]>([]);

    useEffect(() => {
        const fetchQuizzesAndCategories = async () => {
            let fetchedQuizzes: Quiz[] = await getQuizzes();
            let fetchFeaturedQuizzes: Quiz[] = await getFeaturedQuizzes();
            let allQuizzes: Quiz[] = [...fetchFeaturedQuizzes, ...fetchedQuizzes];
            const categoriesData = await getCategories();
            const quizzesWithCategory: QuizWithCategory[] = allQuizzes.map(
                (quiz) => {
                    const category = categoriesData.find(
                        (cat) => cat.name === quiz.quizCategory
                    );
                    return {
                        ...quiz,
                        categoryImage: category?.imageUrl || "",
                    };
                }
            );
            if (user) {
                const filteredQuizzes = quizzesWithCategory.filter((quiz) =>
                    quiz?.quizCategory === capitalizedCategoryName &&
                    (quiz?.userId === 'featured' || quiz?.accessEmails?.includes(user?.email))
                );
                setMyQuizzes(filteredQuizzes);
            }
        };
        fetchQuizzesAndCategories();
    }, [user, capitalizedCategoryName]);
    
    return (
            <div className="flex min-h-screen w-full flex-1">
                <Sidebar />
                <div className="flex flex-col mt-12 md:mt-24 items-center  justify-center md:justify-start gap-3 w-full">
                    {myQuizzes.length > 0 ? ( <><div>
                        <h1 className="text-2xl lg:text-3xl font-semibold text-center">
                            {capitalizedCategoryName} Category Quizzes
                        </h1>
                    </div>
                    <div className="flex flex-wrap items-center justify-center p-2 gap-5 py-5">
                        {myQuizzes.map((quiz, index) => (
                            <SingleQuiz
                                key={index}
                                quizId={quiz.quizId}
                                title={quiz.quizTitle}
                                image={quiz.categoryImage}
                                category={quiz.quizCategory}
                                subCategory={quiz.quizSubCategory}
                                difficulty={quiz.quizDifficulty}
                                duration={quiz.quizDuration}
                                rating={quiz.quizRating}
                            />
                        ))}
                    </div></>) : (
                        <h1 className="text-2xl lg:text-3xl text-dark dark:text-main font-semibold text-center">
                        There is no any quiz in {capitalizedCategoryName} Category!
                      </h1>
                    )}
                </div>
            </div>
    );
};

export default SingleCategoryPage;
