export interface Question {
    id: number
    type:
      | "multiple-choice"
      | "fill-in-blank"
      | "text"
      | "image-choice"
      | "comparison"
      | "fraction"
      | "equation"
      | "drawing"
    question: string
    options?: string[]
    correctAnswer?: string | string[]
    image?: string
    blanks?: string[]
    comparisonValues?: string[]
    fractionQuestion?: boolean
    drawingQuestion?: boolean
  }
  
  export const grade8MathQuestions: Question[] = [
    {
      id: 1,
      type: "multiple-choice",
      question: "Evaluate\n-24 ÷ (-6 + 4)² x 3",
      options: ["-15", "12", "-18", "24"],
      correctAnswer: "-18",
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What is the probability of rolling an even or a prime # on a number cube?",
      options: ["3/6", "4/6", "5/6", "6/6"],
      correctAnswer: "5/6",
    },
    {
      id: 3,
      type: "multiple-choice",
      question:
        "The equation for force is F = ma. What is the mass of an object that causes a force of 20 newtons when accelerating at 12 meters per second squared?",
      options: ["5kg", "3.67 kg", "4 kg", "1.67 kg"],
      correctAnswer: "1.67 kg",
    },
    {
      id: 4,
      type: "multiple-choice",
      question: "What value satisfies the following inequality?\n3x + 9 > 21",
      options: ["1", "2", "8", "4"],
      correctAnswer: "4",
    },
    {
      id: 5,
      type: "multiple-choice",
      question:
        "The diameter of a circle is equal to half of the area of a square with sides of 4. What is the area of the circle?",
      options: ["4π", "12π", "16π", "20π"],
      correctAnswer: "4π",
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "The average of three consecutive numbers is 12. What is the sum of the numbers?",
      options: ["11", "24", "36", "48"],
      correctAnswer: "36",
    },
    {
      id: 7,
      type: "multiple-choice",
      question:
        "The ratio of red marbles to blue marbles to green marbles in a jar is 5:7:8. What is the probability of choosing a blue marble from the jar?",
      options: ["5/20", "7/20", "7/12", "12/20"],
      correctAnswer: "7/20",
    },
    {
      id: 8,
      type: "multiple-choice",
      question: "The mass of a water balloon increases from 24kg to 32kg. Find the percentage increase of the mass.",
      options: ["12%", "50%", "33%", "66%"],
      correctAnswer: "33%",
    },
    {
      id: 9,
      type: "multiple-choice",
      question:
        "There is a 25% sales tax on a leopard skin jacket. If the final price of the jacket is $50, what was the original price of the jacket?",
      options: ["$30", "$40", "$50", "$60"],
      correctAnswer: "$40",
    },
    {
      id: 10,
      type: "multiple-choice",
      question: "How many minutes are there in 3.5 days?",
      options: ["3,600", "7,200", "6,030", "5,040"],
      correctAnswer: "5,040",
    },
    {
      id: 11,
      type: "multiple-choice",
      question: "Solve for the value of 3x using the following equation:\n6x + 10 = 46",
      options: ["6", "12", "18", "36"],
      correctAnswer: "18",
    },
    {
      id: 12,
      type: "multiple-choice",
      question: "Solve\n(12/36) x (18/24) x (6/12)",
      options: ["1/3", "1/4", "1/5", "1/8"],
      correctAnswer: "1/4",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "Rima works 4.7 hours per day, 6 days a week. She makes $7.25 per hour. How much did Rima earn in a week?",
      options: ["$ 34.07", "$ 204.45", "$ 20.43", "$43.50"],
      correctAnswer: "$ 204.45",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "Stacy completely fills a glass with water. The glass was 7 cm in radius and 14 cm tall. She drank all the water. What was the volume of the water she drank? (Use formula V= πr²h).",
      options: ["923.16 cm³", "307.72 cm³", "98 cm³", "2154.04 cm³"],
      correctAnswer: "2154.04 cm³",
    },
    {
      id: 15,
      type: "multiple-choice",
      question: "6.5 is ______ % of 156",
      options: ["4.167%", "24%", "2400%", "6%"],
      correctAnswer: "4.167%",
    },
    {
      id: 16,
      type: "multiple-choice",
      question: "An account of $200 pays 10% interest compounded monthly. How much will be in the account in 2 months?",
      options: ["$ 203.25", "$220", "$240", "$ 230.25"],
      correctAnswer: "$ 203.25",
    },
    {
      id: 17,
      type: "multiple-choice",
      question: "Kevin swam 4 miles in 31 minutes. At that rate, how long would it take him to swim 6.1 mile?",
      options: ["189.1 minutes", "74.28 minutes", "47.28 minutes", "40.3 minutes"],
      correctAnswer: "47.28 minutes",
    },
    {
      id: 18,
      type: "multiple-choice",
      question: "680/14 = 19/x",
      options: ["0.391", "6.1", "0.432", "2.42"],
      correctAnswer: "0.391",
    },
    {
      id: 19,
      type: "image-choice",
      question: "What is the length of the hypotenuse?",
      image: "/images/q19-triangle-grade8.png",
      options: ["8 ft", "√13 ft", "10 ft", "13 ft"],
      correctAnswer: "13 ft",
    },
    {
      id: 20,
      type: "drawing",
      question: "Draw a transversal on the image below:",
      image: "/images/q20-transversal-grade8.png",
      drawingQuestion: true,
    },
    {
      id: 21,
      type: "multiple-choice",
      question:
        "A 20feet ladder is leaning against a building. The top of the ladder touches a point 16 feet up on the building. How far away from the base of the building does the ladder stand?",
      options: ["12ft", "18 ft", "6 ft", "17 ft"],
      correctAnswer: "12ft",
    },
    {
      id: 22,
      type: "multiple-choice",
      question:
        "What is the surface area of a cylinder with a radius of 5 cm and height of 10 cm? (Round answer to nearest whole number)",
      options: ["471 cm²", "157 cm²", "50 cm²", "393 cm²"],
      correctAnswer: "471 cm²",
    },
    {
      id: 23,
      type: "fill-in-blank",
      question: "Solve for the variable:\n3r – 12 = 36\nr = _______",
      blanks: ["r ="],
      correctAnswer: ["16"],
    },
    {
      id: 24,
      type: "fill-in-blank",
      question: "Rewrite the number in standard notation.\n6.56 x 10⁻⁵\nAnswer: _________________",
      blanks: ["Answer:"],
      correctAnswer: ["0.0000656"],
    },
  ]
  
  export const grade8MathData = {
    grade: 8,
    subject: "math",
    title: "Grade 8 Math Diagnostic Assessment",
    description: "This assessment evaluates number sense, operations, and problem-solving skills for Grade 8 students.",
    questions: grade8MathQuestions,
  }
  
  