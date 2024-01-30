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

interface QuizCreationFormProps {
    onContinue: (formData: any) => void;
    initialQuestionData?: any;
}

const QuizCreationForm: React.FC<QuizCreationFormProps> = ({
    onContinue,
    initialQuestionData,
}) => {
    const [quizTitle, setQuizTitle] = useState(
        initialQuestionData?.quizTitle || ""
    );
    const [quizDescription, setQuizDescription] = useState(
        initialQuestionData?.quizDescription || ""
    );
    const [selectedCategory, setSelectedCategory] = useState(
        initialQuestionData?.selectedCategory || ""
    );
    const [subCategory, setSubCategory] = useState(
        initialQuestionData?.subCategory || ""
    );
    const [selectedDifficulty, setSelectedDifficulty] = useState(
        initialQuestionData?.selectedDifficulty || ""
    );
    const [visibility, setVisibility] = useState(
        initialQuestionData?.visibility || ""
    );
    const [duration, setDuration] = useState(
        initialQuestionData?.duration || 0
    );
    const [tags, setTags] = useState<string[]>(
        initialQuestionData?.tags || []
    );
    const [accessEmails, setAccessEmails] = useState<string[]>(
        initialQuestionData?.accessEmails || []
    );
    const [categories, setCategories] = useState<{ name: string }[]>([]);
    const [isPrivate, setIsPrivate] = useState(
        initialQuestionData?.visibility === "Private" || false
    );
    const [isTagsVisible, setIsTagsVisible] = useState(
        initialQuestionData?.visibility === "Public" || false
    );
    const [isAccessEmailsVisible, setIsAccessEmailsVisible] = useState(
        initialQuestionData?.visibility === "Private" || false
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

    const handleCategoryChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedCategory(e.target.value);
    };

    const handleDifficultyChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedDifficulty(e.target.value);
    };

    const handleVisibilityChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
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
        if (e.key === "Enter") {
            e.preventDefault();
            const value = e.currentTarget.value;
            if (value.trim().length > 0) {
                if (inputType === "tags") {
                    setTags((prevTags) => [...prevTags, value.trim()]);
                } else if (
                    inputType === "accessEmails" &&
                    isValidEmail(value.trim())
                ) {
                    setAccessEmails((prevEmails) => [...prevEmails, value.trim()]);
                    setInvalidEmailAlert(false);
                } else {
                    setInvalidEmailAlert(true);
                }
                e.currentTarget.value = "";
            }
        }
    };

    const isSubmitDisabled =
        !quizTitle ||
        !quizDescription ||
        !selectedCategory ||
        !subCategory ||
        !selectedDifficulty ||
        !duration ||
        (isPrivate && accessEmails.length === 0) ||
        (isTagsVisible && tags.length === 0);

    return (
        <div className="flex flex-col gap-2 border-2 p-5 rounded-2xl max-w-[800px] w-full">
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
                    Select a Category
                </option>
                {categories && categories.length > 0 ? (
                    categories.map((category, index) => (
                        <option
                            className="text-black py-1"
                            key={index}
                            value={category.name}
                        >
                            {category.name}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>
                        Loading Categories...
                    </option>
                )}
            </select>
            <Label className="text-lg font-normal" htmlFor="sub-category">
                Sub Category
            </Label>
            <Input
                type="text"
                id="sub-category"
                value={subCategory}
                placeholder="e.g. HTML, Algebra, or Astrology etc."
                onChange={(e) => setSubCategory(e.target.value)}
                required
            />
            <Label className="text-lg font-normal" htmlFor="difficulty">
                Difficulty Level
            </Label>
            <select
                className="rounded-lg border py-2 px-2"
                id="difficulty"
                value={selectedDifficulty}
                onChange={handleDifficultyChange}
                required
            >
                <option value="" disabled>
                    Select Difficulty
                </option>
                <option value="Easy">Easy</option>
                <option value="Normal">Normal</option>
                <option value="Hard">Hard</option>
            </select>
            <Label className="text-lg font-normal" htmlFor="visibility">
                Set Visibility
            </Label>
            <select
                className="rounded-lg border py-2 px-2"
                id="visibility"
                value={visibility}
                onChange={handleVisibilityChange}
                required
            >
                <option value="" disabled>
                    Select Visibility
                </option>
                <option disabled value="Public">Public</option>
                <option value="Private">Private</option>
            </select>
            {isTagsVisible && (
                <div>
                    <Label className="text-lg font-normal" htmlFor="tags">
                        Tags <span className="text-sm md:text-sm">(Press Enter to add multiple tags)</span>
                    </Label>
                    <Input
                        type="text"
                        id="tags"
                        name="tags"
                        onKeyDown={(e) => handleKeyDown(e, "tags")}
                        placeholder="e.g. Tag1 Tag2"
                        required
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 bg-gray-200 rounded-md p-2"
                            >
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    onClick={() => handleTagRemove(tag)}
                                    className="text-red-500"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {isAccessEmailsVisible && (
                <div>
                    <Label className="text-lg font-normal" htmlFor="accessEmails">
                        Access Emails <span className="text-sm md:text-sm">(Press Enter to add multiple emails)</span>
                    </Label>
                    <Input
                        type="text"
                        id="accessEmails"
                        onKeyDown={(e) => handleKeyDown(e, "accessEmails")}
                        placeholder="e.g. user@example.com"
                        required
                    />
                    {invalidEmailAlert && (
                        <div className="text-red-500">Invalid email format</div>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {accessEmails.map((email, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 bg-gray-700 text-white rounded-md p-2"
                            >
                                <span>{email}</span>
                                <button
                                    type="button"
                                    onClick={() => handleAccessEmailRemove(email)}
                                    className="text-red-500"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Label className="text-lg font-normal" htmlFor="duration">
                Duration
            </Label>
            <Input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Average Time in Minutes"
                required
            />
            <div className="flex w-full items-center justify-center">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            type="submit"
                            disabled={isSubmitDisabled}
                            className="text-white font-semibold !max-w-[100px] py-2"
                        >
                            Create Quiz
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-sm:max-w-[280px] rounded-xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Continuing will take you to the create quiz page.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() =>
                                    onContinue({
                                        quizTitle,
                                        quizDescription,
                                        selectedCategory,
                                        subCategory,
                                        selectedDifficulty,
                                        duration,
                                        visibility,
                                        ...(visibility === "Public" && { tags }),
                                        ...(visibility === "Private" && { accessEmails }),
                                    })
                                }
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default QuizCreationForm;
