"use client";
import React from 'react'
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { CategoryData } from '@/lib/tempData'
const QuizCategories = () => {
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
            <h1 className='text-2xl lg:text-3xl font-semibold'>Quiz Categories</h1>
            <div className="flex w-full items-center justify-center relative">
                <div className="flex justify-center items-center w-full pl-24">
                    {width ? (
                        <Swiper spaceBetween={0} slidesPerView={width >= 1024 ? 5 : 1} className="max-w-7xl" direction="horizontal" ref={swiperRef} onSlideChange={(swiper) => { setActiveIndex(swiper.activeIndex); }} loop={true}>
                            {CategoryData.map((category, index) => (
                                <SwiperSlide key={index}>
                                    <Link className='flex flex-col gap-3 items-center justify-center w-[150px] min-[450px]:!w-[200px] px-10 py-5 rounded-2xl border hover:bg-third hover:text-white transition-all duration-300 shadow-lg'
                                        key={index} href={category.categoryLink}>
                                        <category.CategoryIcon size={30} />
                                        <span className='font-semibold text-base'>{category.categoryName}</span>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : null}
                </div>
                <div onClick={nextCard} className="hidden lg:flex absolute right-[10%] top-[45%] z-[50] bg-second text-white rounded-full p-3 cursor-pointer" >
                    <GrNext />
                </div>
                <div onClick={prevCard} className="hidden lg:flex absolute left-[10%] top-[45%] z-[50] bg-second text-white rounded-full p-3 cursor-pointer" >
                    <GrPrevious />
                </div>
            </div>
        </section >
    )
}

export default QuizCategories