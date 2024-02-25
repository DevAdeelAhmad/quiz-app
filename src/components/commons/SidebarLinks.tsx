import { UserButton } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { FaList } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { ImStatsDots } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { VscSignIn } from "react-icons/vsc";
import ThemeSwitcher from "./ThemeSwitcher";
interface SidebarLinksProps {
  currentRoute: string;
  textStyle: string;
  routerPush?: (path: string) => void;
  user?: UserResource | null;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({
  currentRoute,
  textStyle,
  routerPush,
  user,
}) => {
  return (
    <div className="flex flex-col gap-10 pt-14 w-full items-start justify-center">
      <Link
        className={`flex items-center gap-2 ${
          currentRoute === "/" ? "text-second" : "text-dark dark:text-main"
        }`}
        href="/"
      >
        <GoHomeFill size={25} />
        <span className={textStyle}>Home</span>
      </Link>
      <Link
        className={`flex items-center gap-2 ${
          currentRoute === "/search"
            ? "text-second"
            : "text-dark dark:text-main"
        }`}
        href="/search"
      >
        <IoSearch size={25} />
        <span className={textStyle}>Search</span>
      </Link>
      <Link
        className={`flex items-center gap-2 ${
          currentRoute === "/create"
            ? "text-second"
            : "text-dark dark:text-main"
        }`}
        href="/create"
      >
        <BiPlus size={25} />
        <span className={textStyle}>Create</span>
      </Link>
      <Link
        className={`flex items-center gap-2 ${
          currentRoute === "/results"
            ? "text-second"
            : "text-dark dark:text-main"
        }`}
        href="/results"
      >
        <FaList size={25} />
        <span className={textStyle}>Results</span>
      </Link>
      <Link
        className={`flex items-center gap-2 ${
          currentRoute === "/stats" ? "text-second" : "text-dark dark:text-main"
        }`}
        href="/stats"
      >
        <ImStatsDots size={23} />
        <span className={textStyle}>Statistics</span>
      </Link>
      <div className="flex gap-1 items-center absolute bottom-36 left-3">
        <ThemeSwitcher classes={"rounded-lg"} />
        <span className={textStyle}>Theme</span>
      </div>
      <Link
        className="absolute bottom-24 flex items-center gap-2 cursor-pointer text-dark dark:text-main"
        href={"/profile"}
      >
        <RiUserSettingsLine size={30} />{" "}
        <span className={textStyle}>Profile</span>
      </Link>
      {user ? (
        <div className="absolute bottom-10 flex items-center gap-2 cursor-pointer text-third">
          <UserButton afterSignOutUrl="/" />
          <span className={textStyle}>Settings</span>
        </div>
      ) : (
        <Link
          href={"/sign-in"}
          className="absolute bottom-10 flex items-center gap-2 cursor-pointer text-third"
        >
          <VscSignIn size={30} />
          <span className={textStyle}>SignIn</span>
        </Link>
      )}
    </div>
  );
};

export default SidebarLinks;
