import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import getCategories from '@/lib/getCategories'
import React, { useEffect, useState } from 'react'

interface QuizCreationFormProps {
    onContinue: (formData: any) => void;
    initialQuestionData?: any;
}

const QuizCreationForm: React.FC<QuizCreationFormProps> = ({ onContinue, initialQuestionData }) => {
    const [quizTitle, setQuizTitle] = useState(initialQuestionData?.quizTitle || '');
    const [quizDescription, setQuizDescription] = useState(initialQuestionData?.quizDescription || '');
    const [selectedCategory, setSelectedCategory] = useState(initialQuestionData?.selectedCategory || '');
    const [subCategory, setSubCategory] = useState(initialQuestionData?.subCategory || '');
    const [selectedDifficulty, setSelectedDifficulty] = useState(initialQuestionData?.selectedDifficulty || '');
    const [duration, setDuration] = useState(initialQuestionData?.duration || '');
    const [categories, setCategories] = useState<{ name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDifficulty(e.target.value);
    };

    const isSubmitDisabled = !quizTitle;
    // const isSubmitDisabled = !quizTitle || !quizDescription || !selectedCategory || !subCategory || !selectedDifficulty || !duration;

    return (
        <div className="flex flex-col gap-2 border-2 p-5 rounded-2xl max-w-[800px] w-full">
            <Label className='text-lg font-normal' htmlFor='title'>Quiz Title</Label>
            <Input type='text' id='title' value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} placeholder='e.g. English Language Quiz' required />
            <Label className='text-lg font-normal' htmlFor='description'>Quiz Description</Label>
            <Textarea rows={3} id='description' value={quizDescription} onChange={(e) => setQuizDescription(e.target.value)} placeholder='e.g. Simple English Language Quiz. Contents: Pronouns, synonyms and antonyms etc.' required />
            <Label className='text-lg font-normal' htmlFor='category'>Category</Label>
            <select className="rounded-lg border py-2 px-2" id='category' value={selectedCategory} onChange={handleCategoryChange} required>
                <option value="" disabled>Select a Category</option>
                {categories && categories.length > 0 ? (
                    categories.map((category, index) => (
                        <option className='text-black py-1' key={index} value={category.name}>
                            {category.name}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>Loading Categories...</option>
                )}
            </select>
            <Label className='text-lg font-normal' htmlFor='sub-category'>Sub Category</Label>
            <Input type='text' id='sub-category' value={subCategory} placeholder='e.g. HTML, Algebra, or Astrology etc.' onChange={(e) => setSubCategory(e.target.value)} required />
            <Label className='text-lg font-normal' htmlFor='difficulty'>Difficulty Level</Label>
            <select className="rounded-lg border py-2 px-2" id='difficulty' value={selectedDifficulty} onChange={handleDifficultyChange} required>
                <option value="" disabled>Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Normal">Normal</option>
                <option value="Hard">Hard</option>
            </select>
            <Label className='text-lg font-normal' htmlFor='duration'>Duration</Label>
            <Input type='number' id='duration' value={duration} onChange={(e) => setDuration(e.target.value)} placeholder='Average Time in Minutes' required />
            <div className="flex w-full items-center justify-center">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button type='submit' disabled={isSubmitDisabled} className='text-white font-semibold !max-w-[100px] py-2'>Create Quiz</Button>
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
                            <AlertDialogAction onClick={() => onContinue({ quizTitle, quizDescription, selectedCategory, subCategory, selectedDifficulty, duration })}>
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
