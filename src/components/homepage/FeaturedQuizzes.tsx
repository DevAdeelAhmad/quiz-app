"use client";
import getCategories from "@/lib/getCategories";
import { getFeaturedQuizzes } from "@/lib/getFeaturedQuizzes";
import { Quiz, QuizWithCategory } from "@/lib/interfaces";
import { useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonCard from "../search/SkeletonCard";
import SingleFeaturedQuiz from "./SingleFeaturedQuiz";

const FeaturedQuizzes = () => {
  const [width, setWidth] = useState<number | undefined>(0);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [allQuizzes, setAllQuizzes] = useState<QuizWithCategory[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchQuizzesAndCategories = async () => {
      let fetchedQuizzes: Quiz[] = await getFeaturedQuizzes();
      const categoriesData = await getCategories();
      const quizzesWithCategory: QuizWithCategory[] = fetchedQuizzes.map(
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
      setAllQuizzes(quizzesWithCategory);
    };
    fetchQuizzesAndCategories();
  }, []);

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
    <>
      {isMounted ? (
        <section className="flex flex-col gap-5 p-5 lg:p-10 items-center justify-center w-full">
          <h1 className="text-2xl lg:text-3xl font-semibold">
            Featured Quizzes
          </h1>
          <div className="flex w-full items-center justify-center relative">
            <div className="flex justify-center items-center w-full lg:pl-20">
              <Swiper
                spaceBetween={20}
                slidesPerView={getSlidesPerView()}
                className="max-w-7xl"
                style={{ padding: "17px" }}
                direction="horizontal"
                ref={swiperRef}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.activeIndex);
                }}
                loop={true}
              >
                {allQuizzes.map((quiz, index) => (
                  <SwiperSlide
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <SingleFeaturedQuiz
                      key={index}
                      isFavorite={false}
                      creatorImgUrl={"/assets/pfp.png"}
                      creatorName={"Admin"}
                      quizId={quiz.quizId}
                      title={quiz.quizTitle}
                      image={quiz.categoryImage}
                      category={quiz.quizCategory}
                      subCategory={quiz.quizSubCategory}
                      difficulty={quiz.quizDifficulty}
                      duration={quiz.quizDuration}
                      rating={quiz.quizRating}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
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
      ) : (
        <div className="flex flex-col mt-6 justify-between gap-x-4 mx-3">
          <h1 className="text-2xl lg:text-3xl font-semibold text-center">
            Featured Quizzes
          </h1>
          <div className="flex items-center justify-center gap-4 flex-wrap w-full">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedQuizzes;
