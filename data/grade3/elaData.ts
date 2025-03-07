export interface Question {
    id: number
    type: "multiple-choice" | "text" | "writing" | "matching" | "fill-in" | "word-sort"
    question: string
    options?: string[]
    correctAnswer?: string | string[]
    blanks?: string[]
    passage?: string
    columns?: {
      title: string
      items: string[]
    }[]
  }
  
  export const grade3ELAQuestions: Question[] = [
    {
      id: 1,
      type: "multiple-choice",
      question: "How are rainbows made?",
      options: [
        "When Ix Chel stands in the sky",
        "When sunlight passes through raindrops",
        "When a goddess sews the sky",
        "When different colored bird fly across the sky",
      ],
      correctAnswer: "When sunlight passes through raindrops",
      passage: `Rainbow
  
  Have you ever looked in the sky and saw a rainbow? Have you ever wondered how it got there? Throughout history people from different parts of the world have tried to explain why rainbows appear in the sky. Starting with ancient people, the Greeks thought rainbows connected the earth to heaven. The ancient Chinese believed that the rainbow was a rip in the sky sewn up by a goddess. The Mayans believed that the rainbow was a sign that the goddess Ix Chel was standing in the sky. The stories created by the ancient people are called myths. These myths helped them explain things such as rainbows.
  
  Today we no longer rely on myths to explain what we see in nature. We now have science. Science tells us that rainbows are made when sunlight passes though raindrops. Sunlight may look white but is made of seven colors. The colors are red, orange, yellow, green, blue, indigo, and violet. When all these colors mix, they make white light. When it rains, the raindrops bend the sunlight and allow all the color to appear.`,
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What are myths?",
      options: [
        "The scientific method",
        "Stories that explain how rainbows are made",
        "Stories created by the ancient people to explain things",
        "Short stories",
      ],
      correctAnswer: "Stories created by the ancient people to explain things",
    },
    {
      id: 3,
      type: "text",
      question: "Why do we no longer use myths?",
    },
    {
      id: 4,
      type: "text",
      question: "What are the colors of the rainbow?",
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "What was the story mostly about?",
      options: [
        "The Oregon Country Fair",
        "Learning how to dance",
        "Emily overcoming her nervousness",
        "Emily wining third place at the country fair",
      ],
      correctAnswer: "Emily overcoming her nervousness",
      passage: `Emily's First Dance
  
  Every year Emily and her family went to the Oregon Country Fair. The country fair was a big thing in Oregon. People dressed in silly outfits, from every part of the state, came to the fair.
  
  At the fair there are many things to do. You can get your face painted, buy food and of course dance. The part most people liked the best was dancing at the country fair. As soon as the sun went down the music would begin to play, and the dancing would start.
  
  Emily was always too shy to dance. She would always watch her family and everyone else at the fair dance. Her mother would try to bring her into the crowd of dancing people, but Emily would turn red and walk away.
  
  This year was different. Emily was practicing her dancing movements each day when she came home for school. Her brother helped her learn the steps to the dance. Finally, when the day of the fair came, Emily decided she was going to dance with everyone this year.
  
  When the music turned on she became really nervous, but then her brother grabbed her hand. They began to dance and Emily became less nervous. The more she danced, the more confident she felt. Emily ended up dancing with everyone she knew and won third place at the dance competition.`,
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "What word best describes Emily at the end of the story?",
      options: ["Nervous", "Brave", "Shy", "Angry"],
      correctAnswer: "Brave",
    },
    {
      id: 7,
      type: "text",
      question: "Why did the author most likely write this story?",
    },
    {
      id: 8,
      type: "text",
      question: "What will happen if Emily continues to practice dancing and participating in the dance competition?",
    },
    {
      id: 9,
      type: "fill-in",
      question: "Write the antonym for each word:",
      blanks: ["Hot: _____", "Big: _____"],
      correctAnswer: ["cold", "small"],
    },
    {
      id: 10,
      type: "matching",
      question: "Connects the words that are homonyms.",
      columns: [
        {
          title: "Column 1",
          items: ["Know", "Meet", "Too", "Flower"],
        },
        {
          title: "Column 2",
          items: ["Two", "Flour", "No", "Meat"],
        },
      ],
    },
    {
      id: 11,
      type: "multiple-choice",
      question: "Replace the bold word in the sentence: My sister can imitate the sound of a monkey",
      options: ["Hear", "Copy", "Quiver", "Sing"],
      correctAnswer: "Copy",
    },
    {
      id: 12,
      type: "fill-in",
      question: "Choose the correct word for the given sentence: Tom went to the store, _____ bought milk",
      blanks: ["then/than"],
      correctAnswer: ["then"],
    },
    {
      id: 13,
      type: "matching",
      question: "Match the sense with the sensory word:",
      columns: [
        {
          title: "Senses",
          items: ["Hear", "Smell", "Touch", "Taste"],
        },
        {
          title: "Words",
          items: ["Bang! Bang!", "Sour", "Smelly", "Soft"],
        },
      ],
    },
    {
      id: 14,
      type: "multiple-choice",
      question: "Which words are Onomatopoeias?",
      options: ["Splash", "Snake", "Hiss", "Water"],
      correctAnswer: "Splash",
    },
    {
      id: 15,
      type: "fill-in",
      question: "Change each word to its plural form. Write the word on the line.",
      blanks: ["During autumn the _____ change colors. (leaf)", "The mother cat has four _____. (baby)"],
      correctAnswer: ["leaves", "babies"],
    },
    {
      id: 16,
      type: "word-sort",
      question: "Write each word under the correct heading:",
      columns: [
        {
          title: "Prefix",
          items: ["Rewrite", "Outside", "Import"],
        },
        {
          title: "Suffix",
          items: ["Happiness", "Thankful", "Headphone"],
        },
      ],
    },
    {
      id: 17,
      type: "writing",
      question: "What do you want for your birthday? Explain why.",
    },
  ]
  
  export const grade3ELAData = {
    grade: 3,
    subject: "ela",
    title: "Grade 3 ELA Diagnostic Assessment",
    description:
      "This assessment evaluates reading comprehension, vocabulary, grammar, and writing skills for Grade 3 students.",
    questions: grade3ELAQuestions,
  }
  
  