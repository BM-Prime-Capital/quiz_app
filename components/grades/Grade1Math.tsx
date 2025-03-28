"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { grade1MathData} from "@/data/grade1/mathData"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"

// Modification du composant Grade1Math pour intégrer la soumission
// Ajoutez ces imports au début du fichier
import SubmitAssessmentButton from "@/components/SubmitAssessmentButton"
import AssessmentResultModal from "@/components/AssessmentResultModal"
import { Question, QuestionType } from "@/lib/types"

const Grade1Math: React.FC = () => {
  const quizData = grade1MathData

  // Utiliser localStorage pour la persistance
  const [studentName, setStudentName] = useState("")
  const [date, setDate] = useState("")
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [currentStep, setCurrentStep] = useState(0) // 0: info, 1: questions
  const [submitted, setSubmitted] = useState(false)

  // À l'intérieur du composant Grade1Math, ajoutez ces états
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [showResultModal, setShowResultModal] = useState(false)
  const [resultPdfUrl, setResultPdfUrl] = useState("")
  const [score, setScore] = useState(0)

  // Charger les données depuis localStorage au montage du composant
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("mathStudentName")
      const savedAnswers = localStorage.getItem("mathAnswers")
      const savedStep = localStorage.getItem("mathCurrentStep")

      // Toujours utiliser la date du jour
      const today = new Date().toISOString().split("T")[0]
      setDate(today)

      if (savedName) setStudentName(savedName)
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
      if (savedStep) setCurrentStep(Number.parseInt(savedStep))
    }
  }, [])

  // Sauvegarder les changements dans localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && studentName) {
      localStorage.setItem("mathStudentName", studentName)
      localStorage.setItem("mathDate", date)
      localStorage.setItem("mathAnswers", JSON.stringify(answers))
      localStorage.setItem("mathCurrentStep", String(currentStep))
    }
  }, [studentName, date, answers, currentStep])

  // Nettoyer localStorage après la soumission
  useEffect(() => {
    if (submitted && typeof window !== "undefined") {
      localStorage.removeItem("mathStudentName")
      localStorage.removeItem("mathDate")
      localStorage.removeItem("mathAnswers")
      localStorage.removeItem("mathCurrentStep")
    }
  }, [submitted])

  // Ajoutez cet useEffect pour enregistrer l'heure de début
  useEffect(() => {
    if (currentStep === 1 && !startTime) {
      setStartTime(new Date())
    }
  }, [currentStep, startTime])

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

  // Remplacez la fonction handleSubmit existante par celle-ci
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Ici, au lieu de définir directement submitted à true,
    // nous allons laisser le bouton de soumission gérer cela
  }

  // Remplacer la fonction renderQuestion par cette version améliorée qui permet de répondre à toutes les questions en ligne

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

      case "drawing":
        // Pour les questions de dessin, on offre des options de réponse
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
                      className="max-w-full h-auto mb-3 object-contain"
                    />
                  </div>
                )}

                {/* Interface interactive pour les questions de dessin */}
                <div className="mt-4">
                  {question.id === 1 && (
                    <div className="space-y-3">
                      <p className="text-gray-700">Sélectionnez l'objet qui est différent dans chaque groupe:</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="q1-different"
                              value="briefcase1"
                              checked={(answers[question.id] as string) === "briefcase1"}
                              onChange={() => handleAnswerChange(question.id, "briefcase1")}
                              className="mr-2"
                            />
                            <span>Premier objet</span>
                          </label>
                        </div>
                        <div className="border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="q1-different"
                              value="briefcase2"
                              checked={(answers[question.id] as string) === "briefcase2"}
                              onChange={() => handleAnswerChange(question.id, "briefcase2")}
                              className="mr-2"
                            />
                            <span>Deuxième objet</span>
                          </label>
                        </div>
                        <div className="border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="q1-different"
                              value="briefcase3"
                              checked={(answers[question.id] as string) === "briefcase3"}
                              onChange={() => handleAnswerChange(question.id, "briefcase3")}
                              className="mr-2"
                            />
                            <span>Troisième objet</span>
                          </label>
                        </div>
                        <div className="border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="q1-different"
                              value="briefcase4"
                              checked={(answers[question.id] as string) === "briefcase4"}
                              onChange={() => handleAnswerChange(question.id, "briefcase4")}
                              className="mr-2"
                            />
                            <span>Quatrième objet</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {question.id === 3 && (
                    <div className="space-y-3">
                      <p className="text-gray-700">Quelle forme vient ensuite dans le motif?</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="q3-pattern"
                              value="circle"
                              checked={(answers[question.id] as string) === "circle"}
                              onChange={() => handleAnswerChange(question.id, "circle")}
                              className="mr-2"
                            />
                            <span>Cercle</span>
                          </label>
                        </div>
                        <div className="border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="q3-pattern"
                              value="square"
                              checked={(answers[question.id] as string) === "square"}
                              onChange={() => handleAnswerChange(question.id, "square")}
                              className="mr-2"
                            />
                            <span>Carré</span>
                          </label>
                        </div>
                        <div className="border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="q3-pattern"
                              value="triangle"
                              checked={(answers[question.id] as string) === "triangle"}
                              onChange={() => handleAnswerChange(question.id, "triangle")}
                              className="mr-2"
                            />
                            <span>Triangle</span>
                          </label>
                        </div>
                        <div className="border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="q3-pattern"
                              value="diamond"
                              checked={(answers[question.id] as string) === "diamond"}
                              onChange={() => handleAnswerChange(question.id, "diamond")}
                              className="mr-2"
                            />
                            <span>Losange</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {question.id === 6 && (
                    <div className="space-y-3">
                      <p className="text-gray-700">Sélectionnez le troisième élément de chaque rangée:</p>
                      <div className="space-y-3">
                        <div className="border p-3 rounded-md">
                          <p className="font-medium mb-2">Première rangée (EXIT):</p>
                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div
                                key={`row1-${num}`}
                                className={`border p-2 rounded cursor-pointer ${
                                  (answers[question.id] as string)?.includes(`row1-${num}`)
                                    ? "bg-green-100 border-green-500"
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                  const currentVal = (answers[question.id] as string[]) || []
                                  // Remplacer la sélection pour la rangée 1
                                  const newVal = currentVal
                                    .filter((v) => !v.startsWith("row1-"))
                                    .concat([`row1-${num}`])
                                  setAnswers((prev) => ({ ...prev, [question.id]: newVal }))
                                }}
                              >
                                Élément {num}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border p-3 rounded-md">
                          <p className="font-medium mb-2">Deuxième rangée (tasses):</p>
                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3].map((num) => (
                              <div
                                key={`row2-${num}`}
                                className={`border p-2 rounded cursor-pointer ${
                                  (answers[question.id] as string[])?.includes(`row2-${num}`)
                                    ? "bg-green-100 border-green-500"
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                  const currentVal = (answers[question.id] as string[]) || []
                                  // Remplacer la sélection pour la rangée 2
                                  const newVal = currentVal
                                    .filter((v) => !v.startsWith("row2-"))
                                    .concat([`row2-${num}`])
                                  setAnswers((prev) => ({ ...prev, [question.id]: newVal }))
                                }}
                              >
                                Élément {num}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border p-3 rounded-md">
                          <p className="font-medium mb-2">Troisième rangée (chapeaux):</p>
                          <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4].map((num) => (
                              <div
                                key={`row3-${num}`}
                                className={`border p-2 rounded cursor-pointer ${
                                  (answers[question.id] as string[])?.includes(`row3-${num}`)
                                    ? "bg-green-100 border-green-500"
                                    : "hover:bg-gray-50"
                                }`}
                                onClick={() => {
                                  const currentVal = (answers[question.id] as string[]) || []
                                  // Remplacer la sélection pour la rangée 3
                                  const newVal = currentVal
                                    .filter((v) => !v.startsWith("row3-"))
                                    .concat([`row3-${num}`])
                                  setAnswers((prev) => ({ ...prev, [question.id]: newVal }))
                                }}
                              >
                                Élément {num}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {question.id === 13 && (
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        Combien de cercles faut-il dessiner pour représenter l'équation 6 + 0 = 6?
                      </p>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={(answers[question.id] as string) || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-20 text-center font-mono text-lg"
                        placeholder="Nombre"
                      />
                    </div>
                  )}

                  {question.id === 22 && (
                    <div className="space-y-3">
                      <p className="text-gray-700">Sélectionnez les pièces nécessaires pour acheter un objet à 35¢:</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="q22-penny"
                            checked={(answers[question.id] as string[])?.includes("penny")}
                            onChange={(e) => {
                              const currentVal = (answers[question.id] as string[]) || []
                              if (e.target.checked) {
                                setAnswers((prev) => ({ ...prev, [question.id]: [...currentVal, "penny"] }))
                              } else {
                                setAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: currentVal.filter((v) => v !== "penny"),
                                }))
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor="q22-penny">Penny (1¢)</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="q22-nickel"
                            checked={(answers[question.id] as string[])?.includes("nickel")}
                            onChange={(e) => {
                              const currentVal = (answers[question.id] as string[]) || []
                              if (e.target.checked) {
                                setAnswers((prev) => ({ ...prev, [question.id]: [...currentVal, "nickel"] }))
                              } else {
                                setAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: currentVal.filter((v) => v !== "nickel"),
                                }))
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor="q22-nickel">Nickel (5¢)</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="q22-dime"
                            checked={(answers[question.id] as string[])?.includes("dime")}
                            onChange={(e) => {
                              const currentVal = (answers[question.id] as string[]) || []
                              if (e.target.checked) {
                                setAnswers((prev) => ({ ...prev, [question.id]: [...currentVal, "dime"] }))
                              } else {
                                setAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: currentVal.filter((v) => v !== "dime"),
                                }))
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor="q22-dime">Dime (10¢)</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="q22-quarter"
                            checked={(answers[question.id] as string[])?.includes("quarter")}
                            onChange={(e) => {
                              const currentVal = (answers[question.id] as string[]) || []
                              if (e.target.checked) {
                                setAnswers((prev) => ({ ...prev, [question.id]: [...currentVal, "quarter"] }))
                              } else {
                                setAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: currentVal.filter((v) => v !== "quarter"),
                                }))
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor="q22-quarter">Quarter (25¢)</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {question.id === 24 && (
                    <div className="space-y-3">
                      <p className="text-gray-700">Sélectionnez les formes que vous devez dessiner:</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="q24-square"
                            checked={(answers[question.id] as string[])?.includes("square")}
                            onChange={(e) => {
                              const currentVal = (answers[question.id] as string[]) || []
                              if (e.target.checked) {
                                setAnswers((prev) => ({ ...prev, [question.id]: [...currentVal, "square"] }))
                              } else {
                                setAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: currentVal.filter((v) => v !== "square"),
                                }))
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor="q24-square">Carré</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="q24-triangle"
                            checked={(answers[question.id] as string[])?.includes("triangle")}
                            onChange={(e) => {
                              const currentVal = (answers[question.id] as string[]) || []
                              if (e.target.checked) {
                                setAnswers((prev) => ({ ...prev, [question.id]: [...currentVal, "triangle"] }))
                              } else {
                                setAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: currentVal.filter((v) => v !== "triangle"),
                                }))
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor="q24-triangle">Triangle</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="q24-circle"
                            checked={(answers[question.id] as string[])?.includes("circle")}
                            onChange={(e) => {
                              const currentVal = (answers[question.id] as string[]) || []
                              if (e.target.checked) {
                                setAnswers((prev) => ({ ...prev, [question.id]: [...currentVal, "circle"] }))
                              } else {
                                setAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: currentVal.filter((v) => v !== "circle"),
                                }))
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor="q24-circle">Cercle</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="q24-rectangle"
                            checked={(answers[question.id] as string[])?.includes("rectangle")}
                            onChange={(e) => {
                              const currentVal = (answers[question.id] as string[]) || []
                              if (e.target.checked) {
                                setAnswers((prev) => ({ ...prev, [question.id]: [...currentVal, "rectangle"] }))
                              } else {
                                setAnswers((prev) => ({
                                  ...prev,
                                  [question.id]: currentVal.filter((v) => v !== "rectangle"),
                                }))
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor="q24-rectangle">Rectangle</label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pour les autres questions de dessin, on offre un champ de texte */}
                  {(question.id === 5 ||
                    (question.id !== 1 &&
                      question.id !== 3 &&
                      question.id !== 6 &&
                      question.id !== 13 &&
                      question.id !== 22 &&
                      question.id !== 24)) && (
                    <div>
                      <label className="block text-gray-700 mb-2">Votre réponse:</label>
                      <textarea
                        value={(answers[question.id] as string) || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        className="w-full border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Écrivez votre réponse ici..."
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case "pattern":
      case "matching":
        // Utiliser le même rendu que pour QuestionType.DRAWING
        return renderQuestion({ ...question, type: QuestionType.DRAWING })

      case "fill-in-blank":
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
                      className="max-w-full h-auto mb-3 object-contain"
                    />
                  </div>
                )}

                <div className="space-y-4 mt-4">
                  {question.blanks?.map((blank, index) => (
                    <div key={index} className="flex flex-col">
                      <p className="mb-2 text-gray-700 font-mono text-lg">{blank}</p>
                      <input
                type="text"
                        value={((answers[question.id] as string[]) || [])[index] || ""}
                        onChange={(e) => handleBlankAnswerChange(question.id, index, e.target.value)}
                        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-20 text-center font-mono text-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case QuestionType.CLOCK :
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
                      className="max-w-full h-auto mb-3 object-contain"
                    />
                  </div>
                )}

                <div className="mt-4">
                  <label className="block text-gray-700 mb-2">Answer:</label>
                  <input
                    type="text"
                    value={(answers[question.id] as string) || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full md:w-1/3"
                    placeholder="Enter time"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case "comparison":
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
                      className="max-w-full h-auto mb-3 object-contain"
                    />
                  </div>
                )}

                <div className="space-y-4 mt-4">
                  {question.blanks?.map((blank, index) => (
                    <div key={index} className="flex flex-col">
                      <p className="mb-2 text-gray-700 font-mono text-lg">{blank}</p>
                      <select
                        value={((answers[question.id] as string[]) || [])[index] || ""}
                        onChange={(e) => handleBlankAnswerChange(question.id, index, e.target.value)}
                        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-20 text-center font-mono text-lg"
                      >
                        <option value="">Select</option>
                        <option value="<">&lt;</option>
                        <option value=">">&gt;</option>
                        <option value="=">=</option>
                      </select>
                    </div>
                  ))}
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

          {/* Dans le rendu, remplacez le bouton de soumission par notre composant personnalisé */}
          {/* Remplacez:
          // <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
          //   Submit Assessment
          // </button>

          // Par: */}
          {!submitted && (
        <SubmitAssessmentButton
          studentName={studentName}
          grade="1"
          subject="math"
          answers={answers}
          startTime={startTime || new Date()}
          onSuccess={(score, emailPreviewUrl) => {
            setScore(score)
            setShowResultModal(true)
            setSubmitted(true)
            // Stocker l'URL de prévisualisation de l'email si disponible
            if (emailPreviewUrl) {
              localStorage.setItem("emailPreviewUrl", emailPreviewUrl)
            }
          }}
        />
      )}
        </div>
      </form>
      {/* Ajoutez le modal de résultat à la fin du composant, juste avant le dernier return */}
       {/* Modal de résultat */}
       {showResultModal && (
        <AssessmentResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          studentName={studentName}
          grade="1"
          subject="math"
          score={score}
          emailPreviewUrl={localStorage.getItem("emailPreviewUrl") || undefined}
        />
      )}
    </div>
  )
}

export default Grade1Math

