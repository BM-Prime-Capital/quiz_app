import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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
  correctQuestions: {id: number; skill: string}[];
  incorrectQuestions: {id: number; skill: string}[];
  weaknessCategories: string[];
}

const COLORS = {
  primary: "#2a80b9",
  secondary: "#e74c3c",
  success: "#27ae60",
  warning: "#f1c40f",
  light: "#ecf0f1",
  dark: "#2c3e50",
  pink: "#FF69B4",
  darkRed: "#8B0000",
  lightGreen: "#E8F5E9",
  lightRed: "#FFEBEE"
};

export async function generateProfessionalPDF(result: ReportOptions): Promise<Blob> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Configuration de base
  const margin = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = margin;

  // ======================
  // HEADER - PARTIE DROITE
  // ======================
  doc.setFontSize(10);
  doc.setTextColor(COLORS.dark);
  doc.setFont("helvetica", "bold");
  
  // Radiant Prep, LLC (top right)
  doc.text("Radiant Prep, LLC", pageWidth - margin, yPos, { align: "right" });
  yPos += 5;
  
  // Adresse et contacts
  doc.setFont("helvetica", "normal");
  const contactInfos = [
    "42-20 Broadway",
    "Astoria, NY 11103",
    "Learn@radiantprep.com",
    "(347) 531-0888",
    "www.RadiantPrep.com"
  ];
  
  contactInfos.forEach(info => {
    doc.text(info, pageWidth - margin, yPos, { align: "right" });
    yPos += 5;
  });

  // ======================
  // HEADER - PARTIE GAUCHE
  // ======================
  yPos = margin; // Reset position
  
  // COMPLEMETRICS®
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(COLORS.dark);
  doc.text("COMPLEMETRICS®", margin, yPos);
  
  yPos += 7;

  // Barre rouge avec texte
  doc.setFillColor(COLORS.darkRed);
  doc.rect(margin, yPos, pageWidth - 2 * margin, 8, 'F');
  
  // "Complete Academic Metrics" en jaune
  doc.setFontSize(10);
  doc.setTextColor(COLORS.warning);
  doc.text("Complete Academic Metrics, Accurate, Insightful, Proof in Data.", margin + 5, yPos + 5);
  
  yPos += 15;

  // ======================
  // K-12 SCORE REPORT
  // ======================
  doc.setFontSize(14);
  doc.setTextColor(COLORS.dark);
  doc.setFont("helvetica", "bold");
  doc.text("K-12 SCORE REPORT", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;

  // ======================
  // INFORMATIONS ÉTUDIANT
  // ======================
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  
  // SCHOLAR
  doc.text(`SCHOLAR: ${result.studentName}`, margin, yPos);
  yPos += 7;

  // Assessment et date
  doc.setFont("helvetica", "normal");
  doc.text(`Assessment: Radiant PACED™ Assessments - Grade ${result.grade} ${result.subject.toUpperCase()}`, margin, yPos);
  yPos += 7;
  

  // Corriger la création de la date
const dateObj = result.date instanceof Date 
? result.date 
: new Date(result.date); // Conversion si c'est une string

const formattedDate = dateObj.toLocaleDateString('en-US', { 
weekday: 'long', 
year: 'numeric', 
month: 'long', 
day: 'numeric' 
});


  doc.text(`Date Administered: ${formattedDate}`, margin, yPos);
  yPos += 15;

// ======================
// GRAPHIQUE SIMPLE - VERSION ROBUSTE
// ======================
const chartYStart = yPos + 20;
const scaleStep = 10;

// Dessiner l'échelle
for (let i = 0; i <= 5; i++) {
    const lineY = chartYStart + i * scaleStep;
    doc.text(i.toString(), margin, lineY);
    doc.line(margin + 10, lineY, margin + 30, lineY);
}

// Valeurs par défaut sécurisées
const customScale = Number(result.customScale ?? 0);
const setScale = Number(result.setScale ?? 0);

// Positions validées
const studentY = chartYStart + (5 - Math.max(0, Math.min(5, customScale))) * scaleStep;
const averageY = chartYStart + (5 - Math.max(0, Math.min(5, setScale))) * scaleStep;

// Marqueurs simplifiés (ultra-fiables)
doc.setFillColor(COLORS.primary);
doc.rect(margin + 19, studentY - 1, 2, 2, 'F'); // Petit carré pour l'étudiant

doc.setFillColor(COLORS.success);
doc.rect(margin + 19, averageY - 1, 2, 2, 'F'); // Petit carré pour la moyenne

// Étiquettes
doc.setTextColor(COLORS.dark);
doc.setFontSize(8);
doc.text("Student", margin + 25, studentY);
doc.text("Average", margin + 25, averageY);

yPos += 80;

  // ======================
  // TABLEAU DES SCORES
  // ======================
// ======================
// TABLEAU DES SCORES - VERSION COMPLÈTEMENT SÉCURISÉE
// ======================
const safeToFixed = (value: number | undefined, decimals: number): string => {
  const num = Number(value) || 0; // Convertit en nombre ou utilise 0 par défaut
  return num.toFixed(decimals);
};

const scoreData = [
  { label: "SCORE", value: `${result.percentageScore ?? 0}%` },
  { label: "TIME UTILIZED", value: `${result.timeSpent ?? 0} min` },
  { label: "UNUTILIZED TIME", value: `${result.unusedTime ?? 0} min` },
  { 
      label: "Custom Scale", 
      value: safeToFixed(result.customScale, 1)
  },
  { 
      label: "Set Scale", 
      value: safeToFixed(result.setScale, 1)
  }
];

autoTable(doc, {
  startY: yPos,
  head: [['METRIC', 'VALUE']],
  body: scoreData.map(item => [item.label, item.value]),
  headStyles: { 
      fillColor: [44, 62, 80],
      textColor: 255,
      fontStyle: 'bold'
  },
  bodyStyles: { textColor: COLORS.dark },
  columnStyles: {
      0: { cellWidth: 60, fontStyle: 'bold' },
      1: { cellWidth: 30, halign: 'center' }
  },
  margin: { left: margin },
  tableWidth: 90,
  styles: { fontSize: 11 }
});
yPos = (doc as any).lastAutoTable.finalY + 10;

  // ======================
  // QUESTIONS CORRECTES
  // ======================
// ======================
// QUESTIONS CORRECTES - VERSION SÉCURISÉE
// ======================
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.text("# Correct", margin, yPos);
yPos += 7;

doc.setFont("helvetica", "normal");
const correctText = (result.correctQuestions || []).map(q => `${q.id} ${q.skill}`).join("; ");
const splitCorrect = doc.splitTextToSize(correctText, pageWidth - 2 * margin);
doc.text(splitCorrect, margin, yPos);
yPos += splitCorrect.length * 5 + 10;

// ======================
// QUESTIONS INCORRECTES - VERSION SÉCURISÉE
// ======================
doc.setFont("helvetica", "bold");
doc.text("# Incorrect", margin, yPos);
yPos += 7;

doc.setFont("helvetica", "normal");
const incorrectText = (result.incorrectQuestions || []).map(q => `${q.id} ${q.skill}`).join("; ");
const splitIncorrect = doc.splitTextToSize(incorrectText, pageWidth - 2 * margin);
doc.text(splitIncorrect, margin, yPos);
yPos += splitIncorrect.length * 5 + 15;



  // ======================
  // GENERAL ANALYSIS
  // ======================
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  
  // Texte avec espacement entre les lettres
  const focusText = "G E N E R A L   A N A L Y S I S   /   F O C U S   A R E A S";
  doc.text(focusText, pageWidth / 2, yPos, { align: "center" });
  yPos += 10;
  
  // Analyse détaillée
  doc.setFont("helvetica", "normal");
  const analysis = getPerformanceAnalysis(result);
  const splitAnalysis = doc.splitTextToSize(analysis, pageWidth - 2 * margin);
  doc.text(splitAnalysis, margin, yPos);
  yPos += splitAnalysis.length * 5 + 15;

  // ======================
  // PROJECTED PREP LENGTH
  // ======================
  doc.setFont("helvetica", "bold");
  doc.text("PROJECTED PREP LENGTH:", margin, yPos);
  yPos += 7;
  
  doc.setFont("helvetica", "normal");
  doc.text("Varies based on service options", margin, yPos);
  yPos += 15;

  // ======================
  // FOOTER
  // ======================
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Copyright © by Radiant Prep, LLC. All Rights Reserved. CONFIDENTIAL - May NOT be reproduced in any form.", 
           pageWidth / 2, 290, { align: "center" });

  return doc.output("blob");
}

function getPerformanceAnalysis(result: ReportOptions): string {
  if (result.percentageScore < 30) {
    return `Our data indicates ${result.studentName} requires critical intervention in ${result.subject.toUpperCase()}. ` +
           `His results is dramatically behind typical peer metrics. ${result.studentName}'s does not yet have a foundation ` +
           `in literacy. An intensive and foundational approach is an appropriate start for helping ${result.studentName}.`;
  } else if (result.percentageScore < 70) {
    return `Our data indicates ${result.studentName} demonstrates partial understanding of ${result.subject.toUpperCase()}. ` +
           `Practice in weak areas would help improve performance. Focus particularly on ${result.weaknessCategories.slice(0, 2).join(' and ')}.`;
  } else {
    return `Our data indicates ${result.studentName} shows strong mastery of ${result.subject.toUpperCase()}. ` +
           `Challenge with advanced material would be appropriate to maintain academic growth.`;
  }
}