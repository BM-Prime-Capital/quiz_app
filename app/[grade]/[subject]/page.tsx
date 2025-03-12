"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { getQuestions } from "@/lib/questions"
import { QuestionType } from "@/lib/types"
import Image from "next/image"

export default function QuizPage({ params }: { params: { grade: string; subject: string } }) {
  const { grade, subject } = params
  const router = useRouter()
  const questions = getQuestions(grade, subject)

  const [studentName, setStudentName] = useState("")
  const [date, setDate] = useState("")
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Ici, vous pourriez envoyer les données à votre backend
    console.log({
      studentName,
      date,
      grade,
      subject,
      answers,
    })

    // Simuler un délai pour l'envoi
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/${grade}/${subject}/confirmation`)
    }, 1000)
  }

  const isFormComplete = studentName.trim() !== "" && date.trim() !== ""

  // Si nous sommes à l'étape 0, afficher le formulaire d'information
  if (currentStep === 0) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative w-48 h-48 mb-4">
            <Image src="/newlogo.png" alt="Radiant Prep Logo" fill className="object-contain" priority />
          </div>
          <h1 className="text-5xl font-bold text-center">GRADE {grade}</h1>
          <p className="text-xl text-center text-muted-foreground mt-2">
            DIAGNOSTIC ASSESSMENT - {subject.toUpperCase()}
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Informations de l&apos;étudiant</CardTitle>
            <CardDescription>
              Veuillez entrer votre nom et la date avant de commencer l&apos;évaluation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom:</Label>
              <Input
                id="name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Entrez votre nom complet"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date:</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => setCurrentStep(1)} disabled={!isFormComplete}>
              Commencer l&apos;évaluation
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Grade {grade} - {subject.toUpperCase()}
            </h1>
            <p className="text-muted-foreground">
              Nom: {studentName} | Date: {date}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Question {currentStep} sur {questions.length}
            </p>
          </div>
        </div>

        {questions.map((question, index) => (
          <div key={question.id} className={currentStep === index + 1 ? "block" : "hidden"}>
            <Card className="mb-6">
              <CardContent className="pt-6">
                {question.readingPassage && (
                  <div className="mb-6 p-4 bg-muted rounded-md">
                    <h3 className="text-xl font-bold mb-2">{question.readingPassage.title}</h3>
                    <div className="prose max-w-none">
                      {question.readingPassage.content.split("\n").map((paragraph, i) => (
                        <p key={i} className="mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <span className="font-bold">{question.number})</span>
                  <div className="flex-1">
                    <p className="font-medium mb-4">{question.text}</p>

                    {question.image && (
                      <div className="mb-4">
                        <Image
                          src={question.image || "/placeholder.svg"}
                          alt={`Question ${question.number} image`}
                          width={400}
                          height={300}
                          className="object-contain mx-auto"
                        />
                      </div>
                    )}

                    {question.type === QuestionType.MULTIPLE_CHOICE && (
                      <RadioGroup
                        value={answers[question.id] || ""}
                        onValueChange={(value) => handleAnswerChange(question.id, value)}
                        className="space-y-3"
                      >
                        {question.options?.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2 rounded-md border p-3">
                            <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                            <Label htmlFor={`${question.id}-${option.value}`} className="flex-1 cursor-pointer">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {question.type === QuestionType.TEXT && (
                      <Textarea
                        value={answers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder="Écrivez votre réponse ici..."
                        className="min-h-[100px]"
                      />
                    )}

                    {question.type === QuestionType.DRAWING && (
                      <div className="border rounded-md p-4 text-center">
                        <p className="text-muted-foreground mb-2">
                          Cette question nécessite un dessin. Veuillez noter votre réponse sur papier.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep <= 1}>
                  Précédent
                </Button>

                {currentStep < questions.length ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>Suivant</Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Terminer l'évaluation"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

