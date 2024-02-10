"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdOutlineMenuOpen } from "react-icons/md";
import SidebarLinks from "./SidebarLinks";
import { useToast } from "../ui/use-toast";

const Sidebar = () => {
  const { toast } = useToast();
  const router = useRouter();
  const currentRoute = usePathname();
  const { signout, user } = UserAuth();
  const [open, setOpen] = useState(false);
  const handleSidebar = () => {
    setOpen(!open);
  };
  const handleSignOut = async () => {
    try {
      await signout();
      toast({
        title: "Signed Out!",
        description: "You have successfully signed out",
        variant: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something Went Wrong! Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  const textStyle = `font-semibold ${open ? "flex" : "hidden"}`;

  return (
    <>
      <Sheet>
        <SheetTrigger className="z-[1999]">
          <MdOutlineMenuOpen
            size={35}
            className="absolute top-4 right-5 cursor-pointer block lg:hidden text-first"
          />
        </SheetTrigger>
        <SheetContent className="w-[200px] z-[2000]">
          <SidebarLinks
            currentRoute={currentRoute}
            textStyle={"font-semibold"}
            handleSignOut={handleSignOut}
            routerPush={(path: string) => router.push(path)}
            user={user}
          />
        </SheetContent>
      </Sheet>
      <aside
        className={`hidden lg:block border-r border-r-dark dark:border-r-main sticky h-screen p-5 pt-14 top-0 bottom-0 left-0 duration-300 z-[2000] ${
          open ? "w-36" : "w-16"
        }`}
      >
        <BsArrowLeftShort
          className={`text-black dark:text-white bg-background border-l-2 border-l-black dark:border-l-white text-3xl rounded-full cursor-pointer absolute -right-[14px] top-9 transition-all duration-300 ${
            !open && "rotate-180"
          }`}
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
};

export default Sidebar;
