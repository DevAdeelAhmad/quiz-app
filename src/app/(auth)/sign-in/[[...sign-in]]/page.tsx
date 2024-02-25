import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
const SignInPage = () => {
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
        <h1 className="text-white font-bold text-5xl">
          Welcome Back to Quizzy!
        </h1>
        <span className="text-white">
          Easy to create and take quizzes online
        </span>
      </div>
      {/* Right */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen gap-10 px-2">
        <Image
          className="flex lg:hidden"
          src="/assets/logo-transparent.png"
          width={100}
          height={100}
          alt="Logo"
        />
        <h1 className="font-bold text-4xl">Sign In</h1>
        <SignIn />
      </div>
    </main>
  );
};

export default SignInPage;
