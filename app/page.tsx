import Link from "next/link"
import { GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-6 rounded-full">
            <GraduationCap size={80} className="text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Radiant Prep</h1>
        <p className="text-xl text-gray-600 mb-8">
          Our diagnostic assessment platform helps identify strengths and areas for improvement in English Language Arts
          and Mathematics.
        </p>
        <Link href="/grade-selection">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 text-lg">
            Start Assessment
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3 text-gray-800">For Students</h2>
          <p className="text-gray-600">
            Complete assessments to identify your academic strengths and areas where you might need additional support.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3 text-gray-800">For Teachers</h2>
          <p className="text-gray-600">
            Gain insights into student performance to tailor instruction and provide targeted support.
          </p>
        </div>
      </div>
    </div>
  )
}

