"use client"

import type React from "react"
import { useState } from "react"
import { grade1ELAData, type Question } from "../../data/grade1/elaData"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"

const Grade1ELA: React.FC = () => {
  const quizData = grade1ELAData
  const [studentName, setStudentName] = useState("")
  const [date, setDate] = useState("")
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const [currentPassage, setCurrentPassage] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0) // 0: info, 1: questions

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Ici vous pourriez envoyer les données à votre backend
    console.log({
      studentName,
      date,
      answers,
    })

    setSubmitted(true)
  }

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-start">
              <span className="font-bold mr-2 text-gray-700">{question.id}.) </span>
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
              <span className="font-bold mr-2 text-gray-700">{question.id}.) </span>
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
              <span className="font-bold mr-2 text-gray-700">{question.id}.) </span>
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
              <span className="font-bold mr-2 text-gray-700">{question.id}.) </span>
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
              <span className="font-bold mr-2 text-gray-700">{question.id}.) </span>
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
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Grade {quizData.grade} - {quizData.subject.toUpperCase()}
            </h1>
            <p className="text-gray-600">
              Student: {studentName} | Date: {date}
            </p>
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

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Submit Assessment
          </button>
        </div>
      </form>
    </div>
  )
}

export default Grade1ELA

