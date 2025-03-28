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
  onSuccess: (score: number) => void
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
    if (!studentName) {
      setError("Student name is required")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const payload = {
        studentName,
        grade,
        subject,
        answers,
        startTime: startTime.toISOString(),
        endTime: new Date().toISOString()
        // SUPPRIMEZ teacherEmail d'ici
      }

      const response = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit assessment")
      }

      const score = data.score || 0 // Utilisez le score retourné par l'API
      onSuccess(score)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Submission failed"
      setError(errorMessage)
      onSuccess(0)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
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
        <div className="flex items-center text-red-500 text-sm mt-2">
          <AlertCircle className="mr-2 h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}