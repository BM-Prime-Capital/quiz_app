export interface Question {
    id: number
    type: "multiple-choice" | "fill-in-blank" | "text" | "image-choice" | "comparison"
    question: string
    options?: string[]
    correctAnswer?: string | string[]
    image?: string
    blanks?: string[]
    comparisonValues?: string[]
  }
  
  export const grade3MathQuestions: Question[] = [
    {
      id: 1,
      type: "multiple-choice",
      question: "28\n-13",
      options: ["5", "11", "15", "25"],
      correctAnswer: "15",
    },
    {
      id: 2,
      type: "image-choice",
      question: "Which type of ice cream is the most popular according to the bar graph?",
      image: "/images/q2-ice-cream-grade3.png",
      options: ["Chocolate", "Vanilla", "Mint", "Berry"],
      correctAnswer: "Vanilla",
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "How many hundreds are there in 651?",
      options: ["4", "5", "6", "8"],
      correctAnswer: "6",
    },
    {
      id: 4,
      type: "multiple-choice",
      question:
        "John has 7 candy bars. He gives Jerry 2 candy bars. Mark then gives John 5 candy bars. How many candy bars does John have now?",
      options: ["2", "5", "7", "10"],
      correctAnswer: "10",
    },
    {
      id: 5,
      type: "image-choice",
      question: "How many groups of two triangles are there?",
      image: "/images/q5-triangles-grade3.png",
      options: ["1", "2", "3", "4"],
      correctAnswer: "4",
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "112\n-55",
      options: ["47", "57", "67", "87"],
      correctAnswer: "57",
    },
    {
      id: 7,
      type: "comparison",
      question: "24 ___ 32\nWhich symbol should be placed in the underlined part?",
      options: [">", "<", "=", "None of the above"],
      correctAnswer: "<",
    },
    {
      id: 8,
      type: "multiple-choice",
      question: "672\n× 4",
      options: ["2,458", "258", "2,600", "2,688"],
      correctAnswer: "2,688",
    },
    {
      id: 9,
      type: "multiple-choice",
      question: "If John gets two quarters, one dime and one nickel, how much money does John have in all?",
      options: ["50 cents", "55 cents", "60 cents", "65 cents"],
      correctAnswer: "65 cents",
    },
    {
      id: 10,
      type: "multiple-choice",
      question: "What is the largest fraction in this group?",
      options: ["1/6", "1/3", "1/2", "3/5"],
      correctAnswer: "3/5",
    },
    {
      id: 11,
      type: "multiple-choice",
      question:
        "Mr. Sanchez gave each of his 5 students 34 basketball cards. How many cards in total did Mr. Sanchez give to all of his students?",
      options: ["170", "180", "190", "200"],
      correctAnswer: "170",
    },
    {
      id: 12,
      type: "multiple-choice",
      question: "Find the numbers that will complete the pattern.\n568, 572, 576, _____, _____, 588, ____",
      options: ["578, 580, 590", "580, 587, 584", "580, 584, 592", "577, 578, 589"],
      correctAnswer: "580, 584, 592",
    },
    {
      id: 13,
      type: "multiple-choice",
      question: "There are 14 penguins at the zoo. If 5 penguins go back home to the arctic, how many penguins are left?",
      options: ["14", "10", "9", "6"],
      correctAnswer: "9",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What is the difference of\n68,934\n-29,483",
      options: ["49,451", "49,441", "39,451", "29,234"],
      correctAnswer: "39,451",
    },
    {
      id: 15,
      type: "multiple-choice",
      question: "Joanna has $30. She buys four candy bars that cost $5 each. How much money does Joanna have left?",
      options: ["$30", "$20", "$15", "$10"],
      correctAnswer: "$10",
    },
    {
      id: 16,
      type: "multiple-choice",
      question: "If it is 5:24 a.m. now, what time will it be in half an hour?",
      options: ["5:24 a.m.", "5:54 a.m.", "5:54 p.m.", "6:00 a.m."],
      correctAnswer: "5:54 a.m.",
    },
    {
      id: 17,
      type: "image-choice",
      question: "Name the shapes in order from left to right.",
      image: "/images/q17-shapes-grade3.png",
      options: [
        "Triangle, Rectangle, Hexagon",
        "Triangle, Square, Pentagon",
        "Pentagon, Triangle, Hexagon",
        "Triangle, Rectangle, Circle",
      ],
      correctAnswer: "Triangle, Rectangle, Hexagon",
    },
    {
      id: 18,
      type: "multiple-choice",
      question: "What properties of addition are shown below?\n68 + 0 = 68\n49 + 4 = 4 + 49",
      options: [
        "Distributive and Identity",
        "Associative and Commutative",
        "Identity and Associative",
        "Identity and Commutative",
      ],
      correctAnswer: "Identity and Commutative",
    },
    {
      id: 19,
      type: "multiple-choice",
      question:
        "Sarah began her piano lesson at 1:24 p.m. and the lesson ended at 2:24p.m. How long did Sarah's lesson take?",
      options: ["45 minutes", "51 minutes", "60 minutes", "1 hour and 15 minutes"],
      correctAnswer: "60 minutes",
    },
    {
      id: 20,
      type: "multiple-choice",
      question: "What tool would you use to measure the amount of water in a container?",
      options: ["Ruler", "Yardstick", "Cup", "None of the above"],
      correctAnswer: "Cup",
    },
    {
      id: 21,
      type: "multiple-choice",
      question:
        "Anita wants to distribute pieces of chocolate to her three brothers. If she has 72 pieces of chocolate, how many pieces of candy will each of her brothers receive?",
      options: ["3", "12", "24", "72"],
      correctAnswer: "24",
    },
    {
      id: 22,
      type: "multiple-choice",
      question: "If there are 100 milliliters in one liter, how many milliliters are there in 7 liters?",
      options: ["7", "600", "70", "700"],
      correctAnswer: "700",
    },
    {
      id: 23,
      type: "multiple-choice",
      question: "What unit of measure would you use to find the length of a football field?",
      options: ["Centimeters", "Inches", "Yards", "Liters"],
      correctAnswer: "Yards",
    },
    {
      id: 24,
      type: "multiple-choice",
      question: "If the length of a rectangle is 6 and the width is 4, what is the perimeter of the rectangle?",
      options: ["4", "12", "16", "20"],
      correctAnswer: "20",
    },
  ]
  
  export const grade3MathData = {
    grade: 3,
    subject: "math",
    title: "Grade 3 Math Diagnostic Assessment",
    description:
      "This assessment evaluates number sense, basic operations, and problem-solving skills for Grade 3 students.",
    questions: grade3MathQuestions,
  }
  
  