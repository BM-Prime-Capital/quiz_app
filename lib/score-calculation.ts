import { grade1MathData } from "@/data/grade1/mathData"
import { grade2MathData } from "@/data/grade2/mathData"
import { grade3MathData } from "@/data/grade3/mathData"
import { grade4MathData } from "@/data/grade4/mathData"
import { grade5MathData } from "@/data/grade5/mathData"
import { grade6MathData } from "@/data/grade6/mathData"
import { grade7MathData } from "@/data/grade7/mathData"
import { grade8MathData } from "@/data/grade8/mathData"

// Clés de correction pour chaque grade
const answerKeys = {
  "1": {
    math: {
      1: "briefcase3", // Visual differentiation
      2: "7", // Counting; visual based
      3: "square", // Pattern recognition; shapes
      4: ["7", "9", "4", "8"], // Counting patterns; numerical
      5: ["row1-2", "row2-3", "row3-1"], // Quantity matching
      6: ["row1-3", "row2-3", "row3-3"], // Numerical order; sequencing
      7: "5", // Computation; basic addition
      8: "5 ¢", // Currency; basic unit counting
      9: "3:00", // Time; analog interpretation
      10: "10 ¢", // Currency; basic unit counting
      11: "12 ¢", // Currency; coin counting
      12: "5", // Counting; visual based
      13: "6", // Visual representation; numbers
      14: ["2", "8"], // Algebraic foundation; sum blanks
      15: "2", // Computation; basic subtraction
      16: "6", // Computation; visual subtraction
      17: ["5", "19"], // Algebraic foundation; sum blanks
      18: ["2", "3"], // Base ten foundation; counting
      19: ["5", "0"], // Base ten foundation; counting
      20: [">", "<"], // Number comparisons
      21: "About 10", // Estimation
      22: ["quarter", "dime"], // Currency; coin counting & selection
      23: "2: 30", // Time; abstract & digital interpretation
      24: ["square", "triangle"], // Geometry; shape construction
    },
  },
  // Ajoutez les clés de correction pour les autres grades ici
}

// Types pour les résultats
export interface QuestionResult {
  id: number
  correct: boolean
  studentAnswer: string | string[]
  correctAnswer: string | string[]
  category: string
}

export interface AssessmentResult {
  studentName: string
  grade: string
  subject: string
  date: string
  score: number
  percentageScore: number
  timeSpent: number // en minutes
  questionResults: QuestionResult[]
  strengthCategories: string[]
  weaknessCategories: string[]
}

// Fonction pour obtenir les données du test en fonction du grade et du sujet
function getTestData(grade: string, subject: string) {
  if (subject === "math") {
    switch (grade) {
      case "1":
        return grade1MathData
      case "2":
        return grade2MathData
      case "3":
        return grade3MathData
      case "4":
        return grade4MathData
      case "5":
        return grade5MathData
      case "6":
        return grade6MathData
      case "7":
        return grade7MathData
      case "8":
        return grade8MathData
      default:
        return null
    }
  }
  // Ajoutez la logique pour ELA ici
  return null
}

// Fonction pour calculer les résultats de l'évaluation
export function calculateResults(
  grade: string,
  subject: string,
  studentName: string,
  answers: Record<number, string | string[]>,
  startTime: Date,
  endTime: Date,
): AssessmentResult {
  const testData = getTestData(grade, subject)
  if (!testData) {
    throw new Error(`Test data not found for grade ${grade} ${subject}`)
  }

  const answerKey = answerKeys[grade as keyof typeof answerKeys]?.['math']
  if (!answerKey) {
    throw new Error(`Answer key not found for grade ${grade} ${subject}`)
  }

  const questionResults: QuestionResult[] = []
  let correctCount = 0

  // Catégories pour analyse
  const categories: Record<string, { total: number; correct: number }> = {}

  testData.questions.forEach((question) => {
    const id = question.id
    const studentAnswer = answers[id] || ""

    const correctAnswer = answerKey[id as keyof typeof answerKey]
    // Déterminer si la réponse est correcte
    let isCorrect = false

    if (Array.isArray(studentAnswer) && Array.isArray(correctAnswer)) {
      isCorrect =
        studentAnswer.length === correctAnswer.length && studentAnswer.every((val, idx) => val === correctAnswer[idx])
    } else if (!Array.isArray(studentAnswer) && !Array.isArray(correctAnswer)) {
      isCorrect = studentAnswer === correctAnswer
    }

    if (isCorrect) {
      correctCount++
    }

    // Catégoriser la question
    const category = getCategoryForQuestion(grade, subject, id)
    if (!categories[category]) {
      categories[category] = { total: 0, correct: 0 }
    }
    categories[category].total++
    if (isCorrect) {
      categories[category].correct++
    }

    questionResults.push({
      id,
      correct: isCorrect,
      studentAnswer,
      correctAnswer,
      category,
    })
  })

  // Calculer le temps passé en minutes
  const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 60000)

  // Calculer le score en pourcentage
  const percentageScore = Math.round((correctCount / testData.questions.length) * 100)

  // Identifier les forces et faiblesses
  const strengthCategories: string[] = []
  const weaknessCategories: string[] = []

  Object.entries(categories).forEach(([category, stats]) => {
    const categoryScore = stats.correct / stats.total
    if (categoryScore >= 0.7) {
      strengthCategories.push(category)
    } else if (categoryScore <= 0.4) {
      weaknessCategories.push(category)
    }
  })

  return {
    studentName,
    grade,
    subject,
    date: new Date().toISOString().split("T")[0],
    score: correctCount,
    percentageScore,
    timeSpent,
    questionResults,
    strengthCategories,
    weaknessCategories,
  }
}

// Fonction pour obtenir la catégorie d'une question
function getCategoryForQuestion(grade: string, subject: string, questionId: number): string {
  // Utiliser les descriptions des items que vous avez fournies
  if (grade === "1" && subject === "math") {
    const categories = {
      1: "Visual differentiation",
      2: "Counting; visual based",
      3: "Pattern recognition; shapes",
      4: "Counting patterns; numerical",
      5: "Quantity matching",
      6: "Numerical order; sequencing",
      7: "Computation; basic addition",
      8: "Currency; basic unit counting",
      9: "Time; analog interpretation",
      10: "Currency; basic unit counting",
      11: "Currency; coin counting",
      12: "Counting; visual based",
      13: "Visual representation; numbers",
      14: "Algebraic foundation; sum blanks",
      15: "Computation; basic subtraction",
      16: "Computation; visual subtraction",
      17: "Algebraic foundation; sum blanks",
      18: "Base ten foundation; counting",
      19: "Base ten foundation; counting",
      20: "Number comparisons",
      21: "Estimation",
      22: "Currency; coin counting & selection",
      23: "Time; abstract & digital interpretation",
      24: "Geometry; shape construction",
    }
    return categories[questionId as keyof typeof categories] || "Unknown"
  }

  // Ajouter des catégories pour les autres grades et sujets
  return "General"
}

