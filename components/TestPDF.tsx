import { generateProfessionalPDF } from '../lib/report-generation-large';
import { QuestionType } from '../lib/types';

export default function TestPDF() {
  const testData = {
    studentName: "Test Student",
    grade: "5",
    subject: "math",
    date: new Date(),
    percentageScore: 75,
    score: 15,
    totalQuestions: 20,
    timeSpent: 45,
    unusedTime: 15,
    customScale: 100,
    setScale: 100,
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
    strengthCategories: ["Geometry"],
    previousScores: [60, 65, 70]
  };

  const handleClick = async () => {
    try {
      console.log("Génération du PDF en cours...");
      const pdfBlob = await generateProfessionalPDF(testData);
      
      // Création d'un lien de téléchargement
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'test-report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      console.log("PDF généré avec succès!");
    } catch (error) {
      console.error("Erreur de génération:", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test PDF Generator</h1>
      <button 
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Générer le PDF Test
      </button>
      <p>Vérifiez la console pour les logs et votre dossier Téléchargements.</p>
    </div>
  );
}