import React from 'react'
import Confetti from 'react-confetti'
import { Button } from '../ui/button'
import Link from 'next/link'
const QuizCreationComplete = () => {
  return (
    <>
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000} />
      <section className='w-full flex flex-col gap-10 py-20 items-center justify-center'>
        <h1 className='text-4xl font-bold'>Congratulations!</h1>
        <h4 className='text-2xl font-semibold'>Your form is published.</h4>
        <Link href={"/"}>
          <Button>Go to Homepage</Button>
        </Link>
      </section>
    </>
  )
}

export default QuizCreationComplete