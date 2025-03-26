export interface Question {
    id: number
    type: "multiple-choice" | "fill-in-blank" | "text" | "image-choice" | "comparison" | "fraction" | "equation"
    question: string
    options?: string[]
    correctAnswer?: string | string[]
    image?: string
    blanks?: string[]
    comparisonValues?: string[]
    fractionQuestion?: boolean
  }
  
  export const grade6MathQuestions: Question[] = [
    {
      id: 1,
      type: "multiple-choice",
      question:
        "Mr. Brice must order 28 calculators for each 7th grade class. There are 11 classes. How many calculators must Mr. Brice order?",
      options: ["39", "306", "46", "308"],
      correctAnswer: "308",
    },
    {
      id: 2,
      type: "multiple-choice",
      question:
        "Lilly has been reading ¹⁄₅ of a book each day until ⁶⁄₅ of the book was finished. How many days has Lilly been reading?",
      options: ["4", "5", "5²⁄₅", "3"],
      correctAnswer: "6",
    },
    {
      id: 3,
      type: "fill-in-blank",
      question: "Find the greatest common factor for each set of numbers\n\n16, 32 and 64:\n\n27, 36, and 72:",
      blanks: ["16, 32 and 64:", "27, 36, and 72:"],
      correctAnswer: ["16", "9"],
    },
    {
      id: 4,
      type: "multiple-choice",
      question:
        "There are 40 bookcases. There are 8 fiction books, 22 nonfiction books, and 10 science fiction books. What is the probability of choosing a science fiction book?",
      options: ["¹⁄₄", "¹⁄₂", "¹⁄₃", "¹⁄₅"],
      correctAnswer: "¹⁄₄",
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "Jade has to mow a lawn 13 ft long and 6 ft wide. What is the area Jade has to mow?",
      options: ["78 ft²", "38 ft²", "19 ft²", "87 ft²"],
      correctAnswer: "78 ft²",
    },
    {
      id: 6,
      type: "fill-in-blank",
      question: "Complete the following.\n\n8 qt. = ____ c.\n\n32 oz. = ____ lb.\n\n3 gal. = ____ c.",
      blanks: ["8 qt. = ____ c.", "32 oz. = ____ lb.", "3 gal. = ____ c."],
      correctAnswer: ["32", "2", "48"],
    },
    {
      id: 7,
      type: "multiple-choice",
      question:
        "James worked 4 days last week. He worked 7 hours on Tuesday, 8 hours on Wednesday, 16 hours on Thursday, and 9 hours on Saturday. What is the average number of hours James worked each day last week?",
      options: ["40", "10", "20", "8"],
      correctAnswer: "10",
    },
    {
      id: 8,
      type: "multiple-choice",
      question: "What is the equation for the sentence: Eight plus a number is seventeen",
      options: ["17 + 8 = x", "17 + 8 = x", "8 + x = 17", "8 + 9 = 17"],
      correctAnswer: "8 + x = 17",
    },
    {
      id: 9,
      type: "multiple-choice",
      question:
        "For each apple pie, Mrs. Kay adds 1²⁄₅ cups of apple. Mrs. Kay baked 4 apple pies. How many cups for apple did she add?",
      options: ["5²⁄₅", "4²⁄₅", "6²⁄₅", "6¹⁄₅"],
      correctAnswer: "5²⁄₅",
    },
    {
      id: 10,
      type: "fill-in-blank",
      question: "Write out the prime factorization for each number\n\n81:\n\n27:",
      blanks: ["81:", "27:"],
      correctAnswer: ["3⁴", "3³"],
    },
    {
      id: 11,
      type: "multiple-choice",
      question: "Mat buys 12 marbles every week. If Mat has 2,376 marbles, how many weeks has he been buying marbles?",
      options: ["28512", "198", "189", "2388"],
      correctAnswer: "198",
    },
    {
      id: 12,
      type: "fraction",
      question: "Add or subtract the given fractions. Write answer in simplest form.\n\n6⁷⁄₈ + 3²⁄₉ =\n\n6⁹⁄₄ - 4³⁄₄ =",
      blanks: ["6⁷⁄₈ + 3²⁄₉ =", "6⁹⁄₄ - 4³⁄₄ ="],
      correctAnswer: ["10", "2¹⁄₂"],
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "Jasper goes out to purchase groceries. 6 bottles of milk are being sold for $24 and 4 bags of Oreo cookies are being sold for $12. If Jasper purchased 12 bottles of milk and 12 bags of cookies, how much money did he spend in all?",
      options: ["$36", "$48", "$64", "$84"],
      correctAnswer: "$84",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "24.6\n× 6.5",
      options: ["159.9", "159.0", "158.9", "158"],
      correctAnswer: "159.9",
    },
    {
      id: 15,
      type: "multiple-choice",
      question: "What is 20% of 120?",
      options: ["2.4", "12", "20", "24"],
      correctAnswer: "24",
    },
    {
      id: 16,
      type: "multiple-choice",
      question: "What is the value of\n-8 + 4 x 2 - 3",
      options: ["0", "3", "-3", "4"],
      correctAnswer: "-3",
    },
    {
      id: 17,
      type: "multiple-choice",
      question: "What is the Greatest Common factor (GCF) of 9 and 45?",
      options: ["3", "9", "15", "45"],
      correctAnswer: "9",
    },
    {
      id: 18,
      type: "multiple-choice",
      question:
        "A 10ft tree casts a shadow of 24ft at a certain time of day. What is the height of a tree that casts a shadow of 12ft at the same time of day?",
      options: ["4.33", "5", "6", "6.67"],
      correctAnswer: "5",
    },
    {
      id: 19,
      type: "multiple-choice",
      question: "(3/4) ÷ (6/2)=\nPut your answer in simplest form",
      options: ["1/4", "1/3", "1/2", "3/4"],
      correctAnswer: "1/4",
    },
    {
      id: 20,
      type: "multiple-choice",
      question: "x + 13 = 48\nWhat is the value of x in the above equation?",
      options: ["13", "25", "35", "45"],
      correctAnswer: "35",
    },
    {
      id: 21,
      type: "multiple-choice",
      question:
        "Donkey Kong breaks 6 barrels of bananas. If he gets 48 bananas all together, how many bananas were in each barrel?",
      options: ["6", "8", "12", "None of the above"],
      correctAnswer: "8",
    },
    {
      id: 22,
      type: "multiple-choice",
      question: "How do you express six less than the product of a number and 7?",
      options: ["7x – 6", "6 – 7x", "x – 42", "42 – x"],
      correctAnswer: "7x – 6",
    },
    {
      id: 23,
      type: "multiple-choice",
      question:
        "John has six boxes of chocolate and each box contains 12 pieces of chocolate. He wants ten pieces from each box. How many chocolate will be left over?",
      options: ["12", "10", "6", "2"],
      correctAnswer: "12",
    },
    {
      id: 24,
      type: "multiple-choice",
      question: "90°, 160°, 43°\nName the angle measures in order from left to right?",
      options: [
        "Obtuse, Right, Acute",
        "Right, Obtuse, Acute",
        "Acute, Right, Obtuse",
        "Scalene, Isosceles, Equilateral",
      ],
      correctAnswer: "Right, Obtuse, Acute",
    },
  ]
  
  export const grade6MathData = {
    grade: 6,
    subject: "math",
    title: "Grade 6 Math Diagnostic Assessment",
    description: "This assessment evaluates number sense, operations, and problem-solving skills for Grade 6 students.",
    questions: grade6MathQuestions,
  }
  
  