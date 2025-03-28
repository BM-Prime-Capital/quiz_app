import { Question, QuestionResult, QuizData, QuestionType } from "./types"

export interface AssessmentResult {
  studentName: string
  grade: string
  subject: string
  date: string
  score: number
  percentageScore: number
  timeSpent: number
  questionResults: QuestionResult[]
  strengthCategories: string[]
  weaknessCategories: string[]
}

// export function calculateScore(questions: Question[], answers: Record<number, string | string[]>): number {
//   let correctCount = 0;
  
//   questions.forEach(question => {
//     if (isAnswerCorrect(question, answers[question.id])) {
//       correctCount++;
//     }
//   });

//   return correctCount;
// }

export function calculateScore(questions: Question[], answers: Record<number, string | string[]>): number {
  let correctCount = 0;
  
  questions.forEach(question => {
    const studentAnswer = answers[question.id];
    if (isAnswerCorrect(question, studentAnswer)) {
      correctCount++;
    } else {
      console.log(`Question ${question.id} incorrect. Student answer:`, studentAnswer, "Correct answer:", question.correctAnswer);
    }
  });

  return correctCount;
}

// export function normalizeAnswer(answer: any): string | string[] {
//   if (typeof answer === 'string') {
//     return answer.toLowerCase().trim()
//       .replace(/[^\w\s]/g, '') // Remove punctuation
//       .replace(/\s+/g, ' ')    // Collapse multiple spaces
//   }
  
//   if (Array.isArray(answer)) {
//     return answer.map(a => 
//       a?.toString().toLowerCase().trim()
//         .replace(/[^\w\s]/g, '')
//         .replace(/\s+/g, ' ') ?? ""
//     )
//   }
  
//   return JSON.stringify(answer).toLowerCase()
// }

export function normalizeAnswer(answer: any): string | string[] {
  if (answer === undefined || answer === null) {
    return ""; // Retourne une string vide pour les valeurs non définies
  }

  if (typeof answer === 'string') {
    return answer.toLowerCase().trim()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .replace(/\s+/g, ' ')    // Collapse multiple spaces
  }
  
  if (Array.isArray(answer)) {
    return answer.map(a => 
      (a?.toString() ?? "").toLowerCase().trim()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
    )
  }
  
  return JSON.stringify(answer).toLowerCase()
}

// export function isAnswerCorrect(question: Question, answer: any): boolean {
//   if (!question.correctAnswer) return false
  
//   try {
//     const normalizedAnswer = normalizeAnswer(answer)
//     const normalizedCorrect = normalizeAnswer(question.correctAnswer)

//     // Handle multiple correct answers
//     if (Array.isArray(normalizedCorrect)) {
//       if (Array.isArray(normalizedAnswer)) {
//         // For fill-in-blank questions, compare each answer
//         if (question.type === QuestionType.FILL_IN_BLANK) {
//           return normalizedAnswer.length === normalizedCorrect.length &&
//                  normalizedAnswer.every((ans, i) => ans === normalizedCorrect[i])
//         }
//         // For questions with multiple correct options
//         return JSON.stringify(normalizedAnswer.sort()) === JSON.stringify(normalizedCorrect.sort())
//       }
//       // For text questions with multiple acceptable answers
//       return normalizedCorrect.includes(normalizedAnswer)
//     }

//     // Single correct answer case
//     return normalizedAnswer === normalizedCorrect
//   } catch (error) {
//     console.error("Error comparing answers:", error)
//     return false
//   }
// }

export function isAnswerCorrect(question: Question, answer: any): boolean {
  if (!question.correctAnswer) return false
  
  try {
    const normalizedAnswer = normalizeAnswer(answer)
    const normalizedCorrect = normalizeAnswer(question.correctAnswer)

    // Handle case where normalizedAnswer is empty (no answer provided)
    if (normalizedAnswer === "" || (Array.isArray(normalizedAnswer) && normalizedAnswer.every(a => a === ""))) {
      return false
    }

    // Handle multiple correct answers
    if (Array.isArray(normalizedCorrect)) {
      if (Array.isArray(normalizedAnswer)) {
        // For fill-in-blank questions, compare each answer
        if (question.type === QuestionType.FILL_IN_BLANK) {
          return normalizedAnswer.length === normalizedCorrect.length &&
                 normalizedAnswer.every((ans, i) => ans === normalizedCorrect[i])
        }
        // For questions with multiple correct options
        return JSON.stringify(normalizedAnswer.sort()) === JSON.stringify(normalizedCorrect.sort())
      }
      // For text questions with multiple acceptable answers
      return normalizedCorrect.includes(normalizedAnswer as string)
    }

    // Single correct answer case
    return normalizedAnswer === normalizedCorrect
  } catch (error) {
    console.error("Error comparing answers for question", question.id, ":", error)
    return false
  }
}

export function calculateDetailedResults(
  grade: string,
  subject: string,
  studentName: string,
  answers: Record<number, string | string[]>,
  startTime: Date,
  endTime: Date
): AssessmentResult {
  // Get test data based on grade and subject
  const testData = getTestData(grade, subject)
  if (!testData) {
    throw new Error(`Test data not found for grade ${grade} ${subject}`)
  }

  const questionResults: QuestionResult[] = []
  let correctCount = 0

  // Evaluate each question
  testData.questions.forEach((question) => {
    const studentAnswer = answers[question.id] ?? ""
    const isCorrect = isAnswerCorrect(question, studentAnswer)
    if (isCorrect) correctCount++

    questionResults.push({
      id: question.id,
      correct: isCorrect,
      studentAnswer,
      correctAnswer: question.correctAnswer ?? "",
      category: question.category || "General"
    })
  })

  // Calculate categories
  const categories = questionResults.reduce((acc, result) => {
    if (result.correct) {
      acc.strengths.add(result.category)
    } else {
      acc.weaknesses.add(result.category)
    }
    return acc
  }, { strengths: new Set<string>(), weaknesses: new Set<string>() })

  // Calculate time spent in minutes
  const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 60000)
  const percentageScore = Math.round((correctCount / testData.questions.length) * 100)

  return {
    studentName,
    grade,
    subject,
    date: new Date().toISOString().split("T")[0],
    score: correctCount,
    percentageScore,
    timeSpent,
    questionResults,
    strengthCategories: Array.from(categories.strengths),
    weaknessCategories: Array.from(categories.weaknesses)
  }
}

// Helper function to get test data
function getTestData(grade: string, subject: string): QuizData | null {
  // Implementation depends on your data structure
  // This should return the appropriate quiz data based on grade and subject
  return null
}