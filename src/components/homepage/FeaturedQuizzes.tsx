"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Suspense, useEffect, useRef, useState } from "react";
import SingleFeaturedQuiz from './SingleFeaturedQuiz'
import { GrNext, GrPrevious } from "react-icons/gr";
import { FeaturedData } from "@/lib/tempData";
import SkeletonCard from "../commons/SkeletonCard";

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

    const getSlidesPerView = () => {
        if ((width ?? 0) >= 1024) {
            return 3;
        } else if ((width ?? 0) >= 768) {
            return 2;
        } else {
            return 1;
        }
    };

    return (
        <section className='flex flex-col gap-5 p-5 lg:p-10 items-center justify-center w-full'>
            <h1 className='text-2xl lg:text-3xl font-semibold'>Featured Quizzes</h1>
            <div className="flex w-full items-center justify-center relative">
                <div className="flex justify-center items-center w-full lg:pl-20">
                   
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={getSlidesPerView()}
                            className="max-w-7xl"
                            direction="horizontal"
                            ref={swiperRef}
                            onSlideChange={(swiper) => {
                                setActiveIndex(swiper.activeIndex);
                            }}
                            loop={true}
                        >
                            {FeaturedData.map((quiz, index) => (
                                <SwiperSlide style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={index}>
                                    <Suspense fallback={".... loading"}>
                                        <SingleFeaturedQuiz key={index} isFavorite={quiz.isFavorite} creatorImgUrl={quiz.creatorImgUrl} creatorName={quiz.creatorName} quizName={quiz.quizName} quizImageUrl={quiz.quizImageUrl} rating={quiz.rating} time={quiz.time} />
                                    </Suspense>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    
                </div>
                <div
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
                </div>
            </div>
        </section>
    );
};

export default FeaturedQuizzes;