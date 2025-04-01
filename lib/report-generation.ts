import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { loadImage } from "./image-utils";
import { QuestionType } from "./types";

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
  title: "Montserrat",       // Moderne et élégant
  subtitle: "OpenSans",      // Lisible et professionnel
  body: "Roboto",           // Excellente lisibilité
  bold: "Montserrat-Bold",   // Version bold pour titres
  accent: "PlayfairDisplay", // Pour éléments spéciaux
  code: "CourierNew"        // Pour textes techniques
};


const COLORS = {
  // Couleurs principales
  primary: "#4361ee",       // Bleu vif moderne
  primaryLight: "#4895ef",  // Bleu plus clair
  primaryDark: "#3a0ca3",   // Bleu foncé


  warningDark: "#e36412", // Add a darker warning color
  
  // Secondaires
  secondary: "#f72585",     // Rose vif
  secondaryLight: "#ff70a6", 
  secondaryDark: "#b5179e",
  
  // Palettes complémentaires
  success: "#4cc9f0",       // Cyan clair
  warning: "#f8961e",       // Orange vif
  danger: "#ef233c",        // Rouge attrayant
  
  // Nuances
  dark: "#14213d",          // Noir bleuté
  light: "#f8f9fa",         // Blanc cassé
  textDark: "#212529",      // Noir doux
  textLight: "#e9ecef",     // Gris très clair
  
  // Accents
  accent1: "#7209b7",       // Violet
  accent2: "#38b000",       // Vert vif
  accent3: "#ff9e00",       // Orange doré
  accent4: "#00b4d8"        // Bleu turquoise
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

function drawCenteredBarChart(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  studentScore: number,
  averageScore: number
) {
  const maxValue = 100;
  const barHeight = height * 0.7; // Réduit à 60% pour laisser de la place aux labels
  const barWidth = width / 5; // Largeur réduite pour permettre l'espacement
  const marginLeft = 15;
  const labelSpace = 15; // Espace réservé pour les labels

  // Ajuster la hauteur de dessin pour inclure les labels
  const drawingHeight = height - labelSpace;

  // Positionnement des barres
  const centerX = x + marginLeft + (width - marginLeft) / 2;
  const studentX = centerX - barWidth - 5;
  const averageX = centerX + 5;

  // Hauteurs des barres
  const studentBarHeight = (studentScore / maxValue) * barHeight;
  const averageBarHeight = (averageScore / maxValue) * barHeight;

  // Dessin des barres (dans la zone ajustée)
  doc.setFillColor(COLORS.primary);
  doc.rect(studentX, y + drawingHeight - studentBarHeight, barWidth, studentBarHeight, 'F');
  
  doc.setFillColor(COLORS.success);
  doc.rect(averageX, y + drawingHeight - averageBarHeight, barWidth, averageBarHeight, 'F');

  // Axes
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  
  // Axe Y
  const yAxisX = x + marginLeft;
  doc.line(yAxisX, y, yAxisX, y + drawingHeight);
  
  // Axe X
  doc.line(yAxisX, y + drawingHeight, x + width, y + drawingHeight);

  // Graduations
  for (let val = 0; val <= maxValue; val += 25) {
    const yPos = y + drawingHeight - (val / maxValue) * barHeight;
    doc.line(yAxisX - 3, yPos, yAxisX, yPos);
    doc.setFontSize(8);
    doc.text(`${val}`, yAxisX - 5, yPos + 2, { align: 'right' });
  }

  // Libellés DANS le cadre (juste sous l'axe X)
  doc.setFontSize(9);
  doc.setTextColor(COLORS.textDark);
  doc.text("Student", studentX + barWidth / 2, y + drawingHeight + 5, { align: "center" });
  doc.text("Average", averageX + barWidth / 2, y + drawingHeight + 5, { align: "center" });

  // Valeurs au-dessus des barres
  doc.setFontSize(10);
  doc.setFont(FONTS.bold, 'bold');
  doc.text(`${studentScore}%`, studentX + barWidth / 2, y + drawingHeight - studentBarHeight - 5, { align: "center" });
  doc.text(`${averageScore}%`, averageX + barWidth / 2, y + drawingHeight - averageBarHeight - 5, { align: "center" });
}

function drawEnhancedPieChart(doc: jsPDF, x: number, y: number, size: number, correct: number, total: number) {
  const incorrect = total - correct;
  const correctPercent = (correct / total) * 100;
  const radius = size / 2;
  const centerY = y;

  // Dessin du camembert en deux passes
  // 1. Partie correcte (verte)
  if (correct > 0) {
    drawPieSlice(doc, x, centerY, radius, -90, (-90 + (correctPercent / 100) * 360), COLORS.success);
  }
  
  // 2. Partie incorrecte (rouge)
  if (incorrect > 0) {
    drawPieSlice(doc, x, centerY, radius, (-90 + (correctPercent / 100) * 360), (-90 + 360), COLORS.secondary);
  }

  // Cercle blanc central
  doc.setFillColor(255, 255, 255);
  doc.circle(x, centerY, radius * 0.4, 'F');
  
  // Pourcentage au centre
  doc.setFontSize(10);
  doc.setFont(FONTS.bold, 'bold');
  doc.setTextColor(COLORS.textDark);
  doc.text(`${correctPercent.toFixed(0)}%`, x, centerY + 2, { align: 'center' });

  // Légende COMPACTE et bien positionnée
  const legendY = centerY + radius + 5;
  const legendX = x - radius * 0.9; // Décalage vers la gauche
  
  // Style commun pour les légendes
  doc.setFontSize(7);
  const boxSize = 5;
  const textOffset = 8;
  const lineHeight = 8;

  // Légende "Correct"
  doc.setFillColor(COLORS.success);
  doc.rect(legendX, legendY, boxSize, boxSize, 'F');
  doc.text(`Correct: ${correct}`, legendX + textOffset, legendY + boxSize/2 + 1);

  // Légende "Incorrect" (plus bas)
  doc.setFillColor(COLORS.secondary);
  doc.rect(legendX, legendY + lineHeight, boxSize, boxSize, 'F');
  doc.text(`Incorrect: ${incorrect}`, legendX + textOffset, legendY + lineHeight + boxSize/2 + 1);

  // Contour du cercle
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.circle(x, centerY, radius, 'S');
}

// Fonction helper pour dessiner les portions de camembert
function drawPieSlice(doc: jsPDF, x: number, y: number, radius: number, startAngle: number, endAngle: number, color: string) {
  doc.setFillColor(color);
  const segments = Math.max(10, Math.ceil((endAngle - startAngle) / 5));
  const angleStep = (endAngle - startAngle) / segments;
  
  doc.moveTo(x, y);
  for (let i = 0; i <= segments; i++) {
    const angle = (startAngle + i * angleStep) * (Math.PI / 180);
    doc.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
  }
  doc.lineTo(x, y);
  doc.fill();
}

// Fonction extraite pour dessiner les portions
// function drawPieSlice(doc: jsPDF, x: number, y: number, radius: number, startAngle: number, endAngle: number, color: string) {
//   doc.setFillColor(color);
//   const segments = Math.ceil((endAngle - startAngle) / 5);
//   const angleStep = (endAngle - startAngle) / segments;
  
//   doc.moveTo(x, y);
//   for (let i = 0; i <= segments; i++) {
//     const angle = (startAngle + i * angleStep) * (Math.PI / 180);
//     doc.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
//   }
//   doc.lineTo(x, y);
//   doc.fill();
// }


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


export async function generateProfessionalPDF(result: ReportOptions): Promise<Blob> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

   // =============================================
  // AJOUT DES POLICES PERSONNALISÉES (à mettre juste après la création du doc)
  // =============================================
  try {
    // Chargez les fichiers de police (vous devrez les avoir dans votre projet)
    const montserratRegular = await fetch('/fonts/Montserrat-Regular.ttf').then(r => r.arrayBuffer());
    const montserratBold = await fetch('/fonts/Montserrat-Bold.ttf').then(r => r.arrayBuffer());
    const openSansRegular = await fetch('/fonts/OpenSans-Regular.ttf').then(r => r.arrayBuffer());
    const playfairDisplay = await fetch('/fonts/PlayfairDisplay-Regular.ttf').then(r => r.arrayBuffer());
    const robotoRegular = await fetch('/fonts/Roboto-Regular.ttf').then(r => r.arrayBuffer());

    // Ajoutez les polices au document
    doc.addFileToVFS('Montserrat-Regular.ttf', arrayBufferToBase64(montserratRegular));
    doc.addFileToVFS('Montserrat-Bold.ttf', arrayBufferToBase64(montserratBold));
    doc.addFileToVFS('OpenSans-Regular.ttf', arrayBufferToBase64(openSansRegular));
    doc.addFileToVFS('PlayfairDisplay-Regular.ttf', arrayBufferToBase64(playfairDisplay));
    doc.addFileToVFS('Roboto-Regular.ttf', arrayBufferToBase64(robotoRegular));

    doc.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal');
    doc.addFont('Montserrat-Bold.ttf', 'Montserrat-Bold', 'bold');
    doc.addFont('OpenSans-Regular.ttf', 'OpenSans', 'normal');
    doc.addFont('PlayfairDisplay-Regular.ttf', 'PlayfairDisplay', 'normal');
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  } catch (e) {
    console.warn("Failed to load custom fonts, using defaults", e);
  }

  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - 2 * margin;
  let yPos = margin;

  // En-tête avec logo et informations
  try {
    const logoData = await loadImage('newlogo.png');
    doc.addImage(logoData, 'PNG', margin, yPos, 30, 30);

    // Positionnement du texte pour le nom de la société
    doc.setFontSize(24);
    const centerY = yPos + 15;
    const textWidth = doc.getTextWidth("CompleMetrics");
    const centerX = (pageWidth - textWidth) / 2;

    doc.setTextColor(128, 0, 128);
    doc.text("Comple", centerX, centerY);
    doc.setTextColor(0, 128, 0);
    doc.text("Metrics", centerX + doc.getTextWidth("Comple") - 1, centerY);

    // Sous-titre centré
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const subtitle = "Complete Measurement of Educational Metrics";
    doc.text(subtitle, (pageWidth - doc.getTextWidth(subtitle)) / 2, centerY + 10);

    // Informations à droite (adresse et contact)
    const rightEdge = pageWidth - margin;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    const contactInfo = [
      "Radiant Prep, LLC",
      "42-20 Broadway",
      "Astoria, NY 11103",
      "Learn@radiantprep.com",
      "(347) 551-0888"
    ];

    contactInfo.forEach((line, i) => {
      doc.text(line, rightEdge, yPos + 5 + (i * 5), { align: "right" });
    });
  } catch (e) {
    console.error("Failed to load logo:", e);
    // Fallback si le logo ne charge pas
  }
  // Après la partie logo/en-tête (ligne ~200)
yPos += 35; // Réduire cet espacement initial

// Section SCHOLAR et GRADE - version compacte
const scholarY = yPos;
const infoBoxHeight = 10; // Hauteur réduite des boîtes d'information

// Calculer la largeur totale disponible entre les marges
const totalWidth = pageWidth - 2 * margin;

// "SCHOLAR" label - largeur ajustée
const scholarLabelWidth = 35;
doc.setFillColor(0, 51, 102);
doc.rect(margin, scholarY, scholarLabelWidth, infoBoxHeight, "F");
doc.setTextColor(255, 255, 255);
doc.setFontSize(9);
doc.text("SCHOLAR", margin + 5, scholarY + 7); // Retirer le ":" pour gagner de l'espace

// Nom étudiant - largeur calculée dynamiquement
const nameWidth = totalWidth * 0.5; // Prend 50% de l'espace disponible
doc.setFillColor(230, 230, 230);
doc.rect(margin + scholarLabelWidth, scholarY, nameWidth, infoBoxHeight, "F");
doc.setTextColor(0, 0, 0);
doc.text(result.studentName, margin + scholarLabelWidth + 5, scholarY + 7);

// "GRADE" label - largeur ajustée
const gradeLabelWidth = 30;
doc.setFillColor(0, 51, 102);
doc.rect(margin + scholarLabelWidth + nameWidth, scholarY, gradeLabelWidth, infoBoxHeight, "F");
doc.setTextColor(255, 255, 255);
doc.text("GRADE", margin + scholarLabelWidth + nameWidth + 5, scholarY + 7);

// Grade - largeur calculée pour remplir jusqu'à la marge droite
const gradeValueWidth = totalWidth - scholarLabelWidth - nameWidth - gradeLabelWidth;
doc.setFillColor(230, 230, 230);
doc.rect(margin + scholarLabelWidth + nameWidth + gradeLabelWidth, scholarY, gradeValueWidth, infoBoxHeight, "F");
doc.setTextColor(0, 0, 0);
doc.text(result.grade, margin + scholarLabelWidth + nameWidth + gradeLabelWidth + (gradeValueWidth/2), scholarY + 7, { align: 'center' });

yPos += infoBoxHeight + 5;

// Informations évaluation - version compacte alignée à gauche
doc.setFontSize(9); // Taille réduite
const assessmentText = `Assessment: Radiant PACED™ - Grade ${result.grade} ${result.subject}`;
const dateText = `Date: ${result.date.toLocaleDateString()}`;

// Alignement à gauche avec la marge
doc.text(assessmentText, margin, yPos);
doc.text(dateText, margin, yPos + 5);

yPos += 15; // Espacement avant la section suivante



// =============================================
// PERFORMANCE ANALYSIS - Graphiques
// =============================================

doc.setFontSize(16);
doc.setFont(FONTS.accent, 'bold'); // Utilise PlayfairDisplay en bold
doc.setTextColor(COLORS.primary);   // Violet moderne

const title = "Performance Analysis";
const titleWidth = doc.getTextWidth(title);
doc.text(title, margin, yPos);

// Soulignement stylisé
doc.setDrawColor(COLORS.primaryDark); // Rose vif
doc.setLineWidth(0.8);
doc.line(margin, yPos + 3, margin + titleWidth, yPos + 3);

yPos += 10; // Espacement accru

const chartHeight = 70;
const gapBetweenCharts = 10; // Espace entre les deux graphiques

// Calcul des largeurs pour respecter les marges
const totalAvailableWidth = contentWidth - gapBetweenCharts;
const chartWidth = totalAvailableWidth / 2;

// Vérifier l'espace disponible
if (yPos + chartHeight > pageHeight - margin - 30) { // Marge de sécurité
    doc.addPage();
    yPos = margin;
    addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
}

// Styles pour les cadres
const frameColor: [number, number, number] = [0, 0, 0];
const frameWidth = 0.5; // Ligne plus fine

// SCORE COMPARISON - Graphique à gauche
const leftChartX = margin;
const chartY = yPos + 5; // Position verticale ajustée

// Cadre gauche
doc.setDrawColor(...frameColor);
doc.setLineWidth(frameWidth);
doc.rect(leftChartX, chartY - 5, chartWidth, chartHeight + 10);

// Titre du graphique gauche
// doc.setFontSize(10);
// doc.setTextColor(COLORS.dark);
// doc.text("SCORE COMPARISON", leftChartX + chartWidth / 2, chartY - 8, { align: 'center' });

// Dessin du graphique
drawCenteredBarChart(doc, leftChartX, chartY, chartWidth, chartHeight, 
                    result.percentageScore, 75);

// QUESTION RESULTS - Graphique à droite
const rightChartX = margin + chartWidth + gapBetweenCharts;

// Cadre droit
doc.setDrawColor(...frameColor);
doc.setLineWidth(frameWidth);
doc.rect(rightChartX, chartY - 5, chartWidth, chartHeight + 10);

// Titre du graphique droit
// doc.text("QUESTION RESULTS", rightChartX + chartWidth / 2, chartY - 8, { align: 'center' });

// Dessin du camembert
const correctCount = result.questionResults.filter(q => q.correct).length;
drawEnhancedPieChart(doc, 
                    rightChartX + chartWidth / 2, 
                    chartY + chartHeight / 2, 
                    Math.min(chartWidth, chartHeight) * 0.55, // Taille légèrement réduite
                    correctCount, 
                    result.totalQuestions);

// Légendes sous les graphiques
const legendY = chartY + chartHeight + 10;
doc.setFontSize(8);
doc.setTextColor(COLORS.textDark);
doc.text("Score Comparison", leftChartX + chartWidth / 2, legendY, { align: 'center' });
doc.text("Question Results", rightChartX + chartWidth / 2, legendY, { align: 'center' });


yPos += chartHeight + 30; // Espacement avant la section suivante


// FIN MODIFICATIONS

// =============================================
// DETAILED PERFORMANCE BY CATEGORY - VERSION CORRIGÉE
// =============================================
if (result.questionResults) {
  if (yPos > pageHeight - 100) {
    doc.addPage();
    yPos = margin;
    addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
  }

  // Titre stylisé
  doc.setFontSize(16);
  doc.setFont(FONTS.accent, 'bold');
  doc.setTextColor(COLORS.primary);
  
  const title = "Detailed Performance by Category";
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, margin, yPos);
  
  // Soulignement
  doc.setDrawColor(COLORS.primaryDark);
  doc.setLineWidth(0.8);
  doc.line(margin, yPos + 3, margin + titleWidth, yPos + 3);
  
  yPos += 15;

  // Calcul des performances pour TOUTES les questions
  const performanceTypes = analyzeQuestionTypes(
    result.questionResults.map(qr => ({
      type: qr.type,
      correct: qr.correct
    }))
  );

  // Tableau des performances COMPLÈTES
  autoTable(doc, {
    startY: yPos,
    head: [['Question Type', 'Success Rate', 'Correct', 'Total', 'Tips']],
    body: performanceTypes.map(t => [
      t.type,
      `${t.percentage.toFixed(1)}%`,
      t.count * t.percentage / 100, // Nombre de bonnes réponses
      t.count,                      // Total des questions
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
      1: { cellWidth: 30 },
      2: { cellWidth: 20 },
      3: { cellWidth: 20 },
      4: { cellWidth: 60, fontStyle: 'italic' }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;
}

// =============================================
// GENERAL ANALYSIS & FOCUS AREAS - VERSION PERSONNALISÉE
// =============================================
yPos += 30;

if (result.weaknessCategories?.length > 0) {
  // Vérification espace disponible
  if (yPos > pageHeight - margin - 150) {
    doc.addPage();
    yPos = margin;
    addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
  }

  // TITRE PRINCIPAL
  doc.setFontSize(14);
  doc.setFont(FONTS.accent, 'bold');
  doc.setTextColor(COLORS.primaryDark);
  doc.text("GENERAL ANALYSIS & FOCUS AREAS", margin, yPos);
  yPos += 10; // Espacement réduit après titre

  // Niveau de faiblesse
  const weaknessLevel = result.weaknessCategories.length > 3 ? 'critical' : 
                      result.weaknessCategories.length > 1 ? 'significant' : 'some';

  // Création cadre d'analyse (hauteur réduite)
  doc.setFillColor(COLORS.light);
  const boxHeight = 60; // Hauteur réduite
  doc.rect(margin, yPos, contentWidth, boxHeight, 'F');
  doc.setDrawColor(COLORS.primary);
  doc.rect(margin, yPos, contentWidth, boxHeight);

  // Préparation texte
  doc.setFontSize(10);
  doc.setFont(FONTS.body, 'normal');
  doc.setTextColor(COLORS.textDark);

  // Construction du texte sur 2 lignes seulement
  const line1 = `Our data indicates ${result.studentName} requires ${
    weaknessLevel === 'critical' ? 'critical intervention' : 
    weaknessLevel === 'significant' ? 'focused support' : 'targeted help'
  } in ${result.subject}. ${
    weaknessLevel === 'critical' ? 'The results are dramatically below peer metrics.' :
    weaknessLevel === 'significant' ? 'The results are below expected standards.' : 
    'Some areas need improvement.'
  }`;

  const line2 = `${
    result.percentageScore < 50 ? 
    `${result.studentName} does not yet have a solid foundation in ${result.subject.toLowerCase()}.` :
    `${result.studentName} has some foundational knowledge but with important gaps.`
  } ${
    weaknessLevel === 'critical' ? 'An intensive, foundational approach is recommended.' :
    weaknessLevel === 'significant' ? 'A structured intervention program would be beneficial.' :
    'Targeted practice in specific areas should help address the gaps.'
  }`;

  // Affichage compact
  const lineHeight = 6; // Réduit l'espace entre lignes
  doc.text(line1, margin + 5, yPos + 8, { maxWidth: contentWidth - 10 });
  doc.text(line2, margin + 5, yPos + 8 + lineHeight, { maxWidth: contentWidth - 10 });

  // Mise en forme des parties importantes
  doc.setFont(FONTS.body, 'bold');
  doc.setTextColor(COLORS.primary);
  
  // Surligner le nom et la matière dans la première ligne
  // const namePos = margin + 5 + doc.getTextWidth('Our data indicates ');
  // doc.text(result.studentName, namePos, yPos + 8);
  
  const subjectPos = doc.getTextWidth(result.studentName) + doc.getTextWidth(' requires targeted help in ');
  // const subjectPos = namePos + doc.getTextWidth(result.studentName) + doc.getTextWidth(' requires targeted help in ');
  doc.text(result.subject, subjectPos, yPos + 8);

  yPos += boxHeight + 10; // Espacement réduit après cadre

  // SECTION PRIORITY IMPROVEMENT AREAS (version compacte)
  if (yPos > pageHeight - margin - 50) {
    doc.addPage();
    yPos = margin;
    addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
  }

  doc.setFontSize(12);
  doc.setFont(FONTS.bold, 'bold');
  doc.setTextColor(COLORS.warningDark);
  doc.text("PRIORITY IMPROVEMENT AREAS:", margin, yPos);
  yPos += 8; // Espacement réduit

  // Analyse erreurs (version compacte)
  const errorCategories: Record<string, number> = {};
  result.errorAnalysis.forEach(e => {
    const question = result.questions.find(q => q.id === e.questionId)!;
    errorCategories[question.category] = (errorCategories[question.category] || 0) + 1;
  });

  const sortedCategories = Object.entries(errorCategories)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category);

  doc.setFont(FONTS.body, 'normal');
  const catLineHeight = 6; // Espacement réduit entre catégories
  
  sortedCategories.forEach(category => {
    if (yPos > pageHeight - margin - 10) {
      doc.addPage();
      yPos = margin;
      addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
      doc.setFontSize(12);
      doc.text("PRIORITY IMPROVEMENT AREAS:", margin, yPos);
      yPos += 8;
    }

    const errorCount = errorCategories[category];
    const totalInCategory = result.questionResults.filter(q => 
      result.questions.find(q2 => q2.id === q.id)?.category === category
    ).length;
    
    doc.setTextColor(COLORS.textDark);
    doc.text(`• ${category}: ${Math.round((errorCount/totalInCategory)*100)}% (${errorCount}/${totalInCategory})`, 
            margin + 5, yPos);
    
    yPos += catLineHeight;
  });

  yPos += 10; // Espacement final réduit
}

  // =============================================
  // DETAILED ERROR ANALYSIS WITH AI INSIGHTS
  // =============================================
  // if (result.errorAnalysis?.length > 0 && result.questions) {
  //   if (yPos > pageHeight - 100) {
  //     doc.addPage();
  //     yPos = margin;
  //     addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
  //   }

  //   yPos = drawErrorAnalysis(doc, yPos, margin, contentWidth, result.errorAnalysis, result.questions);
  // }

  // =============================================
  // PERSONALIZED ACTION PLAN
  // =============================================
  // if (result.weaknessCategories?.length > 0) {
  //   if (yPos > pageHeight - 100) {
  //     doc.addPage();
  //     yPos = margin;
  //     addSecondaryHeader(doc, margin, pageWidth, result.studentName, result.subject);
  //   }

  //   yPos = drawActionPlan(doc, yPos, margin, contentWidth, result.weaknessCategories, result.subject);
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

function arrayBufferToBase64(montserratRegular: ArrayBuffer): string {
  throw new Error("Function not implemented.");
}
