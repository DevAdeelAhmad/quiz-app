#!/usr/bin/node
const admin = require("firebase-admin");

// interface DATA {}

admin.initializeApp({
  credential: admin.credential.cert(
    "E:\\Complete Web Apps\\quiz-app\\quiz-app-main\\quiz-app-a812c-firebase-adminsdk-yuqz2-bcf919491b.json"
  ),
});

const data = {
  categories: [
    {
      categoryLink: "/category/mathematics",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/quiz-nextjs-6cf08.appspot.com/o/math.jpg?alt=media&token=2630b0cd-4611-464f-81e7-82c4173b8b4a",
      name: "Mathematics",
    },
    {
      categoryLink: "/category/science",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/quiz-nextjs-6cf08.appspot.com/o/science.jpg?alt=media&token=ce891fb3-65d4-4415-bcc6-a4f35ede7902",
      name: "Science",
    },
    {
      categoryLink: "/category/geography",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/quiz-nextjs-6cf08.appspot.com/o/geography.webp?alt=media&token=7fd93aa0-0cd2-4902-bae0-04e8d0032280",
      name: "Geography",
    },
    {
      categoryLink: "/category/history",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/quiz-nextjs-6cf08.appspot.com/o/history.jpg?alt=media&token=9d81d637-dada-4941-aff2-6894a1c844e5",
      name: "History",
    },
    {
      categoryLink: "/category/language",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/quiz-nextjs-6cf08.appspot.com/o/language.jpg?alt=media&token=92dbfb0c-ab70-48fd-9d44-8c16f4f0141c",
      name: "Language",
    },
    {
      categoryLink: "/category/technology",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/quiz-nextjs-6cf08.appspot.com/o/technology.webp?alt=media&token=4a4cfb2c-3345-40cc-90ff-b641db34f1a3",
      name: "Technology",
    },
    {
      categoryLink: "/category/sports",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/quiz-nextjs-6cf08.appspot.com/o/sports.jpg?alt=media&token=fe6cdfb6-7ab4-41c9-adb0-9c33409ac168",
      name: "Sports",
    },
    {
      categoryLink: "/category/generalKnowledge",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/quiz-nextjs-6cf08.appspot.com/o/general%20knowledge.jpg?alt=media&token=dddce492-39be-430f-ba7f-d3218881e367",
      name: "General Knowledge",
    },
  ],
  featured: [
    {
      quizCategory: "Science",
      quizDescription: "Discover the wonders of science",
      quizDifficulty: "Easy",
      quizDuration: 15,
      quizId: "fe1d4ac9-5d6f-4e4c-8f6c-bd52c32eae0a",
      quizQuestions: [
        {
          correctOptions: ["Water"],
          id: 1,
          options: ["Air", "Earth", "Fire", "Water"],
          question: "Which element is essential for life?",
        },
        {
          correctOptions: ["Photosynthesis"],
          id: 2,
          options: [
            "Respiration",
            "Digestion",
            "Photosynthesis",
            "Circulation",
          ],
          question: "Process by which plants make their own food?",
        },
      ],
      quizRating: 4.5,
      quizSubCategory: "General",
      quizTitle: "Science Wonders",
      quizVisibility: "Public",
      userId: "featured",
    },
    {
      quizCategory: "History",
      quizDescription: "Test your knowledge of historical events",
      quizDifficulty: "Easy",
      quizDuration: 20,
      quizId: "c50f1a58-4a42-4879-b2b9-268e35d5b3d2",
      quizQuestions: [
        {
          correctOptions: ["1776"],
          id: 1,
          options: ["1492", "1776", "1865", "1914"],
          question: "In which year did the United States declare independence?",
        },
        {
          correctOptions: ["World War II"],
          id: 2,
          options: ["World War I", "World War II", "Cold War", "Vietnam War"],
          question: "Which war lasted from 1939 to 1945?",
        },
      ],
      quizRating: 3.5,
      quizSubCategory: "General",
      quizTitle: "Historical Events",
      quizVisibility: "Public",
      userId: "featured",
    },
    {
      quizCategory: "Mathematics",
      quizDescription: "Challenge your math skills",
      quizDifficulty: "Medium",
      quizDuration: 30,
      quizId: "ba74f7b3-8a04-4a8f-9b3b-6bb0c91b82bc",
      quizQuestions: [
        {
          correctOptions: ["256"],
          id: 1,
          options: ["128", "192", "256", "512"],
          question: "What is 2 to the power of 8?",
        },
        {
          correctOptions: ["Pi"],
          id: 2,
          options: ["Euler's number", "Golden ratio", "Pi", "Square root of 2"],
          question:
            "What is the ratio of a circle's circumference to its diameter?",
        },
      ],
      quizRating: 4,
      quizSubCategory: "Algebra",
      quizTitle: "Math Challenge",
      quizVisibility: "Public",
      userId: "featured",
    },
    {
      quizCategory: "Geography",
      quizDescription: "Explore the world's geography",
      quizDifficulty: "Medium",
      quizDuration: 25,
      quizId: "db812229-0a2a-4e05-b192-68c9c0e9db1b",
      quizQuestions: [
        {
          correctOptions: ["Nile"],
          id: 1,
          options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
          question: "Which is the longest river in the world?",
        },
        {
          correctOptions: ["Australia"],
          id: 2,
          options: ["Africa", "Australia", "South America", "Europe"],
          question: "Which continent is known as the 'Land Down Under'?",
        },
      ],
      quizRating: 4,
      quizSubCategory: "General",
      quizTitle: "World Geography",
      quizVisibility: "Public",
      userId: "featured",
    },
    {
      quizCategory: "General Knowledge",
      quizDescription: "Test your knowledge of basic physics",
      quizDifficulty: "Hard",
      quizDuration: 40,
      quizId: "9b7b1d0d-0563-4b71-a5e1-712d6f58c7bb",
      quizQuestions: [
        {
          correctOptions: ["Quantum Mechanics"],
          id: 1,
          options: [
            "Classical Mechanics",
            "Quantum Mechanics",
            "Relativity",
            "Thermodynamics",
          ],
          question:
            "Which branch of physics deals with the behavior of very small particles?",
        },
        {
          correctOptions: ["Black Hole"],
          id: 2,
          options: ["Neutron Star", "Black Hole", "White Dwarf", "Supernova"],
          question: "What is the collapsed core of a massive star called?",
        },
      ],
      quizRating: 4,
      quizSubCategory: "General",
      quizTitle: "Advanced Physics",
      quizVisibility: "Public",
      userId: "featured",
    },
    {
      quizCategory: "Technology",
      quizDescription: "Test your coding knowledge",
      quizDifficulty: "Hard",
      quizDuration: 35,
      quizId: "a9b57039-54dd-4eaa-8a3c-8292bfb06ecb",
      quizQuestions: [
        {
          correctOptions: ["Java"],
          id: 1,
          options: ["Python", "JavaScript", "Java", "C++"],
          question:
            "Which programming language is used for Android app development?",
        },
        {
          correctOptions: ["Git"],
          id: 2,
          options: ["SVN", "Mercurial", "Git", "Perforce"],
          question:
            "Which version control system is widely used in software development?",
        },
      ],
      quizRating: 4,
      quizSubCategory: "General",
      quizTitle: "Coding Challenge",
      quizVisibility: "Public",
      userId: "featured",
    },
  ],
  quizSubmittions: [
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "e64e2261-25fd-47ad-99b9-d063c710d5dd",
      selectedAnswers: [null, "test quiz answer 1", "test quiz answer 3"],
      totalScore: 2,
      userEmail: "test@test.com",
      userId: "4O3pARuOvDdivTzLSSDyiRMVuCI3",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "6a0fcfdb-68bf-4f63-9a82-79a1601b84a0",
      selectedAnswers: [null, "test quiz answer 1"],
      totalScore: 1,
      userEmail: "devadeelahmad@gmail.com",
      userId: "0ScQW67UGQV0HxOfipBchSQj9373",
    },
    {
      message: "Congratulations, You are passed",
      obtainedScore: 1,
      quizId: "ecf72b3a-8380-4b58-94ea-f7bf231c411c",
      selectedAnswers: [null, "<br>"],
      totalScore: 1,
      userEmail: "abubakar@gmail.com",
      userId: "8PfL1Y9cxnTo0JZzemSFOnDXmHj2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "ecf72b3a-8380-4b58-94ea-f7bf231c411c",
      selectedAnswers: [null, "<div>"],
      totalScore: 1,
      userEmail: "abubakar@gmail.com",
      userId: "8PfL1Y9cxnTo0JZzemSFOnDXmHj2",
    },
    {
      message: "Congratulations, You are passed",
      obtainedScore: 1,
      quizId: "85717a8a-2891-4fb5-aa99-f72777f19630",
      selectedAnswers: [null, "Verb"],
      totalScore: 1,
      userEmail: "ahmad@gmail.com",
      userId: "GJWoOFfCnmYbRZYEHKG2hJRx5yt2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "c50f1a58-4a42-4879-b2b9-268e35d5b3d2",
      selectedAnswers: [null, "1492", "Cold War"],
      totalScore: 2,
      userEmail: "ahmad@gmail.com",
      userId: "GJWoOFfCnmYbRZYEHKG2hJRx5yt2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "ba74f7b3-8a04-4a8f-9b3b-6bb0c91b82bc",
      selectedAnswers: [null, "192", "Square root of 2"],
      totalScore: 2,
      userEmail: "ahmad@gmail.com",
      userId: "GJWoOFfCnmYbRZYEHKG2hJRx5yt2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "ba74f7b3-8a04-4a8f-9b3b-6bb0c91b82bc",
      selectedAnswers: [null, "128", "Square root of 2"],
      totalScore: 2,
      userEmail: "ahmad@gmail.com",
      userId: "GJWoOFfCnmYbRZYEHKG2hJRx5yt2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "85717a8a-2891-4fb5-aa99-f72777f19630",
      selectedAnswers: [null, "Noun"],
      totalScore: 1,
      userEmail: "ahmad@gmail.com",
      userId: "GJWoOFfCnmYbRZYEHKG2hJRx5yt2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "ba74f7b3-8a04-4a8f-9b3b-6bb0c91b82bc",
      selectedAnswers: [null, "256", "Square root of 2"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "fe1d4ac9-5d6f-4e4c-8f6c-bd52c32eae0a",
      selectedAnswers: [null, "Air", "Photosynthesis"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "6e621b02-7efd-444d-9af7-d67f26c0607d",
      selectedAnswers: [null, "test 1"],
      totalScore: 1,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "c50f1a58-4a42-4879-b2b9-268e35d5b3d2",
      selectedAnswers: [null, "1865", "Cold War"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 2,
      quizId: "a9b57039-54dd-4eaa-8a3c-8292bfb06ecb",
      selectedAnswers: [null, "Java", "Git"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "fe1d4ac9-5d6f-4e4c-8f6c-bd52c32eae0a",
      selectedAnswers: [null, "Earth", "Digestion"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "fe1d4ac9-5d6f-4e4c-8f6c-bd52c32eae0a",
      selectedAnswers: [null, "Air", "Photosynthesis"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "ba7bd4b6-8f09-4133-94ac-38a84e557c1b",
      selectedAnswers: [null, "33"],
      totalScore: 1,
      userEmail: "temporsanoe@gmail.com",
      userId: "xvmPGxzMDScawDFTl94gyNPhwF73",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "f8c7068e-16f7-4e29-b75d-daabc667761f",
      selectedAnswers: [
        null,
        "Use gsutil cp [SOURCE_PATH] gs://[BUCKET_NAME]/ to copy files to the cloud.",
      ],
      totalScore: 1,
      userEmail: "temporsanoe@gmail.com",
      userId: "xvmPGxzMDScawDFTl94gyNPhwF73",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "a9b57039-54dd-4eaa-8a3c-8292bfb06ecb",
      selectedAnswers: [null, "JavaScript", "Mercurial"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "e8e4e33b-0616-4c8b-9242-781b3619703c",
      selectedAnswers: [null, "ans3"],
      totalScore: 1,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 2,
      quizId: "ba74f7b3-8a04-4a8f-9b3b-6bb0c91b82bc",
      selectedAnswers: [null, "256", "Pi"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "c50f1a58-4a42-4879-b2b9-268e35d5b3d2",
      selectedAnswers: [null, "1865", "Cold War"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "fe1d4ac9-5d6f-4e4c-8f6c-bd52c32eae0a",
      selectedAnswers: [null, "Earth", "Digestion"],
      totalScore: 2,
      userEmail: "devadeelahmad@gmail.com",
      userId: "0ScQW67UGQV0HxOfipBchSQj9373",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "fe1d4ac9-5d6f-4e4c-8f6c-bd52c32eae0a",
      selectedAnswers: [null, "Earth", "Digestion"],
      totalScore: 2,
      userEmail: "mancuso.mario96@gmail.com",
      userId: "1lFRqbBJ4HQeBxQhbP0Sjiuhl0u2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "c1636048-e8b8-4202-9408-6cd34d3e0667",
      selectedAnswers: [null, "4"],
      totalScore: 1,
      userEmail: "umer@gmail.com",
      userId: "rpGpSed4ZUWyrLNugsQJSibhzhL2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 2,
      quizId: "c50f1a58-4a42-4879-b2b9-268e35d5b3d2",
      selectedAnswers: [null, "1776", "World War II"],
      totalScore: 2,
      userEmail: "umer@gmail.com",
      userId: "rpGpSed4ZUWyrLNugsQJSibhzhL2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 2,
      quizId: "c50f1a58-4a42-4879-b2b9-268e35d5b3d2",
      selectedAnswers: [null, "1776", "World War II"],
      totalScore: 2,
      userEmail: "umer@gmail.com",
      userId: "rpGpSed4ZUWyrLNugsQJSibhzhL2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "6e621b02-7efd-444d-9af7-d67f26c0607d",
      selectedAnswers: [null, "test 2"],
      totalScore: 1,
      userEmail: "devadeelahmad@gmail.com",
      userId: "0ScQW67UGQV0HxOfipBchSQj9373",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "fe1d4ac9-5d6f-4e4c-8f6c-bd52c32eae0a",
      selectedAnswers: [null, "Earth", "Circulation"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "9b7b1d0d-0563-4b71-a5e1-712d6f58c7bb",
      selectedAnswers: [null, "Thermodynamics", "Supernova"],
      totalScore: 2,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Sorry, You could not pass.",
      obtainedScore: 0,
      quizId: "6e621b02-7efd-444d-9af7-d67f26c0607d",
      selectedAnswers: [null, "test 3"],
      totalScore: 1,
      userEmail: "temporanoe@gmail.com",
      userId: "ESsTADUAcBSWY6cWHF0bkJ4JyEo2",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "fe1d4ac9-5d6f-4e4c-8f6c-bd52c32eae0a",
      selectedAnswers: [null, "Earth", "Photosynthesis"],
      totalScore: 2,
      userEmail: "devadeelahmad@gmail.com",
      userId: "0ScQW67UGQV0HxOfipBchSQj9373",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "3694ccac-2a9e-436a-b2f9-453d5fd84c7c",
      selectedAnswers: [null, "math"],
      totalScore: 1,
      userEmail: "junaidharal72@gmail.com",
      userId: "n5t4MiiYA7dL8DDIZmdQMCSm1rA3",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "1a898d63-f171-4213-8bd7-52c66152525c",
      selectedAnswers: [null, "yes"],
      totalScore: 1,
      userEmail: "junaidharal72@gmail.com",
      userId: "n5t4MiiYA7dL8DDIZmdQMCSm1rA3",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "2283730c-69f0-4c6f-960a-3961577b515f",
      selectedAnswers: [null, "mouse"],
      totalScore: 1,
      userEmail: "junaidharal72@gmail.com",
      userId: "n5t4MiiYA7dL8DDIZmdQMCSm1rA3",
    },
    {
      message: "Congratulations, You passed!",
      obtainedScore: 1,
      quizId: "ec807d8a-832d-4072-aff9-185b0bb9c6ba",
      selectedAnswers: [null, "animal"],
      totalScore: 1,
      userEmail: "junaidharal72@gmail.com",
      userId: "n5t4MiiYA7dL8DDIZmdQMCSm1rA3",
    },
  ],
  quizzes: [
    {
      accessEmails: ["adeelahmadfreelance@gmail.com", "test@test.com"],
      quizCategory: "Sports",
      quizDescription: "test quiz 1 description",
      quizDifficulty: "Hard",
      quizDuration: 2,
      quizId: "e64e2261-25fd-47ad-99b9-d063c710d5dd",
      quizQuestions: [
        {
          correctOptions: ["test quiz answer 2"],
          id: 1,
          options: [
            "test quiz answer 1",
            "test quiz answer 2",
            "test quiz answer 3",
            "test quiz answer 4",
          ],
          question: "test quiz question 1",
        },
        {
          correctOptions: ["test quiz answer 4"],
          id: 2,
          options: [
            "test quiz answer 1",
            "test quiz answer 2",
            "test quiz answer 3",
            "test quiz answer 4",
          ],
          question: "test quiz question 2",
        },
      ],
      quizRating: 5,
      quizSubCategory: "test quiz sub cat",
      quizTitle: "test quiz 1",
      quizVisibility: "Private",
      userId: "4O3pARuOvDdivTzLSSDyiRMVuCI3",
    },
    {
      accessEmails: ["test@test.com", "devadeelahmad@gmail.com"],
      quizCategory: "Language",
      quizDescription: "test quiz desc 2",
      quizDifficulty: "Easy",
      quizDuration: 45,
      quizId: "6a0fcfdb-68bf-4f63-9a82-79a1601b84a0",
      quizQuestions: [
        {
          correctOptions: ["test quiz answer 2"],
          id: 1,
          options: ["test quiz answer 1", "test quiz answer 2"],
          question: "test quiz question 1",
        },
      ],
      quizRating: 5,
      quizSubCategory: "sada",
      quizTitle: "test quiz 2",
      quizVisibility: "Private",
      userId: "0ScQW67UGQV0HxOfipBchSQj9373",
    },
    {
      accessEmails: ["abubakar@gmail.com"],
      quizCategory: "Technology",
      quizDescription: "Simple",
      quizDifficulty: "Normal",
      quizDuration: 3,
      quizId: "ecf72b3a-8380-4b58-94ea-f7bf231c411c",
      quizQuestions: [
        {
          correctOptions: ["<br>"],
          id: 1,
          options: ["<br>", "<p>", "<span>", "<div>"],
          question: "What is break",
        },
      ],
      quizRating: 5,
      quizSubCategory: "HTML",
      quizTitle: "WEB",
      quizVisibility: "Private",
      userId: "8PfL1Y9cxnTo0JZzemSFOnDXmHj2",
    },
    {
      accessEmails: ["ahmad@gmail.com"],
      quizCategory: "Language",
      quizDescription: "Simple Verb",
      quizDifficulty: "Normal",
      quizDuration: 3,
      quizId: "85717a8a-2891-4fb5-aa99-f72777f19630",
      quizQuestions: [
        {
          correctOptions: ["Verb"],
          id: 1,
          options: ["Verb", "Noun", "Object", "Subject"],
          question: "What is working",
        },
      ],
      quizRating: 4,
      quizSubCategory: "Verb",
      quizTitle: "English",
      quizVisibility: "Private",
      userId: "GJWoOFfCnmYbRZYEHKG2hJRx5yt2",
    },
    {
      accessEmails: ["ahmad@gmail.com"],
      quizCategory: "Technology",
      quizDescription: "simple",
      quizDifficulty: "Normal",
      quizDuration: 4,
      quizId: "5fc1de54-c28d-4b42-be03-e25ae5fb6fe5",
      quizQuestions: [
        {
          correctOptions: ["br"],
          id: 1,
          options: ["br", "p", "div", "span"],
          question: "what is break",
        },
      ],
      quizRating: 5,
      quizSubCategory: "HTML",
      quizTitle: "Html",
      quizVisibility: "Private",
      userId: "GJWoOFfCnmYbRZYEHKG2hJRx5yt2",
    },
    {
      accessEmails: [
        "test@test.com",
        "temporanoe@gmail.com",
        "devadeelahmad@gmail.com",
        "fa20-bse-031@gmail.com",
      ],
      quizCategory: "History",
      quizDescription: "sdsa",
      quizDifficulty: "Normal",
      quizDuration: 45,
      quizId: "6e621b02-7efd-444d-9af7-d67f26c0607d",
      quizQuestions: [
        {
          correctOptions: ["test 2"],
          id: 1,
          options: ["test 1", "test 2", "test 3"],
          question: "test",
        },
      ],
      quizRating: 5,
      quizSubCategory: "1",
      quizTitle: "test quiz 56",
      quizVisibility: "Private",
      userId: "0ScQW67UGQV0HxOfipBchSQj9373",
    },
    {
      accessEmails: ["temporanoe@gmail.com"],
      quizCategory: "History",
      quizDescription: "trsdf",
      quizDifficulty: "Normal",
      quizDuration: 123,
      quizId: "e8e4e33b-0616-4c8b-9242-781b3619703c",
      quizQuestions: [
        {
          correctOptions: ["ans3"],
          id: 1,
          options: ["ans1", "ans2", "ans3", "ans4"],
          question: "test1",
        },
      ],
      quizRating: 5,
      quizSubCategory: "trsdf",
      quizTitle: "trds",
      quizVisibility: "Private",
      userId: "xvmPGxzMDScawDFTl94gyNPhwF73",
    },
    {
      accessEmails: ["temporsanoe@gmail.com"],
      quizCategory: "Mathematics",
      quizDescription: "xzczxc",
      quizDifficulty: "Easy",
      quizDuration: 123,
      quizId: "ba7bd4b6-8f09-4133-94ac-38a84e557c1b",
      quizQuestions: [
        {
          correctOptions: ["33"],
          id: 1,
          options: ["123", "33"],
          question: "asad",
        },
      ],
      quizRating: 4.5,
      quizSubCategory: "aasd",
      quizTitle: "gdxg",
      quizVisibility: "Private",
      userId: "xvmPGxzMDScawDFTl94gyNPhwF73",
    },
    {
      accessEmails: ["temporsanoe@gmail.com"],
      quizCategory: "Technology",
      quizDescription: "developer",
      quizDifficulty: "Normal",
      quizDuration: 60,
      quizId: "f8c7068e-16f7-4e29-b75d-daabc667761f",
      quizQuestions: [
        {
          correctOptions: [
            "Use gsutil cp [SOURCE_PATH] gs://[BUCKET_NAME]/ to copy files to the cloud.",
          ],
          id: 1,
          options: [
            "Use gsutil cp [SOURCE_PATH] gs://[BUCKET_NAME]/ to copy files to the cloud.",
            "Execute gcloud cp [SOURCE_PATH] gs://[BUCKET_NAME]/ for transferring files.",
          ],
          question:
            "You need to transfer data from a local server to Google Cloud Storage for further processing by a Cloud DataProc Hadoop cluster within Google Cloud. What command is suitable for this operation?",
        },
      ],
      quizRating: 4.5,
      quizSubCategory: "Google",
      quizTitle: "Google Cloud Professional Developer",
      quizVisibility: "Private",
      userId: "xvmPGxzMDScawDFTl94gyNPhwF73",
    },
    {
      quizCategory: "Technology",
      quizDescription: "developer",
      quizDifficulty: "Normal",
      quizDuration: 60,
      quizId: "f8c7068e-16f7-4e29-b75d-daabc667762f",
      quizQuestions: [
        {
          correctOptions: [
            "Utilize Stackdriver for real-time alerts and log analysis, integrating with your current monitoring solution.",
          ],
          id: 1,
          options: [
            "Switch entirely to Stackdriver for monitoring and alerting.",
            "Install Stackdriver monitoring agents on your Google Compute Engine instances.",
            "Utilize Stackdriver for real-time alerts and log analysis, integrating with your current monitoring solution.",
            "Divert some workload back to your previous setup for comparative performance analysis.",
          ],
          question:
            "After moving your applications to Google Cloud, you notice that your existing alert system is not meeting the needs for prompt problem notification. What action should you take?",
        },
      ],
      quizRating: 4.5,
      quizSubCategory: "Google",
      quizTitle: "Google Cloud Professional Developer test",
      quizVisibility: "Public",
      tags: ["gcp"],
      userId: "xvmPGxzMDScawDFTl94gyNPhwF73",
    },
    {
      accessEmails: ["abubakar@gmail.coom"],
      quizCategory: "Technology",
      quizDescription: "Simple HTML",
      quizDifficulty: "Normal",
      quizDuration: -14,
      quizId: "719d1720-ee5c-42e8-ba4a-ccdccda01c3d",
      quizQuestions: [
        {
          correctOptions: ["br"],
          id: 1,
          options: ["br", "p", "div", "span"],
          question: "What is break",
        },
      ],
      quizRating: 5,
      quizSubCategory: "HTML",
      quizTitle: "HTML Quiz",
      quizVisibility: "Private",
      userId: "qQewMLuhaeV36h35WqkWBqpFko23",
    },
    {
      accessEmails: ["umer@gmail.com"],
      quizCategory: "Mathematics",
      quizDescription: "Math Simple",
      quizDifficulty: "Easy",
      quizDuration: 3,
      quizId: "c1636048-e8b8-4202-9408-6cd34d3e0667",
      quizQuestions: [
        {
          correctOptions: ["4"],
          id: 1,
          options: ["4", "5", "6", "7"],
          question: "2 + 2",
        },
      ],
      quizRating: 4,
      quizSubCategory: "Algebra",
      quizTitle: "Math",
      quizVisibility: "Private",
      userId: "rpGpSed4ZUWyrLNugsQJSibhzhL2",
    },
    {
      accessEmails: ["asdas@gmail.com"],
      quizCategory: "Geography",
      quizDescription: "test",
      quizDifficulty: "Normal",
      quizDuration: 56,
      quizId: "2d031a55-fddf-44dc-a7f9-41bf951a7b63",
      quizQuestions: [
        {
          correctOptions: ["test"],
          id: 1,
          options: ["test", "test1"],
          question: "test",
        },
      ],
      quizRating: 5,
      quizSubCategory: "vsdhas",
      quizTitle: "test",
      quizVisibility: "Private",
      userId: "0ScQW67UGQV0HxOfipBchSQj9373",
    },
    {
      accessEmails: ["test@gmail.com", "devadeelahmad@gmail.com"],
      quizCategory: "Language",
      quizDescription: "resagkdjs",
      quizDifficulty: "Normal",
      quizDuration: 45,
      quizId: "352c18d4-2ff2-4ba3-ac5b-e9b725dd5601",
      quizQuestions: [
        {
          correctOptions: ["test answer"],
          id: 1,
          options: ["test answer 1", "test answer"],
          question: "test question",
        },
      ],
      quizRating: 5,
      quizSubCategory: "dyuzis",
      quizTitle: "test",
      quizVisibility: "Private",
      userId: "0ScQW67UGQV0HxOfipBchSQj9373",
    },
    {
      accessEmails: ["junaidharal72@gmail.com"],
      quizCategory: "Mathematics",
      quizDescription: "simple algebra",
      quizDifficulty: "Easy",
      quizDuration: 30,
      quizId: "3694ccac-2a9e-436a-b2f9-453d5fd84c7c",
      quizQuestions: [
        {
          correctOptions: ["chemistry", "bio", "sciense", "math"],
          id: 1,
          options: ["math", "sciense", "bio", "chemistry"],
          question: "what is algebra",
        },
      ],
      quizRating: 5,
      quizSubCategory: "Algebra",
      quizTitle: "math quiz",
      quizVisibility: "Private",
      userId: "n5t4MiiYA7dL8DDIZmdQMCSm1rA3",
    },
    {
      accessEmails: ["junaidharal72@gmail.com"],
      quizCategory: "Language",
      quizDescription: "synonym",
      quizDifficulty: "Easy",
      quizDuration: 20,
      quizId: "1a898d63-f171-4213-8bd7-52c66152525c",
      quizQuestions: [
        {
          correctOptions: ["yes"],
          id: 1,
          options: ["yes", "no"],
          question: "are synonyms part of english",
        },
      ],
      quizRating: 5,
      quizSubCategory: "english",
      quizTitle: "english",
      quizVisibility: "Private",
      userId: "n5t4MiiYA7dL8DDIZmdQMCSm1rA3",
    },
    {
      accessEmails: ["test@test.com"],
      quizCategory: "General Knowledge",
      quizDescription: "computer parts",
      quizDifficulty: "Normal",
      quizDuration: 55,
      quizId: "36919bef-fe17-4dd2-9e5c-e475d580f85d",
      quizQuestions: [
        {
          correctOptions: ["mouse"],
          id: 1,
          options: ["mouse", "flag"],
          question: "which one i related to computer",
        },
      ],
      quizRating: 5,
      quizSubCategory: "Computer",
      quizTitle: "computer",
      quizVisibility: "Private",
      userId: "n5t4MiiYA7dL8DDIZmdQMCSm1rA3",
    },
    {
      accessEmails: ["junaidharal72@gmail.com"],
      quizCategory: "General Knowledge",
      quizDescription: "computer",
      quizDifficulty: "Hard",
      quizDuration: 55,
      quizId: "2283730c-69f0-4c6f-960a-3961577b515f",
      quizQuestions: [
        {
          correctOptions: ["mouse"],
          id: 1,
          options: ["mouse", "flag"],
          question: "which on is part of computer.",
        },
      ],
      quizRating: 5,
      quizSubCategory: "computer",
      quizTitle: "computer",
      quizVisibility: "Private",
      userId: "n5t4MiiYA7dL8DDIZmdQMCSm1rA3",
    },
    {
      accessEmails: ["junaidharal72@gmail.com"],
      quizCategory: "General Knowledge",
      quizDescription: "GK",
      quizDifficulty: "Easy",
      quizDuration: 4,
      quizId: "ec807d8a-832d-4072-aff9-185b0bb9c6ba",
      quizQuestions: [
        {
          correctOptions: ["animal"],
          id: 1,
          options: ["animal", "human"],
          question: "select monkey type",
        },
      ],
      quizRating: 5,
      quizSubCategory: "GK",
      quizTitle: "monkey",
      quizVisibility: "Private",
      userId: "n5t4MiiYA7dL8DDIZmdQMCSm1rA3",
    },
    {
      accessEmails: ["junaidharal72@gmail.com"],
      quizCategory: "Geography",
      quizDescription: "crytpo",
      quizDifficulty: "Normal",
      quizDuration: 22,
      quizId: "05c3e7ca-5205-42a1-b4c4-1eca388b4380",
      quizQuestions: [
        {
          correctOptions: ["exhange"],
          id: 1,
          options: ["exhange", "not"],
          question: "what is crypto",
        },
      ],
      quizRating: 5,
      quizSubCategory: "crypto",
      quizTitle: "crypto",
      quizVisibility: "Private",
      userId: "n5t4MiiYA7dL8DDIZmdQMCSm1rA3",
    },
  ],
};

const promises = [];
const dataArray = Object.entries(data.quizzes);

dataArray.forEach((d) => {
  promises.push(admin.firestore().collection("quizzes").doc(d[0]).set(d[1]));
});
Promise.all(promises);
