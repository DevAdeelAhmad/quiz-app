import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
const SignUpPage = () => {
  return (
    <main className="flex items-center justify-between min-h-screen w-full text-center">
      {/* Left */}
      <div className="flex-1 hidden lg:flex flex-col items-center justify-center min-h-screen gap-10 bg-[#ee0022] px-2">
        <Image
          src="/assets/auth/auth-illustration.png"
          width={400}
          height={400}
          alt="Illustration"
        />
        <h1 className="text-white font-bold text-5xl">Welcome to Quizzy!</h1>
        <span className="text-white">
          Easy to create and take quizzes online
        </span>
      </div>
      {/* Right */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen gap-3 px-2">
        <h1 className="font-bold text-4xl">Sign Up</h1>
        <SignUp />
      </div>
    </main>
  );
};

export default SignUpPage;
