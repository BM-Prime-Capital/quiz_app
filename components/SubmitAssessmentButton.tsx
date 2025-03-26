"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"

interface SubmitAssessmentButtonProps {
  studentName: string
  grade: string
  subject: string
  answers: Record<number, string | string[]>
  startTime: Date
  onSuccess: (score: number, emailPreviewUrl?: string) => void
}

export default function SubmitAssessmentButton({
  studentName,
  grade,
  subject,
  answers,
  startTime,
  onSuccess,
}: SubmitAssessmentButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName,
          grade,
          subject,
          answers,
          startTime: startTime.toISOString(),
          endTime: new Date().toISOString(),
          teacherEmail: "nehemiediav@gmail.com", // Utiliser l'adresse email spécifiée
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit assessment")
      }

      const data = await response.json()

      if (data.success) {
        // Générer un score aléatoire entre 60 et 100
        const randomScore = Math.floor(Math.random() * 41) + 60

        // Appeler le callback de succès avec le score et l'URL de prévisualisation de l'email
        onSuccess(randomScore, data.emailPreviewUrl)
      } else {
        throw new Error(data.error || "Unknown error")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Assessment"
        )}
      </Button>

      {error && (
        <div className="mt-2 text-red-500 flex items-center">
          <AlertCircle className="mr-2 h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  )
}

