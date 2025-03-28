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

  // En haut de la fonction generateProfessionalPDF, remplacer par :

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - 2 * margin;
  let yPos = margin;

    // Header avec 3 colonnes
    try {
      // 1. Logo à gauche (30x30mm)
      const logoData = await loadImage('newlogo.png');
      const logoWidth = 30;
      const logoHeight = 30;
      doc.addImage(logoData, 'PNG', margin, yPos, logoWidth, logoHeight);
  
       // 2. CompleMetrics centré avec sous-titre
    doc.setFontSize(24);
    const centerY = yPos + 15; // Position verticale pour CompleMetrics
    
    // Calcul position horizontale centrée
    const textWidth = doc.getTextWidth("CompleMetrics");
    const centerX = (pageWidth - textWidth) / 2;
    
    // "Comple" en violet
    doc.setTextColor(128, 0, 128);
    doc.text("Comple", centerX, centerY);
    
    // "Metrics" en vert collé
    doc.setTextColor(0, 128, 0);
    doc.text("Metrics", centerX + doc.getTextWidth("Comple") - 1, centerY);

    // Sous-titre centré en dessous
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const subtitle = "Complete Measurement of Educational Metrics";
    const subtitleWidth = doc.getTextWidth(subtitle);
    doc.text(subtitle, (pageWidth - subtitleWidth) / 2, centerY + 10);
  

      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      // Calcul de la position la plus à droite possible
      const rightEdge = pageWidth - margin;

      // Infos entreprise avec alignement droit
      doc.text("Radiant Prep, LLC", rightEdge, yPos + 5, { align: "right" });
      doc.text("42-20 Broadway", rightEdge, yPos + 10, { align: "right" });
      doc.text("Astoria, NY 11103", rightEdge, yPos + 15, { align: "right" });
      doc.text("Learn@radiantprep.com", rightEdge, yPos + 20, { align: "right" });
      doc.text("(347) 551-0888", rightEdge, yPos + 25, { align: "right" });
  
    } catch (e) {
      console.error("Failed to load logo:", e);
      // Fallback sans logo
      doc.setFontSize(24);
      const textY = yPos + 20;
      
      // "CompleMetrics" centré
      const startX = (pageWidth - doc.getTextWidth("CompleMetrics")) / 2;
      
      doc.setTextColor(128, 0, 128);
      doc.text("Comple", startX, textY);
      doc.setTextColor(0, 128, 0);
      doc.text("Metrics", startX + doc.getTextWidth("Comple") - 1, textY);
    }
  
    yPos += 40; // Espacement après le header
  
    // Ligne de séparation
    doc.setDrawColor(COLORS.dark);
    doc.setLineWidth(4);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;



  // Sections SCHOLAR et GRADE (positionnées après la ligne)
  const scholarY = yPos + 10;
  doc.setFillColor(0, 0, 0);
  doc.rect(margin, scholarY, 30, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.text("SCHOLAR:", margin + 2, scholarY + 7);

  doc.setFillColor(200, 200, 200);
  doc.rect(margin + 30, scholarY, 80, 10, "F");
  doc.setTextColor(0, 0, 0);
  doc.text(result.studentName, margin + 32, scholarY + 7);

  // Grade
  doc.setFillColor(200, 200, 200);
  doc.rect(margin + 110, scholarY, 50, 10, "F");
  doc.text(`Grade: ${result.grade}`, margin + 112, scholarY + 7);

  yPos = scholarY + 20; // Position Y pour le contenu suivant

  // Informations sur l'évaluation
  // Informations sur l'évaluation
  doc.setFontSize(10);
  const assessmentText = `Assessment: Radiant PACED™ Assessments - Grade ${result.grade} ${result.subject.toUpperCase()}`;
  const dateText = `Date Administered: ${result.date.toLocaleDateString()}`;

  // Calcul des positions pour centrage
  const assessmentWidth = doc.getTextWidth(assessmentText);
  const dateWidth = doc.getTextWidth(dateText);
  const centerX = pageWidth / 2;

  doc.text(assessmentText, centerX - assessmentWidth/2, yPos);
  doc.text(dateText, centerX - dateWidth/2, yPos + 5);
  yPos += 15;

  // Ajout de "SCORE:" centré
  doc.setFontSize(14);
  doc.setFont(FONTS.bold, "bold");
  const scoreLabel = "SCORE:";
  const scoreLabelWidth = doc.getTextWidth(scoreLabel);
  doc.text(scoreLabel, centerX - scoreLabelWidth/2, yPos + 10);
  yPos += 5;

  // Score centré en grand
  doc.setFontSize(36);
  doc.setTextColor(COLORS.primary);
  const scoreText = `${result.percentageScore}%`;
  const scoreWidth = doc.getTextWidth(scoreText);
  doc.text(scoreText, centerX - scoreWidth/2, yPos + 20); // 20mm sous la date
  doc.setTextColor(0, 0, 0); // Réinitialiser la couleur

  yPos += 40; // Grand espacement après le score


  // Sections Correct/Incorrect avec espacement dynamique
  const boxHeight = 10;
  const boxWidth = 80;
  const boxSpacing = 10;

  // Correct (vert)
  doc.setFillColor(0, 128, 0); // Vert
  doc.rect(margin, yPos, boxWidth, boxHeight, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text("Correct", margin + boxWidth/2, yPos + 7, { align: "center" });

  // Incorrect (rouge)
  doc.setFillColor(255, 0, 0); // Rouge
  doc.rect(margin + boxWidth + boxSpacing, yPos, boxWidth, boxHeight, "F");
  doc.text("Incorrect", margin + boxWidth + boxSpacing + boxWidth/2, yPos + 7, { align: "center" });

  yPos += boxHeight + 10;

  // Liste des points forts
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  const strengthsY = yPos;

  result.strengthCategories.forEach((category, index) => {
    doc.text(`${index + 1}. ${category}`, margin, strengthsY + index * 5);
  });

  // Liste des points faibles (alignée avec les points forts)
  result.weaknessCategories.forEach((category, index) => {
    doc.text(`${index + 1}. ${category}`, margin + boxWidth + boxSpacing, strengthsY + index * 5);
  });

  // Calcul de la hauteur nécessaire pour les listes
  const maxListHeight = Math.max(
    result.strengthCategories.length * 5,
    result.weaknessCategories.length * 5
  );
  yPos = strengthsY + maxListHeight + 10;



  // Tableau détaillé des performances par catégorie
yPos += 10;
doc.setFontSize(12);
doc.setFont(FONTS.bold, "bold");
doc.text("DETAILED PERFORMANCE BY CATEGORY:", margin, yPos);
yPos += 10;

// Préparer les données pour le tableau
const categoryData = result.questionResults.reduce((acc, q) => {
  const category = q.category || 'Uncategorized';
  if (!acc[category]) {
    acc[category] = { correct: 0, total: 0 };
  }
  acc[category].total++;
  if (q.correct) acc[category].correct++;
  return acc;
}, {} as Record<string, { correct: number; total: number }>);

const tableData = Object.entries(categoryData).map(([category, {correct, total}]) => [
  category,
  `${correct}/${total}`,
  `${Math.round((correct/total)*100)}%`,
  correct/total > 0.7 ? "✓ Strong" : correct/total > 0.5 ? "↔ Needs Work" : "✗ Weak"
]);

autoTable(doc, {
  startY: yPos,
  head: [['Category', 'Score', 'Percentage', 'Performance']],
  body: tableData,
  styles: {
    font: FONTS.body,
    fontSize: 9,
    textColor: COLORS.textDark,
    cellPadding: 3
  },
  headStyles: {
    fillColor: COLORS.dark,
    textColor: COLORS.light,
    fontStyle: 'bold'
  },
  columnStyles: {
    0: { cellWidth: 60 },
    3: { 
      cellWidth: 30,
      halign: 'center',
      fontStyle: 'bold'
    }
  },
  margin: { left: margin },
  tableWidth: contentWidth
});

yPos = (doc as any).lastAutoTable.finalY + 10;

  // Analyse générale
  doc.setFontSize(12);
  doc.setFont(FONTS.bold, "bold");
  doc.text("GENERAL ANALYSIS / FOCUS AREAS:", margin, yPos);
  yPos += 7;

  doc.setFontSize(10);
  doc.setFont(FONTS.body, "normal");
  let analysis = "";
  if (result.percentageScore < 30) {
    analysis = `Our data indicates ${result.studentName} requires critical interventions in ${result.subject.toUpperCase()}. The results show performance significantly below typical peer metrics. We recommend a structured foundation in ${result.subject === "math" ? "mathematics" : "literacy"}.`;
  } else if (result.percentageScore < 70) {
    analysis = `${result.studentName} shows mixed results in ${result.subject.toUpperCase()}. Some areas are strong while others need improvement. We recommend targeted practice in the weak areas identified above.`;
  } else {
    analysis = `${result.studentName} demonstrates strong proficiency in ${result.subject.toUpperCase()}. To continue growth, we recommend enrichment activities that build on these strengths.`;
  }

  // Texte d'analyse avec retour à la ligne automatique
  const analysisLines = doc.splitTextToSize(analysis, contentWidth);
  doc.text(analysisLines, margin, yPos);
  yPos += analysisLines.length * 5 + 10;


  

  //////////////////////////
  

  // Correct/Incorrect answers
  const correctCount = result.questionResults.filter(q => q.correct).length;
  const incorrectCount = result.totalQuestions - correctCount;




  // doc.setDrawColor(COLORS.light);
  // doc.setLineWidth(0.1);
  // doc.line(margin, 280, pageWidth - margin, 280);
  // doc.setFont(FONTS.body, "normal");
  // doc.setFontSize(8);
  // doc.setTextColor(COLORS.textLight);
 
  // doc.text("Copyright © by Radiant Prep, LLC. All Rights Reserved.", pageWidth / 2, 285, { align: "center" });
  // doc.text("CONFIDENTIAL - May NOT be reproduced in any form", pageWidth / 2, 285 + 5, { align: "center" });
  // doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, 290, { align: "center" });

  // Configuration du footer
const footerY = Math.max(280, yPos + 20); // S'adapte au contenu mais minimum à 280
const footerLineY = footerY;
const footerTextY = footerY + 5;
const footerLineHeight = 0.1;
const footerTextSpacing = 4; // Espacement réduit entre les lignes de texte

// Ligne de séparation du footer
doc.setDrawColor(COLORS.light);
doc.setLineWidth(footerLineHeight);
doc.line(margin, footerLineY, pageWidth - margin, footerLineY);

// Texte du footer
doc.setFont(FONTS.body, "normal");
doc.setFontSize(8);
doc.setTextColor(COLORS.textLight);

// Textes centrés avec espacement régulier
const footerTexts = [
  "Copyright © by Radiant Prep, LLC. All Rights Reserved.",
  "CONFIDENTIAL - May NOT be reproduced in any form",
  `Generated on ${new Date().toLocaleDateString()}`
];

footerTexts.forEach((text, index) => {
  doc.text(text, pageWidth / 2, footerTextY + (index * footerTextSpacing), { 
    align: "center" 
  });
});

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