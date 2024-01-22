import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserAuth } from '@/context/AuthContext';
import { BiPlus } from 'react-icons/bi';
import { FaList } from 'react-icons/fa6';
import { GoHomeFill } from 'react-icons/go';
import { ImStatsDots } from 'react-icons/im';
import { IoSearch } from 'react-icons/io5';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';

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
}) => (
  <div className="flex flex-col gap-10 pt-14 w-full items-start justify-center">
    <Link className={`flex items-center gap-2 ${currentRoute === '/' ? 'text-second' : 'text-black'}`} href="/">
      <GoHomeFill size={25} />
      <span className={textStyle}>Home</span>
    </Link>
    <Link className={`flex items-center gap-2 ${currentRoute === '/search' ? 'text-second' : 'text-black'}`} href="/search">
      <IoSearch size={25} />
      <span className={textStyle}>Search</span>
    </Link>
    <Link className={`flex items-center gap-2 ${currentRoute === '/create' ? 'text-second' : 'text-black'}`} href="/create">
      <BiPlus size={25} />
      <span className={textStyle}>Create</span>
    </Link>
    <Link className={`flex items-center gap-2 ${currentRoute === '/results' ? 'text-second' : 'text-black'}`} href="/results">
      <FaList size={25} />
      <span className={textStyle}>Results</span>
    </Link>
    <Link className={`flex items-center gap-2 ${currentRoute === '/stats' ? 'text-second' : 'text-black'}`} href="/stats">
      <ImStatsDots size={23} />
      <span className={textStyle}>Statistics</span>
    </Link>
    {user ? (
      <div onClick={handleSignOut} className="absolute bottom-10 flex items-center gap-2 cursor-pointer text-third">
        <VscSignOut size={30} />
        <span className={textStyle}>SignOut</span>
      </div>
    ) : (
      <div onClick={() => routerPush?.('/signin')} className="absolute bottom-10 flex items-center gap-2 cursor-pointer text-third">
        <VscSignIn size={30} />
        <span className={textStyle}>SignIn</span>
      </div>
    )}
  </div>
);

export default SidebarLinks;
