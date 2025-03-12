export interface Question {
    id: number
    type: "multiple-choice" | "text" | "writing" | "fill-in" | "grammar"
    question: string
    options?: string[]
    correctAnswer?: string | string[]
    passage?: string
    blanks?: string[]
  }
  
  export const grade4ELAQuestions: Question[] = [
    {
      id: 1,
      type: "multiple-choice",
      question: "How do monkeys use their tails?",
      options: ["To walk", "To hold things", "To swim", "To attack other animals"],
      correctAnswer: "To hold things",
      passage: `How Animals Use Their Tails
  
  Many animals rely on their tails to help them survive. Some use their tails for balance, such as monkeys in the jungle. As the monkeys walk across the branches of tall trees, they move their tail side to side to maintain balance. When swinging from tree to tree they can hold on to a nearby branch with the help of their tail. They can even hold food with their tails.
  
  Animals that live in water use their tails a bit differently. Fish use their tails to propel them through the water at high speeds. The design of their tails allows them to move smoothly and effortlessly in water. Their tails also help them escape from predators like sharks. Alligators and crocodiles use their tails to move through water as well, but they sometimes use their tails to attack other animals. They swing their tails violently and anything that gets in the way is crushed. They can even trip their prey and then bite down using their large jaws.
  
  Other animals don't really depend on their tails in any way. A bear, for example, has a very short tail that doesn't do it much good.`,
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "Why did the author write this passage?",
      options: ["To persuade the reader", "To entertain the reader", "To make fun of animals", "To inform the reader"],
      correctAnswer: "To inform the reader",
    },
    {
      id: 3,
      type: "text",
      question: "How does an alligator use its tail differently from a fish?",
    },
    {
      id: 4,
      type: "text",
      question: "Explain the difference between predator and prey.",
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "Why was Jacob able to win his first match in the tournament?",
      options: ["He cheated", "His brother helped him", "He knew his opponent well", "He is a master chess player"],
      correctAnswer: "His brother helped him",
      passage: `Jacob Enters a Chess Tournament
  
  When Jacob was 12 years old he saw his older brother playing chess with some of his friends. Jacob didn't understand the point of the game. He wanted to learn how to play so he begged his brother to teach him.
  
  "It's simple," said his brother. "All you have to do is capture the opponent's king." Jacob's brother explained that the small pieces were called pawns and were worth the least. The other pieces were the bishops, the knights, the rooks, the queen, and finally the king. Jacob quickly learned how each piece moved on the board. He had a gift for finding and taking advantage of weaknesses in the opponent's formation.
  
  After 3 months of playing with his friends and his brother, Jacob noticed a poster for a tournament at his school. He became very excited and immediately went to his brother. "I don't know if you're ready for a tournament," said Jacob's brother. "I want to see how far I've come," answered Jacob. Jacob's brother eventually agreed.
  
  Jacob was nervous. There were so many people at the tournament and every one of them looked like they had been playing for a very long time. When it was Jacob's turn to play he made a few simple mistakes at the beginning. He began to worry. Jacob's brother was right next to him and he told Jacob not to be scared. "Don't forget that you can beat me now, so these guys shouldn't be a problem," said his brother. Jacob's confidence returned and he was able to beat his opponent.`,
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "Why did Jacob make mistakes in his first match?",
      options: [
        "He didn't eat a good breakfast",
        "He didn't practice enough",
        "He felt nervous during the game",
        "He wanted to let his opponent win",
      ],
      correctAnswer: "He felt nervous during the game",
    },
    {
      id: 7,
      type: "text",
      question: "Describe Jacob's relationship with his brother.",
    },
    {
      id: 8,
      type: "text",
      question: "Why did Jacob enter the tournament?",
    },
    {
      id: 9,
      type: "fill-in",
      question: "Write the plural form of the following words:",
      blanks: ["Man: _____", "Mouse: _____", "Child: _____", "Tooth: _____"],
      correctAnswer: ["Men", "Mice", "Children", "Teeth"],
    },
    {
      id: 10,
      type: "grammar",
      question: "Correct this sentence: We saw sams book on the table so we decided to return it to him",
      correctAnswer: "We saw Sam's book on the table, so we decided to return it to him.",
    },
    {
      id: 11,
      type: "multiple-choice",
      question: "Which word should be capitalized in this sentence? The telescope made the planet saturn look huge.",
      options: ["telescope", "saturn", "huge", "none of the above"],
      correctAnswer: "saturn",
    },
    {
      id: 12,
      type: "multiple-choice",
      question: "What is the subject of this sentence? Sally gave her dog the bone to chew on.",
      options: ["Sally", "Dog", "Bone", "Gave"],
      correctAnswer: "Sally",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "Choose the best word to complete the sentence below. John was _____ when he saw a group of bulls charging at him.",
      options: ["sad", "frightened", "thankful", "excited"],
      correctAnswer: "frightened",
    },
    {
      id: 14,
      type: "grammar",
      question: "Correct the following sentence: The group of fourth graders were going to the park.",
      correctAnswer: "The group of fourth graders was going to the park.",
    },
    {
      id: 15,
      type: "multiple-choice",
      question: "What is the past tense of the verb to bring?",
      options: ["Bring", "Bringed", "Brought", "Brung"],
      correctAnswer: "Brought",
    },
    {
      id: 16,
      type: "multiple-choice",
      question: "What does the word vile mean in this sentence? The killer was a vile man who hurt innocent people.",
      options: ["Friendly", "Evil", "Strange"],
      correctAnswer: "Evil",
    },
    {
      id: 17,
      type: "writing",
      question:
        "Do you think TV has a positive or a negative influence on children? In your essay, be sure to include examples to support your position.",
    },
  ]
  
  export const grade4ELAData = {
    grade: 4,
    subject: "ela",
    title: "Grade 4 ELA Diagnostic Assessment",
    description:
      "This assessment evaluates reading comprehension, vocabulary, grammar, and writing skills for Grade 4 students.",
    questions: grade4ELAQuestions,
  }
  
  