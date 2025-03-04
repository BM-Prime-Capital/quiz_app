import { type Question, QuestionType } from "./types"

export function getQuestions(grade: string, subject: string): Question[] {
  // Exemple de questions pour Grade 1 ELA
  if (grade === "1" && subject === "ela") {
    return [
      {
        id: "g1-ela-1",
        number: "1",
        text: "What is the biggest state in America?",
        type: QuestionType.MULTIPLE_CHOICE,
        readingPassage: {
          title: "Facts About Alaska",
          content:
            "There are fifty states in America. The biggest of the fifty states is Alaska. The capital of Alaska is Juneau. The capital is named after Joe Juneau. Joe Juneau came to Alaska in search of gold.\n\nPeople who live in or visit Alaska might see animals such as moose, bears, eagles and whales. They might also see glaciers and lots of snow. In fact many people who live in Alaska use to the snow to make ice cream. They mix different types of berries with the snow and seal oil to make the ice cream.",
        },
        options: [
          { value: "a", label: "A. Juneau" },
          { value: "b", label: "B. Texas" },
          { value: "c", label: "C. New York" },
          { value: "d", label: "D. Alaska" },
        ],
      },
      {
        id: "g1-ela-2",
        number: "2",
        text: "What can you make using the snow in Alaska?",
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          { value: "a", label: "A. Snowman" },
          { value: "b", label: "B. Ice cream" },
          { value: "c", label: "C. Seal oil" },
          { value: "d", label: "D. Gold" },
        ],
      },
      {
        id: "g1-ela-3",
        number: "3",
        text: "How many states are there in America?",
        type: QuestionType.TEXT,
      },
      {
        id: "g1-ela-4",
        number: "4",
        text: "Who was Joe Juneau?",
        type: QuestionType.TEXT,
      },
    ]
  }

  // Exemple de questions pour Grade 1 Math
  if (grade === "1" && subject === "math") {
    return [
      {
        id: "g1-math-1",
        number: "1",
        text: "Draw a circle on the object that is different in each group",
        type: QuestionType.DRAWING,
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "g1-math-2",
        number: "2",
        text: "How many hearts in all?",
        type: QuestionType.MULTIPLE_CHOICE,
        image: "/placeholder.svg?height=150&width=300",
        options: [
          { value: "a", label: "A. 3" },
          { value: "b", label: "B. 2" },
          { value: "c", label: "C. 7" },
          { value: "d", label: "D. 5" },
        ],
      },
      {
        id: "g1-math-3",
        number: "3",
        text: "Draw the shape that comes next in the pattern",
        type: QuestionType.DRAWING,
        image: "/placeholder.svg?height=150&width=300",
      },
      {
        id: "g1-math-4",
        number: "4",
        text: "Write the missing numbers (on grade level)",
        type: QuestionType.TEXT,
        image: "/placeholder.svg?height=100&width=300",
      },
      {
        id: "g1-math-5",
        number: "5",
        text: "Draw a line from each number to the matching group of objects",
        type: QuestionType.DRAWING,
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "g1-math-6",
        number: "6",
        text: "Draw a circle around the third one in each row",
        type: QuestionType.DRAWING,
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "g1-math-7",
        number: "7",
        text: "3 + 2 = ?",
        type: QuestionType.MULTIPLE_CHOICE,
        image: "/placeholder.svg?height=100&width=300",
        options: [
          { value: "a", label: "A. 3" },
          { value: "b", label: "B. 1" },
          { value: "c", label: "C. 2" },
          { value: "d", label: "D. 5" },
        ],
      },
      {
        id: "g1-math-8",
        number: "8",
        text: "Circle the correct amount of money",
        type: QuestionType.MULTIPLE_CHOICE,
        image: "/placeholder.svg?height=150&width=300",
        options: [
          { value: "a", label: "A. 2 ¢" },
          { value: "b", label: "B. 5 ¢" },
          { value: "c", label: "C. 1 ¢" },
          { value: "d", label: "D. $1" },
        ],
      },
    ]
  }

  // Pour les autres grades, vous pouvez ajouter des questions similaires
  // Ceci est juste un exemple de base
  return [
    {
      id: `${grade}-${subject}-1`,
      number: "1",
      text: "Question d'exemple pour Grade " + grade + " " + subject.toUpperCase(),
      type: QuestionType.MULTIPLE_CHOICE,
      options: [
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
        { value: "d", label: "Option D" },
      ],
    },
  ]
}

