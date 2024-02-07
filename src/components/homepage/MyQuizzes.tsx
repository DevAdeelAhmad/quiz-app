import Image from "next/image";
import React from "react";
import SingleMyQuiz from "./SingleMyQuiz";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import {
  Quiz,
  QuizWithCategory,
  QuizSubmission,
  QuizSubmissionWithQuizAndCategory,
} from "@/lib/interfaces";
import { getQuizSubmittionsByUserId } from "@/lib/getQuizSubmittions";
import { UserAuth } from "@/context/AuthContext";
import { getQuizzes } from "@/lib/getPublicQuizzes";
import getCategories from "@/lib/getCategories";
import SingleSubmittionCard from "../profile/SingleSubmittionCard";
import { getFeaturedQuizzes } from "@/lib/getFeaturedQuizzes";

const MyQuizzes = () => {
  const { user } = UserAuth();
  const [width, setWidth] = useState<number | undefined>(0);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [mySubmissions, setMySubmissions] = useState<
    QuizSubmissionWithQuizAndCategory[]
  >([]);
  const swiperRef = useRef(null);
  const [allQuizzes, setAllQuizzes] = useState<QuizWithCategory[]>([]);

  useEffect(() => {
    const fetchQuizzesAndCategories = async () => {
      let fetchedQuizzes: Quiz[] = await getQuizzes();
      let fetchFeaturedQuizzes: Quiz[] = await getFeaturedQuizzes();
      let allQuizes: Quiz[] = [...fetchFeaturedQuizzes, ...fetchedQuizzes];
      const categoriesData = await getCategories();
      const quizzesWithCategory: QuizWithCategory[] = allQuizes.map((quiz) => {
        const category = categoriesData.find(
          (cat) => cat.name === quiz.quizCategory
        );
        return {
          ...quiz,
          categoryImage: category?.imageUrl || "",
        };
      });
      setAllQuizzes(quizzesWithCategory);
    };
    fetchQuizzesAndCategories();
  }, [user]);

  useEffect(() => {
    const fetchSubmitions = async (userId: string) => {
      const submitions = await getQuizSubmittionsByUserId(userId);
      if (submitions) {
        const submittionsWithQuizes = submitions.map((submition) => {
          const quiz = allQuizzes.find(
            (quiz) => quiz.quizId === submition.quizId
          );
          return {
            ...submition,
            ...quiz,
          };
        });
        setMySubmissions(submittionsWithQuizes);
      }
    };

    user && fetchSubmitions(user.uid);
  }, [allQuizzes, user]);

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
    if ((width ?? 0) >= 1024 && mySubmissions.length >= 3) {
      return 3;
    } else if ((width ?? 0) >= 768 && mySubmissions.length >= 2) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <section className="flex flex-col gap-5 p-5 lg:p-10 items-center justify-center w-full">
      <h1 className="text-2xl lg:text-3xl font-semibold">My Quizzes</h1>
      <div className="flex w-full items-center justify-center relative">
        <div
          className={`flex justify-center items-center w-full ${
            mySubmissions.length === 1 ? "lg:pl-0" : "lg:pl-20"
          }`}
        >
          {width && user && mySubmissions.length > 0 ? (
            <Swiper
              spaceBetween={width >= 1024 ? 20 : 10}
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
              {mySubmissions.map((submittion, index) => (
                <SwiperSlide
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <SingleSubmittionCard
                    key={index}
                    quizId={submittion.quizId}
                    title={submittion.quizTitle}
                    image={submittion.categoryImage}
                    category={submittion.quizCategory}
                    subCategory={submittion.quizSubCategory}
                    difficulty={submittion.quizDifficulty}
                    duration={submittion.quizDuration}
                    totalScore={submittion.totalScore}
                    obtainedScore={submittion.obtainedScore}
                    type={submittion.userId ?? ""}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : user && mySubmissions.length <= 0 ? (
            <span className=" text-dark dark:text-main text-lg font-bold lg:-ml-20">
              You don{"'"}t have any submitted quiz !
            </span>
          ) : (
            <span className="font-bold text-lg text-dark dark:text-main lg:-ml-20">
              You are not logged in !
            </span>
          )}
        </div>
        {user && mySubmissions.length > 0 && (
          <>
            <div
              onClick={nextCard}
              className="hidden sm:flex absolute right-[3%] top-[45%] md:right-[-1%] z-[50] text-black dark:text-white dark:border-white border-black border-2 rounded-full p-3 cursor-pointer"
            >
              <GrNext />
            </div>
            <div
              onClick={prevCard}
              className="hidden sm:flex absolute left-[3%] top-[45%] md:left-[-1%] lg:left-[5%] z-[50] text-black dark:text-white dark:border-white border-black border-2 rounded-full p-3 cursor-pointer"
            >
              <GrPrevious />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MyQuizzes;
