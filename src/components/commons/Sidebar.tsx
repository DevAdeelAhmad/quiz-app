"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { MdOutlineMenuOpen } from "react-icons/md";
import SidebarLinks from './SidebarLinks';
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
    const textStyle = `font-semibold ${open ? "flex" : "hidden"}`;

    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <MdOutlineMenuOpen size={35} className='absolute top-4 right-5 cursor-pointer block lg:hidden text-first' />
                </SheetTrigger>
                <SheetContent className='w-[200px]'>
                    <SidebarLinks
                        currentRoute={currentRoute}
                        textStyle={"font-semibold"}
                        handleSignOut={handleSignOut}
                        routerPush={(path: string) => router.push(path)}
                        user={user}
                    />
                </SheetContent>
            </Sheet>
            <aside className={`hidden lg:block border-r border-r-gray-300 sticky h-screen p-5 pt-14 top-0 bottom-0 left-0 duration-300 ${open ? "w-36" : "w-16"}`}>
                <BsArrowLeftShort
                    className={`text-white bg-first text-3xl rounded-full cursor-pointer absolute -right-[14px] top-9 transition-all duration-300 ${!open && "rotate-180"}`}
                    onClick={handleSidebar}
                />
                <SidebarLinks
                    currentRoute={currentRoute}
                    textStyle={textStyle}
                    handleSignOut={handleSignOut}
                    routerPush={(path: string) => router.push(path)}
                    user={user}
                />
            </aside>
        </>
    );
}

export default Sidebar;
