import { Question, QuizData, QuestionType } from "@/lib/types";

export const grade1ELAQuestions: Question[] = [
  {
    id: 1,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "What is the biggest state in America?",
    options: ["Juneau", "Texas", "New York", "Alaska"],
    correctAnswer: "Alaska",
    category: "Reading Comprehension", 
    passage:
      "Facts About Alaska\n\nThere are fifty states in America. The biggest of the fifty states is Alaska. The capital of Alaska is Juneau. The capital is named after Joe Juneau. Joe Juneau came to Alaska in search of gold.\nPeople who live in or visit Alaska might see animals such as moose, bears, eagles and whales. They might also see glaciers and lots of snow. In fact many people who live in Alaska use to the snow to make ice cream. They mix different types of berries with the snow and seal oil to make the ice cream.",
  },
  {
    id: 2,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "What can you make using the snow in Alaska?",
    options: ["Snowman", "Ice cream", "Seal oil", "Gold"],
    correctAnswer: "Ice cream",
    category: "Reading Comprehension", 
  },
  {
    id: 3,
    type: QuestionType.TEXT,
    question: "How many states are there in America?",
    correctAnswer: "fifty",
    category: "Reading Comprehension", 
  },
  {
    id: 4,
    type: QuestionType.TEXT,
    question: "Who was Joe Juneau?",
    correctAnswer: ["He came to Alaska in search of gold", "A person who came to Alaska looking for gold"],
    category: "Reading Comprehension", 
  },
  {
    id: 5,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "Who went to the park with Rubert?",
    options: ["Mom", "Dad", "Rubert", "Sam"],
    correctAnswer: "Sam",
    category: "Reading Comprehension", 
    passage:
      "Sam's Yellow Dog\n\nSam had a yellow dog name Rubert. Everyday Rubert would lick Sam when he came home from school. Then they would go to the living room and watch cartoon. After the cartoon show, Sam would go to his room to do his homework. Rubert would follow Sam into his room. After homework Sam and Rubert would go to the park. Rubert loved going to the park. When Sam and Rubert finished playing in the park, they would walk back home for dinner. Sam ate his food at the dinner table. Rubert ate his dog food from his food bowl. After dinner Sam would get ready for bed. Once in bed, dad would read Sam and Rupert a bedtime story. As dad read the story, Sam and Rupert fell asleep.",
  },
  {
    id: 6,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "Who reads a bedtime story to Rupert?",
    options: ["Dad", "Mom", "Rubert", "Sam"],
    correctAnswer: "Dad",
    category: "Reading Comprehension", 
  },
  {
    id: 7,
    type: QuestionType.TEXT,
    question: "What is this story about?",
    correctAnswer: ["Sam and his dog Rubert", "A boy and his dog"],
    category: "Reading Comprehension", 
  },
  {
    id: 8,
    type: QuestionType.TEXT,
    question: "Why did Rubert lick Sam?",
    correctAnswer: ["When Sam came home from school", "To greet him after school"],
    category: "Reading Comprehension", 
  },
  {
    id: 9,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "Pick the correct word",
    options: ["Donkey", "Dog", "Duck", "Dig"],
    correctAnswer: "Duck",
    image: "https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "Reading Comprehension", 
  },
  {
    id: 10,
    type: QuestionType.FILL_IN_BLANK,
    question: "Fill in the missing letters.",
    blanks: ["A duck can fly with his wi__gs.", "A cat has fo__ legs."],
    correctAnswer: ["wings", "four"],
    category: "Reading Comprehension", 
  },
  {
    id: 11,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "Which word has a long i?",
    options: ["nine", "into", "it", "pizza"],
    correctAnswer: "nine",
    category: "Reading Comprehension", 
  },
  {
    id: 12,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "Which word has a long a?",
    options: ["read", "apple", "road", "rake"],
    correctAnswer: "rake",
    category: "Reading Comprehension", 
  },
  {
    id: 13,
    type: QuestionType.FILL_IN_BLANK,
    question: "Write the contractions of the words below.",
    blanks: ["Do not: ________", "Can not: ________", "I will: ________", "Was not: ________"],
    correctAnswer: ["don't", "can't", "I'll", "wasn't"],
    category: "Reading Comprehension", 
  },
  {
    id: 14,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "Which word has a short vowel?",
    options: ["cane", "belt", "cape", "bake"],
    correctAnswer: "belt",
    category: "Reading Comprehension", 
  },
  {
    id: 16,
    type: QuestionType.MULTIPLE_CHOICE,
    question: "Circle the correct ending.",
    options: ["sh", "ch", "th", "ng"],
    correctAnswer: "sh",
    category: "Reading Comprehension", 
    image:
      "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
]

export const grade1ELAData = {
  grade: 1,
  subject: "ela",
  title: "Grade 1 ELA Diagnostic Assessment",
  description:
    "This assessment evaluates reading comprehension, vocabulary, and basic language skills for Grade 1 students.",
  questions: grade1ELAQuestions,
}

