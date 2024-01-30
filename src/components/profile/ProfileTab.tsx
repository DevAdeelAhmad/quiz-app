import { UserAuth } from "@/context/AuthContext"
import Image from "next/image";
import { FaPenSquare } from "react-icons/fa";

const ProfileTab = () => {
  const { user } = UserAuth();
  return (
    <div className='w-full flex flex-col gap-5 justify-center border rounded-xl p-5'>
      <h1 className='text-xl lg:text-2xl font-semibold text-center'>Profile Settings</h1>
      <div className="flex flex-col gap-2 w-full justify-center">
        <div className="flex items-center justify-center w-full gap-5">
          <div className="relative">
            <Image className="rounded-full border-2 border-first" src={'/assets/default-profile.png'} width={100} height={100} alt="Profile Image" />
            <FaPenSquare size={30} className="absolute top-0 right-0 text-black cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileTab