import Image from 'next/image'
import React from 'react'
import SingleMyQuiz from './SingleMyQuiz'
import { Button } from '../ui/button'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Quiz, QuizWithCategory, QuizSubmittion, QuizSubmittionWithQuizAndCategory } from '@/lib/interfaces';
import { getQuizSubmittionsByUserId } from '@/lib/getQuizSubmittions';
import { UserAuth } from '@/context/AuthContext';
import { getQuizzes } from '@/lib/getPublicQuizzes';
import getCategories from '@/lib/getCategories';
import SingleSubmittionCard from '../profile/SingleSubmittionCard';


// const data = [
//     {
//         creatorName: "John Doe",
//         quizName: "HTML Basics 1",
//         percentage: 25,
//         quizImageUrl: "/assets/quiz-img-temp.jpg",
//         isFavorite: true
//     },
//     {
//         creatorName: "John Doe",
//         quizName: "HTML Basics 2",
//         percentage: 50,
//         quizImageUrl: "/assets/quiz-img-temp.jpg",
//         isFavorite: false
//     },
//     {
//         creatorName: "John Doe",
//         quizName: "HTML Basics 3",
//         percentage: 75,
//         quizImageUrl: "/assets/quiz-img-temp.jpg",
//         isFavorite: true
//     }
// ]



const MyQuizzes = () => {
    const { user } = UserAuth();
    const [width, setWidth] = useState<number | undefined>(0);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [mySubmittions, setMySubmittions] = useState<QuizSubmittionWithQuizAndCategory[]>([])
    const swiperRef = useRef(null);
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

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth);
            const handleResize = () => {
                setWidth(window.innerWidth);
            };
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    const prevCard = () => {
        if (swiperRef.current) {
            //@ts-ignore
            swiperRef.current.swiper.slidePrev();
        }
    };

    const nextCard = () => {
        if (swiperRef.current) {
            //@ts-ignore
            swiperRef.current.swiper.slideNext();
        }
    };

    const getSlidesPerView = () => {
        if ((width ?? 0) >= 1024 && mySubmittions.length >= 3) {
            return 3;
        } else if ((width ?? 0) >= 768 && mySubmittions.length >= 2) {
            return 2;
        } else {
            return 1;
        }
    };

    return (
        <section className='flex flex-col gap-5 p-5 lg:p-10 items-center justify-center w-full'>
            <h1 className='text-2xl lg:text-3xl font-semibold'>My Quizzes</h1>
            <div className="flex w-full items-center justify-center relative">
                <div className={`flex justify-center items-center w-full ${mySubmittions.length === 1 ? 'lg:pl-0' : 'lg:pl-20'}`}>
                    {width && user && mySubmittions.length > 0 ? (
                        <Swiper
                            spaceBetween={width >= 1024 ? 20 : 10}
                            slidesPerView={getSlidesPerView()}
                            className="max-w-7xl"
                            direction="horizontal"
                            ref={swiperRef}
                            onSlideChange={(swiper) => {
                                setActiveIndex(swiper.activeIndex);
                            }}
                            loop={true}
                        >
                            {(mySubmittions.map((submittion, index) => (
                                <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={index}>
                                    <SingleSubmittionCard key={index} quizId={submittion.quizId} title={submittion.quizTitle} image={submittion.categoryImage} category={submittion.quizCategory} subCategory={submittion.quizSubCategory} difficulty={submittion.quizDifficulty} duration={submittion.quizDuration} totalScore={submittion.totalScore} obtainedScore={submittion.obtainedScore} />
                                </SwiperSlide>
                            ))
                            )}
                        </Swiper>
                    ) : user && mySubmittions.length <= 0 ? <span className=" text-red-800 text-lg font-bold lg:-ml-20">You don't have any submitted quiz !</span> : <span className="font-bold text-lg text-red-800 lg:-ml-20">You are not logged in !</span>}
                </div>
                {user && mySubmittions.length > 0 && <><div
                    onClick={nextCard}
                    className="flex absolute right-[3%] top-[45%] md:right-[-1%] z-[50] bg-first text-white rounded-full p-3 cursor-pointer"
                >
                    <GrNext />
                </div>
                    <div
                        onClick={prevCard}
                        className="flex absolute left-[3%] top-[45%] md:left-[-1%] lg:left-[5%] z-[50] bg-first text-white rounded-full p-3 cursor-pointer"
                    >
                        <GrPrevious />
                    </div></>}
            </div>
        </section>
    );
};


export default MyQuizzes


