"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import SingleFeaturedQuiz from './SingleFeaturedQuiz'
import { GrNext, GrPrevious } from "react-icons/gr";
import { FeaturedData } from "@/lib/tempData";


const FeaturedQuizzes = () => {
    const [width, setWidth] = useState<number | undefined>(0);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const swiperRef = useRef(null);

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

    return (
        <section className='flex flex-col gap-5 p-5 lg:p-10 items-center justify-center w-full'>
            <h1 className='text-2xl lg:text-3xl font-semibold'>Featured Quizzes</h1>
            <div className="flex w-full items-center justify-center relative">
                <div className="flex justify-center items-center w-full pl-24">
                    {width ? (
                        <Swiper
                            spaceBetween={width >= 1024 ? 2 : 1}
                            slidesPerView={width >= 1024 ? 3 : 1}
                            className="max-w-7xl"
                            direction="horizontal"
                            ref={swiperRef}
                            onSlideChange={(swiper) => {
                                setActiveIndex(swiper.activeIndex);
                            }}
                            loop={true}
                        >
                            {FeaturedData.map((quiz, index) => (
                                <SwiperSlide key={index}>
                                    <SingleFeaturedQuiz key={index} isFavorite={quiz.isFavorite} creatorImgUrl={quiz.creatorImgUrl} creatorName={quiz.creatorName} quizName={quiz.quizName} quizImageUrl={quiz.quizImageUrl} rating={quiz.rating} time={quiz.time} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : null}
                </div>
                <div
                    onClick={nextCard}
                    className="hidden lg:flex absolute right-[10%] top-[45%] z-[50] bg-first text-white rounded-full p-3 cursor-pointer"
                >
                    <GrNext />
                </div>
                <div
                    onClick={prevCard}
                    className="hidden lg:flex absolute left-[10%] top-[45%] z-[50] bg-first text-white rounded-full p-3 cursor-pointer"
                >
                    <GrPrevious />
                </div>
            </div>
        </section >
    )
}

export default FeaturedQuizzes