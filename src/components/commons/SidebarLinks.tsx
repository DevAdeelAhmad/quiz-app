import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { FaList } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { ImStatsDots } from "react-icons/im";
import { IoSearch } from "react-icons/io5";
import { VscSignIn, VscSignOut } from "react-icons/vsc";
import { RiUserSettingsLine } from "react-icons/ri";
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
import ThemeSwitcher from "./ThemeSwitcher";
interface SidebarLinksProps {
  currentRoute: string;
  textStyle: string;
  handleSignOut?: () => void;
  routerPush?: (path: string) => void;
  user?: typeof UserAuth | null;
}

const SidebarLinks: React.FC<SidebarLinksProps> = ({
  currentRoute,
  textStyle,
  handleSignOut,
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="absolute bottom-10 flex items-center gap-2 cursor-pointer text-dark dark:text-main">
              <VscSignOut size={30} />
              <span className={textStyle}>SignOut</span>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Continuing will log you out from your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSignOut}>
                Sign Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Link
          href={"/signin"}
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
