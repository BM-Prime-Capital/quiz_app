export interface Question {
  id: number
  type: "multiple-choice" | "fill-in-blank" | "text" | "drawing" | "matching" | "pattern" | "clock" | "comparison"
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  image?: string
  blanks?: string[]
  isDrawing?: boolean
}

export const grade1MathQuestions: Question[] = [
  {
    id: 1,
    type: "drawing",
    question: "Draw a circle on the object that is different in each group",
    image: "images/q1-briefcase.png",
    isDrawing: true,
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "",
    image: "/images/q2-hammers.png",
    options: ["3", "2", "7", "5"],
    correctAnswer: "7",
  },
  {
    id: 3,
    type: "pattern",
    question: "",
    image: "/images/q3-pattern.png",
    isDrawing: true,
  },
  {
    id: 4,
    type: "fill-in-blank",
    question: "Write the missing numbers (on grade level)",
    image: "/images/q4-numbers.png",
    blanks: ["5, 6, ___, 8, ___, 10", "2, ___, 6, ___, 10"],
    correctAnswer: ["7", "9", "4", "8"],
  },
  {
    id: 5,
    type: "matching",
    question: "Draw a line from each number to the matching group of objects",
    image: "/images/q5-matching.png",
    isDrawing: true,
  },
  {
    id: 6,
    type: "drawing",
    question: "Draw a circle around the third one in each row",
    image: "/images/q6-circle.png",
    isDrawing: true,
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "3 + 2 = ?",
    image: "/images/q7-addition.png",
    options: ["3", "1", "2", "5"],
    correctAnswer: "5",
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "Circle the correct amount of money",
    image: "/images/q8-money.png",
    options: ["2 ¢", "5 ¢", "1 ¢", "$1"],
    correctAnswer: "5 ¢",
  },
  {
    id: 9,
    type: "clock",
    question: "What time is shown on the clock?",
    image: "/images/q9-clock.png",
  },
  {
    id: 10,
    type: "multiple-choice",
    question: "Circle the amount of money",
    image: "/images/q10-dime.png",
    options: ["5 ¢", "10 ¢", "25 ¢", "15 ¢"],
    correctAnswer: "10 ¢",
  },
  {
    id: 11,
    type: "multiple-choice",
    question: "How much is",
    image: "/images/q11-coins.png",
    options: ["17 ¢", "12 ¢", "32 ¢"],
    correctAnswer: "12 ¢",
  },
  {
    id: 12,
    type: "multiple-choice",
    question: "How many oranges are there? (on grade level)",
    image: "/images/q12-oranges.png",
    options: ["8", "0", "5", "6"],
    correctAnswer: "5",
  },
  {
    id: 13,
    type: "drawing",
    question: "Draw circles to show the number sentence (On grade level)",
    isDrawing: true,
  },
  {
    id: 14,
    type: "fill-in-blank",
    question: "Complete the number sentences (on grade level)",
    blanks: ["___ + 5 = 7", "8 + 0 = ___"],
    correctAnswer: ["2", "8"],
  },
  {
    id: 15,
    type: "multiple-choice",
    question: "Write the difference (on grade level)",
    image: "/images/q15-difference.png",
    options: ["4", "6", "2", "7"],
    correctAnswer: "2",
  },
  {
    id: 16,
    type: "fill-in-blank",
    question: "Cross out the animals to subtract. Write the difference. (on grade level)",
    image: "/images/q16-cats.png",
    blanks: ["9 - 3 = ___"],
    correctAnswer: ["6"],
  },
  {
    id: 17,
    type: "fill-in-blank",
    question: "Complete the number sentence. (on grade level)",
    blanks: ["6 - ___ = 1", "10 + 9 = ___"],
    correctAnswer: ["5", "19"],
  },
  {
    id: 18,
    type: "fill-in-blank",
    question: "Circle groups of ten. Then write the numbers that tell how many tens and ones. (gr level)",
    image: "/images/q18-peppers.png",
    blanks: ["Tens:___", "Ones:___"],
    correctAnswer: ["2", "3"],
  },
  {
    id: 19,
    type: "fill-in-blank",
    question: "Add the tens. Then write the sum. (on grade level)",
    image: "/images/q19-tens.png",
    blanks: ["Tens:___", "Ones:___"],
    correctAnswer: ["5", "0"],
  },
  {
    id: 20,
    type: "comparison",
    question: "Compare the numbers. Then write >, <, or = in the space provided. (on grade level)",
    blanks: ["36 ___ 14", "17 ___ 71"],
    correctAnswer: [">", "<"],
  },
  {
    id: 21,
    type: "multiple-choice",
    question: "Circle the correct estimation of how many apples shown in the picture (on grade level)",
    image: "/images/q21-apples.png",
    options: ["About 10", "About 20"],
    correctAnswer: "About 10",
  },
  {
    id: 22,
    type: "drawing",
    question: "Circle the coins needed to buy an eraser for 35 ¢ (on grade level)",
    image: "/images/q22-coins.png",
    isDrawing: true,
  },
  {
    id: 23,
    type: "multiple-choice",
    question: "What is 30 minutes after 2 o'clock? (on grade level)",
    options: ["1: 30", "3: 30", "2: 30", "2: 00"],
    correctAnswer: "2: 30",
  },
  {
    id: 24,
    type: "drawing",
    question: "Draw a square and triangle (on grade level)",
    isDrawing: true,
  },
]

export const grade1MathData = {
  grade: 1,
  subject: "math",
  title: "Grade 1 Math Diagnostic Assessment",
  description:
    "This assessment evaluates number sense, basic operations, and visual pattern recognition for Grade 1 students.",
  questions: grade1MathQuestions,
}

