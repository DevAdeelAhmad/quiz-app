import SingleQuiz from '@/components/search/SingleQuiz';
import getCategories from '@/lib/getCategories';
import { getQuizSubmittionsByUserId } from "@/lib/getQuizSubmittions";
import { getQuizzes } from '@/lib/getPublicQuizzes';
import { Quiz, QuizWithCategory, QuizSubmittion, QuizSubmittionWithQuizAndCategory } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { UserAuth } from '@/context/AuthContext';
import SingleSubmittionCard from '../profile/SingleSubmittionCard';
import { Button } from '../ui/button';
import { GrFormNextLink } from "react-icons/gr";
import Link from 'next/link';

const ResultCards = () => {
    const { user } = UserAuth();
    const [myQuizzes, setMyQuizzes] = useState<QuizWithCategory[]>([]);
    const [mySubmittions, setMySubmittions] = useState<QuizSubmittionWithQuizAndCategory[]>([])
    const [allQuizes, setAllQuizzes] = useState<QuizWithCategory[]>([]);

    useEffect(() => {
        const fetchQuizzesAndCategories = async () => {
            let fetchedQuizzes: Quiz[] = await getQuizzes();
            const categoriesData = await getCategories();
            const quizzesWithCategory: QuizWithCategory[] = fetchedQuizzes.map((quiz) => {
                const category = categoriesData.find((cat) => cat.name === quiz.quizCategory);
                return {
                    ...quiz,
                    categoryImage: category?.imageUrl || '',
                };
            });
            setAllQuizzes(quizzesWithCategory)
            if (user) {
                const filteredQuizzes = quizzesWithCategory.filter(quiz => quiz?.accessEmails?.includes(user?.email));
                setMyQuizzes(filteredQuizzes);

            }
        };
        fetchQuizzesAndCategories();
    }, [user]);

    useEffect(() => {
        const fetchSubmitions = async (userId: string) => {
            const submitions = await getQuizSubmittionsByUserId(userId)
            if (submitions) {
                const submittionsWithQuizes = submitions.map((submition) => {
                    const quiz = allQuizes.find((quiz) => quiz.quizId === submition.quizId);
                    return {
                        ...submition,
                        ...quiz
                    };
                });
                setMySubmittions(submittionsWithQuizes)
            }
        }

        user && fetchSubmitions(user.uid)
    }, [allQuizes, user])

    return (
        <>
            {mySubmittions.length > 0 ? (
                <div className="m-5 flex-1">
                    <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 md:w-full">
                        <div className="flex-1">
                            <h1 className="text-2xl lg:text-3xl md:pl-56 font-semibold text-center">My Quizzes Results</h1>
                        </div>
                        <Link href="/search">
                            <Button className="bg-[#ee0022] text-white font-semibold rounded-3xl hover:bg-[#ee0022]/60">
                                Explore More Quizzes <GrFormNextLink className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-wrap items-center justify-center p-2 gap-5">
                        {mySubmittions.map((submittion, index) => (
                            <SingleSubmittionCard
                                key={index}
                                quizId={submittion.quizId}
                                title={submittion.quizTitle}
                                image={submittion.categoryImage}
                                difficulty={submittion.quizDifficulty}
                                duration={submittion.quizDuration}
                                totalScore={submittion.totalScore}
                                obtainedScore={submittion.obtainedScore}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <h1 className="text-2xl lg:text-3xl text-red-800 font-semibold text-center">
                    There is no any quiz submissions!
                </h1>
            )}
        </>
    );
};

export default ResultCards;