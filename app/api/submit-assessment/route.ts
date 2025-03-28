// app/api/submit-assessment/route.ts
import { NextResponse } from "next/server";
import { calculateScore } from "@/lib/score-calculation";
import { generateProfessionalPDF } from "@/lib/report-generation";
import { sendEmail } from "@/lib/email-service";
import { Question, QuestionType, QuestionResult } from "@/lib/types";

export async function POST(req: Request) {
  console.log("Submit assessment API called");

  const requestId = Math.random().toString(36).substring(2, 8);
  console.log(`[${requestId}] Submit assessment API called at ${new Date().toISOString()}`);

  try {
    const payload = await req.json();
    console.log("Received payload:", payload);

    const { studentName, grade, subject, answers, startTime, endTime, teacherEmail } = payload;

    // Validation des données requises
    if (!grade || !subject || !answers || !studentName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Import dynamique sécurisé des questions
    let questions: Question[] = [];
    try {
      if (grade === "1" && subject === "ela") {
        const module = await import("@/data/grade1/elaData");
        
        questions = module.grade1ELAQuestions.map(q => {
          const baseQuestion: Question = {
            id: q.id,
            question: q.question,
            type: convertToQuestionType(q.type),
            correctAnswer: q.correctAnswer,
            category: q.category || 'General'
          };

          if (q.options) {
            baseQuestion.options = q.options;
          }
          if (q.image) baseQuestion.image = q.image;
          if (q.passage) baseQuestion.passage = q.passage;
          if (q.blanks) baseQuestion.blanks = q.blanks;

          return baseQuestion;
        });
      }

      if (!questions || questions.length === 0) {
        throw new Error(`No questions found for grade ${grade} ${subject}`);
      }

      console.log(`Loaded ${questions.length} questions for grade ${grade} ${subject}`);
    } catch (importError) {
      console.error("Failed to load questions:", importError);
      return NextResponse.json(
        { error: "Failed to load assessment data. Please check the grade and subject." },
        { status: 500 }
      );
    }

    // Calcul du score
    const score = calculateScore(questions, answers);
    const percentageScore = Math.round((score / questions.length) * 100);
    console.log(`Calculated score: ${score}/${questions.length} (${percentageScore}%)`);

    // Calcul du temps passé
    const timeSpent = startTime && endTime 
      ? Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000)
      : 0;

    // Préparation des résultats
    const questionResults: QuestionResult[] = questions.map(question => ({
      id: question.id,
      correct: question.correctAnswer 
        ? JSON.stringify(answers[question.id]) === JSON.stringify(question.correctAnswer)
        : false,
      studentAnswer: answers[question.id] ?? (question.type === QuestionType.FILL_IN_BLANK ? [] : ''),
      correctAnswer: question.correctAnswer ?? (question.type === QuestionType.FILL_IN_BLANK ? [] : ''),
      category: question.category || 'General'
    }));


    const pdfBuffer = await generateProfessionalPDF({
      studentName,
      grade,
      subject,
      date: new Date(),
      percentageScore,
      score,
      totalQuestions: questions.length,
      timeSpent,
      unusedTime: 0,
      customScale: percentageScore / 20,
      setScale: 3.4,
      questionResults,
      strengthCategories: Array.from(new Set(
        questionResults.filter(r => r.correct).map(r => r.category)
      )), // Parenthèse fermante ajoutée
      weaknessCategories: Array.from(new Set(
        questionResults.filter(r => !r.correct).map(r => r.category)
      )), // Parenthèse fermante ajoutée
      questions: questions.map(q => ({
        id: q.id,
        question: q.question,
        correctAnswer: q.correctAnswer ?? '',
        type: q.type,
        category: q.category || 'General'
      }))
    }); // Fermeture correcte de l'objet

    // Envoi d'email avec fallback et gestion d'erreur
    let emailSent = false;
    let emailError = null;
    let emailResponse = null;

    try {
      console.log("Attempting to send email...");
      
      // Conversion du Blob en base64 (solution Node.js)
      const pdfArrayBuffer = await pdfBuffer.arrayBuffer();
      const pdfBase64 = Buffer.from(pdfArrayBuffer).toString('base64');
      
      emailResponse = await sendEmail({
        to: [
          teacherEmail || "barahenock@gmail.com",
          "brice@bmprimecapital.com",
          "henock_b@bmprimecapital.com",
          "development_team@bmprimecapital.com"
        ].filter(Boolean).join(', '), // Convertit le tableau en string séparée par virgules
        subject: `Assessment Results - ${studentName}`,
        text: `Please find attached the assessment results for ${studentName}`,
        html: `<p>Please find attached the assessment results for ${studentName}</p>`,
        attachments: [{
          filename: `results-${studentName}.pdf`,
          content: pdfBase64,
          contentType: 'application/pdf',
          encoding: 'base64'
        }]
      });

      emailSent = emailResponse.success;
      if (!emailSent) {
        emailError = emailResponse.error;
        console.error("Email sending failed:", emailError);
      }
    } catch (emailErr) {
      emailError = emailErr instanceof Error ? emailErr.message : "Unknown email error";
      console.error("Email error:", emailError);
      
      // Enregistrer le rapport localement si l'email échoue
      await saveReportLocally(studentName, pdfBuffer);
    }

    return NextResponse.json({
      success: true,
      score,
      percentageScore,
      emailSent,
      emailError: emailError || undefined,
      localCopySaved: !emailSent,
      message: emailSent 
        ? "Results submitted successfully" 
        : "Results saved locally (email failed)"
    });

  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Unknown error occurred",
        success: false 
      },
      { status: 500 }
    );
  }
}

// Fonction pour sauvegarder localement en cas d'échec d'envoi
async function saveReportLocally(studentName: string, pdfBuffer: Blob) {
  try {
    // Convertir en buffer Node.js
    const arrayBuffer = await pdfBuffer.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Écrire dans le système de fichiers (exemple avec fs)
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const reportsDir = path.join(process.cwd(), 'reports');
    await fs.mkdir(reportsDir, { recursive: true });
    
    const filePath = path.join(reportsDir, `report-${studentName}-${Date.now()}.pdf`);
    await fs.writeFile(filePath, buffer);
    
    console.log(`Report saved locally at: ${filePath}`);
    return true;
  } catch (err) {
    console.error("Failed to save report locally:", err);
    return false;
  }
}

// Fonction helper pour convertir les types de questions
function convertToQuestionType(type: string): QuestionType {
  switch (type) {
    case "multiple-choice": return QuestionType.MULTIPLE_CHOICE;
    case "text": return QuestionType.TEXT;
    case "drawing": return QuestionType.DRAWING;
    case "fill-in-blank": return QuestionType.FILL_IN_BLANK;
    case "matching": return QuestionType.MATCHING;
    case QuestionType.PATTERN : return QuestionType.PATTERN;
    default: return QuestionType.TEXT;
  }
}