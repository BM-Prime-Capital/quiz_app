import { QuestionType } from "@/lib/types"

export interface Question {
    id: number
    type: QuestionType.MULTIPLE_CHOICE | QuestionType.FILL_IN_BLANK | QuestionType.TEXT | QuestionType.IMAGE_CHOICE | QuestionType.COMPARISON
    question: string
    options?: string[]
    correctAnswer?: string | string[]
    image?: string
    blanks?: string[]
    comparisonValues?: string[]
  }
  
  export const grade4MathQuestions: Question[] = [
    {
      id: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What is the difference of\n68,934\n-29,483",
      options: ["49,451", "49,441", "39,451", "29,234"],
      correctAnswer: "39,451",
    },
    {
      id: 2,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Mr. Sanchez gave each of his 5 students 34 basketball cards. How many cards in total did Mr. Sanchez give to all of his students?",
      options: ["170", "180", "190", "200"],
      correctAnswer: "170",
    },
    {
      id: 3,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Find the numbers that will complete the pattern.\n568, 572, 576, _____, _____, 588, ____",
      options: ["578, 580, 590", "580, 587, 584", "580, 584, 592", "577, 578, 589"],
      correctAnswer: "580, 584, 592",
    },
    {
      id: 4,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What is the largest fraction in this group?",
      options: ["1/6", "1/3", "1/2", "3/5"],
      correctAnswer: "3/5",
    },
    {
      id: 5,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Sarah began her piano lesson at 1:15 p.m. and the lesson ended at 2:15p.m. How long did Sarah's lesson take?",
      options: ["45 minutes", "51 minutes", "60 minutes", "1 hour and 15 minutes"],
      correctAnswer: "60 minutes",
    },
    {
      id: 6,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What unit of measure would you use to find the length of a football field?",
      options: ["Centimeters", "Inches", "Yards", "Liters"],
      correctAnswer: "Yards",
    },
    {
      id: 7,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Anita wants to distribute pieces of chocolate to her three brothers. If she has 72 pieces of chocolate, how many pieces of candy will each of her brothers receive?",
      options: ["3", "12", "24", "72"],
      correctAnswer: "24",
    },
    {
      id: 8,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What tool would you use to measure the amount of water in a container?",
      options: ["Ruler", "Yardstick", "Cup", "None of the above"],
      correctAnswer: "Cup",
    },
    {
      id: 9,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "If the length of a rectangle is 6 and the width is 4, what is the perimeter of the rectangle?",
      options: ["4", "12", "16", "20"],
      correctAnswer: "20",
    },
    {
      id: 10,
      type: QuestionType.MULTIPLE_CHOICE,
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
      id: 11,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Joanna has $30. She buys four candy bars that cost $5 each. How much money does Joanna have left?",
      options: ["$30", "$20", "$15", "$10"],
      correctAnswer: "$10",
    },
    {
      id: 12,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "672\n× 4",
      options: ["2,458", "258", "2,600", "2,688"],
      correctAnswer: "2,688",
    },
    {
      id: 13,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Which of these numbers is 5,005,018?",
      options: [
        "Five million, five thousand, eighteen",
        "Five million, five-hundred thousand, eighteen",
        "Five million, five hundred eighteen",
        "Five hundred thousand, five hundred, eighteen",
      ],
      correctAnswer: "Five million, five thousand, eighteen",
    },
    {
      id: 14,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Which decimal should be placed in the space to have the numbers in order from least to greatest?\n0.25, 0.35, ___, 0.57, 1.0, 1.32",
      options: ["0.83", "0.75", "0.53", "1.42"],
      correctAnswer: "0.53",
    },
    {
      id: 15,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What is 674,562 rounded to the nearest hundred?",
      options: ["674,600", "675,000", "674,500", "670,000"],
      correctAnswer: "674,600",
    },
    {
      id: 16,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What fraction represents the largest part of a whole?",
      options: ["1/8", "6/16", "1/2", "9/12"],
      correctAnswer: "1/2",
    },
    {
      id: 17,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Which fraction means the same as 0.16?",
      options: ["100/16", "16/100", "16/10", "6/100"],
      correctAnswer: "16/100",
    },
    {
      id: 18,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Optimum Transport has been hired to deliver new seats to Jets Stadium. The company will use 37 buses to move the seats. If each truck holds 125 seats, how many seats will be delivering to the stadium?",
      options: ["4625", "162", "4652", "125"],
      correctAnswer: "4625",
    },
    {
      id: 19,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Chris paid $78 for a magazine subscription. If he is paying $6 for each issues of the magazine, how many issues of the magazines will he receive?",
      options: ["84", "468", "13", "72"],
      correctAnswer: "13",
    },
    {
      id: 20,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What is the value of:\n(67.6 + 6) – (15 × 3)",
      options: ["55.8", "28.4", "55.3", "28.6"],
      correctAnswer: "28.6",
    },
    {
      id: 21,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What is the value of the expression below if N = 7\n15 ÷ (N ÷2) + 5 - 8",
      options: ["20", "207", "19", "21"],
      correctAnswer: "19",
    },
    {
      id: 22,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Naz brought 4 bags of yellow gumballs and 6 bags of green gumballs. Each bag of gumballs had 10 pieces. Which expression could Naz use to find the total number of gumballs she brought?",
      options: ["(4 × 6) + 10", "(10 × 6) + 4", "(4 ×10) + (6 ×10)", "(10) × 6 + 4"],
      correctAnswer: "(4 ×10) + (6 ×10)",
    },
    {
      id: 23,
      type: QuestionType.IMAGE_CHOICE,
      question: "What is the area of the figure in square inches?",
      image: "/images/q23-figure-grade4.png",
      options: ["28 in²", "26 in²", "40 in²", "38 in²"],
      correctAnswer: "38 in²",
    },
    {
      id: 24,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What shape must have four equal sides and four right angles?",
      options: ["Rectangle", "Square", "Parallelogram", "Rhombus"],
      correctAnswer: "Square",
    },
  ]
  
  export const grade4MathData = {
    grade: 4,
    subject: "math",
    title: "Grade 4 Math Diagnostic Assessment",
    description: "This assessment evaluates number sense, operations, and problem-solving skills for Grade 4 students.",
    questions: grade4MathQuestions,
  }
  
  