"use client"
import Sidebar from '@/components/commons/Sidebar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectGroup, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import getCategories from '@/lib/getCategories';
import React, { useEffect, useState } from 'react'

interface Category {
    id: string;
    categoryLink: string;
    imageUrl: string;
    name: string;
}

const CreateQuizPage = () => {
    let [categories, setCategories] = useState<Category[] | null>(null);
    const other = {
        id: "8",
        name: "Others",
        categoryLink: "",
        imageUrl: ""
    }
    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = await getCategories();
            categoriesData.push(other);
            setCategories(categoriesData);
        };
        fetchCategories();
    }, []);
    return (
        <main className='flex min-h-screen w-full'>
            <Sidebar />
            <div className="flex flex-col items-center w-full py-10 gap-5">
                <h1 className='text-2xl lg:text-3xl font-semibold'>Create A Quiz</h1>
                <div className="flex flex-col gap-2 border-2 p-5 rounded-2xl max-w-[800px] w-full">
                    <Label className='text-lg font-normal' htmlFor='title'>Quiz Title</Label>
                    <Input type='text' id='title' placeholder='e.g. English Language Quiz' required />
                    <Label className='text-lg font-normal' htmlFor='description'>Quiz Description</Label>
                    <Textarea rows={3} id='description' placeholder='e.g. Simple English Language Quiz. Contents include: Pronouns, synonyms and antonyms etc. ' />
                    <Label className='text-lg font-normal' htmlFor='category'>Pick a Category</Label>
                    <Select>
                        <SelectTrigger id='category'>
                            <SelectValue placeholder="Pick a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories && categories.length > 0 ? (
                                    categories.map((category, index) => (
                                        <SelectItem className='text-black' key={index} value={category.name}>{category.name}</SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="Loading...">Loading...</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </main>
    )
}

export default CreateQuizPage

