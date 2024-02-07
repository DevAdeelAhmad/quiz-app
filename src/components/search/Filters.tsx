import React from "react";

interface FiltersProps {
  filters: Record<string, string | null>;
  onFilterChange: (name: string, value: string) => void;
  onClearFilters: () => void;
  categories: string[];
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  categories,
}) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5 w-full mb-4">
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-5 items-center space-x-2">
        <span className="font-semibold">Filters:</span>
        <select
          value={filters.difficulty || ""}
          onChange={(e) => onFilterChange("difficulty", e.target.value)}
          className="p-2 border border-black rounded-md"
        >
          <option value="" disabled>
            Select Difficulty
          </option>
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>
        <select
          value={filters.category || ""}
          onChange={(e) => onFilterChange("category", e.target.value)}
          className="p-2 border border-black rounded-md"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={filters.rating || ""}
          onChange={(e) => onFilterChange("rating", e.target.value)}
          className="p-2 border border-black rounded-md"
        >
          <option value="" disabled>
            Select Rating
          </option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <select
          value={filters.duration || ""}
          onChange={(e) => onFilterChange("duration", e.target.value)}
          className="p-2 border border-black rounded-md"
        >
          <option value="" disabled>
            Select Duration
          </option>
          <option value="short">Less than 10 mins</option>
          <option value="medium">Between 10 & 20 mins</option>
          <option value="long">More than 20 mins</option>
        </select>
      </div>
      <button className="text-blue-500 underline" onClick={onClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
