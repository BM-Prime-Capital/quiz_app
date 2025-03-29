import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { loadImage } from "./image-utils";
import { QuestionType } from "./types";
import logo from '../public/newlogo.png';

// Définition des interfaces et constantes
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
  bold: "helvetica"
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

// Fonction utilitaire pour générer des nuances de couleur
function shadeColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1)}`;
}

// Fonction pour dessiner un conteneur de graphique avec titre
function drawChartContainer(doc: jsPDF, x: number, y: number, width: number, height: number, title: string) {
  // Fond légèrement gris
  doc.setFillColor(240, 240, 240);
  doc.rect(x, y, width, height, 'F');
  
  // Bordure
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.rect(x, y, width, height, 'S');
  
  // Titre centré en haut
  doc.setFontSize(12);
  doc.setFont(FONTS.bold, 'bold');
  doc.setTextColor(COLORS.dark);
  doc.text(title, x + width/2, y + 8, { align: 'center' });
  
  return {
    x: x + 5,
    y: y + 15,
    width: width - 10,
    height: height - 20
  };
}

// Fonction pour dessiner un secteur de camembert
function drawPieSlice(doc: jsPDF, x: number, y: number, radius: number, startAngle: number, endAngle: number, with3D: boolean = false) {
  const halfAngle = (startAngle + endAngle) / 2;
  const depth = 3; // Profondeur 3D réduite
  
  // Face avant
  doc.path([
    ['M', x, y],
    ['L', x + radius * Math.cos(startAngle * Math.PI / 180), y + radius * Math.sin(startAngle * Math.PI / 180)],
    ['A', radius, radius, 0, endAngle - startAngle > 180 ? 1 : 0, 1, x + radius * Math.cos(endAngle * Math.PI / 180), y + radius * Math.sin(endAngle * Math.PI / 180)],
    ['L', x, y],
    ['Z']
  ], 'F');
  
  if (with3D) {
    // Effet 3D sur le côté
    const color = doc.getFillColor();
    doc.setFillColor(shadeColor(color, -20));
    
    const innerRadius = radius * 0.95;
    doc.path([
      ['M', x + innerRadius * Math.cos(startAngle * Math.PI / 180), y + innerRadius * Math.sin(startAngle * Math.PI / 180)],
      ['L', x + radius * Math.cos(startAngle * Math.PI / 180), y + radius * Math.sin(startAngle * Math.PI / 180)],
      ['L', x + radius * Math.cos(halfAngle * Math.PI / 180), y + radius * Math.sin(halfAngle * Math.PI / 180) + depth],
      ['L', x + innerRadius * Math.cos(halfAngle * Math.PI / 180), y + innerRadius * Math.sin(halfAngle * Math.PI / 180) + depth],
      ['Z']
    ], 'F');
  }
}

// Fonction pour dessiner un graphique en barres 3D centré
function drawCentered3DBarChart(doc: jsPDF, x: number, y: number, width: number, height: number, studentScore: number, averageScore: number) {
  const maxValue = Math.max(studentScore, averageScore, 100);
  const studentHeight = (studentScore / maxValue) * (height * 0.7);
  const averageHeight = (averageScore / maxValue) * (height * 0.7);
  const barWidth = width / 4; // Largeur réduite pour mieux centrer
  const depth = 3; // Profondeur 3D réduite

  // Position centrée
  const centerX = x + width/2;
  const studentX = centerX - barWidth - 10;
  const averageX = centerX + 10;

  // Barre de l'étudiant
  doc.setFillColor(COLORS.primary);
  // Face avant
  doc.rect(studentX, y + height - studentHeight, barWidth, studentHeight, 'F');
  // Face supérieure
  doc.setFillColor(shadeColor(COLORS.primary, -20));
  doc.rect(studentX, y + height - studentHeight, barWidth, depth, 'F');
  // Face latérale
  doc.setFillColor(shadeColor(COLORS.primary, -30));
  doc.rect(studentX + barWidth, y + height - studentHeight, depth, studentHeight, 'F');

  // Barre de la moyenne
  doc.setFillColor(COLORS.success);
  // Face avant
  doc.rect(averageX, y + height - averageHeight, barWidth, averageHeight, 'F');
  // Face supérieure
  doc.setFillColor(shadeColor(COLORS.success, -20));
  doc.rect(averageX, y + height - averageHeight, barWidth, depth, 'F');
  // Face latérale
  doc.setFillColor(shadeColor(COLORS.success, -30));
  doc.rect(averageX + barWidth, y + height - averageHeight, depth, averageHeight, 'F');

  // Axes
  doc.setDrawColor(COLORS.textDark);
  doc.setLineWidth(0.3);
  // Axe X
  doc.line(x, y + height, x + width, y + height);
  doc.line(x, y + height + depth, x + width, y + height + depth);
  // Lignes de profondeur
  doc.line(x + width, y + height, x + width, y + height + depth);
  // Axe Y
  doc.line(x, y + height/5, x, y + height);
  doc.line(x + depth, y + height/5, x + depth, y + height);

  // Graduations de l'axe Y avec texte plus petit
  [0, 25, 50, 75, 100].forEach(val => {
    const yPos = y + height - (val/maxValue * height * 0.7);
    doc.line(x - 2, yPos, x, yPos);
    doc.setFontSize(6); // Taille réduite
    doc.text(`${val}`, x - 4, yPos + 1, { align: 'right' });
  });

  // Libellés
  doc.setFontSize(8); // Taille réduite
  doc.setTextColor(COLORS.textDark);
  doc.text("Student", studentX + barWidth/2, y + height + depth + 4, { align: "center" });
  doc.text("Average", averageX + barWidth/2, y + height + depth + 4, { align: "center" });

  // Valeurs sur les barres
  doc.text(`${studentScore}%`, studentX + barWidth/2, y + height - studentHeight - 3, { align: "center" });
  doc.text(`${averageScore}%`, averageX + barWidth/2, y + height - averageHeight - 3, { align: "center" });
}

// Fonction pour dessiner un camembert amélioré
function drawEnhancedPieChart(doc: jsPDF, x: number, y: number, size: number, correct: number, total: number) {
  const incorrect = total - correct;
  const correctPercent = (correct / total) * 100;
  const incorrectPercent = (incorrect / total) * 100;
  const radius = size / 2;
  
  // Partie correcte avec effet 3D
  doc.setFillColor(COLORS.success);
  drawPieSlice(doc, x, y, radius, 0, (correctPercent / 100) * 360, true);
  
  // Partie incorrecte
  doc.setFillColor(COLORS.secondary);
  drawPieSlice(doc, x, y, radius, (correctPercent / 100) * 360, 360, true);
  
  // Cercle central pour effet donut
  doc.setFillColor(255, 255, 255);
  doc.circle(x, y, radius * 0.4, 'F');
  
  // Texte central
  doc.setFontSize(10);
  doc.setFont(FONTS.bold, 'bold');
  doc.setTextColor(COLORS.textDark);
  doc.text(`${correctPercent.toFixed(0)}%`, x, y + 1, { align: 'center' });
  
  // Légende
  const legendX = x + radius + 5;
  const legendY = y - radius/2;
  
  // Correct
  doc.setFillColor(COLORS.success);
  doc.rect(legendX, legendY, 8, 8, 'F');
  doc.setFontSize(8);
  doc.setTextColor(COLORS.textDark);
  doc.text(`Correct: ${correct} (${correctPercent.toFixed(1)}%)`, legendX + 10, legendY + 5);
  
  // Incorrect
  doc.setFillColor(COLORS.secondary);
  doc.rect(legendX, legendY + 15, 8, 8, 'F');
  doc.text(`Incorrect: ${incorrect} (${incorrectPercent.toFixed(1)}%)`, legendX + 10, legendY + 20);
  
  // Ombre subtile
  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.1);
  doc.circle(x + 0.5, y + 0.5, radius, 'S');
}

// Fonction principale pour générer le PDF
export async function generateProfessionalPDF(result: ReportOptions): Promise<Blob> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - 2 * margin;
  let yPos = margin;

  // En-tête avec logo, titre et informations de contact
  try {
    const logoData = await loadImage('newlogo.png');
    const logoWidth = 30;
    const logoHeight = 30;
    doc.addImage(logoData, 'PNG', margin, yPos, logoWidth, logoHeight);

    // Titre CompleMetrics centré
    doc.setFontSize(24);
    const centerY = yPos + 15;
    const textWidth = doc.getTextWidth("CompleMetrics");
    const centerX = (pageWidth - textWidth) / 2;
    
    doc.setTextColor(128, 0, 128);
    doc.text("Comple", centerX, centerY);
    doc.setTextColor(0, 128, 0);
    doc.text("Metrics", centerX + doc.getTextWidth("Comple") - 1, centerY);

    // Sous-titre
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const subtitle = "Complete Measurement of Educational Metrics";
    const subtitleWidth = doc.getTextWidth(subtitle);
    doc.text(subtitle, (pageWidth - subtitleWidth) / 2, centerY + 10);

    // Informations de contact à droite
    doc.setFontSize(10);
    const rightEdge = pageWidth - margin;
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
    const startX = (pageWidth - doc.getTextWidth("CompleMetrics")) / 2;
    doc.setTextColor(128, 0, 128);
    doc.text("Comple", startX, textY);
    doc.setTextColor(0, 128, 0);
    doc.text("Metrics", startX + doc.getTextWidth("Comple") - 1, textY);
  }
  
  yPos += 40;
  
  // Ligne de séparation
  doc.setDrawColor(COLORS.dark);
  doc.setLineWidth(4);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // Section SCHOLAR et GRADE
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

  yPos = scholarY + 20;

  // Informations sur l'évaluation
  doc.setFontSize(10);
  const assessmentText = `Assessment: Radiant PACED™ Assessments - Grade ${result.grade} ${result.subject.toUpperCase()}`;
  const dateText = `Date Administered: ${result.date.toLocaleDateString()}`;
  const centerX = pageWidth / 2;

  doc.text(assessmentText, centerX - doc.getTextWidth(assessmentText)/2, yPos);
  doc.text(dateText, centerX - doc.getTextWidth(dateText)/2, yPos + 5);
  yPos += 15;

  // Score
  doc.setFontSize(14);
  doc.setFont(FONTS.bold, "bold");
  const scoreLabel = "SCORE:";
  doc.text(scoreLabel, centerX - doc.getTextWidth(scoreLabel)/2, yPos + 10);
  yPos += 5;

  // Pourcentage du score
  doc.setFontSize(36);
  doc.setTextColor(COLORS.primary);
  const scoreText = `${result.percentageScore}%`;
  doc.text(scoreText, centerX - doc.getTextWidth(scoreText)/2, yPos + 20);
  doc.setTextColor(0, 0, 0);
  yPos += 40;

  // Section PERFORMANCE ANALYSIS avec graphiques
  doc.setFontSize(14);
  doc.setFont(FONTS.bold, 'bold');
  doc.setTextColor(COLORS.dark);
  const performanceTitle = "PERFORMANCE ANALYSIS";
  doc.text(performanceTitle, centerX - doc.getTextWidth(performanceTitle)/2, yPos);
  yPos += 10;
  

  // Conteneur pour les graphiques
  const chartsContainerHeight = 80;
  const chartSpacing = 10;

  // Graphique en barres 3D centré
  const barChartContainer = drawChartContainer(
    doc, 
    margin, 
    yPos, 
    contentWidth, 
    chartsContainerHeight,
    "SCORE COMPARISON"
  );
  drawCentered3DBarChart(
    doc, 
    barChartContainer.x, 
    barChartContainer.y + 5, 
    barChartContainer.width, 
    barChartContainer.height - 10,
    result.percentageScore, 
    75
  );

  yPos += chartsContainerHeight + 15;

  // Vérifier si on a assez d'espace pour le pie chart avant de le dessiner
  const spaceNeeded = chartsContainerHeight + 50; // Estimation de l'espace nécessaire
  if (yPos + spaceNeeded > pageHeight - margin - 20) { // 20mm pour le footer
    // Pas assez d'espace, on passe à une nouvelle page
    doc.addPage();
    yPos = margin;
  }

  // Graphique camembert en dessous
  const pieChartContainer = drawChartContainer(
    doc, 
    margin, 
    yPos, 
    contentWidth, 
    chartsContainerHeight,
    "QUESTION RESULTS"
  );
  const correctCount = result.questionResults.filter(q => q.correct).length;
  drawEnhancedPieChart(
    doc, 
    pieChartContainer.x + pieChartContainer.width/2, 
    pieChartContainer.y + pieChartContainer.height/2, 
    Math.min(pieChartContainer.width, pieChartContainer.height) * 0.6,
    correctCount, 
    result.totalQuestions
  );

  yPos += chartsContainerHeight + 15;

  // Vérifier l'espace pour les sections suivantes
  const nextSectionsHeight = 100; // Estimation approximative
  if (yPos + nextSectionsHeight > pageHeight - margin - 20) {
    doc.addPage();
    yPos = margin;
  }

  // Sections Correct/Incorrect
  const boxHeight = 10;
  const boxWidth = 80;
  const boxSpacing = 10;

  // Correct (vert)
  doc.setFillColor(0, 128, 0);
  doc.rect(margin, yPos, boxWidth, boxHeight, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text("Correct", margin + boxWidth/2, yPos + 7, { align: "center" });

  // Incorrect (rouge)
  doc.setFillColor(255, 0, 0);
  doc.rect(margin + boxWidth + boxSpacing, yPos, boxWidth, boxHeight, "F");
  doc.text("Incorrect", margin + boxWidth + boxSpacing + boxWidth/2, yPos + 7, { align: "center" });

  yPos += boxHeight + 10;

  // Liste des points forts et faibles
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  const strengthsY = yPos;

  result.strengthCategories.forEach((category, index) => {
    doc.text(`${index + 1}. ${category}`, margin, strengthsY + index * 5);
  });

  result.weaknessCategories.forEach((category, index) => {
    doc.text(`${index + 1}. ${category}`, margin + boxWidth + boxSpacing, strengthsY + index * 5);
  });

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

  const analysisLines = doc.splitTextToSize(analysis, contentWidth);
  doc.text(analysisLines, margin, yPos);
  yPos += analysisLines.length * 5 + 10;

  // Pied de page
  const footerY = Math.max(280, yPos + 20);
  const footerLineY = footerY;
  const footerTextY = footerY + 5;
  const footerLineHeight = 0.1;
  const footerTextSpacing = 4;

  doc.setDrawColor(COLORS.light);
  doc.setLineWidth(footerLineHeight);
  doc.line(margin, footerLineY, pageWidth - margin, footerLineY);

  doc.setFont(FONTS.body, "normal");
  doc.setFontSize(8);
  doc.setTextColor(COLORS.textLight);

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

// Fonction pour ajouter un en-tête minimal sur les pages suivantes
function addSecondaryHeader(doc: jsPDF, margin: number, pageWidth: number, studentName: string, subject: string) {
  doc.setFontSize(12);
  doc.setTextColor(COLORS.dark);
  doc.text(`Student: ${studentName} - ${subject}`, margin, margin - 10);
  doc.setDrawColor(COLORS.dark);
  doc.setLineWidth(0.5);
  doc.line(margin, margin - 5, pageWidth - margin, margin - 5);
}

// Fonction utilitaire pour grouper par catégorie
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