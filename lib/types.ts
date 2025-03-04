export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  TEXT = "text",
  DRAWING = "drawing",
}

export interface Option {
  value: string
  label: string
}

export interface ReadingPassage {
  title: string
  content: string
}

export interface Question {
  id: string
  number: string
  text: string
  type: QuestionType
  options?: Option[]
  image?: string
  readingPassage?: ReadingPassage
}

