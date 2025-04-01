import { generateProfessionalPDF } from './report-generation-large';
import { QuestionType } from './types';

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

const testData: ReportOptions = {
    studentName: "Test Student",
    grade: "5",
    subject: "math",
    date: new Date(),
    percentageScore: 75,
    score: 15,
    totalQuestions: 20,
    timeSpent: 45,
    unusedTime: 15,       // Ajouté
    customScale: 100,     // Ajouté
    setScale: 100,        // Ajouté
    questionResults: Array(20).fill(0).map((_, i) => ({
      id: i+1,
      correct: i < 15,
      category: i < 10 ? "Algebra" : "Geometry",
      type: QuestionType.MULTIPLE_CHOICE
    })),
    questions: Array(20).fill(0).map((_, i) => ({
      id: i+1,
      question: `Question ${i+1}`,
      correctAnswer: `Answer ${i+1}`,
      type: QuestionType.MULTIPLE_CHOICE,
      category: i < 10 ? "Algebra" : "Geometry"
    })),
    errorAnalysis: Array(5).fill(0).map((_, i) => ({
      questionId: 16+i,
      studentAnswer: "Wrong answer",
      explanation: "Incorrect method used",
      improvementTip: "Review chapter 5"
    })),
    weaknessCategories: ["Algebra"],
    strengthCategories: ["Geometry"],  // Ajouté
    previousScores: [60, 65, 70]
  };

// Fonction de test
async function testPDFGeneration() {
  try {
    console.log("Début du test de génération PDF...");
    const pdfBlob = await generateProfessionalPDF(testData);
    console.log("PDF généré avec succès !");
    
    // Créer un lien de téléchargement
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-report.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Échec de la génération PDF:", error);
  }
}

// Exécuter le test
testPDFGeneration();