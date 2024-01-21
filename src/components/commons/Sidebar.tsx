"use client"
import { UserAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { BiPlus } from "react-icons/bi";
import { BsArrowLeftShort } from 'react-icons/bs';
import { FaList } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { ImStatsDots } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
import { VscSignIn, VscSignOut } from "react-icons/vsc";


const Sidebar = () => {
    const router = useRouter();
    const currentRoute = usePathname();
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
    const generalStyle = "flex items-center gap-2"
    const activeStyle = "text-second"
    const nonActiveStyle = "text-black"
    const textStyle = `font-semibold ${open ? "flex" : "hidden"}`
    return (
        <aside className={`hidden lg:block border-r border-r-gray-300 sticky h-screen p-5 pt-14 top-0 bottom-0 left-0 duration-300 ${open ? "w-36" : "w-16"}`}>
            <BsArrowLeftShort className={`text-white bg-first text-3xl rounded-full cursor-pointer absolute -right-[14px] top-9 transition-all duration-300 ${!open && "rotate-180"}`} onClick={handleSidebar} />
            <div className="flex flex-col gap-10 pt-14 w-full items-start justify-center">
                <Link className={`${generalStyle} ${currentRoute === '/' ? activeStyle : nonActiveStyle}`} href="/">
                    <GoHomeFill size={25} />
                    <span className={textStyle}>Home</span>
                </Link>
                <Link className={`${generalStyle} ${currentRoute === '/search' ? activeStyle : nonActiveStyle}`} href="/search">
                    <IoSearch size={25} />
                    <span className={textStyle}>Search</span>
                </Link>
                <Link className={`${generalStyle} ${currentRoute === '/create' ? activeStyle : nonActiveStyle}`} href="/create">
                    <BiPlus size={25} />
                    <span className={textStyle}>Create</span>
                </Link>
                <Link className={`${generalStyle} ${currentRoute === '/results' ? activeStyle : nonActiveStyle}`} href="/results">
                    <FaList size={25} />
                    <span className={textStyle}>Results</span>
                </Link>
                <Link className={`${generalStyle} ${currentRoute === '/stats' ? activeStyle : nonActiveStyle}`} href="/stats">
                    <ImStatsDots size={23} />
                    <span className={textStyle}>Statistics</span>
                </Link>
                {user ? (
                    <div onClick={handleSignOut} className='absolute bottom-10 flex items-center gap-2 cursor-pointer text-third'>
                        <VscSignOut size={30} />
                        <span className={textStyle}>SignOut</span>
                    </div>
                ) : (
                    <div onClick={() => router.push("/signin")} className='absolute bottom-10 flex items-center gap-2 cursor-pointer text-third'>
                        <VscSignIn size={30} />
                        <span className={textStyle}>SignIn</span>
                    </div>
                )
                }
            </div>
        </aside>
    )
}

export default Sidebar