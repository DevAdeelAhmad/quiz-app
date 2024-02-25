import { getQuizSubmissionsByUserId } from "@/lib/getQuizSubmissions";
import { QuizSubmissionWithQuizAndCategory } from "@/lib/interfaces";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleSubmissionCard from "../profile/SingleSubmissionCard";
import SkeletonCard from "../search/SkeletonCard";
import getCategories from "@/lib/getCategories";

interface CommonQuizSubmissionProps {
  quizId: string;
  totalScore: number;
  obtainedScore: number;
}
//@ts-ignore
interface QuizSubmissionWithCommonProps
  extends QuizSubmissionWithQuizAndCategory,
    CommonQuizSubmissionProps {}

const MyQuizzes = () => {
  const { user } = useClerk();
  const [width, setWidth] = useState<number | undefined>(0);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [mySubmissions, setMySubmissions] = useState<
    QuizSubmissionWithCommonProps[]
  >([]);
  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      console.log(categoriesData);
      //@ts-ignore
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubmissions = async (userId: string) => {
      const submissions = await getQuizSubmissionsByUserId(userId);
      const userSubmissions = submissions[0]?.submissions || [];
      //@ts-ignore
      const submissionsWithCommonProps: QuizSubmissionWithCommonProps[] =
        userSubmissions.map((submission) => {
          const category = categories.find(
            //@ts-ignore
            (cat) => cat.name === submission.quizCategory
          );
          return {
            //@ts-ignore
            quizId: submission.quizId,
            //@ts-ignore
            quizTitle: submission.quizTitle,
            //@ts-ignore
            totalScore: submission.totalScore,
            //@ts-ignore
            obtainedScore: submission.obtainedScore,
            //@ts-ignore
            categoryImage: category?.imageUrl || "",
          };
        });
      setMySubmissions(submissionsWithCommonProps);
      console.log("Set State: ", submissionsWithCommonProps);
    };

    user && fetchSubmissions(user.id);
  }, [user, categories]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const prevCard = () => {
    if (swiperRef.current) {
      // @ts-ignore
      swiperRef.current.swiper.slidePrev();
    }
  };

  const nextCard = () => {
    if (swiperRef.current) {
      // @ts-ignore
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
    <>
      {isMounted ? (
        <section className="flex flex-col gap-5 p-5 lg:p-10 items-center justify-center w-full relative">
          <h1 className="text-2xl lg:text-3xl font-semibold">My Quizzes</h1>
          {user ? (
            <>
              <div className={`flex justify-center items-center w-full`}>
                {width && user && mySubmissions.length > 0 ? (
                  <>
                    <Swiper
                      spaceBetween={width >= 1024 ? 20 : 10}
                      slidesPerView={getSlidesPerView()}
                      className="max-w-7xl"
                      style={{ padding: "17px" }}
                      direction="horizontal"
                      ref={swiperRef}
                      onSlideChange={(swiper) =>
                        setActiveIndex(swiper.activeIndex)
                      }
                      loop={true}
                    >
                      {mySubmissions.map((submission, index) => (
                        <SwiperSlide
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          key={index}
                        >
                          <SingleSubmissionCard
                            key={index}
                            quizId={submission.quizId}
                            title={submission.quizTitle}
                            image={submission.categoryImage}
                            category={submission.quizCategory}
                            totalScore={submission.totalScore}
                            obtainedScore={submission.obtainedScore}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div
                      onClick={prevCard}
                      className="flex absolute left-[-4%] sm:left-[1%] top-[45%] md:left-[-1%] lg:left-[5%] z-[50] text-black dark:text-white dark:border-white border-black border-2 rounded-full p-[3px] md:p-3 cursor-pointer"
                    >
                      <GrPrevious />
                    </div>
                    <div
                      onClick={nextCard}
                      className="flex absolute right-[-4%] sm:right-[1%] top-[45%] md:right-[1%] z-[50] text-black dark:text-white dark:border-white border-black border-2 rounded-full p-[3px] md:p-3 cursor-pointer"
                    >
                      <GrNext />
                    </div>
                  </>
                ) : (
                  <p>Quiz Submissions will be shown here</p>
                )}
              </div>
            </>
          ) : (
            <span className="text-dark dark:text-main text-lg font-bold lg:-ml-20">
              {user
                ? "You don't have any submitted quiz!"
                : "Kindly login to see your attempted quizzes!"}
            </span>
          )}
        </section>
      ) : (
        <div className="flex mt-6 justify-between gap-x-4 mx-3">
          {[1, 2, 3].map((index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default MyQuizzes;
