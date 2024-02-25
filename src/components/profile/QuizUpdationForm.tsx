"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import getCategories from "@/lib/getCategories";
import React, { useEffect, useState } from "react";

interface QuizUpdateFormProps {
  existingQuizData: any;
  handleContinue: () => void;
  setQuizCreationFormData: React.Dispatch<React.SetStateAction<any>>;
}

const QuizUpdateForm: React.FC<QuizUpdateFormProps> = ({
  existingQuizData,
  handleContinue,
  setQuizCreationFormData,
}) => {
  const [quizTitle, setQuizTitle] = useState(existingQuizData?.quizTitle || "");
  const [quizDescription, setQuizDescription] = useState(
    existingQuizData?.quizDescription || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    existingQuizData?.quizCategory || ""
  );
  const [subCategory, setSubCategory] = useState(
    existingQuizData?.quizSubCategory || ""
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    existingQuizData?.quizDifficulty || ""
  );
  const [visibility, setVisibility] = useState(
    existingQuizData?.quizVisibility || ""
  );
  const [duration, setDuration] = useState(
    existingQuizData?.quizDuration || null
  );
  const [tags, setTags] = useState<string[]>(existingQuizData?.quizTags || []); // Updated to use quizTags instead of tags
  const [accessEmails, setAccessEmails] = useState<string[]>(
    existingQuizData?.accessEmails || []
  );
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [isPrivate, setIsPrivate] = useState(
    existingQuizData?.quizVisibility === "Private" || false
  );
  const [isTagsVisible, setIsTagsVisible] = useState(
    existingQuizData?.quizVisibility === "Public" || false
  );
  const [isAccessEmailsVisible, setIsAccessEmailsVisible] = useState(
    existingQuizData?.quizVisibility === "Private" || false
  );
  const [invalidEmailAlert, setInvalidEmailAlert] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVisibility = e.target.value;
    setVisibility(selectedVisibility);
    setIsPrivate(selectedVisibility === "Private");
    setIsTagsVisible(selectedVisibility === "Public");
    setIsAccessEmailsVisible(selectedVisibility === "Private");
  };

  const handleTagRemove = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleAccessEmailRemove = (email: string) => {
    setAccessEmails((prevEmails) => prevEmails.filter((e) => e !== email));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    inputType: string
  ) => {
    if (e.key === " ") {
      e.preventDefault();
      const value = e.currentTarget.value;
      if (value.trim().length > 0) {
        if (inputType === "tags") {
          setTags((prevTags) => [...prevTags, value.trim()]);
        } else if (inputType === "accessEmails" && isValidEmail(value.trim())) {
          setAccessEmails((prevEmails) => [...prevEmails, value.trim()]);
          setInvalidEmailAlert(false);
        } else {
          setInvalidEmailAlert(true);
        }
        e.currentTarget.value = "";
      }
    }
  };

  const isSubmitDisabled = !quizTitle || !quizDescription;

  const handleContinueClick = () => {
    setQuizCreationFormData({
      quizTitle,
      quizDescription,
      selectedCategory,
      subCategory,
      selectedDifficulty,
      visibility,
      duration,
      tags,
      accessEmails,
    });
    handleContinue();
  };

  return (
    <div className="flex flex-col gap-2 border-2 p-5 rounded-2xl border-dark/30 dark:border-main/30 max-w-[800px] w-full">
      <Label className="text-lg font-normal" htmlFor="title">
        Quiz Title
      </Label>
      <Input
        type="text"
        id="title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        placeholder="e.g. English Language Quiz"
        required
      />
      <Label className="text-lg font-normal" htmlFor="description">
        Quiz Description
      </Label>
      <Textarea
        rows={3}
        id="description"
        value={quizDescription}
        onChange={(e) => setQuizDescription(e.target.value)}
        placeholder="e.g. Simple English Language Quiz. Contents: Pronouns, synonyms and antonyms etc."
        required
      />
      <Label className="text-lg font-normal" htmlFor="category">
        Category
      </Label>
      <select
        className="rounded-lg border py-2 px-2"
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        required
      >
        <option value="" disabled>
          Select category
        </option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <Label className="text-lg font-normal" htmlFor="subCategory">
        Subcategory
      </Label>
      <Input
        type="text"
        id="subCategory"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
        placeholder="e.g. Grammar"
        required
      />
      <Label className="text-lg font-normal" htmlFor="difficulty">
        Difficulty
      </Label>
      <select
        className="rounded-lg border py-2 px-2"
        id="difficulty"
        value={selectedDifficulty}
        onChange={handleDifficultyChange}
        required
      >
        <option value="" disabled>
          Select difficulty
        </option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <Label className="text-lg font-normal" htmlFor="visibility">
        Visibility
      </Label>
      <select
        className="rounded-lg border py-2 px-2"
        id="visibility"
        value={visibility}
        onChange={handleVisibilityChange}
        required
      >
        <option value="" disabled>
          Select visibility
        </option>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
      </select>
      {isTagsVisible && (
        <>
          <Label className="text-lg font-normal" htmlFor="tags">
            Tags
          </Label>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="bg-blue-500 text-white py-1 px-3 rounded-full flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="focus:outline-none"
                >
                  &#x2715;
                </button>
              </div>
            ))}
          </div>
          <Input
            type="text"
            id="tags"
            placeholder="e.g. English, Grammar, Vocabulary"
            onKeyDown={(e) => handleKeyDown(e, "tags")}
          />
        </>
      )}
      {isPrivate && (
        <>
          <Label className="text-lg font-normal" htmlFor="accessEmails">
            Access Emails
          </Label>
          <div className="flex gap-2">
            {accessEmails.map((email) => (
              <div
                key={email}
                className="bg-blue-500 text-white py-1 px-3 rounded-full flex items-center gap-1"
              >
                {email}
                <button
                  type="button"
                  onClick={() => handleAccessEmailRemove(email)}
                  className="focus:outline-none"
                >
                  &#x2715;
                </button>
              </div>
            ))}
          </div>
          <Input
            type="text"
            id="accessEmails"
            placeholder="e.g. user@example.com"
            onKeyDown={(e) => handleKeyDown(e, "accessEmails")}
          />
          {invalidEmailAlert && (
            <p className="text-sm text-red-500 mt-1">
              Please enter a valid email address.
            </p>
          )}
        </>
      )}
      <Label className="text-lg font-normal" htmlFor="duration">
        Duration (minutes)
      </Label>
      <Input
        type="number"
        id="duration"
        value={duration || ""}
        onChange={(e) => setDuration(parseInt(e.target.value, 10))}
        placeholder="e.g. 15"
        required
      />
      <div className="flex justify-between mt-4">
        <Button onClick={handleContinueClick} disabled={isSubmitDisabled}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default QuizUpdateForm;
