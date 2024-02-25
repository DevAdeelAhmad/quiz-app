import React from "react";
import Confetti from "react-confetti";
import { Button } from "../ui/button";
import Link from "next/link";

const QuizUpdationComplete = () => {
  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={1000}
      />
      <section className="w-full flex flex-col gap-10 py-20 items-center justify-center">
        <h1 className="text-4xl font-bold">Congratulations!</h1>
        <h4 className="text-2xl font-semibold">Your quiz is Updated.</h4>
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
          <Link href={"/profile"}>
            <Button>See Updated Profile</Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default QuizUpdationComplete;
