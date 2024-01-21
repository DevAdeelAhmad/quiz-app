"use client"
import Link from 'next/link';
import React from 'react'
import { useState } from 'react'
import { UserAuth } from '@/context/AuthContext'

import { BsArrowLeftShort } from 'react-icons/bs'
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { BiPlus } from "react-icons/bi";
import { FaList } from "react-icons/fa6";
import { ImStatsDots } from "react-icons/im";
import Image from 'next/image';
import { VscSignOut } from "react-icons/vsc";
import { VscSignIn } from "react-icons/vsc";


const Sidebar = () => {
    const { signout, user } = UserAuth();
    const [open, setOpen] = useState(false);
    const handleSidebar = () => {
        setOpen(!open);
    }
    const handleSignOut = async () => {
        try {
            await signout();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <aside className={`border-r border-r-gray-300 sticky h-screen p-5 pt-14 top-0 bottom-0 duration-300 ${open ? "w-36" : "w-20"}`}>
            <BsArrowLeftShort className={`text-white bg-fuchsia-500 text-3xl rounded-full cursor-pointer absolute -right-[14px] top-9 transition-all duration-300 ${!open && "rotate-180"}`} onClick={handleSidebar} />
            <Link className='flex items-center gap-2 duration-300 w-full justify-center' href='/'>
                <Image src='/assets/logo-transparent.png' width={38} height={38} alt='logo' />
                <span className={`italic font-semibold ${open ? "flex" : "hidden"}`}>Quizify</span>
            </Link>
            <div className="flex flex-col gap-10 pt-10 w-full">
                <Link className='flex items-center gap-2' href="/">
                    <GoHomeFill color='black' size={25} />
                    <span className={`font-semibold ${open ? "flex" : "hidden"}`}>Home</span>
                </Link>
                <Link className='flex items-center gap-2' href="/search">
                    <IoSearch color='black' size={25} />
                    <span className={`font-semibold ${open ? "flex" : "hidden"}`}>Search</span>
                </Link>
                <Link className='flex items-center gap-2' href="/create">
                    <BiPlus color='black' size={30} />
                    <span className={`font-semibold ${open ? "flex" : "hidden"}`}>Create</span>
                </Link>
                <Link className='flex items-center gap-2' href="/create">
                    <FaList color='black' size={23} />
                    <span className={`font-semibold ${open ? "flex" : "hidden"}`}>Results</span>
                </Link>
                <Link className='flex items-center gap-2' href="/create">
                    <ImStatsDots color='black' size={23} />
                    <span className={`font-semibold ${open ? "flex" : "hidden"}`}>Stats</span>
                </Link>
                <div onClick={handleSignOut} className='absolute bottom-10 flex items-center gap-2 cursor-pointer'>
                    <VscSignOut color='black' size={30} />
                    <span className={`font-semibold ${open ? "flex" : "hidden"}`}>Signout</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar