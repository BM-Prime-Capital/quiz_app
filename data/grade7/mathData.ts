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
  
  export const grade7MathQuestions: Question[] = [
    {
      id: 1,
      type: "multiple-choice",
      question: "What is the correct formula for Mean?",
      options: [
        "(Sum) ÷ (# of things)",
        "(# of things) ÷ (Sum)",
        "(Largest #) – (Smallest #)",
        "The # that appears the most",
      ],
      correctAnswer: "(Sum) ÷ (# of things)",
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What is the value of\n26 ÷ (10 + 3) - 4",
      options: ["2", "4", "-2", "3.88"],
      correctAnswer: "2",
    },
    {
      id: 3,
      type: "multiple-choice",
      question: "What is the area of a triangle with a height of 6 and a base of 4?",
      options: ["6", "12", "16", "24"],
      correctAnswer: "12",
    },
    {
      id: 4,
      type: "multiple-choice",
      question:
        "John has six boxes of chocolate and each box contains 12 pieces of chocolate. He wants ten pieces from each box. How many chocolates will be left over?",
      options: ["12", "10", "6", "2"],
      correctAnswer: "12",
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "How do you express six less than the product of a number and 7?",
      options: ["7x – 6", "6 – 7x", "x – 42", "42 – x"],
      correctAnswer: "7x – 6",
    },
    {
      id: 6,
      type: "multiple-choice",
      question:
        "A 10ft tree casts a shadow of 24ft at a certain time of day. What is the height of a tree that casts a shadow of 16ft at the same time of day?",
      options: ["4.33", "4.67", "6", "6.67"],
      correctAnswer: "6.67",
    },
    {
      id: 7,
      type: "multiple-choice",
      question: "What is 20% of 120?",
      options: ["2.4", "12", "20", "24"],
      correctAnswer: "24",
    },
    {
      id: 8,
      type: "multiple-choice",
      question: "What is the Greatest Common factor (GCF) of 9 and 45?",
      options: ["3", "9", "15", "45"],
      correctAnswer: "9",
    },
    {
      id: 9,
      type: "multiple-choice",
      question:
        "Donkey Kong breaks 6 barrels of bananas. If he gets 48 bananas all together, how many bananas were in each barrel?",
      options: ["6", "8", "12", "None of the above"],
      correctAnswer: "8",
    },
    {
      id: 10,
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
    {
      id: 11,
      type: "multiple-choice",
      question: "x + 13 = 48\nWhat is the value of x in the above equation?",
      options: ["13", "25", "35", "45"],
      correctAnswer: "35",
    },
    {
      id: 12,
      type: "multiple-choice",
      question: "What is the value of\n-8 + 4 x 2 - 3",
      options: ["0", "3", "-3", "4"],
      correctAnswer: "-3",
    },
    {
      id: 13,
      type: "multiple-choice",
      question: "Solve\n(12/36) x (18/24) x (6/12)",
      options: ["1/3", "1/4", "1/5", "1/6"],
      correctAnswer: "1/4",
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Solve for the value of 3x using the following equation:\n6x + 10 = 46",
      options: ["6", "12", "18", "36"],
      correctAnswer: "18",
    },
    {
      id: 15,
      type: "multiple-choice",
      question: "How many seconds are there in 3.5 days?",
      options: ["3,600", "7,200", "10,000", "302,400"],
      correctAnswer: "302,400",
    },
    {
      id: 16,
      type: "multiple-choice",
      question:
        "There is a 25% sales tax on a leopard skin jacket. If the final price of the jacket is $50, what was the original price of the jacket?",
      options: ["$30", "$40", "$50", "$60"],
      correctAnswer: "$40",
    },
    {
      id: 17,
      type: "multiple-choice",
      question: "The mass of a water balloon increases from 24kg to 32kg. Find the percentage increase of the mass.",
      options: ["8%", "24%", "33%", "66%"],
      correctAnswer: "33%",
    },
    {
      id: 18,
      type: "multiple-choice",
      question:
        "The ratio of red marbles to blue marbles to green marbles in a jar is 5:7:8. What is the probability of choosing a blue marble from the jar?",
      options: ["5/20", "7/20", "7/12", "12/20"],
      correctAnswer: "7/20",
    },
    {
      id: 19,
      type: "multiple-choice",
      question: "The average of three consecutive numbers is 12. What is the sum of the numbers?",
      options: ["11", "24", "36", "48"],
      correctAnswer: "36",
    },
    {
      id: 20,
      type: "multiple-choice",
      question:
        "The diameter of a circle is equal to half of the area of a square with sides of 4. What is the area of the circle?",
      options: ["4π", "12π", "16π", "20π"],
      correctAnswer: "4π",
    },
    {
      id: 21,
      type: "multiple-choice",
      question: "Evaluate\n-24 ÷ (-6 + 4)² x 3",
      options: ["-6", "12", "-18", "24"],
      correctAnswer: "-18",
    },
    {
      id: 22,
      type: "multiple-choice",
      question: "What is the probability of rolling an even or a prime # on a number cube?",
      options: ["3/6", "4/6", "5/6", "6/6"],
      correctAnswer: "5/6",
    },
    {
      id: 23,
      type: "multiple-choice",
      question:
        "The equation for force is F = ma. What is the mass of an object that causes a force of 20 newtons when accelerating at 12 meters per second squared?",
      options: ["1.67 kg", "3.5 kg", "4 kg", "5 kg"],
      correctAnswer: "1.67 kg",
    },
    {
      id: 24,
      type: "multiple-choice",
      question: "What value satisfies the following inequality?\n3x + 9 > 21",
      options: ["1", "2", "3", "4"],
      correctAnswer: "4",
    },
  ]
  
  export const grade7MathData = {
    grade: 7,
    subject: "math",
    title: "Grade 7 Math Diagnostic Assessment",
    description: "This assessment evaluates number sense, operations, and problem-solving skills for Grade 7 students.",
    questions: grade7MathQuestions,
  }
  
  