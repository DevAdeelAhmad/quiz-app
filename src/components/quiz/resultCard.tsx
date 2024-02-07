import {Card} from "@/components/ui/card"
import Ratings from "./ratings"
import { Quiz } from "@/lib/interfaces";

interface ResultCard {
  quiz:Quiz
  totalScore:number;
  obtainedScore:number;
  message:string
}

export default function ResultCard({quiz,totalScore,obtainedScore,message}:ResultCard) {


  return (
    <Card className="mx-20 w-[90%] h-[70%] rounded-3xl min-h-36 shadow-2xl">
      
            <h2 className="text-2xl my-20 text-center font-bold uppercase leading-none">
               {obtainedScore} out of {totalScore}
            </h2>
            <h1 className=" text-4xl font-bold text-center">{message}</h1>

            <Ratings className="flex items-center justify-center mt-24" quiz={quiz}/>
    </Card>
  )
}
