"use client";
import React, { useEffect, useState } from "react";
import getCategories from "@/lib/getCategories";
import Image from "next/image";
import Sidebar from "@/components/commons/Sidebar";
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from "next/navigation";
interface Category {
  id: string;
  categoryLink: string;
  imageUrl: string;
  name: string;
}

const AllCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);
  return (
    <main className="min-h-screen w-full flex">
      <Sidebar />
      <div className="flex flex-col gap-5 py-10 min-h-screen items-center w-full">
        <h1 className="text-2xl lg:text-3xl font-semibold">All Categories</h1>
        {categories && categories.length > 0 ? (
          <div className="flex flex-wrap gap-5 items-center justify-center">
            {categories.map((category, index) => (
              <div
                className="flex flex-col gap-3 border hover:bg-fifth hover:text-white transition-all duration-200 p-2 rounded-3xl text-center font-semibold cursor-pointer"
                onClick={() => router.push(`${category.categoryLink}`)}
                key={index}
              >
                <Image
                  className="rounded-3xl w-[300px] h-[200px] border-2"
                  src={category.imageUrl}
                  width={300}
                  height={300}
                  alt={category.name + " Category Image"}
                />
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <AiOutlineLoading size={40} className="text-third animate-spin" />
        )}
      </div>
    </main>
  );
};

export default AllCategoriesPage;
