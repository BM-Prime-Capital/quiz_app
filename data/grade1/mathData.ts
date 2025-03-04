export interface Question {
  id: number
  type: "multiple-choice" | "fill-in-blank" | "text" | "drawing" | "matching" | "pattern"
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  image?: string
  passage?: string
  blanks?: string[]
}

export const grade1MathQuestions: Question[] = [
  {
    id: 1,
    type: "drawing",
    question: "Draw a circle on the object that is different in each group",
    image: "https://via.placeholder.com/400x200?text=Objects+Group+Image",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "How many hearts in all?",
    options: ["3", "2", "7", "5"],
    correctAnswer: "7",
    image: "https://via.placeholder.com/300x150?text=Hearts+Counting+Image",
  },
  {
    id: 3,
    type: "drawing",
    question: "Draw the shape that comes next in the pattern",
    image: "https://via.placeholder.com/400x150?text=Shape+Pattern+Image",
  },
  {
    id: 4,
    type: "fill-in-blank",
    question: "Write the missing numbers (on grade level)",
    blanks: ["5, 6, ___, 8, ___, 10", "2, ___, 6, ___, 10"],
    correctAnswer: ["7", "9", "4", "8"],
    image: "https://via.placeholder.com/400x100?text=Number+Sequence",
  },
  {
    id: 5,
    type: "drawing",
    question: "Draw a line from each number to the matching group of objects",
    image: "https://via.placeholder.com/400x200?text=Number+Matching+Image",
  },
  {
    id: 6,
    type: "drawing",
    question: "Draw a circle around the third one in each row",
    image: "https://via.placeholder.com/400x200?text=Objects+Row+Image",
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "3 + 2 = ?",
    options: ["3", "1", "2", "5"],
    correctAnswer: "5",
    image: "https://via.placeholder.com/300x100?text=Math+Addition+Image",
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "Circle the correct amount of money",
    options: ["2 ¢", "5 ¢", "1 ¢", "$1"],
    correctAnswer: "5 ¢",
    image: "https://via.placeholder.com/300x150?text=Coins+Image",
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

