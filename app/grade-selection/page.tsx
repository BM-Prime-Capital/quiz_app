"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function GradeSelection() {
  const router = useRouter()
  const grades = [1, 2, 3, 4, 5, 6, 7, 8]

  const handleGradeSelect = (grade: number) => {
    router.push(`/subject-selection/${grade}`)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Select Your Grade</h1>
      <p className="text-center text-gray-600 mb-8">Choose the grade level for your assessment</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {grades.map((grade) => (
          <div
            key={grade}
            onClick={() => handleGradeSelect(grade)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer overflow-hidden"
          >
            <div className="p-4 text-center">
              <div className="text-5xl font-bold mb-2 text-gray-800">{grade}</div>
              <div className="text-gray-600">Grade {grade}</div>
            </div>
            <div className="bg-blue-600 p-2 text-center text-white font-medium">Select</div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  )
}

