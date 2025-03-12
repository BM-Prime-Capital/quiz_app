import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function GradePage({ params }: { params: { grade: string } }) {
  const { grade } = params

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="relative w-48 h-48 mb-4">
          <Image src="/newlogo.png" alt="Radiant Prep Logo" fill className="object-contain" priority />
        </div>
        <h1 className="text-5xl font-bold text-center">GRADE {grade}</h1>
        <p className="text-xl text-center text-muted-foreground mt-2">DIAGNOSTIC ASSESSMENT</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <Link href={`/${grade}/ela`}>
            <Card className="hover:bg-muted transition-colors cursor-pointer">
              <CardHeader className="text-center py-6">
                <CardTitle className="text-3xl">ELA</CardTitle>
                <CardDescription>English Language Arts</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href={`/${grade}/math`}>
            <Card className="hover:bg-muted transition-colors cursor-pointer">
              <CardHeader className="text-center py-6">
                <CardTitle className="text-3xl">MATH</CardTitle>
                <CardDescription>Mathematics</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

