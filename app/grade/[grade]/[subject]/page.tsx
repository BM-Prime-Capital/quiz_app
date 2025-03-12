import Grade1ELA from "@/components/grades/Grade1ELA"
import Grade1Math from "@/components/grades/Grade1Math"
import Grade2ELA from "@/components/grades/Grade2ELA"
import Grade3ELA from "@/components/grades/Grade3ELA"
import Grade4ELA from "@/components/grades/Grade4ELA"
import Grade5ELA from "@/components/grades/Grade5ELA"
import Grade6ELA from "@/components/grades/Grade6ELA"
import Grade7ELA from "@/components/grades/Grade7ELA"
import Grade8ELA from "@/components/grades/Grade8ELA"
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

  if (grade === "2" && subject === "ela") {
    return <Grade2ELA />
  }

  if (grade === "3" && subject === "ela") {
    return <Grade3ELA />
  }

  if (grade === "4" && subject === "ela") {
    return <Grade4ELA />
  }

  if (grade === "5" && subject === "ela") {
    return <Grade5ELA />
  }

  if (grade === "6" && subject === "ela") {
    return <Grade6ELA />
  }

  if (grade === "7" && subject === "ela") {
    return <Grade7ELA />
  }

  if (grade === "8" && subject === "ela") {
    return <Grade8ELA />
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

