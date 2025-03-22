import { Suspense } from "react"
import Grade1ELA from "@/components/grades/Grade1ELA"
import Grade1Math from "@/components/grades/Grade1Math"
import Grade2Math from "@/components/grades/Grade2Math"
import Grade3Math from "@/components/grades/Grade3Math"
import Grade2ELA from "@/components/grades/Grade2ELA"
import Grade3ELA from "@/components/grades/Grade3ELA"
import Grade4ELA from "@/components/grades/Grade4ELA"
import Grade5ELA from "@/components/grades/Grade5ELA"
import Grade6ELA from "@/components/grades/Grade6ELA"
import Grade7ELA from "@/components/grades/Grade7ELA"
import Grade8ELA from "@/components/grades/Grade8ELA"
import Link from "next/link"
import Loading from "./loading"

export default function SubjectPage({ params }: { params: { grade: string; subject: string } }) {
  const { grade, subject } = params

  // Render the appropriate component based on grade and subject
  return (
    <Suspense fallback={<Loading />}>
      {grade === "1" && subject === "ela" && <Grade1ELA />}
      {grade === "1" && subject === "math" && <Grade1Math />}
      {grade === "2" && subject === "math" && <Grade2Math />}
      {grade === "2" && subject === "ela" && <Grade2ELA />}
      {grade === "3" && subject === "math" && <Grade3Math />}
      {grade === "3" && subject === "ela" && <Grade3ELA />}
      {grade === "4" && subject === "ela" && <Grade4ELA />}
      {grade === "5" && subject === "ela" && <Grade5ELA />}
      {grade === "6" && subject === "ela" && <Grade6ELA />}
      {grade === "7" && subject === "ela" && <Grade7ELA />}
      {grade === "8" && subject === "ela" && <Grade8ELA />}

      {/* Pour les autres grades et sujets qui ne sont pas encore implémentés */}
      {!(
        (grade === "1" && (subject === "ela" || subject === "math")) ||
        (grade === "2" && (subject === "ela" || subject === "math")) ||
        (grade === "3" && (subject === "ela" || subject === "math")) ||
        (grade === "4" && subject === "ela") ||
        (grade === "5" && subject === "ela") ||
        (grade === "6" && subject === "ela") ||
        (grade === "7" && subject === "ela") ||
        (grade === "8" && subject === "ela")
      ) && (
        <div className="container mx-auto py-10 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">
            Grade {grade} - {subject.toUpperCase()}
          </h1>
          <p className="text-xl text-gray-600 mb-8">This assessment is coming soon.</p>
          <Link href={`/subject-selection/${grade}`} className="text-blue-600 hover:underline">
            &larr; Back to Subject Selection
          </Link>
        </div>
      )}
    </Suspense>
  )
}

