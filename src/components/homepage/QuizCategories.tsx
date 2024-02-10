"use client";
import { CategoryData } from "@/lib/tempData";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GrFormNextLink, GrNext, GrPrevious } from "react-icons/gr";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../ui/button";

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
    <section className="flex  flex-col gap-5 p-5 lg:p-10 items-center justify-center w-full">
      <div className="flex flex-col md:flex-row gap-3 md:w-full">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl md:pl-44 font-semibold text-center">
            Quiz Categories
          </h1>
        </div>
        <Link className="flex justify-center align-middle" href="/category">
          <Button className="bg-[#ee0022] text-white font-semibold rounded-3xl hover:bg-[#ee0022]/60">
            All Categories <GrFormNextLink className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="flex w-full items-center justify-center relative">
        <div className="flex justify-center items-center w-full lg:pl-24">
          {width ? (
            <Swiper
              spaceBetween={width >= 1024 ? 20 : 10}
              slidesPerView={width >= 1024 ? 5 : width >= 768 ? 3 : 2}
              className="max-w-7xl"
              style={{ padding: "17px" }}
              direction="horizontal"
              ref={swiperRef}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
              loop={true}
            >
              {CategoryData.map((category, index) => (
                <SwiperSlide
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Link
                    className="flex flex-col gap-3 items-center justify-center w-[150px] min-[450px]:!w-[200px] px-10 py-5 rounded-3xl border-2 shadow-xl border-dark/30 dark:border-main/30 hover:bg-third hover:text-white transition-all duration-300"
                    key={index}
                    href={category.categoryLink}
                  >
                    <category.CategoryIcon size={30} />
                    <span className="font-semibold text-base">
                      {category.categoryName}
                    </span>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </div>
        <div
          onClick={nextCard}
          className="flex absolute right-[-4%] sm:right-[1%] top-[45%] md:right-[-1%] z-[50] text-black dark:text-white dark:border-white border-black border-2 rounded-full p-[3px] md:p-3 cursor-pointer"
        >
          <GrNext />
        </div>
        <div
          onClick={prevCard}
          className="flex absolute left-[-4%] sm:left-[1%] top-[45%] md:left-[-1%] lg:left-[5%] z-[50] text-black dark:text-white dark:border-white border-black border-2 rounded-full p-[3px] md:p-3 cursor-pointer"
        >
          <GrPrevious />
        </div>
      </div>
    </section>
  );
};

export default QuizCategories;
