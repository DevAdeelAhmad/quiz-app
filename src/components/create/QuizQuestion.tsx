import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import { IoArrowBack, IoClose } from 'react-icons/io5';
interface QuizQuestionProps {
    onBack: () => void;
    onSubmit: (questions: Question[]) => void;
}
interface Question {
    id: number;
    question: string;
    options: string[];
    correctOptions: string[];
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ onBack, onSubmit }) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<string>('');
    const [currentOptions, setCurrentOptions] = useState<string[]>(['', '', '', '']);
    const [correctOptions, setCorrectOptions] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    useEffect(() => {
        const handleUnload = (event: BeforeUnloadEvent) => {
            if (
                currentQuestion.trim() !== '' ||
                currentOptions.some(option => option.trim() !== '') ||
                questions.length > 0
            ) {
                event.preventDefault();
                event.returnValue = 'All progress will be lost. Are you sure you want to leave?';
            }
        };
        const handleBackButton = () => {
            if (
                currentQuestion.trim() !== '' ||
                currentOptions.some(option => option.trim() !== '') ||
                questions.length > 0
            ) {
                const confirmLeave = window.confirm('All progress will be lost. Are you sure you want to leave?');
                if (!confirmLeave) {
                    return;
                }
            }
            onBack();
        };
        window.addEventListener('beforeunload', handleUnload);
        window.addEventListener('popstate', handleBackButton);
        return () => {
            window.removeEventListener('beforeunload', handleUnload);
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [currentQuestion, currentOptions, questions, onBack]);
    useEffect(() => {
        if (showAlert) {
            const timeoutId = setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [showAlert]);
    const handleAddOption = () => {
        if (currentOptions.length < 4) {
            setCurrentOptions([...currentOptions, '']);
        } else {
            setAlertMessage('Max allowed options are four.');
            setShowAlert(true);
        }
    };
    const handleRemoveOption = (index: number) => {
        const updatedOptions = currentOptions.filter((_, i) => i !== index);
        setCurrentOptions(updatedOptions);
    };
    const handleAddQuestion = () => {
        if (currentQuestion.trim() === '' || currentOptions.length < 2 || correctOptions.length === 0 || currentOptions.some(option => option.trim() === '')) {
            setAlertMessage('All fields are required. Choose at least 1 correct option.');
            setShowAlert(true);
            return;
        }
        const newQuestion: Question = {
            id: questions.length + 1,
            question: currentQuestion.trim(),
            options: currentOptions.map(option => option.trim()),
            correctOptions: correctOptions.map(option => option.trim()),
        };
        setQuestions([...questions, newQuestion]);
        setCurrentQuestion('');
        setCurrentOptions(['', '', '', '']);
        setCorrectOptions([]);
    };
    const handleRemoveQuestion = (questionId: number) => {
        const updatedQuestions = questions.filter(question => question.id !== questionId);
        setQuestions(updatedQuestions);
    };
    const handleBack = () => {
        if (
            currentQuestion.trim() !== '' ||
            currentOptions.some(option => option.trim() !== '') ||
            questions.length > 0
        ) {
            const confirmLeave = window.confirm('All progress will be lost. Are you sure you want to leave?');
            if (!confirmLeave) {
                return;
            }
        }
        onBack();
    };
    const handleSubmit = () => {
        if (questions.length === 0) {
            setAlertMessage('Please add at least one question.');
            setShowAlert(true);
            return;
        }
        onSubmit(questions);
    };
    const handleCheckboxChange = (option: string) => {
        if (currentOptions.some(opt => opt.trim() === '')) {
            setAlertMessage('Please add options before selecting the correct option.');
            setShowAlert(true);
            return;
        }
        setCorrectOptions((prevOptions) => {
            if (prevOptions.includes(option)) {
                return prevOptions.filter((opt) => opt !== option);
            } else {
                return [...prevOptions, option];
            }
        });
    };
    return (
        <div className="flex flex-col gap-4 border-2 p-5 rounded-2xl transition-all duration-300 max-w-[800px] w-full max-sm:mt-5">
            <div onClick={handleBack} className="flex items-center gap-2 cursor-pointer hover:underline">
                <IoArrowBack className="text-xl" />
                <span className=''>Go Back</span>
            </div>
            <span className='text-center'>Total Added Questions: {questions.length}</span>
            {showAlert && (
                <Alert variant={"destructive"}>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{alertMessage}</AlertDescription>
                </Alert>
            )}
            <div className="flex flex-col gap-2">
                <Label htmlFor="question">Question</Label>
                <Textarea id="question" value={currentQuestion} onChange={(e) => setCurrentQuestion(e.target.value)} rows={3} placeholder="Enter your question here..." />
            </div>
            {currentOptions.map((option, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <Label htmlFor={`option-${index + 1}`}>{`Option ${index + 1}`}</Label>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded-full text-black cursor-pointer" id={`correctOption-${index + 1}`} checked={correctOptions.includes(option)} onChange={() => handleCheckboxChange(option)} />
                        <Input id={`option-${index + 1}`} value={option} type="text" onChange={(e) => setCurrentOptions((prevOptions) => {
                            const updatedOptions = [...prevOptions];
                            updatedOptions[index] = e.target.value;
                            return updatedOptions;
                        })} />
                        {currentOptions.length > 2 && (
                            <IoClose size={20} onClick={() => handleRemoveOption(index)} className="cursor-pointer text-red-500" />
                        )}
                    </div>
                </div>
            ))}
            <div className="w-full flex flex-wrap items-center justify-center gap-5">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button type='submit' disabled={questions.length <= 0} className='bg-dark dark:bg-main text-main dark:text-dark font-semibold !max-w-[100px] py-2'>Submit</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-sm:max-w-[280px] rounded-xl border-dark dark:border-main">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Continuing will submit the quiz.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={(e: any) => {
                                e.preventDefault();
                                handleSubmit();
                            }}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button onClick={handleAddQuestion} className="text-white bg-blue-500 py-2">
                    Add Question
                </Button>
                <Button onClick={handleAddOption} disabled={currentOptions.length >= 5} className="text-white bg-green-500 py-2">
                    Add More Options
                </Button>
            </div>
            <div className="w-full">
                {questions.map(question => (
                    <div key={question.id} className="flex flex-col gap-2 border-2 p-4 rounded-md">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value={`question-${question.id}`}>
                                <AccordionTrigger>{question.question}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col gap-1">
                                        {question.options.map((option, index) => (
                                            <span key={option} className={`text-gray-600 ${question.correctOptions.includes(option) ? 'text-green-600 font-semibold' : ''}`}>
                                                {`Option ${index + 1}: ${option}`}
                                            </span>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Button onClick={() => handleRemoveQuestion(question.id)} variant={"destructive"}>
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizQuestion;
