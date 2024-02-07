"use client";
import Sidebar from "@/components/commons/Sidebar";
import { UserAuth } from "@/context/AuthContext";
import Filters from "@/components/search/Filters";
import SearchResults from "@/components/search/SearchResults";
import { Input } from "@/components/ui/input";
import getCategories from "@/lib/getCategories";
import { getQuizzes } from "@/lib/getPublicQuizzes";
import { Quiz } from "@/lib/interfaces";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  categoryLink: string;
  imageUrl: string;
  name: string;
}

interface QuizWithCategory extends Quiz {
  categoryImage: string;
}
const SearchPage = () => {
  const { user } = UserAuth();
  const [quizzes, setQuizzes] = useState<QuizWithCategory[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizWithCategory[]>(
    []
  );
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string | null>>({
    difficulty: null,
    category: null,
    rating: null,
    duration: null,
  });

  useEffect(() => {
    const fetchQuizzesAndCategories = async () => {
      let fetchedQuizzes: Quiz[] = await getQuizzes();
      if (user) {
        fetchedQuizzes = fetchedQuizzes.filter((quiz) =>
          quiz?.accessEmails?.includes(user?.email)
        );
      }
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
      setQuizzes(quizzesWithCategory);
      setFilteredQuizzes(quizzesWithCategory);
      setCategories(categoriesData);
    };
    fetchQuizzesAndCategories();
  }, [user]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = quizzes.filter(
      (quiz) =>
        // quiz.quizVisibility === "Public" &&
        quiz.quizTitle.toLowerCase().includes(value.toLowerCase()) ||
        quiz.quizCategory.toLowerCase().includes(value.toLowerCase()) ||
        quiz.quizTags?.some((tag) =>
          tag.toLowerCase().includes(value.toLowerCase())
        ) ||
        quiz.quizSubCategory.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters: Record<string, string | null>) => ({
      ...prevFilters,
      [name]: value,
    }));

    setFilteredQuizzes((prevQuizzes: QuizWithCategory[]) => {
      const filtersToApply = {
        difficulty: name === "difficulty" ? value : filters.difficulty,
        category: name === "category" ? value : filters.category,
        rating: name === "rating" ? value : filters.rating,
        duration: name === "duration" ? value : filters.duration,
        searchTerm: searchTerm,
      };

      const filtered = quizzes.filter((quiz1) => {
        const isQuizVisible = quiz1.quizVisibility === "Public";

        // if (!isQuizVisible) {
        //   return false;
        // }

        const difficultyFilter =
          !filtersToApply.difficulty ||
          quiz1.quizDifficulty.toLowerCase() ===
            filtersToApply.difficulty.toLowerCase();
        const categoryFilter =
          !filtersToApply.category ||
          quiz1.quizCategory.toLowerCase() ===
            filtersToApply.category.toLowerCase();
        const ratingFilter =
          filtersToApply.rating === null ||
          quiz1.quizRating === parseInt(filtersToApply.rating, 10);
        const durationFilter =
          !filtersToApply.duration ||
          (filtersToApply.duration === "short" && quiz1.quizDuration < 10) ||
          (filtersToApply.duration === "medium" &&
            quiz1.quizDuration >= 10 &&
            quiz1.quizDuration <= 20) ||
          (filtersToApply.duration === "long" && quiz1.quizDuration > 20);
        const searchTermFilter =
          !filtersToApply.searchTerm ||
          quiz1.quizTitle
            .toLowerCase()
            .includes(filtersToApply.searchTerm.toLowerCase()) ||
          quiz1.quizCategory
            .toLowerCase()
            .includes(filtersToApply.searchTerm.toLowerCase()) ||
          quiz1.quizTags?.some((tag) =>
            tag.toLowerCase().includes(filtersToApply.searchTerm.toLowerCase())
          ) ||
          quiz1.quizSubCategory
            .toLowerCase()
            .includes(filtersToApply.searchTerm.toLowerCase());

        return (
          difficultyFilter &&
          categoryFilter &&
          ratingFilter &&
          durationFilter &&
          searchTermFilter
        );
      });

      return filtered;
    });
  };

  const clearFilters = () => {
    setFilters({
      difficulty: null,
      category: null,
      rating: null,
      duration: null,
    });
    setSearchTerm("");
    setFilteredQuizzes(quizzes);
  };

  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex justify-center w-full py-10">
        <div className="flex flex-col max-w-4xl w-full px-5">
          <h1 className="text-2xl lg:text-3xl font-semibold">Search Page</h1>
          <div className="py-2">
            <Input
              type="search"
              placeholder="Search Here..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            categories={categories?.map((cat) => cat.name) || []}
          />
          <h1 className="text-xl lg:text-2xl font-semibold">
            Search Results ({filteredQuizzes.length})
          </h1>
          <SearchResults quizzes={filteredQuizzes} />
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
