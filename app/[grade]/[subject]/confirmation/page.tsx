import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function ConfirmationPage({ params }: { params: { grade: string; subject: string } }) {
  const { grade, subject } = params

  return (
    <div className="container mx-auto py-20 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Évaluation Soumise</CardTitle>
          <CardDescription>
            Votre évaluation de Grade {grade} {subject.toUpperCase()} a été soumise avec succès.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Merci d&apos;avoir complété cette évaluation diagnostique. Vos résultats seront analysés par votre
            enseignant.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Retour à l&apos;accueil</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

