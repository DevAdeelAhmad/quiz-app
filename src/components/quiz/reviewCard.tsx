import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ReviewCard({questions,selectedAnswers,handleSubmit}) {
  return (
    <Card className="mx-20 w-[90%] rounded-3xl ">
      <CardContent className="m-10  rounded-xl grid gap-4 bg-zinc-200">
            <h2 className="my-5 font-medium uppercase leading-none">
              Question Review
            </h2>

            <div>
                {
                    questions?.map((question,index)=>{
                        return (
                            <div key={index}>
                                <h3 className="my-2">Question {question.id}: <span className="ml-3">{selectedAnswers[question.id]}</span></h3>
                            </div>
                        )
                    })
                }
            </div>
       
        
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-10">
        <Button className="rounded-full px-10 bg-red-600 hover:bg-green-600" onClick={handleSubmit}>Send</Button>
        
      </CardFooter>
    </Card>
  )
}
