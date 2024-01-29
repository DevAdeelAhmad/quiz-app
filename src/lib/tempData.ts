import { TbMathSymbols } from "react-icons/tb";
import { MdScience } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import { SiKingstontechnology } from "react-icons/si";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { GiClassicalKnowledge } from "react-icons/gi";

export const FeaturedData = [
  {
    creatorName: "John Doe",
    quizName: "HTML Basics 1",
    time: "10m",
    rating: 4.5,
    quizImageUrl: "/assets/quiz-img-temp.jpg",
    creatorImgUrl: "/assets/pfp.png",
    isFavorite: true,
  },
  {
    creatorName: "John Doe 1",
    quizName: "HTML Basics 2",
    time: "15m",
    rating: 5,
    quizImageUrl: "/assets/quiz-img-temp.jpg",
    creatorImgUrl: "/assets/pfp.png",
    isFavorite: false,
  },
  {
    creatorName: "John Doe 2",
    quizName: "HTML Basics 3",
    time: "12m",
    rating: 4.9,
    quizImageUrl: "/assets/quiz-img-temp.jpg",
    creatorImgUrl: "/assets/pfp.png",
    isFavorite: true,
  },
  {
    creatorName: "John Doe 3",
    quizName: "HTML Basics 4",
    time: "20m",
    rating: 4.8,
    quizImageUrl: "/assets/quiz-img-temp.jpg",
    creatorImgUrl: "/assets/pfp.png",
    isFavorite: false,
  },
];

export const CategoryData = [
  {
    categoryName: "Mathematics",
    CategoryIcon: TbMathSymbols,
    categoryLink: "/category/mathematics",
  },
  {
    categoryName: "Science",
    CategoryIcon: MdScience,
    categoryLink: "/category/science",
  },
  {
    categoryName: "Geography",
    CategoryIcon: BiWorld,
    categoryLink: "/category/geography",
  },
  {
    categoryName: "History",
    CategoryIcon: FaCalendarAlt,
    categoryLink: "/category/history",
  },
  {
    categoryName: "Language",
    CategoryIcon: IoLanguageSharp,
    categoryLink: "/category/language",
  },
  {
    categoryName: "Technology",
    CategoryIcon: SiKingstontechnology,
    categoryLink: "/category/technology",
  },
  {
    categoryName: "Sports",
    CategoryIcon: MdOutlineSportsSoccer,
    categoryLink: "/category/sports",
  },
  {
    categoryName: "Knowledge",
    CategoryIcon: GiClassicalKnowledge,
    categoryLink: "/category/generalKnowledge",
  },
];
