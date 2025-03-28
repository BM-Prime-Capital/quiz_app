// lib/types.ts

export enum QuestionType {
  MULTIPLE_CHOICE = "multiple-choice",
  TEXT = "text",
  DRAWING = "drawing",
  FILL_IN_BLANK = "fill-in-blank",
  MATCHING = "matching",
  FRACTION = "fraction",
  PATTERN = "pattern",
  CLOCK = "clock",
  COMPARISON = "comparison",
  IMAGE_CHOICE = "image-choice",
  WRITING = "writing",
  FILL_IN = "fill-in",  
  WORD_SORT = "word-sort",
  GRAMMAR = "grammar"
}


// export interface Question {
//   id: number;
//   type: QuestionType;
//   question: string;
//   options?: string[];
//   correctAnswer?: string | string[] | Record<number, number>;
//   image?: string;
//   passage?: string;
//   blanks?: string[];
//   columns?: [Column, Column];
//   category?: string;
//   isDrawing?: boolean;
//   comparisonValues?: string[];
//   fractionQuestion?: boolean;
//   drawingQuestion?: boolean;
  
// }

// export interface Column {
//   title: string;
//   items: string[];
// }

export interface Column {
  title: string;
  items: string[];
}

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  
  // Propriétés communes optionnelles
  image?: string;
  passage?: string;
  category?: string;
  isDrawing?: boolean;
  drawingQuestion?: boolean;
  
  // Propriétés conditionnelles par type
  options?: string[]; // Pour MULTIPLE_CHOICE, IMAGE_CHOICE
  
  correctAnswer?: 
    | string // Pour MULTIPLE_CHOICE, TEXT simple
    | string[] // Pour FILL_IN_BLANK, TEXT avec multiples réponses
    | Record<number, number> // Pour MATCHING (ex: {0: 1, 1: 2})
    | { numerator: string; denominator: string }; // Pour FRACTION
  
  blanks?: string[]; // Pour FILL_IN_BLANK
  columns?: [Column, Column]; // Pour MATCHING
  comparisonValues?: string[]; // Pour COMPARISON
}

// Helpers de type
export function isMatchingQuestion(q: Question): q is Question & {
  type: QuestionType.MATCHING;
  columns: [Column, Column];
  correctAnswer: Record<number, number>;
} {
  return q.type === QuestionType.MATCHING;
}

export function isFractionQuestion(q: Question): q is Question & {
  type: QuestionType.FRACTION;
  correctAnswer: { numerator: string; denominator: string };
} {
  return q.type === QuestionType.FRACTION;
}



export interface QuestionResult {
  id: number;
  correct: boolean;
  studentAnswer: string | string[] | Record<number, number> | FractionAnswer;
  correctAnswer: string | string[] | Record<number, number> | FractionAnswer;
  category: string;
}

interface FractionAnswer {
  numerator: string;
  denominator: string;
}

export interface QuizData {
  grade: number;
  subject: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface AssessmentResult {
  studentName: string;
  grade: string;
  subject: string;
  date: string;
  score: number;
  percentageScore: number;
  timeSpent: number;
  questionResults: QuestionResult[];
  strengthCategories: string[];
  weaknessCategories: string[];
}