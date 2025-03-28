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


function drawBarChart(doc: jsPDF, x: number, y: number, width: number, height: number, studentScore: number, averageScore: number) {
  const maxValue = Math.max(studentScore, averageScore, 100);
  const studentHeight = (studentScore / maxValue) * height;
  const averageHeight = (averageScore / maxValue) * height;
  const barWidth = width / 3;

  // Draw bars
  doc.setFillColor(COLORS.primary);
  doc.rect(x, y + height - studentHeight, barWidth, studentHeight, 'F');
  
  doc.setFillColor(COLORS.success);
  doc.rect(x + barWidth + 10, y + height - averageHeight, barWidth, averageHeight, 'F');

  // Draw axis
  doc.setDrawColor(COLORS.textDark);
  doc.setLineWidth(0.5);
  doc.line(x, y, x, y + height);
  doc.line(x, y + height, x + width, y + height);

  // Labels
  doc.setFontSize(10);
  doc.setTextColor(COLORS.textDark);
  doc.text("Student", x + barWidth/2, y + height + 5, { align: "center" });
  doc.text("Average", x + barWidth*1.5 + 10, y + height + 5, { align: "center" });

  // Values
  doc.text(`${studentScore}%`, x + barWidth/2, y + height - studentHeight - 5, { align: "center" });
  doc.text(`${averageScore}%`, x + barWidth*1.5 + 10, y + height - averageHeight - 5, { align: "center" });
}


function drawPieChart(doc: jsPDF, x: number, y: number, size: number, timeSpent: number, totalTime: number) {
  const unusedTime = totalTime - timeSpent;
  const spentPercent = (timeSpent / totalTime) * 100;
  const baseSize = size * 0.8;

  // Draw background circle (unused time)
  doc.setFillColor(COLORS.light);
  doc.circle(x, y, baseSize, 'F');

  // Draw progress arc (time spent)
  doc.setFillColor(COLORS.primary);
  
  // For jsPDF versions that don't support direct pie charts, we'll use a sector approximation
  const startAngle = 0;
  const endAngle = (spentPercent / 100) * 360;
  
  // Simple sector drawing
  doc.setDrawColor(COLORS.primary);
  doc.setLineWidth(0.5);
  
  // Draw pie slice using path commands
  doc.path([
    ['M', x, y], // Move to center
    ['L', x + baseSize * Math.cos(startAngle * Math.PI / 180), y + baseSize * Math.sin(startAngle * Math.PI / 180)], // Line to start point
    ['A', baseSize, baseSize, 0, endAngle - startAngle > 180 ? 1 : 0, 1, x + baseSize * Math.cos(endAngle * Math.PI / 180), y + baseSize * Math.sin(endAngle * Math.PI / 180)], // Arc
    ['L', x, y], // Line back to center
    ['Z'] // Close path
  ], 'F');

  // Center text
  doc.setFontSize(10);
  doc.setTextColor(COLORS.textDark);
  doc.text(`${spentPercent.toFixed(0)}%`, x, y + 3, { align: 'center' });

  // Legend
  const legendX = x + size + 10;
  doc.setFontSize(8);
  
  // Time used
  doc.setFillColor(COLORS.primary);
  doc.rect(legendX, y - 5, 6, 6, 'F');
  doc.text(`Used: ${timeSpent}m`, legendX + 8, y);
  
  // Time remaining
  doc.setFillColor(COLORS.light);
  doc.rect(legendX, y + 5, 6, 6, 'F');
  doc.text(`Left: ${unusedTime}m`, legendX + 8, y + 10);
}

export async function generateProfessionalPDF(result: ReportOptions): Promise<Blob> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });


  const margin = 20;
const pageWidth = doc.internal.pageSize.getWidth();
const contentWidth = pageWidth - 2 * margin;
let yPos = margin;


  // Header with logo and contact info
  try {
    // Logo à gauche (30x30mm)
    const logoData = await loadImage('newlogo.png');
    doc.addImage(logoData, 'PNG', margin, yPos, 30, 30);
    
    // Contact info à droite (en gras)
    const contactX = pageWidth - margin;
    doc.setFont(FONTS.bold, "bold");
    doc.setFontSize(9);
    doc.setTextColor(COLORS.textLight);
    
    doc.text("Radiant Prep, LLC", contactX, yPos + 5, { align: "right" });
    doc.text("42-20 Broadway", contactX, yPos + 10, { align: "right" });
    doc.text("Astoria, NY 11103", contactX, yPos + 15, { align: "right" });
    
    doc.setFontSize(10);
    doc.text("Learn@radiantprep.com", contactX, yPos + 20, { align: "right" });
    doc.text("(347) 531-0888", contactX, yPos + 25, { align: "right" });
    doc.text("www.RadiantPrep.com", contactX, yPos + 30, { align: "right" });
    
  } catch (e) {
    console.error("Failed to load logo:", e);
    // Fallback sans logo
    doc.setFont(FONTS.bold, "bold");
    doc.setFontSize(18);
    doc.setTextColor(COLORS.primary);
    doc.text("RADIANT PREP", margin, yPos + 10);
  }

  yPos += 35; // Espacement après l'en-tête

  // Ligne de séparation descendue
  doc.setDrawColor(COLORS.dark);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos + 3, pageWidth - margin, yPos + 3);
  yPos += 13;

  // Configuration des badges
const badgeHeight = 10; // Augmenté pour meilleur rendu
const badgePadding = 5;
const labelFontSize = 12;
const verticalOffset = (badgeHeight - labelFontSize * 0.35) / 2; // Calcul du centrage vertical

// Badge SCHOLAR à gauche
const scholarLabel = "SCHOLAR";
doc.setFont(FONTS.bold, "bold");
doc.setFontSize(labelFontSize);
const scholarWidth = doc.getTextWidth(scholarLabel) + badgePadding * 2;

// Dessin badge noir
doc.setFillColor(COLORS.dark);
doc.roundedRect(
  margin, 
  yPos, 
  scholarWidth, 
  badgeHeight, 
  2, 
  2, 
  'F'
);

// Texte blanc centré verticalement
doc.setTextColor("#ffffff");
doc.text(
  scholarLabel, 
  margin + badgePadding, 
  yPos + verticalOffset + labelFontSize * 0.35 // Position Y ajustée
);

// Nom étudiant
doc.setTextColor(COLORS.textDark);
doc.text(
  result.studentName, 
  margin + scholarWidth + 10, 
  yPos + verticalOffset + labelFontSize * 0.35
);

// Badge GRADE à droite
const gradeLabel = "GRADE";
const gradeValue = `${result.grade}`;
const gradeText = `${gradeLabel}: ${gradeValue}`;
const gradeLabelWidth = doc.getTextWidth(gradeLabel) + badgePadding * 2;
const gradeX = pageWidth - margin - gradeLabelWidth;

// Dessin badge noir
doc.setFillColor(COLORS.dark);
doc.roundedRect(
  gradeX, 
  yPos, 
  gradeLabelWidth, 
  badgeHeight, 
  2, 
  2, 
  'F'
);

// Texte blanc centré verticalement
doc.setTextColor("#ffffff");
doc.text(
  gradeLabel, 
  gradeX + badgePadding, 
  yPos + verticalOffset + labelFontSize * 0.35
);

// Valeur grade
doc.setTextColor(COLORS.textDark);
doc.text(
  gradeValue, 
  gradeX + gradeLabelWidth + 5, 
  yPos + verticalOffset + labelFontSize * 0.35
);

yPos += badgeHeight + 10; // Espacement pour la suite

  // Student Info
  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(12);
  doc.setTextColor(COLORS.dark);
  doc.text("STUDENT INFORMATION", margin, yPos);
  yPos += 8;

  doc.setDrawColor(COLORS.light);
  doc.setLineWidth(0.2);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  autoTable(doc, {
    startY: yPos,
    body: [
      ["Student Name", result.studentName],
      ["Date", result.date.toLocaleDateString()],
      ["Time Spent", `${result.timeSpent} minutes`]
    ],
    styles: {
      font: FONTS.body,
      fontSize: 10,
      textColor: COLORS.textDark,
      lineColor: COLORS.light,
      lineWidth: 0.2
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 'auto' }
    },
    margin: { left: margin },
    tableWidth: contentWidth
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Main Score
  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(12);
  doc.setTextColor(COLORS.dark);
  doc.text("KEY RESULTS", margin, yPos);
  yPos += 8;

  doc.setDrawColor(COLORS.light);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 15;

  // Score circle
  const scoreX = margin + 30;
  const scoreY = yPos + 20;
  
  doc.setDrawColor(COLORS.primary);
  doc.setFillColor(COLORS.light);
  doc.circle(scoreX, scoreY, 20, 'FD');

  doc.setFont(FONTS.bold, "bold");
  doc.setFontSize(24);
  doc.setTextColor(COLORS.primary);
  doc.text(`${result.percentageScore}%`, scoreX, scoreY + 5, { align: "center" });

  doc.setFont(FONTS.body, "normal");
  doc.setFontSize(10);
  doc.setTextColor(COLORS.textLight);
  doc.text("Overall Score", scoreX, scoreY + 15, { align: "center" });


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


  result.strengthCategories.forEach((category, index) => {
    doc.text(`${index + 1}. ${category}`, 20, yPos)
    yPos += 5
  })

  // Bar chart for scores
  drawBarChart(doc, margin + 70, yPos, 80, 50, result.percentageScore, result.setScale);
  
  // Pie chart for time
  drawPieChart(doc, margin + 160, yPos + 25, 20, result.timeSpent, result.timeSpent + result.unusedTime);

  yPos += 60;

  // Correct/Incorrect answers
  const correctCount = result.questionResults.filter(q => q.correct).length;
  const incorrectCount = result.totalQuestions - correctCount;



  autoTable(doc, {
    startY: yPos,
    head: [['RESPONSES', 'COUNT', 'PERCENTAGE']],
    body: [
      ['Correct Answers', correctCount, `${Math.round((correctCount/result.totalQuestions)*100)}%`],
      ['Incorrect Answers', incorrectCount, `${Math.round((incorrectCount/result.totalQuestions)*100)}%`]
    ],
    styles: {
      font: FONTS.body,
      fontSize: 10,
      textColor: COLORS.textDark,
      lineColor: COLORS.light,
      lineWidth: 0.2
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 'auto' }
    },
    margin: { left: margin },
    tableWidth: contentWidth
  });

// Après le tableau Correct/Incorrect, remplacez par :

// Detailed Question Analysis - Version deux colonnes
yPos = (doc as any).lastAutoTable.finalY + 15;

// Vérification espace disponible
if (yPos > 200) {
  doc.addPage();
  yPos = margin;
}

doc.setFont(FONTS.bold, "bold");
doc.setFontSize(12);
doc.setTextColor(COLORS.dark);
doc.text("DETAILED QUESTION ANALYSIS", margin, yPos);
yPos += 8;

// Ligne de séparation
doc.setDrawColor(COLORS.light);
doc.setLineWidth(0.2);
doc.line(margin, yPos, pageWidth - margin, yPos);
yPos += 10;

// Séparation des questions correctes/incorrectes
const correctQuestions = result.questionResults.filter(q => q.correct)
  .map(q => {
    const question = result.questions.find(item => item.id === q.id);
    return [q.id, question?.category || "N/A"];
  });

const incorrectQuestions = result.questionResults.filter(q => !q.correct)
  .map(q => {
    const question = result.questions.find(item => item.id === q.id);
    return [q.id, question?.category || "N/A"];
  });

// Calcul de la largeur des colonnes
const colWidth = (pageWidth - 2 * margin - 20) / 2; // -20 pour l'espace entre colonnes

// Tableau des questions correctes (colonne de gauche)
autoTable(doc, {
  startY: yPos,
  head: [['CORRECT (✓)', 'Category']],
  body: correctQuestions,
  styles: {
    font: FONTS.body,
    fontSize: 9,
    textColor: COLORS.success,
    lineColor: COLORS.light,
    lineWidth: 0.1
  },
  columnStyles: {
    0: { cellWidth: 25, halign: 'center' },
    1: { cellWidth: colWidth - 25 }
  },
  margin: { left: margin },
  tableWidth: colWidth
});

// Tableau des questions incorrectes (colonne de droite)
autoTable(doc, {
  startY: yPos,
  head: [['INCORRECT (✗)', 'Category']],
  body: incorrectQuestions,
  styles: {
    font: FONTS.body,
    fontSize: 9,
    textColor: COLORS.secondary,
    lineColor: COLORS.light,
    lineWidth: 0.1
  },
  columnStyles: {
    0: { cellWidth: 25, halign: 'center' },
    1: { cellWidth: colWidth - 25 }
  },
  margin: { left: margin + colWidth + 20 }, // Décalage à droite
  tableWidth: colWidth
});

yPos = Math.max(
  (doc as any).lastAutoTable.finalY,
  yPos + Math.max(correctQuestions.length, incorrectQuestions.length) * 5
) + 10;

// Vérification espace pour la section d'analyse
if (yPos > 220) {
  doc.addPage();
  yPos = margin;
}

// [Le reste de votre code pour General Analysis et Footer...]

doc.setDrawColor(COLORS.light);
doc.setLineWidth(0.1);
doc.line(margin, 280, pageWidth - margin, 280);


  doc.setFont(FONTS.body, "normal");
  doc.setFontSize(8);
  doc.setTextColor(COLORS.textLight);
  doc.text("Radiant Prep - Confidential Report", pageWidth / 2, yPos, { align: "center" });
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPos + 5, { align: "center" });

  return doc.output("blob");
}