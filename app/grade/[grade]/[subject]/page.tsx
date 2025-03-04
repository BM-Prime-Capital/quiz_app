import Grade1ELA from "@/components/grades/Grade1ELA"
import Grade1Math from "@/components/grades/Grade1Math"
import Link from "next/link"

export default function SubjectPage({ params }: { params: { grade: string; subject: string } }) {
  const { grade, subject } = params

  // Render the appropriate component based on grade and subject
  if (grade === "1" && subject === "ela") {
    return <Grade1ELA />
  }

  if (grade === "1" && subject === "math") {
    return <Grade1Math />
  }

  // For other grades and subjects, you would add more components
  // and conditions here as you develop them

  return (
    <div className="container mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Grade {grade} - {subject.toUpperCase()}
      </h1>
      <p className="text-xl text-gray-600 mb-8">This assessment is coming soon.</p>
      <Link href={`/grade/${grade}`} className="text-blue-600 hover:underline">
        &larr; Back to Subject Selection
      </Link>
    </div>
  )
}

