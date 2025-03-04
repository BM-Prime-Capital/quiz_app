import Link from "next/link"

export default function GradePage({ params }: { params: { grade: string } }) {
  const { grade } = params

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Grade {grade}</h1>
        <p className="text-xl text-gray-600">Diagnostic Assessment</p>
      </div>

      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Select Subject</h2>

        <div className="grid grid-cols-1 gap-6">
          <Link href={`/grade/${grade}/ela`}>
            <div className="border-2 border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
              <span className="text-3xl font-bold block mb-2">ELA</span>
              <span className="text-gray-600">English Language Arts</span>
            </div>
          </Link>

          <Link href={`/grade/${grade}/math`}>
            <div className="border-2 border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
              <span className="text-3xl font-bold block mb-2">MATH</span>
              <span className="text-gray-600">Mathematics</span>
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            &larr; Back to Grade Selection
          </Link>
        </div>
      </div>
    </div>
  )
}

