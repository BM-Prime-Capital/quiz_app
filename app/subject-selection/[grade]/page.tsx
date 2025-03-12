"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { BookOpen, Calculator } from "lucide-react"

export default function SubjectSelection({ params }: { params: { grade: string } }) {
  const router = useRouter()
  const { grade } = params

  const handleSubjectSelect = (subject: string) => {
    router.push(`/grade/${grade}/${subject}`)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Grade {grade}</h2>
      <p className="text-center text-gray-600 mb-6">Select the subject for your assessment</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => handleSubjectSelect("ela")}
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <BookOpen size={48} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">ELA</h3>
            <p className="text-center text-gray-600">
              English Language Arts assessment to evaluate reading comprehension, vocabulary, and writing skills.
            </p>
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
              Start ELA Assessment
            </button>
          </div>
        </div>

        <div
          onClick={() => handleSubjectSelect("math")}
          className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
        >
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <Calculator size={48} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Math</h3>
            <p className="text-center text-gray-600">
              Mathematics assessment to evaluate numerical skills, problem-solving, and mathematical concepts.
            </p>
            <button className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200">
              Start Math Assessment
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/grade-selection" className="text-blue-600 hover:text-blue-800 font-medium">
          &larr; Back to Grade Selection
        </Link>
          <span className="mx-4">or</span>
          <Link href="/" className="text-blue-600 hover:underline">
            &larr; Back to Home
          </Link>
        </div>
    </div>
  )
}

