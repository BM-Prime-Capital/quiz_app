import type { AssessmentResult } from "./score-calculation"
import { jsPDF } from "jspdf"

export async function generatePDF(result: AssessmentResult): Promise<Blob> {
  // Créer un nouveau document PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Ajouter l'en-tête
  doc.setFontSize(24)
  doc.setTextColor(128, 0, 128) // Violet pour "Comple"
  doc.text("Comple", 20, 20)
  doc.setTextColor(0, 128, 0) // Vert pour "Metrics"
  doc.text("Metrics", 58, 20)
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  doc.text("Complete Measurement of Educational Metrics", 20, 25)
  doc.text("K-12", 20, 30)

  // Logo et informations de l'école
  doc.setFontSize(12)
  doc.text("Radiant Prep, LLC", 140, 20)
  doc.setFontSize(10)
  doc.text("42-20 Broadway", 140, 25)
  doc.text("Astoria, NY 11103", 140, 30)
  doc.text("Learn@radiantprep.com", 140, 35)
  doc.text("(347) 551-0888", 140, 40)
  doc.text("www.RadiantPrep.com", 140, 45)

  // Titre du rapport
  doc.setFillColor(0, 0, 0)
  doc.rect(20, 35, 80, 10, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.text("SCORE REPORT", 30, 42)

  // Informations de l'élève
  doc.setTextColor(0, 0, 0)
  doc.setFillColor(0, 0, 0)
  doc.rect(20, 50, 30, 10, "F")
  doc.setTextColor(255, 255, 255)
  doc.text("SCHOLAR:", 22, 57)

  doc.setFillColor(200, 200, 200)
  doc.rect(50, 50, 80, 10, "F")
  doc.setTextColor(0, 0, 0)
  doc.text(result.studentName, 52, 57)

  // Grade
  doc.setFillColor(200, 200, 200)
  doc.rect(140, 50, 50, 10, "F")
  doc.text(`Grade: ${result.grade}`, 142, 57)

  // Informations sur l'évaluation
  doc.setFontSize(10)
  doc.text(`Assessment: Radiant PACED™ Assessments- Grade ${result.grade} ${result.subject.toUpperCase()}`, 20, 70)
  doc.text(`Date Administered: ${result.date}`, 20, 75)

  // Score
  doc.setFontSize(36)
  doc.text(`${result.percentageScore}%`, 140, 110)

  // Sections Correct/Incorrect
  doc.setFillColor(0, 128, 0)
  doc.rect(20, 120, 80, 10, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.text("Correct", 45, 127)

  doc.setFillColor(255, 0, 0)
  doc.rect(110, 120, 80, 10, "F")
  doc.text("Incorrect", 135, 127)

  // Liste des points forts
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  let yPos = 140

  result.strengthCategories.forEach((category, index) => {
    doc.text(`${index + 1}. ${category}`, 20, yPos)
    yPos += 5
  })

  // Liste des points faibles
  yPos = 140
  result.weaknessCategories.forEach((category, index) => {
    doc.text(`${index + 1}. ${category}`, 110, yPos)
    yPos += 5
  })

  // Analyse générale
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  yPos = Math.max(yPos, 200)
  doc.text("GENERAL ANALYSIS / FOCUS AREAS:", 20, yPos)

  doc.setFontSize(10)
  let analysis = ""
  if (result.percentageScore < 30) {
    analysis = `Our data indicates ${result.studentName} requires critical interventions in ${result.subject.toUpperCase()}. The results show performance significantly below typical peer metrics. We recommend a structured foundation in ${result.subject === "math" ? "mathematics" : "literacy"}.`
  } else if (result.percentageScore < 70) {
    analysis = `${result.studentName} shows mixed results in ${result.subject.toUpperCase()}. Some areas are strong while others need improvement. We recommend targeted practice in the weak areas identified above.`
  } else {
    analysis = `${result.studentName} demonstrates strong proficiency in ${result.subject.toUpperCase()}. To continue growth, we recommend enrichment activities that build on these strengths.`
  }

  doc.text(analysis, 20, yPos + 10, { maxWidth: 170 })

  // Pied de page
  doc.setFontSize(8)
  doc.text(
    "Copyright © by Radiant Prep, LLC. All Rights Reserved. CONFIDENTIAL - May NOT be reproduced in any form without permission.",
    20,
    280,
  )

  return doc.output("blob")
}

