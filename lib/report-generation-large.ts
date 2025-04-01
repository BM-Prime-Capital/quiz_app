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
    type: QuestionType;
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
  errorAnalysis: {
    questionId: number;
    studentAnswer: any;
    explanation: string;
    improvementTip: string;
  }[];
  previousScores: number[];
}

interface ErrorType {
  type: QuestionType;
  percentage: number;
  count: number;
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
  success: "#27ae60",
  warning: "#f39c12",
  dark: "#2c3e50",
  light: "#ecf0f1",
  textDark: "#34495e",
  textLight: "#7f8c8d",
  accent1: "#9b59b6",
  accent2: "#1abc9c"
};

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

function drawChartContainerNoBorder(doc: jsPDF, x: number, y: number, width: number, height: number, title: string) {
  doc.setFontSize(10);
  doc.setFont(FONTS.bold, 'bold');
  doc.setTextColor(COLORS.dark);
  doc.text(title, x + width/2, y + 5, { align: 'center' });
  
  return {
    x: x,
    y: y + 10,
    width: width,
    height: height - 10
  };
}

function drawCentered3DBarChart(doc: jsPDF, x: number, y: number, width: number, height: number, studentScore: number, averageScore: number) {
  const maxValue = Math.max(studentScore, averageScore, 100);
  const studentHeight = (studentScore / maxValue) * (height * 0.7);
  const averageHeight = (averageScore / maxValue) * (height * 0.7);
  const barWidth = width / 4;
  const depth = 3;

  const centerX = x + width/2;
  const studentX = centerX - barWidth - 10;
  const averageX = centerX + 10;

  // Barre de l'étudiant (couleur unie)
  doc.setFillColor(COLORS.primary);
  doc.rect(studentX, y + height - studentHeight, barWidth, studentHeight, 'F');
  
  // Barre de la moyenne (couleur unie)
  doc.setFillColor(COLORS.success);
  doc.rect(averageX, y + height - averageHeight, barWidth, averageHeight, 'F');

  // Effets 3D
  doc.setFillColor(shadeColor(COLORS.primary, -20));
  doc.rect(studentX, y + height - studentHeight, barWidth, depth, 'F');
  doc.setFillColor(shadeColor(COLORS.primary, -30));
  doc.rect(studentX + barWidth, y + height - studentHeight, depth, studentHeight, 'F');
  
  doc.setFillColor(shadeColor(COLORS.success, -20));
  doc.rect(averageX, y + height - averageHeight, barWidth, depth, 'F');
  doc.setFillColor(shadeColor(COLORS.success, -30));
  doc.rect(averageX + barWidth, y + height - averageHeight, depth, averageHeight, 'F');

  // Axes et graduations
  doc.setDrawColor(COLORS.textDark);
  doc.setLineWidth(0.3);
  doc.line(x, y + height, x + width, y + height);
  
  [0, 25, 50, 75, 100].forEach(val => {
    const yPos = y + height - (val/maxValue * height * 0.7);
    doc.line(x - 2, yPos, x, yPos);
    doc.setFontSize(7);
    doc.text(`${val}`, x - 5, yPos + 1, { align: 'right' });
  });

  // Libellés
  doc.setFontSize(9);
  doc.setTextColor(COLORS.textDark);
  doc.text("Student", studentX + barWidth/2, y + height + 8, { align: "center" });
  doc.text("Average", averageX + barWidth/2, y + height + 8, { align: "center" });
  doc.text(`${studentScore}%`, studentX + barWidth/2, y + height - studentHeight - 5, { align: "center" });
  doc.text(`${averageScore}%`, averageX + barWidth/2, y + height - averageHeight - 5, { align: "center" });
}

function drawPieSlice(
  doc: jsPDF,
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  color: string,
  with3D: boolean = false
) {
  const halfAngle = (startAngle + endAngle) / 2;
  const depth = 2;

  // Face avant
  doc.setFillColor(color);
  doc.path([
    ['M', x, y],
    ['L', x + radius * Math.cos(startAngle * Math.PI / 180), y + radius * Math.sin(startAngle * Math.PI / 180)],
    ['A', radius, radius, 0, endAngle - startAngle > 180 ? 1 : 0, 1, x + radius * Math.cos(endAngle * Math.PI / 180), y + radius * Math.sin(endAngle * Math.PI / 180)],
    ['L', x, y],
    ['Z']
  ], 'F');

  if (with3D) {
    // Effet 3D
    doc.setFillColor(shadeColor(color, -15));
    doc.path([
      ['M', x + radius * 0.9 * Math.cos(startAngle * Math.PI / 180), y + radius * 0.9 * Math.sin(startAngle * Math.PI / 180)],
      ['L', x + radius * Math.cos(startAngle * Math.PI / 180), y + radius * Math.sin(startAngle * Math.PI / 180)],
      ['L', x + radius * Math.cos(halfAngle * Math.PI / 180), y + radius * Math.sin(halfAngle * Math.PI / 180) + depth],
      ['L', x + radius * 0.9 * Math.cos(halfAngle * Math.PI / 180), y + radius * 0.9 * Math.sin(halfAngle * Math.PI / 180) + depth],
      ['Z']
    ], 'F');
  }
}

function drawEnhancedPieChart(doc: jsPDF, x: number, y: number, size: number, correct: number, total: number) {
  const incorrect = total - correct;
  const correctPercent = (correct / total) * 100;
  const radius = size / 2;
  
  drawPieSlice(doc, x, y, radius, 0, (correctPercent / 100) * 360, COLORS.success, true);
  drawPieSlice(doc, x, y, radius, (correctPercent / 100) * 360, 360, COLORS.secondary, true);
  
  doc.setFillColor(255, 255, 255);
  doc.circle(x, y, radius * 0.4, 'F');
  
  doc.setFontSize(11);
  doc.setFont(FONTS.bold, 'bold');
  doc.setTextColor(COLORS.textDark);
  doc.text(`${correctPercent.toFixed(0)}%`, x, y + 2, { align: 'center' });
  
  const legendX = x + radius + 5;
  const legendY = y - radius/2;
  
  doc.setFillColor(COLORS.success);
  doc.rect(legendX, legendY, 8, 8, 'F');
  doc.setFontSize(8);
  doc.text(`Correct: ${correct}`, legendX + 10, legendY + 5);
  
  doc.setFillColor(COLORS.secondary);
  doc.rect(legendX, legendY + 15, 8, 8, 'F');
  doc.text(`Incorrect: ${incorrect}`, legendX + 10, legendY + 20);
  
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.circle(x, y, radius, 'S');
}

function analyzeQuestionTypes(questions: {type: QuestionType, correct: boolean}[]) {
  const typeStats: Record<QuestionType, {correct: number, total: number}> = {} as any;
  
  questions.forEach(q => {
    if (!typeStats[q.type]) {
      typeStats[q.type] = {correct: 0, total: 0};
    }
    typeStats[q.type].total++;
    if (q.correct) typeStats[q.type].correct++;
  });
  
  return Object.entries(typeStats).map(([type, stats]) => ({
    type: type as QuestionType,
    percentage: (stats.correct / stats.total) * 100,
    count: stats.total
  }));
}

// Fonction pour générer des conseils par type de question
function generateTypeSpecificTips(questionType: QuestionType): string[] {
  const tips: Record<QuestionType, string[]> = {
    [QuestionType.MULTIPLE_CHOICE]: [
      "Read all options before answering",
      "Eliminate clearly incorrect choices first",
      "Watch for absolute words like 'always' or 'never'"
    ],
    [QuestionType.TEXT]: [
      "Structure your answer in clear paragraphs",
      "Use concrete examples when possible",
      "Proofread for grammar mistakes"
    ],
    [QuestionType.FILL_IN_BLANK]: [
      "Ensure the answer is grammatically correct",
      "Pay attention to singular/plural forms",
      "If unsure, try to guess the meaning of the sentence"
    ],
    [QuestionType.MATCHING]: [
      "Start with the most obvious pairs first",
      "Eliminate options as you go",
      "Verify each item is used only once"
    ],
    [QuestionType.FRACTION]: [
      "Always simplify fractions",
      "Check for common denominators",
      "For comparisons, convert to same denominator"
    ],
    [QuestionType.PATTERN]: [
      "Look for numerical or geometric sequences",
      "Check for color/shape alternations",
      "Count elements to find patterns"
    ],
    [QuestionType.CLOCK]: [
      "Draw the time if needed",
      "Pay attention to AM/PM",
      "For duration problems, use a timeline"
    ],
    [QuestionType.COMPARISON]: [
      "Identify the comparison criteria",
      "For numbers, check the units",
      "Rank from smallest to largest when possible"
    ],
    [QuestionType.IMAGE_CHOICE]: [
      "Examine each image carefully",
      "Look for subtle differences",
      "Eliminate least likely options"
    ],
    [QuestionType.WRITING]: [
      "Plan your answer before writing",
      "Vary vocabulary and sentence structure",
      "Proofread for errors"
    ],
    [QuestionType.FILL_IN]: [
      "Ensure the answer logically completes the sentence",
      "Pay attention to verb conjugation",
      "Adapt the answer to the context"
    ],
    [QuestionType.WORD_SORT]: [
      "Identify categories first",
      "Look for grammatical clues",
      "Check spelling of words"
    ],
    [QuestionType.GRAMMAR]: [
      "Reread the complete sentence with your answer",
      "Identify the verb tense",
      "Check subject-verb agreement"
    ],
    [QuestionType.DRAWING]: [
      "Use all the provided space",
      "Label important parts",
      "Check proportions"
    ]
  };
  
  return tips[questionType] || [
    "Read the question carefully",
    "Double-check your answer",
    "Manage your time effectively"
  ];
}

function drawErrorAnalysis(doc: jsPDF, yPos: number, margin: number, contentWidth: number, 
                         errorAnalysis: ReportOptions['errorAnalysis'], 
                         questions: ReportOptions['questions']) {
  let currentY = yPos;
  
  doc.setFontSize(12);
  doc.setFont(FONTS.bold, "bold");
  doc.setTextColor(COLORS.secondary);
  doc.text("DETAILED ERROR ANALYSIS:", margin, currentY);
  currentY += 10;

  const errorTypes = analyzeQuestionTypes(
    errorAnalysis.map(e => {
      const q = questions.find(q => q.id === e.questionId)!;
      return {type: q.type, correct: false};
    })
  );

  // Graphique des erreurs par type
  const chartWidth = contentWidth;
  const chartHeight = 60;
  
  // Vérifier l'espace avant d'ajouter le graphique
  if (currentY + chartHeight > doc.internal.pageSize.getHeight() - margin) {
    doc.addPage();
    currentY = margin;
    addSecondaryHeader(doc, margin, doc.internal.pageSize.getWidth(), "", "");
  }
  
  // drawChartContainerNoBorder(doc, margin, currentY, chartWidth, chartHeight, "ERRORS BY QUESTION TYPE");
  // currentY += chartHeight + 10;

  // Tableau des performances par type
  // autoTable(doc, {
  //   startY: currentY,
  //   head: [['Question Type', 'Success Rate', 'Count', 'Tips']],
  //   body: errorTypes.map(t => [
  //     t.type,
  //     `${t.percentage.toFixed(1)}%`,
  //     t.count,
  //     generateTypeSpecificTips(t.type)[0]
  //   ]),
  //   styles: {
  //     font: FONTS.body,
  //     fontSize: 9,
  //     textColor: COLORS.textDark,
  //     cellPadding: 3
  //   },
  //   headStyles: {
  //     fillColor: COLORS.dark,
  //     textColor: COLORS.light,
  //     fontStyle: 'bold'
  //   },
  //   columnStyles: {
  //     0: { cellWidth: 40 },
  //     3: { cellWidth: 60, fontStyle: 'italic' }
  //   },
  //   margin: { left: margin },
  //   tableWidth: contentWidth
  // });

  // currentY = (doc as any).lastAutoTable.finalY + 15;

  // Analyse détaillée de chaque erreur
  errorAnalysis.forEach((error, index) => {
    const question = questions.find(q => q.id === error.questionId);
    if (!question) return;

    // Vérifier l'espace avant d'ajouter une nouvelle erreur
    if (currentY + 60 > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      currentY = margin;
      addSecondaryHeader(doc, margin, doc.internal.pageSize.getWidth(), "", "");
    }

    doc.setFillColor(245, 245, 250);
    doc.rect(margin, currentY, contentWidth, 25, 'F');
    doc.setDrawColor(220, 220, 230);
    doc.rect(margin, currentY, contentWidth, 25, 'S');

    doc.setFontSize(9);
    doc.setTextColor(COLORS.textDark);
    
    doc.setFont(FONTS.bold, 'bold');
    doc.text(`Q${index + 1} (${question.type}):`, margin + 5, currentY + 7);
    doc.setFont(FONTS.body, 'normal');
    doc.text(question.question.substring(0, 50) + (question.question.length > 50 ? "..." : ""), margin + 25, currentY + 7);
    
    doc.text(`Your answer: ${error.studentAnswer}`, margin + 5, currentY + 14);
    doc.text(`Correct answer: ${question.correctAnswer}`, margin + 5, currentY + 19);
    
    currentY += 27;
    
    // Conseils d'amélioration
    const tips = generateTypeSpecificTips(question.type);
    
    // Vérifier l'espace pour les conseils
    if (currentY + 15 + (tips.length * 5) > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      currentY = margin;
      addSecondaryHeader(doc, margin, doc.internal.pageSize.getWidth(), "", "");
    }

    doc.setFillColor(255, 253, 235);
    doc.rect(margin, currentY, contentWidth, 10 + (tips.length * 5), 'F');
    doc.setDrawColor(255, 235, 150);
    doc.rect(margin, currentY, contentWidth, 10 + (tips.length * 5), 'S');
    
    doc.setFont(FONTS.bold, 'bold');
    doc.text(`Improvement strategies (${question.type}):`, margin + 5, currentY + 7);
    
    tips.forEach((tip, i) => {
      doc.setFont(FONTS.body, 'normal');
      doc.text(`• ${tip}`, margin + 10, currentY + 12 + (i * 5));
    });
    
    currentY += 15 + (tips.length * 5);
    
    // Séparateur entre les erreurs
    if (index < errorAnalysis.length - 1) {
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.2);
      doc.line(margin, currentY, margin + contentWidth, currentY);
      currentY += 10;
    }
  });

  return currentY;
}

// Fonction pour ajouter un en-tête minimal sur les pages suivantes
function addSecondaryHeader(
  doc: jsPDF,
  margin: number,
  pageWidth: number,
  studentName: string,
  subject: string
) {
  doc.setFontSize(12);
  doc.setTextColor(COLORS.dark);
  doc.text(`Student: ${studentName} - ${subject}`, margin, margin - 10);
  doc.setDrawColor(COLORS.dark);
  doc.setLineWidth(0.5);
  doc.line(margin, margin - 5, pageWidth - margin, margin - 5);
}

function drawActionPlan(doc: jsPDF, yPos: number, margin: number, contentWidth: number, weaknesses: string[], subject: string) {
  let currentY = yPos;
  
  doc.setFontSize(12);
  doc.setFont(FONTS.bold, "bold");
  doc.setTextColor(COLORS.primary);
  doc.text("PERSONALIZED ACTION PLAN", margin, currentY);
  currentY += 10;

  // Section 1: Focus Areas
  doc.setFontSize(10);
  doc.setFont(FONTS.bold, "bold");
  doc.setTextColor(COLORS.dark);
  doc.text("Priority Improvement Areas:", margin, currentY);
  currentY += 7;

  weaknesses.forEach((weakness, i) => {
    doc.setFont(FONTS.body, "normal");
    doc.text(`• ${weakness}`, margin + 5, currentY);
    currentY += 5;
  });

  currentY += 10;

  // Section 2: Recommended Resources
  doc.setFont(FONTS.bold, "bold");
  doc.text("Recommended Resources:", margin, currentY);
  currentY += 7;

  const resources = {
    math: ["Khan Academy", "IXL Math"],
    reading: ["CommonLit", "Newsela"],
    science: ["CK-12", "PhET"]
  };

  const subjectResources = resources[subject.toLowerCase() as keyof typeof resources] || [];
  subjectResources.forEach(resource => {
    doc.setFont(FONTS.body, "normal");
    doc.text(`→ ${resource}`, margin + 5, currentY);
    currentY += 5;
  });

  return currentY;
}

function drawProgressTimeline(
  doc: jsPDF,
  yPos: number,
  margin: number,
  contentWidth: number,
  previousScores: number[]
): number {
  if (!previousScores || previousScores.length < 2) return yPos;

  const timelineHeight = 80;
  const startX = margin + 20;
  const endX = margin + contentWidth - 20;
  const timelineWidth = endX - startX;
  const step = timelineWidth / (previousScores.length - 1);
  const maxScore = Math.max(...previousScores, 100);

  // Titre
  doc.setFontSize(12);
  doc.setFont(FONTS.bold, "bold");
  doc.setTextColor(COLORS.dark);
  doc.text("PROGRESS TIMELINE", margin, yPos);
  yPos += 10;

  // Axe horizontal
  doc.setDrawColor(COLORS.textDark);
  doc.setLineWidth(0.5);
  doc.line(startX, yPos + timelineHeight - 20, endX, yPos + timelineHeight - 20);

  // Points et lignes
  previousScores.forEach((score, i) => {
    const x = startX + (i * step);
    const y = yPos + timelineHeight - 20 - (score / maxScore * (timelineHeight - 25));

    // Ligne de connexion
    if (i > 0) {
      const prevX = startX + ((i - 1) * step);
      const prevY = yPos + timelineHeight - 20 - (previousScores[i - 1] / maxScore * (timelineHeight - 25));
      doc.setDrawColor(COLORS.primary);
      doc.setLineWidth(1.5);
      doc.line(prevX, prevY, x, y);
    }

    // Point
    doc.setFillColor(COLORS.primary);
    doc.circle(x, y, 3, 'F');

    // Étiquette
    doc.setFontSize(8);
    doc.setTextColor(COLORS.textDark);
    doc.text(`${score}%`, x - 5, yPos + timelineHeight - 5);
    doc.text(`Test ${i + 1}`, x - 5, yPos + timelineHeight + 5);
  });

  // Projection IA
  if (previousScores.length > 2) {
    const lastScore = previousScores[previousScores.length - 1];
    const improvementRate = (lastScore - previousScores[0]) / (previousScores.length - 1);
    const projectedScore = Math.min(100, Math.round(lastScore + improvementRate));
    const projectedX = startX + (previousScores.length * step);
    const projectedY = yPos + timelineHeight - 20 - (projectedScore / maxScore * (timelineHeight - 25));

    // Ligne pointillée de projection
    doc.setDrawColor(COLORS.accent1);
    doc.setLineWidth(0.5);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(
      startX + ((previousScores.length - 1) * step),
      yPos + timelineHeight - 20 - (lastScore / maxScore * (timelineHeight - 25)),
      projectedX,
      projectedY
    );
    doc.setLineDashPattern([], 0);

    // Point de projection
    doc.setFillColor(COLORS.accent1);
    doc.circle(projectedX, projectedY, 3, 'F');

    // Texte de projection
    doc.setFontSize(8);
    doc.setTextColor(COLORS.accent1);
    doc.text(`Projected: ${projectedScore}%`, projectedX - 15, projectedY - 10);
    doc.text("Next Test", projectedX - 10, yPos + timelineHeight + 5);
  }

  return yPos + timelineHeight + 20;
}


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

  // En-tête avec logo
  try {
    const logoData = await loadImage('newlogo.png');
    doc.addImage(logoData, 'PNG', margin, yPos, 30, 30);
    
    doc.setFontSize(24);
    const centerY = yPos + 15;
    const textWidth = doc.getTextWidth("CompleMetrics");
    const centerX = (pageWidth - textWidth) / 2;
    
    doc.setTextColor(128, 0, 128);
    doc.text("Comple", centerX, centerY);
    doc.setTextColor(0, 128, 0);
    doc.text("Metrics", centerX + doc.getTextWidth("Comple") - 1, centerY);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const subtitle = "Complete Measurement of Educational Metrics";
    doc.text(subtitle, (pageWidth - doc.getTextWidth(subtitle)) / 2, centerY + 10);

    doc.setFontSize(10);
    const rightEdge = pageWidth - margin;
    doc.text("Radiant Prep, LLC", rightEdge, yPos + 5, { align: "right" });
    doc.text("42-20 Broadway", rightEdge, yPos + 10, { align: "right" });
    doc.text("Astoria, NY 11103", rightEdge, yPos + 15, { align: "right" });
    doc.text("Learn@radiantprep.com", rightEdge, yPos + 20, { align: "right" });
    doc.text("(347) 551-0888", rightEdge, yPos + 25, { align: "right" });
  } catch (e) {
    console.error("Failed to load logo:", e);
    // Fallback si le logo ne charge pas
  }
  
  yPos += 40;
  
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

  doc.setFontSize(36);
  doc.setTextColor(COLORS.primary);
  const scoreText = `${result.percentageScore}%`;
  doc.text(scoreText, centerX - doc.getTextWidth(scoreText)/2, yPos + 20);
  doc.setTextColor(0, 0, 0);
  yPos += 40;

  // =============================================
  // PERFORMANCE ANALYSIS - Graphiques côte à côte
  // =============================================
  doc.setFontSize(14);
  doc.setFont(FONTS.bold, 'bold');
  doc.setTextColor(COLORS.dark);
  doc.text("PERFORMANCE ANALYSIS", margin, yPos);
  yPos += 15;

  const chartWidth = (contentWidth - 10) / 2; // Moins d'espace entre les graphiques
  const chartHeight = 70;

  // Vérifier l'espace disponible
  if (yPos + chartHeight > pageHeight - margin) {
    doc.addPage();
    yPos = margin;
    addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
  }

  // SCORE COMPARISON - Graphique à gauche
  doc.setFontSize(10);
  doc.setTextColor(COLORS.dark);
  doc.text("SCORE COMPARISON", margin + chartWidth/2, yPos + 5, { align: 'center' });
  
  // Dessiner le graphique légèrement plus bas
  drawCentered3DBarChart(doc, margin, yPos + 10, chartWidth, chartHeight, 
                        result.percentageScore, 75);

  // QUESTION RESULTS - Graphique à droite
  doc.setFontSize(10);
  doc.setTextColor(COLORS.dark);
  doc.text("QUESTION RESULTS", margin + chartWidth + 10 + chartWidth/2, yPos + 5, { align: 'center' });
  
  const correctCount = result.questionResults.filter(q => q.correct).length;
  drawEnhancedPieChart(doc, 
                      margin + chartWidth + 10 + chartWidth/2, 
                      yPos + 10 + chartHeight/2, 
                      Math.min(chartWidth, chartHeight) * 0.6,
                      correctCount, 
                      result.totalQuestions);

  yPos += chartHeight + 20;

  // =============================================
  // DETAILED PERFORMANCE BY CATEGORY
  // =============================================
  if (result.questionResults) {
    if (yPos > pageHeight - 100) {
      doc.addPage();
      yPos = margin;
      addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
    }

    doc.setFontSize(12);
    doc.setFont(FONTS.bold, "bold");
    doc.setTextColor(COLORS.dark);
    doc.text("DETAILED PERFORMANCE BY CATEGORY", margin, yPos);
    yPos += 10;

    // Calcul des performances par catégorie
    const categoryStats: Record<string, {correct: number, total: number}> = {};
    result.questionResults.forEach(qr => {
      if (!categoryStats[qr.category]) {
        categoryStats[qr.category] = {correct: 0, total: 0};
      }
      categoryStats[qr.category].total++;
      if (qr.correct) categoryStats[qr.category].correct++;
    });

    

    // Obtenir currentY à partir du contexte ou le définir
    let currentY = yPos; // ou la valeur appropriée selon votre flux

    // Vérifier que errorTypes est bien défini
    const errorTypes: ErrorType[] = analyzeQuestionTypes(
      result.errorAnalysis.map(e => {
        const q = result.questions.find(q => q.id === e.questionId)!;
        return { type: q.type, correct: false };
      })
    );

    // Tableau des performances par type avec typage correct
    autoTable(doc, {
      startY: currentY,
      head: [['Question Type', 'Success Rate', 'Count', 'Tips']],
      body: errorTypes.map((t: ErrorType) => [ // Typage explicite du paramètre t
        t.type,
        `${t.percentage.toFixed(1)}%`,
        t.count,
        generateTypeSpecificTips(t.type)[0]
      ]),
      margin: { left: margin },
      tableWidth: contentWidth,
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
        0: { cellWidth: 40 },
        3: { cellWidth: 60, fontStyle: 'italic' }
      }
    });

    // Mettre à jour currentY après le tableau
    currentY = (doc as any).lastAutoTable.finalY + 15;

    yPos = (doc as any).lastAutoTable.finalY + 15;
  }

  // =============================================
  // GENERAL ANALYSIS / FOCUS AREAS
  // =============================================
  if (result.strengthCategories?.length > 0 || result.weaknessCategories?.length > 0) {
    if (yPos > pageHeight - 100) {
      doc.addPage();
      yPos = margin;
      addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
    }

    doc.setFontSize(12);
    doc.setFont(FONTS.bold, "bold");
    doc.setTextColor(COLORS.dark);
    doc.text("GENERAL ANALYSIS / FOCUS AREAS", margin, yPos);
    yPos += 15;

    // Forces
    if (result.strengthCategories.length > 0) {
      doc.setFontSize(10);
      doc.setFont(FONTS.bold, "bold");
      doc.setTextColor(COLORS.success);
      doc.text("Strengths:", margin, yPos);
      yPos += 7;

      result.strengthCategories.forEach(strength => {
        doc.setFont(FONTS.body, "normal");
        doc.setTextColor(COLORS.textDark);
        doc.text(`✓ ${strength}`, margin + 5, yPos);
        yPos += 5;
      });
      yPos += 5;
    }

    // Faiblesses
    if (result.weaknessCategories.length > 0) {
      doc.setFontSize(10);
      doc.setFont(FONTS.bold, "bold");
      doc.setTextColor(COLORS.secondary);
      doc.text("Areas Needing Improvement:", margin, yPos);
      yPos += 7;

      result.weaknessCategories.forEach(weakness => {
        doc.setFont(FONTS.body, "normal");
        doc.setTextColor(COLORS.textDark);
        doc.text(`✗ ${weakness}`, margin + 5, yPos);
        yPos += 5;
      });
    }
    yPos += 10;
  }

  // =============================================
  // DETAILED ERROR ANALYSIS WITH AI INSIGHTS
  // =============================================
  if (result.errorAnalysis?.length > 0 && result.questions) {
    if (yPos > pageHeight - 100) {
      doc.addPage();
      yPos = margin;
      addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
    }

    yPos = drawErrorAnalysis(doc, yPos, margin, contentWidth, result.errorAnalysis, result.questions);
  }

  // =============================================
  // PERSONALIZED ACTION PLAN
  // =============================================
  if (result.weaknessCategories?.length > 0) {
    if (yPos > pageHeight - 100) {
      doc.addPage();
      yPos = margin;
      addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
    }

    yPos = drawActionPlan(doc, yPos, margin, contentWidth, result.weaknessCategories, result.subject);
  }

  // =============================================
  // PROGRESS TIMELINE WITH AI PROJECTION
  // =============================================
  // if (result.previousScores?.length > 1) {
  //   if (yPos > pageHeight - 100) {
  //     doc.addPage();
  //     yPos = margin;
  //     addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
  //   }

  //   yPos = drawProgressTimeline(doc, yPos, margin, contentWidth, result.previousScores);
  // }

  // Pied de page
  const footerY = Math.min(pageHeight - 10, Math.max(yPos + 20, 280));
  doc.setDrawColor(COLORS.light);
  doc.setLineWidth(0.1);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFont(FONTS.body, "normal");
  doc.setFontSize(8);
  doc.setTextColor(COLORS.textLight);

  const footerTexts = [
    "Copyright © by Radiant Prep, LLC. All Rights Reserved.",
    "CONFIDENTIAL - May NOT be reproduced in any form",
    `Generated on ${new Date().toLocaleDateString()}`
  ];

  footerTexts.forEach((text, index) => {
    doc.text(text, pageWidth / 2, footerY + 5 + (index * 4), { align: "center" });
  });

  // Numéroter les pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 10, pageHeight - 10);
  }

  return doc.output("blob");
}