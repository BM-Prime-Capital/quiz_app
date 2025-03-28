import { Question, QuestionType } from "@/lib/types"


  
  export const grade5MathQuestions: Question[] = [
    {
      id: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Which fraction means the same as 0.18?",
      options: ["100/18", "18/100", "18/10", "8/100"],
      correctAnswer: "18/100",
    },
    {
      id: 2,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Optimum Transport has been hired to deliver new seats to the Jets Stadium. The company will use 37 trucks to move the seats. If each truck holds 125 seats, how many seats will be delivering to the stadium?",
      options: ["4625", "162", "4652", "1254652"],
      correctAnswer: "4625",
    },
    {
      id: 3,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Chris paid $78 for a magazine subscription. If he is paying $6 for each issues of the magazine, how many issues of the magazines will he receive?",
      options: ["84", "468", "13", "72"],
      correctAnswer: "13",
    },
    {
      id: 4,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What is the value of:\n(67.6 + 6) – (15 × 3)",
      options: ["55.8", "28.4", "55.3", "28.6"],
      correctAnswer: "28.6",
    },
    {
      id: 5,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What is the value of the expression below if n = 7\n15 ÷ (n +2) + 5 - 8",
      options: ["20", "207", "19", "21"],
      correctAnswer: "19",
    },
    {
      id: 6,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What shape must have four equal sides and four right angles?",
      options: ["Square", "Rectangle", "Rhombus", "Parallelogram"],
      correctAnswer: "Square",
    },
    {
      id: 7,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Naz brought 4 bags of yellow gumballs and 6 bags of green gumballs. Each bag of gumballs had 10 pieces. Which expression could Naz use to find the total number of gumballs she brought?",
      options: ["(4 × 6) + 10 =", "(10 × 6) + 4 =", "(4 ×10) + (6 ×10) =", "(10) × 6 + 4 ="],
      correctAnswer: "(4 ×10) + (6 ×10) =",
    },
    {
      id: 8,
      type: QuestionType.IMAGE_CHOICE,
      question: "What is the area of the figure in square inches?",
      image: "/images/q8-rectangle-grade5.png",
      options: ["13 in²", "30 in²", "26 in²", "32 in²"],
      correctAnswer: "30 in²",
    },
    {
      id: 9,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Which decimal should be placed in the space to have the numbers in order from least to greatest?\n0.25, 0.35, ___, 0.57, 1.0, 1.32",
      options: ["0.53", "0.83", "0.75", "1.42"],
      correctAnswer: "0.53",
    },
    {
      id: 10,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What fraction represents the largest part of a whole?",
      options: ["3/4", "6/16", "1/2", "9/12"],
      correctAnswer: "3/4",
    },
    {
      id: 11,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What is 674,562 rounded to the nearest hundred?",
      options: ["675,000", "674,600", "674,500", "670,000"],
      correctAnswer: "674,600",
    },
    {
      id: 12,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Which of these numbers is 5,005,018?",
      options: [
        "Five million, five thousand, eighteen",
        "Five million, five-hundred thousand, eighteen",
        "Five million, five hundred, eighteen",
        "Five-hundred thousand, five hundred, eighteen",
      ],
      correctAnswer: "Five million, five thousand, eighteen",
    },
    {
      id: 13,
      type: QuestionType.FILL_IN_BLANK,
      question: "Complete the following.\n\n8 qt. = ____ c.\n\n32 oz. = ____ lb.\n\n3 gal. = ____ c.",
      blanks: ["8 qt. = ____ c.", "32 oz. = ____ lb.", "3 gal. = ____ c."],
      correctAnswer: ["32", "2", "48"],
    },
    {
      id: 14,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Jade has to mow a lawn 13 ft long and 6 ft wide. What is the area Jade has to mow?",
      options: ["87 ft²", "38 ft²", "19 ft²", "78 ft²"],
      correctAnswer: "78 ft²",
    },
    {
      id: 15,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "James worked 4 days last week. He worked 7 hours on Tuesday, 8 hours on Wednesday, 16 hours on Thursday, and 9 hours on Saturday. What is the average number of hours James worked each day last week?",
      options: ["10", "40", "20", "8"],
      correctAnswer: "10",
    },
    {
      id: 16,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What is the equation for the sentence: Eight plus a number is seventeen",
      options: ["17 + 8 = x", "8 + x = 17", "17 + 8 = x", "8 + 9 = 17"],
      correctAnswer: "8 + x = 17",
    },
    {
      id: 17,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Mr. Brice must order 28 calculators for each 7th grade class. There are 11 classes. How many calculators must Mr. Brice order?",
      options: ["39", "306", "46", "308"],
      correctAnswer: "308",
    },
    {
      id: 18,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Mat buys 12 marbles every week. If Mat has 2,376 marbles, how many weeks has he been buying marbles?",
      options: ["28512", "198", "2388", "189"],
      correctAnswer: "198",
    },
    {
      id: 19,
      type: QuestionType.FILL_IN_BLANK,
      question: "Write out the prime factorization for each number\n\n81:\n\n27:",
      blanks: ["81:", "27:"],
      correctAnswer: ["3⁴", "3³"],
    },
    {
      id: 20,
      type: QuestionType.FILL_IN_BLANK,
      question: "Find the greatest common factor for each set of numbers\n\n16, 32 and 64:\n\n27, 36, and 72:",
      blanks: ["16, 32 and 64:", "27, 36, and 72:"],
      correctAnswer: ["16", "9"],
    },
    {
      id: 21,
      type: QuestionType.FRACTION,
      question: "Add or subtract the given fractions. Write answer in simplest form.\n\n6⁷⁄₉ + 3²⁄₉ =\n\n6⁹⁄₄ - 4³⁄₄ =",
      blanks: ["6⁷⁄₉ + 3²⁄₉ =", "6⁹⁄₄ - 4³⁄₄ ="],
      correctAnswer: ["10", "2¹⁄₂"],
    },
    {
      id: 22,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "For each apple pie, Mrs. Kay adds 1²⁄₅ cups of apple. Mrs. Kay baked 4 apple pies. How many cups for apple did she add?",
      options: ["5²⁄₅", "4²⁄₅", "6²⁄₅", "6¹⁄₅"],
      correctAnswer: "5²⁄₅",
    },
    {
      id: 23,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Lilly has been reading ¹⁄₅ of a book each day until ⁶⁄₅ of the book was finished. How many days has Lilly been reading?",
      options: ["3", "5²⁄₅", "5", "4"],
      correctAnswer: "6",
    },
    {
      id: 24,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "There are 40 bookcases. There are 8 fiction books, 22 nonfiction books, and 10 science fiction books. What is the probability of choosing a science fiction book?",
      options: ["¹⁄₄", "²⁄₅", "¹⁄₃", "¹⁄₅"],
      correctAnswer: "¹⁄₄",
    },
  ]
  
  export const grade5MathData = {
    grade: 5,
    subject: "math",
    title: "Grade 5 Math Diagnostic Assessment",
    description: "This assessment evaluates number sense, operations, and problem-solving skills for Grade 5 students.",
    questions: grade5MathQuestions,
  }
  
  