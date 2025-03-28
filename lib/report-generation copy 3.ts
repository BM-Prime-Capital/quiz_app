import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { loadImage } from "./image-utils";
import { QuestionType } from "./types";
import logo from '../public/newlogo.png'; // Assurez-vous que le chemin est correct


interface ReportOptions {
  studentName: string;
  grade: string;
  subject: string;
  date: Date;
  percentageScore: number;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  unusedTime: number;
  customScale: number;
  setScale: number;
  questionResults: {
    id: number;
    correct: boolean;
    category: string;
  }[];
  // Ajouter ces propriétés manquantes
  strengthCategories: string[];
  weaknessCategories: string[];
  questions: {
    id: number;
    question: string;
    correctAnswer: any;
    type: QuestionType;
    category: string;
  }[];
}

const FONTS = {
  title: "helvetica",
  subtitle: "helvetica",
  body: "helvetica",
  bold: "helvetica" // Utilisez la même police avec style bold
};

const COLORS = {
  primary: "#3498db",
  secondary: "#e74c3c",
  success: "#2ecc71",
  warning: "#f39c12",
  dark: "#2c3e50",
  light: "#ecf0f1",
  textDark: "#34495e",
  textLight: "#7f8c8d"
};

export async function generateProfessionalPDF(result: ReportOptions): Promise<Blob> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Configuration
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 2 * margin;
  let yPos = margin;

  // En-tête avec logo
  try {
    const logoData = await loadImage('newlogo.png');
    doc.addImage(logoData, 'PNG', margin, yPos, 40, 10);
  } catch (e) {
    console.error("Failed to load logo:", e);
  }

  // Titre principal centré
  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(18);
  doc.setTextColor(COLORS.dark);
  doc.text("COMPLEMETRICS®", pageWidth / 2, yPos + 10, { align: "center" });
  
  doc.setFontSize(10);
  doc.text("Complete Academic Metrics, Accurate, Insightful, Proof in Data.", pageWidth / 2, yPos + 15, { align: "center" });
  
  doc.setFontSize(14);
  doc.text("K-12 SCORE REPORT", pageWidth / 2, yPos + 22, { align: "center" });
  yPos += 30;

  // Ligne de séparation
  doc.setDrawColor(COLORS.dark);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Informations étudiant
  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(12);
  doc.text("SCHOLAR:", margin, yPos);
  doc.setFont(FONTS.body, "normal");
  doc.text(result.studentName, margin + 15, yPos);
  yPos += 7;

  // Détails de l'évaluation
  doc.setFont(FONTS.bold, "bold");
  doc.text("Assessment:", margin, yPos);
  doc.setFont(FONTS.body, "normal");
  doc.text(`Radiant PACED™ Assessments- Grade ${result.grade} ELA`, margin + 22, yPos);
  yPos += 5;

  doc.setFont(FONTS.bold, "bold");
  doc.text("Date Administered:", margin, yPos);
  doc.setFont(FONTS.body, "normal");
  doc.text(result.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), margin + 32, yPos);
  yPos += 15;

  // Graphique à barres simplifié
  const chartHeight = 40;
  const chartY = yPos;
  
  // Échelle verticale
  doc.setFontSize(8);
  for (let i = 0; i <= 5; i++) {
    doc.text(i.toString(), margin - 5, chartY + chartHeight - (i * (chartHeight / 5)) + 2);
  }

  // Barres
  const studentHeight = (result.percentageScore / 100) * chartHeight;
  const averageHeight = (result.setScale / 100) * chartHeight;
  
  doc.setFillColor(COLORS.primary);
  doc.rect(margin + 10, chartY + chartHeight - studentHeight, 15, studentHeight, 'F');
  
  doc.setFillColor(COLORS.success);
  doc.rect(margin + 30, chartY + chartHeight - averageHeight, 15, averageHeight, 'F');

  // Étiquettes
  doc.setFontSize(10);
  doc.text("ELA", margin + 18, chartY + chartHeight + 5, { align: "center" });
  
  // Légende
  doc.setFontSize(8);
  doc.text("Student's Score", margin + 10, chartY + chartHeight + 12);
  doc.text("Average Score", margin + 30, chartY + chartHeight + 12);
  yPos += chartHeight + 25;

  // Section Score
  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(14);
  doc.text("SCORE:", margin, yPos);
  doc.text(`${result.percentageScore}%`, margin + 20, yPos);
  yPos += 8;

  // Temps et échelles
  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(10);
  doc.text("TIME UTILIZED:", margin, yPos);
  doc.setFont(FONTS.body, "normal");
  doc.text(`${result.timeSpent}`, margin + 30, yPos);
  
  doc.setFont(FONTS.bold, "bold");
  doc.text("UNUTILIZED TIME:", margin + 50, yPos);
  doc.setFont(FONTS.body, "normal");
  doc.text(`${result.unusedTime}`, margin + 85, yPos);
  yPos += 5;

  doc.setFont(FONTS.bold, "bold");
  doc.text("Custom Scale:", margin, yPos);
  doc.setFont(FONTS.body, "normal");
  doc.text(`${result.customScale}`, margin + 30, yPos);
  
  doc.setFont(FONTS.bold, "bold");
  doc.text("Set Scale:", margin + 50, yPos);
  doc.setFont(FONTS.body, "normal");
  doc.text(`${result.setScale}`, margin + 75, yPos);
  yPos += 15;

  // Réponses correctes
  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(12);
  doc.text("# Correct", margin, yPos);
  yPos += 7;
  
  doc.setFont(FONTS.body, "normal");
  doc.setFontSize(10);
  const correctAnswers = result.questionResults.filter(q => q.correct);
  const correctGroups = groupByCategory(correctAnswers);
  
  correctGroups.forEach((group, i) => {
    doc.text(`${group.count} ${group.category}`, margin + (i % 2) * 90, yPos + Math.floor(i / 2) * 5);
  });
  
  yPos += Math.ceil(correctGroups.length / 2) * 5 + 10;

  // Réponses incorrectes
  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(12);
  doc.text("# Incorrect", margin, yPos);
  yPos += 7;
  
  doc.setFont(FONTS.body, "normal");
  doc.setFontSize(10);
  const incorrectAnswers = result.questionResults.filter(q => !q.correct);
  const incorrectGroups = groupByCategory(incorrectAnswers);
  
  incorrectGroups.forEach((group, i) => {
    doc.text(`${group.count} ${group.category}`, margin + (i % 2) * 90, yPos + Math.floor(i / 2) * 5);
  });
  
  yPos += Math.ceil(incorrectGroups.length / 2) * 5 + 15;

  // Analyse générale
  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(12);
  doc.text("GENERAL ANALYSIS / FOCUS AREAS:", margin, yPos);
  yPos += 8;
  
  doc.setFont(FONTS.body, "normal");
  doc.setFontSize(10);
  const analysisText = `Our data indicates ${result.studentName.split(' ')[0]} requires critical intervention in ELA. The results are dramatically behind typical peer metrics. ${result.studentName.split(' ')[0]} does not yet have a foundation in literacy. An intensive and foundational approach is an appropriate start for helping ${result.studentName.split(' ')[0]}.`;
  
  doc.splitTextToSize(analysisText, contentWidth).forEach((line: string) => {
    doc.text(line, margin, yPos);
    yPos += 5;
  });
  
  yPos += 10;

  // Durée de préparation projetée
  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(12);
  doc.text("PROJECTED PREP LENGTH:", margin, yPos);
  yPos += 7;
  
  doc.setFont(FONTS.body, "normal");
  doc.text("Varies based on service options", margin, yPos);

  // Pied de page
  yPos = 280;
  doc.setFontSize(8);
  doc.setTextColor(COLORS.textLight);
  doc.text("Copyright © by Radiant Prep, LLC. All Rights Reserved.", pageWidth / 2, yPos, { align: "center" });
  doc.text("CONFIDENTIAL - May NOT be reproduced in any form", pageWidth / 2, yPos + 5, { align: "center" });

  return doc.output("blob");
}

// Helper function to group questions by category
function groupByCategory(questions: {category: string}[]) {
  const groups: {category: string, count: number}[] = [];
  
  questions.forEach(q => {
    const existing = groups.find(g => g.category === q.category);
    if (existing) {
      existing.count++;
    } else {
      groups.push({ category: q.category, count: 1 });
    }
  });
  
  return groups;
}