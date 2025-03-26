import { type NextRequest, NextResponse } from "next/server"
import { calculateResults } from "@/lib/score-calculation"
import { generatePDF } from "@/lib/report-generation"
import { sendEmail } from "@/lib/email-service"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { studentName, grade, subject, answers, startTime, endTime, teacherEmail } = data

    // Validation des données
    if (!studentName || !grade || !subject || !answers || !startTime || !endTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculer les résultats
    const results = calculateResults(grade, subject, studentName, answers, new Date(startTime), new Date(endTime))

    // Générer le PDF
    const pdfBlob = await generatePDF(results)
    const pdfBuffer = await pdfBlob.arrayBuffer()

    // Envoyer l'email si un email d'enseignant est fourni

    let emailResult: { success: boolean; previewUrl: string } = { success: false, previewUrl: "" }
    if (teacherEmail) {
      emailResult = await sendEmail({
        to: teacherEmail,
        subject: `Assessment Results: ${studentName} - Grade ${grade} ${subject.toUpperCase()}`,
        text: `Please find attached the assessment results for ${studentName}.`,
        html: `
          <h1>Assessment Results</h1>
          <p>Student: ${studentName}</p>
          <p>Grade: ${grade}</p>
          <p>Subject: ${subject.toUpperCase()}</p>
          <p>Score: ${results.percentageScore}%</p>
          <p>Please find the detailed report attached.</p>
        `,
        attachments: [
          {
            filename: `${studentName.replace(/\s+/g, "_")}_Grade${grade}_${subject}_Report.pdf`,
            content: Buffer.from(pdfBuffer),
            contentType: "application/pdf",
          },
        ],

      }) as { success: boolean; previewUrl: string }
    }

    // Retourner les résultats
    return NextResponse.json({
      success: true,
      results,
      emailSent: emailResult.success,
      emailPreviewUrl: emailResult.previewUrl,
    })
  } catch (error) {
    console.error("Error processing assessment submission:", error)
    return NextResponse.json(
      { error: "Failed to process assessment: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 },
    )
  }
}

