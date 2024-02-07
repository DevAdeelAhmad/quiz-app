import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GrHomeRounded } from "react-icons/gr";
import Image from "next/image";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/assets/404.svg"
        alt="404 Not Found"
        className="w-72 h-72"
        width={300}
        height={300}
      />
      <div className="-mt-4 flex flex-col justify-center gap-2 items-center px-5 text-center">
        <h1 className="text-3xl font-semibold text-center">404 - Not Found</h1>
        <p className="text-dark dark:text-gray-400 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link className="flex gap-3 justify-center align-middle" href="/">
          <Button className="bg-[#ee0022] text-white font-semibold rounded-3xl hover:bg-[#ee0022]/60">
            Go to Home <GrHomeRounded className="mr-2 ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
