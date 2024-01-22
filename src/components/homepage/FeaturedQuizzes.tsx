import SingleFeaturedQuiz from './SingleFeaturedQuiz'

const data = [
    {
        creatorName: "John Doe",
        quizName: "HTML Basics 1",
        time: "10m",
        rating: 4.5,
        quizImageUrl: "/assets/quiz-img-temp.jpg",
        creatorImgUrl: "/assets/pfp.png",
        isFavorite: true
    },
    {
        creatorName: "John Doe 1",
        quizName: "HTML Basics 2",
        time: "15m",
        rating: 5,
        quizImageUrl: "/assets/quiz-img-temp.jpg",
        creatorImgUrl: "/assets/pfp.png",
        isFavorite: false
    },
    {
        creatorName: "John Doe 2",
        quizName: "HTML Basics 3",
        time: "12m",
        rating: 4.9,
        quizImageUrl: "/assets/quiz-img-temp.jpg",
        creatorImgUrl: "/assets/pfp.png",
        isFavorite: true
    },
    {
        creatorName: "John Doe 3",
        quizName: "HTML Basics 4",
        time: "20m",
        rating: 4.8,
        quizImageUrl: "/assets/quiz-img-temp.jpg",
        creatorImgUrl: "/assets/pfp.png",
        isFavorite: false
    },
]

const FeaturedQuizzes = () => {
    return (
        <section className='flex flex-col gap-5 p-5 lg:p-10 items-center'>
            <h1 className='text-2xl lg:text-3xl font-semibold'>Featured Quizzes</h1>
            <div className="flex gap-5 flex-wrap items-center justify-center w-full">
                {data.map((quiz, index) => (
                    <SingleFeaturedQuiz key={index} isFavorite={quiz.isFavorite} creatorImgUrl={quiz.creatorImgUrl} creatorName={quiz.creatorName} quizName={quiz.quizName} quizImageUrl={quiz.quizImageUrl} rating={quiz.rating} time={quiz.time} />
                ))}
            </div>
        </section>
    )
}

export default FeaturedQuizzes