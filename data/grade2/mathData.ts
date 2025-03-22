export interface Question {
    id: number
    type: "multiple-choice" | "fill-in-blank" | "text" | "image-choice"
    question: string
    options?: string[]
    correctAnswer?: string | string[]
    image?: string
    blanks?: string[]
  }
  
  export const grade2MathQuestions: Question[] = [
    {
      id: 1,
      type: "multiple-choice",
      question: "What number goes in the space? 1, 2, 3, ___, 5, 6",
      options: ["4", "9", "5", "0"],
      correctAnswer: "4",
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What is 7 + 6?",
      options: ["12", "14", "13", "15"],
      correctAnswer: "13",
    },
    {
      id: 3,
      type: "multiple-choice",
      question:
        "John has a younger sister that is 3 years younger than him. If John is 9 years old, how old is his sister?",
      options: ["3", "7", "12", "6"],
      correctAnswer: "6",
    },
    {
      id: 4,
      type: "multiple-choice",
      question: "What is 8 - 3?",
      options: ["5", "7", "4", "11"],
      correctAnswer: "5",
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "What is 19 - 11?",
      options: ["6", "8", "4", "9"],
      correctAnswer: "8",
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "What number will follow in the pattern? 0, 2, 4, ___, 8, 10",
      options: ["6", "5", "7", "3"],
      correctAnswer: "6",
    },
    {
      id: 7,
      type: "multiple-choice",
      question: "What is 28 + 11?",
      options: ["49", "39", "17", "39"],
      correctAnswer: "39",
    },
    {
      id: 8,
      type: "multiple-choice",
      question: "If you had 15 toys and you lose 7 of them, how many do you have left?",
      options: ["8", "22", "9", "7"],
      correctAnswer: "8",
    },
    {
      id: 9,
      type: "multiple-choice",
      question: "What is the sum of the numbers 17, 12 and 3?",
      options: ["32", "2", "22", "30"],
      correctAnswer: "32",
    },
    {
      id: 10,
      type: "multiple-choice",
      question: "How many tens are in the number 20?",
      options: ["20", "2", "10", "5"],
      correctAnswer: "2",
    },
    {
      id: 11,
      type: "image-choice",
      question: "What time is it on the clock below?",
      image: "/images/q11-clock-grade2.png",
      options: ["2:10", "11:10", "10:10", "2:11"],
      correctAnswer: "10:10",
    },
    {
      id: 12,
      type: "multiple-choice",
      question:
        "You have $5 to spend at the candy store. When you go to the store, you buy a bottle of juice for $1.50, how much change should the cashier give you back?",
      options: ["$3.50", "$5.50", "$3.75", "$4.25"],
      correctAnswer: "$3.50",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "A man is going to buy groceries from the store. He spends $2 on bread, $3.75 on milk and buys cereal for $4.50. How much money will the man spend altogether?",
      options: ["$ 8.75", "$ 8.25", "$ 10.25", "None of the above"],
      correctAnswer: "$ 10.25",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "What number would complete the number sentence below? If 20 - ___ = 14 then 14 + ___ = 20",
      options: ["4", "8", "5", "6"],
      correctAnswer: "6",
    },
    {
      id: 15,
      type: "multiple-choice",
      question:
        "A woman is at a bookstore to buy some new books. She buys a picture book for $5.25, and a coloring book for $3.50. How much money should the cashier give her back if she pays with a $10 bill?",
      options: ["$8.50", "$1.25", "$2.25", "$18.75"],
      correctAnswer: "$1.25",
    },
    {
      id: 16,
      type: "multiple-choice",
      question: "Which symbol goes in the box below? 45 □ 76",
      options: [">", "=", "<", "None of the above"],
      correctAnswer: "<",
    },
    {
      id: 17,
      type: "multiple-choice",
      question: "In the number 908, how many hundreds are there?",
      options: ["4 hundreds", "9 hundreds", "8 hundreds", "0 hundreds"],
      correctAnswer: "9 hundreds",
    },
    {
      id: 18,
      type: "multiple-choice",
      question: "What is the answer when you add 847 + 62?",
      options: ["809", "825", "909", "929"],
      correctAnswer: "909",
    },
    {
      id: 19,
      type: "multiple-choice",
      question:
        "If you wanted to measure the length of the eraser tip of a pencil, what would be the best unit of measure?",
      options: ["Centimeter", "Inch", "Meter", "Yard"],
      correctAnswer: "Centimeter",
    },
    {
      id: 20,
      type: "image-choice",
      question: "One afternoon, you look at your clock and it showed the time below, what time is it?",
      image: "/images/q20-clock-grade2.png",
      options: ["10: 20 A.M.", "3: 53 P.M.", "4: 53 P.M.", "3:53 A.M."],
      correctAnswer: "3: 53 P.M.",
    },
    {
      id: 21,
      type: "multiple-choice",
      question: "If you have 2 quarters, 3 dimes and 2 nickels, how much money do you have in pennies?",
      options: ["7 Cents", "100 Cents", "70 Cents", "90 Cents"],
      correctAnswer: "90 Cents",
    },
    {
      id: 22,
      type: "image-choice",
      question:
        "Based on the information on following bar graph, how many more red markers does John have than pink markers?",
      image: "/images/q22-graph-grade2.png",
      options: ["5", "3", "8", "4"],
      correctAnswer: "5",
    },
    {
      id: 23,
      type: "image-choice",
      question: "In the cube below, how many equal faces are there?",
      image: "/images/q23-cube-grade2.png",
      options: ["3", "4", "6", "5"],
      correctAnswer: "6",
    },
    {
      id: 24,
      type: "image-choice",
      question: "The circle below is divided into how many equal parts?",
      image: "/images/q24-circle-grade2.png",
      options: ["2 halves", "4 fourths", "3 thirds", "4 thirds"],
      correctAnswer: "4 fourths",
    },
  ]
  
  export const grade2MathData = {
    grade: 2,
    subject: "math",
    title: "Grade 2 Math Diagnostic Assessment",
    description:
      "This assessment evaluates number sense, basic operations, and problem-solving skills for Grade 2 students.",
    questions: grade2MathQuestions,
  }
  
  