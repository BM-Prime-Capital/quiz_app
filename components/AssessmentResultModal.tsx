"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

interface AssessmentResultModalProps {
  isOpen: boolean
  onClose: () => void
  studentName: string
  grade: string
  subject: string
  score: number
  emailPreviewUrl?: string
}

export default function AssessmentResultModal({
  isOpen,
  onClose,
  studentName,
  grade,
  subject,
  score,
  emailPreviewUrl,
}: AssessmentResultModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
            Assessment Completed
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold">{studentName}</h3>
            <p className="text-gray-600">
              Grade {grade} - {subject.toUpperCase()}
            </p>
            <div className="mt-4 flex justify-center">
              <div className="bg-gray-100 rounded-full h-32 w-32 flex items-center justify-center">
                <span className="text-3xl font-bold">{score}%</span>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-700 mb-6">
            Your assessment has been completed successfully. The results have been processed.
          </p>

          <div className="flex flex-col space-y-3">
            {emailPreviewUrl && (
              <a
                href={emailPreviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Email Preview
              </a>
            )}
          </div>
        </div>

        <DialogFooter>
          <Link href="/">
            <Button variant="secondary">Return to Home</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

