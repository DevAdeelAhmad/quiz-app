import React from 'react'
import { TbMathSymbols } from "react-icons/tb";
import { MdScience } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { IoLanguageSharp } from "react-icons/io5";
import { SiKingstontechnology } from "react-icons/si";
import { MdOutlineSportsSoccer } from "react-icons/md";
import Link from 'next/link';
const QuizCategories = () => {

    const data = [
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
    ]
    return (
        <section className='flex flex-col gap-10 py-10 items-center'>
            <h1 className='text-2xl lg:text-3xl font-semibold'>Quiz Categories</h1>
            <div className="flex gap-5 flex-wrap items-center justify-center w-full">
                {data.map((category, index) => (
                    <Link className='flex flex-col gap-3 items-center justify-center w-[150px] min-[450px]:!w-[200px] px-10 py-5 rounded-2xl border hover:bg-first hover:text-white transition-all duration-300 shadow-lg'
                        key={index} href={category.categoryLink}>
                        <category.CategoryIcon size={30} />
                        <span className='font-semibold text-base'>{category.categoryName}</span>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default QuizCategories