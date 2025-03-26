"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { grade8MathData, type Question } from "@/data/grade8/mathData"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"

const Grade8Math: React.FC = () => {
  const quizData = grade8MathData
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)

  // Utiliser localStorage pour la persistance
  const [studentName, setStudentName] = useState("")
  const [date, setDate] = useState("")
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [drawings, setDrawings] = useState<Record<number, string>>({})
  const [currentStep, setCurrentStep] = useState(0) // 0: info, 1: questions
  const [submitted, setSubmitted] = useState(false)

  // Charger les données depuis localStorage au montage du composant
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("math8StudentName")
      const savedAnswers = localStorage.getItem("math8Answers")
      const savedDrawings = localStorage.getItem("math8Drawings")
      const savedStep = localStorage.getItem("math8CurrentStep")

      // Toujours utiliser la date du jour
      const today = new Date().toISOString().split("T")[0]
      setDate(today)

      if (savedName) setStudentName(savedName)
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
      if (savedDrawings) setDrawings(JSON.parse(savedDrawings))
      if (savedStep) setCurrentStep(Number.parseInt(savedStep))
    }
  }, [])

  // Sauvegarder les changements dans localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && studentName) {
      localStorage.setItem("math8StudentName", studentName)
      localStorage.setItem("math8Date", date)
      localStorage.setItem("math8Answers", JSON.stringify(answers))
      localStorage.setItem("math8Drawings", JSON.stringify(drawings))
      localStorage.setItem("math8CurrentStep", String(currentStep))
    }
  }, [studentName, date, answers, drawings, currentStep])

  // Nettoyer localStorage après la soumission
  useEffect(() => {
    if (submitted && typeof window !== "undefined") {
      localStorage.removeItem("math8StudentName")
      localStorage.removeItem("math8Date")
      localStorage.removeItem("math8Answers")
      localStorage.removeItem("math8Drawings")
      localStorage.removeItem("math8CurrentStep")
    }
  }, [submitted])

  // Initialiser le canvas pour le dessin
  useEffect(() => {
    if (canvasRef.current && drawings[20]) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0)
        }
        img.src = drawings[20]
        img.crossOrigin = "anonymous"
      }
    }
  }, [drawings, currentStep])

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
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

  const handleDrawingStart = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setLastX(x)
    setLastY(y)
  }

  const handleDrawingMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.beginPath()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    ctx.stroke()

    setLastX(x)
    setLastY(y)
  }

  const handleDrawingEnd = () => {
    if (isDrawing && canvasRef.current) {
      setIsDrawing(false)
      const canvas = canvasRef.current
      const dataURL = canvas.toDataURL()
      setDrawings((prev) => ({
        ...prev,
        20: dataURL,
      }))
    }
  }

  const clearDrawing = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Redessiner l'image de fond
        const img = new Image()
        img.onload = () => {
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          }
        }
        img.src = "/images/q20-transversal-grade8.png"
        img.crossOrigin = "anonymous"

        // Supprimer le dessin sauvegardé
        setDrawings((prev) => {
          const newDrawings = { ...prev }
          delete newDrawings[20]
          return newDrawings
        })
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Ici vous pourriez envoyer les données à votre backend
    console.log({
      studentName,
      date,
      answers,
      drawings,
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
                <p className="font-medium mb-3 text-gray-800 whitespace-pre-line">{question.question}</p>

                <div className="space-y-2 mt-4">
                  {question.options?.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-md border transition-colors ${
                        answers[question.id] === option
                          ? "bg-green-50 border-green-300"
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

      case "image-choice":
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
                      className="max-w-full h-auto mb-3 object-contain"
                    />
                  </div>
                )}

                <div className="space-y-2 mt-4">
                  {question.options?.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-md border transition-colors ${
                        answers[question.id] === option
                          ? "bg-green-50 border-green-300"
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

      case "fill-in-blank":
        return (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-start">
              <span className="font-bold mr-2 text-gray-700">{question.id}.) </span>
              <div className="flex-1">
                <p className="font-medium mb-3 text-gray-800 whitespace-pre-line">{question.question}</p>

                <div className="space-y-4 mt-4">
                  {question.blanks?.map((blank, index) => (
                    <div key={index} className="flex flex-col">
                      <p className="mb-2 text-gray-700 font-mono text-lg">{blank}</p>
                      <input
                        type="text"
                        value={((answers[question.id] as string[]) || [])[index] || ""}
                        onChange={(e) => handleBlankAnswerChange(question.id, index, e.target.value)}
                        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full md:w-1/3"
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

                <div className="mt-4 border border-gray-300 rounded-md p-4">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={200}
                    className="border border-gray-300 bg-white cursor-crosshair mx-auto"
                    onMouseDown={handleDrawingStart}
                    onMouseMove={handleDrawingMove}
                    onMouseUp={handleDrawingEnd}
                    onMouseLeave={handleDrawingEnd}
                    style={{
                      backgroundImage: `url(${question.image})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={clearDrawing}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Clear Drawing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
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
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
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
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
              alt="Radiant Prep Logo"
              className="h-32 object-contain"
            />
          </div>
          <h2 className="text-xl font-bold mt-4">DIAGNOSTIC ASSESSMENT</h2>
          <div className="mt-4 inline-block border-2 border-black px-8 py-2">
            <span className="text-xl font-bold">MATH</span>
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
                className="w-full border-b-2 border-gray-400 mt-1 h-10 focus:outline-none focus:border-green-500 px-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="font-bold text-gray-700">Date:</label>
              <input
                type="date"
                value={date || new Date().toISOString().split("T")[0]}
                readOnly
                className="w-full border-b-2 border-gray-400 mt-1 h-10 focus:outline-none focus:border-green-500 px-2"
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
                  : "bg-green-600 hover:bg-green-700 text-white"
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

        <div className="space-y-6">{quizData.questions.map((question) => renderQuestion(question))}</div>

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

export default Grade8Math

