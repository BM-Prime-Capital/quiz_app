"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { grade1ELAData} from "../../data/grade1/elaData"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import SubmitAssessmentButton from "../SubmitAssessmentButton"

import { calculateDetailedResults } from "@/lib/score-calculation"
import { 
  QuestionResult, 
  AssessmentResult,
  QuizData, 
  Question,
  QuestionType
} from "@/lib/types"

const Grade1ELA: React.FC = () => {
  const quizData = grade1ELAData
  const [studentName, setStudentName] = useState("")
  const [date, setDate] = useState("")
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [currentPassage, setCurrentPassage] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0) // 0: info, 1: questions
  const [timeElapsed, setTimeElapsed] = useState(0) // Temps écoulé en secondes

  // Group questions by passage
  const questionsByPassage: Record<string, Question[]> = {}
  const questionsWithoutPassage: Question[] = []

  quizData.questions.forEach((question) => {
    if (question.passage) {
      if (!questionsByPassage[question.passage]) {
        questionsByPassage[question.passage] = []
      }
      questionsByPassage[question.passage].push(question)
    } else {
      questionsWithoutPassage.push(question)
    }
  })

  // Démarrer le chronomètre lorsque currentStep passe à 1
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (currentStep === 1) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000) // 1000 ms = 1 seconde
    }

    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque l'évaluation est soumise
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentStep])

  // Convertir le temps écoulé en secondes en format MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleTextAnswerChange = (questionId: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: event.target.value,
    }))
  }

  const handleBlankAnswerChange = (questionId: number, index: number, value: string) => {
    const currentAnswers = (answers[questionId] as string[]) || []
    const newAnswers = [...currentAnswers]
    newAnswers[index] = value

    setAnswers((prev) => ({
      ...prev,
      [questionId]: newAnswers,
    }))
  }

  const handleSubmitSuccess = async () => {
    try {
      const startTime = new Date(Date.now() - timeElapsed * 1000)
      const endTime = new Date()
      
      // Utilisez directement quizData au lieu de getTestData
      const questionResults: QuestionResult[] = quizData.questions.map(question => ({
        id: question.id,
        correct: isAnswerCorrect(question, answers[question.id]),
        studentAnswer: answers[question.id] ?? (question.type === 'fill-in-blank' ? [] : ''),
        correctAnswer: question.correctAnswer ?? (question.type === 'fill-in-blank' ? [] : ''),
        category: question.category || 'General'
      }));
  
      const correctCount = questionResults.filter(r => r.correct).length;
      const percentageScore = Math.round((correctCount / quizData.questions.length) * 100);
      const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
  
      // Calcul des catégories
      const categories = questionResults.reduce((acc, result) => {
        if (result.correct) {
          acc.strengths.add(result.category);
        } else {
          acc.weaknesses.add(result.category);
        }
        return acc;
      }, { strengths: new Set<string>(), weaknesses: new Set<string>() });
  
      const assessmentResult: AssessmentResult = {
        studentName,
        grade: quizData.grade.toString(),
        subject: quizData.subject,
        date: new Date().toISOString().split('T')[0],
        score: correctCount,
        percentageScore,
        timeSpent,
        questionResults,
        strengthCategories: Array.from(categories.strengths),
        weaknessCategories: Array.from(categories.weaknesses)
      };
  
      // Envoyez ces données au backend
      const response = await fetch('/api/submit-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...assessmentResult,
          answers// Inclure les réponses brutes si nécessaire
          // teacherEmail: "barahenock@gmail.com" // Remplacer par l'email dynamique si besoin
        })
      });
  
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Submission failed');
  
      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Une erreur est survenue lors de la soumission.");
    }
  }

  const isAnswerCorrect = (question: Question, answer: any): boolean => {
    if (!question.correctAnswer) return false;
    
    // Gestion des tableaux (fill-in-blank)
    if (Array.isArray(answer)) {
      return Array.isArray(question.correctAnswer) && 
             JSON.stringify(answer) === JSON.stringify(question.correctAnswer);
    }
    
    // Comparaison simple pour les autres types
    return answer === question.correctAnswer;
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-start">
              <span className="font-bold mr-2 text-gray-700">{question.id} </span>
              <div className="flex-1">
                <p className="font-medium mb-3 text-gray-800">{question.question}</p>

                {question.image && (
                  <div className="mb-4">
                    <img
                      src={question.image || "/placeholder.svg"}
                      alt={`Question ${question.id}`}
                      className="max-w-full h-auto mb-3 max-h-48 object-contain rounded-md border border-gray-200"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  {question.options?.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-md border transition-colors ${
                        answers[question.id] === option
                          ? "bg-blue-50 border-blue-300"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => handleAnswerChange(question.id, option)}
                    >
                      <input
                        type="radio"
                        id={`q${question.id}-${index}`}
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => handleAnswerChange(question.id, option)}
                        className="mr-3"
                      />
                      <label htmlFor={`q${question.id}-${index}`} className="cursor-pointer flex-1">
                        {String.fromCharCode(65 + index)}. {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "text":
        return (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-start">
              <span className="font-bold mr-2 text-gray-700">{question.id} </span>
              <div className="flex-1">
                <p className="font-medium mb-3 text-gray-800">{question.question}</p>
                <textarea
                  rows={4}
                  value={(answers[question.id] as string) || ""}
                  onChange={(e) => handleTextAnswerChange(question.id, e)}
                  className="w-full border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your answer here..."
                />
              </div>
            </div>
          </div>
        )

      case "fill-in-blank":
        return (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-start">
              <span className="font-bold mr-2 text-gray-700">{question.id} </span>
              <div className="flex-1">
                <p className="font-medium mb-3 text-gray-800">{question.question}</p>
                <div className="space-y-4">
                  {question.blanks?.map((blank, index) => (
                    <div key={index} className="flex flex-col">
                      <p className="mb-2 text-gray-700">{blank}</p>
                      <input
                        type="text"
                        value={((answers[question.id] as string[]) || [])[index] || ""}
                        onChange={(e) => handleBlankAnswerChange(question.id, index, e.target.value)}
                        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-1/2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "drawing":
        return (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-start">
              <span className="font-bold mr-2 text-gray-700">{question.id} </span>
              <div className="flex-1">
                <p className="font-medium mb-3 text-gray-800">{question.question}</p>
                {question.image && (
                  <div className="mb-4">
                    <img
                      src={question.image || "/placeholder.svg"}
                      alt={`Question ${question.id}`}
                      className="max-w-full h-auto mb-3 max-h-48 object-contain rounded-md border border-gray-200"
                    />
                  </div>
                )}
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                  <p className="text-yellow-700 italic">
                    Note: For drawing questions, please draw on a separate paper or use the PDF version of this
                    assessment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-start">
              <span className="font-bold mr-2 text-gray-700">{question.id} </span>
              <div className="flex-1">
                <p className="font-medium mb-3 text-gray-800">{question.question}</p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                  <p className="text-yellow-700 italic">This question type is not supported in the online version.</p>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Assessment Submitted</h2>
          <p className="text-gray-600 mb-6">
            Thank you for completing the Grade {quizData.grade} {quizData.subject.toUpperCase()} assessment. Your
            responses have been recorded.
          </p>
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    )
  }

  if (currentStep === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">GRADE {quizData.grade}</h1>
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
              alt="Radiant Prep Logo"
              className="h-32 object-contain hover:opacity-90 transition-opacity"
            />
          </div>
          <h2 className="text-xl font-bold mt-4">DIAGNOSTIC ASSESSMENT</h2>
          <div className="mt-4 inline-block border-2 border-black px-8 py-2">
            <span className="text-xl font-bold">ELA</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Student Information</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="font-bold text-gray-700">Name:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full border-b-2 border-gray-400 mt-1 h-10 focus:outline-none focus:border-blue-500 px-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="font-bold text-gray-700">Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-b-2 border-gray-400 mt-1 h-10 focus:outline-none focus:border-blue-500 px-2"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setCurrentStep(1)}
              disabled={!studentName || !date}
              className={`py-2 px-6 rounded-lg font-bold transition duration-200 ${
                !studentName || !date
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Begin Assessment
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link
            href={`/subject-selection/${quizData.grade}`}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Subject Selection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Grade {quizData.grade} - {quizData.subject.toUpperCase()}
            </h1>
            <p className="text-gray-600">
              Student: {studentName} | Date: {date}
            </p>
          </div>
          <div className="text-lg font-bold text-gray-700">
            Time Elapsed: {formatTime(timeElapsed)}
          </div>
        </div>

        {/* Render questions with passages */}
        {Object.entries(questionsByPassage).map(([passage, questions]) => (
          <div key={passage} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-center text-gray-800 border-b pb-2">
                  {passage.split("\n")[0]}
                </h3>
                {passage
                  .split("\n\n")
                  .slice(1)
                  .map((paragraph, idx) => (
                    <p key={idx} className="mb-4 text-gray-700">
                      {paragraph}
                    </p>
                  ))}
              </div>

              <div className="space-y-4">{questions.map((question) => renderQuestion(question))}</div>
            </div>
          </div>
        ))}

        {/* Render questions without passages */}
        {questionsWithoutPassage.length > 0 && (
          <div className="space-y-4">{questionsWithoutPassage.map((question) => renderQuestion(question))}</div>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => setCurrentStep(0)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Back
          </button>

          <SubmitAssessmentButton
            studentName={studentName}
            grade={quizData.grade.toString()}
            subject={quizData.subject}
            answers={answers}
            startTime={new Date(Date.now() - timeElapsed * 1000)}
            onSuccess={handleSubmitSuccess}
          />

        </div>
      </form>
    </div>
  )
}


export default Grade1ELA
