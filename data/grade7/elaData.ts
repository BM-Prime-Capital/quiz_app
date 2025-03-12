export interface Question {
    id: number
    type: "multiple-choice" | "text" | "writing" | "grammar"
    question: string
    options?: string[]
    correctAnswer?: string | string[]
    passage?: string
  }
  
  export const grade7ELAQuestions: Question[] = [
    {
      id: 1,
      type: "multiple-choice",
      question: "How did Sally's love for sports help her become an astronaut?",
      options: [
        "All astronauts should play tennis to do well",
        "Playing sports kept Sally away from drugs",
        "Playing sports gave Sally the opportunity to attend the high school where she discovered her love for science",
        "All astronauts love tennis",
      ],
      correctAnswer:
        "Playing sports gave Sally the opportunity to attend the high school where she discovered her love for science",
      passage: `Sally Ride The Astronaut
  
  Sally Ride is known best as the first American woman to travel in space. She accomplished this amazing feat on June 18, 1983. During her space mission, she was able to place three satellites over different parts of the world and conduct science projects. Her accomplishment is not only appreciated by the science world, but also by women everywhere. She was a role model for the girls of her generation who were trying to pursue their dreams.
  
  Sally was born on May 26, 1951. She was always regarded as an active child. She loved playing sports such as soccer, softball and tennis. Her achievements in tennis led to a scholarship to a private high school. In high school she discovered her love for science. Her love for tennis continued in college, where she played tennis and studied science. Sally graduated from Stanford University with a degree in English and Physics. She went on to receive a PhD in Astrophysics.
  
  Her interest in becoming an astronaut came about while looking for a job. She put her name down for NASA's shuttle program. She was among the 208 finalists. Then, in January 1978 Sally was selected to be one of the 35 astronaut candidates. All the candidates underwent a one year training process. From these candidates, Sally Ride and her future husband Steven Hawley were chosen. On June 18, 1983, she became the first American woman in space. She was a crew member on Space Shuttle Challenger. The overall mission went smoothly. The flight itself lasted six days and within this time frame satellites were launched over Canada, Indonesia, and Germany.`,
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What was the first step Sally took to become an astronaut?",
      options: [
        "Pursue a science degree in college",
        "Earn a PhD",
        "Apply for the shuttle program",
        "Undergo one year training, once she was a finalist",
      ],
      correctAnswer: "Apply for the shuttle program",
    },
    {
      id: 3,
      type: "text",
      question: "What word would you use to describe Sally Ride? Explain",
    },
    {
      id: 4,
      type: "text",
      question: "Why did the author write this story?",
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "What was this story mostly about?",
      options: [
        "The danger of rattlesnakes",
        "Max's first camping trip",
        "Getting along with relatives",
        "Uncle Robert teaching Max about snakes",
      ],
      correctAnswer: "Max's first camping trip",
      passage: `Into The Wild
  
  The night was cold but not foggy. Even though it was pitch black, Max could smell the pine trees that were around the campsite. This was his first night outside of his hometown and worst of all he was in the woods. Max thought to himself, as he sat next to the campfire, "Why did I ever agree to go on this trip?" Then he remembered, it was to spend time with uncle Robert. Uncle Robert only visits Max two times a year, and this year he decided that it would be fun for him and Max to go camping.
  
  Uncle Robert came next to Max and asked him if he was hungry. Max nodded his head. Uncle Robert began to cook hotdogs and beans in the campfire. The smell of the food made Max forget about his sadness. When he took his first bite of the food, he realized how hungry he was and how good camp food tastes. Max decided that there is something magical in that campfire that makes the food taste good. His cousin, June, laughed at Max and said, "You are delusional, Max. What you are saying can't be true."
  
  The next morning uncle Robert, June, and Max went hiking to see the view. Max had never been hiking before and was struggling to keep up. Plus the heavy backpack was not helping. All of a sudden Max heard a rattling sound. Max told June but she told Max that he was again being delusional. But then all three of them heard the rattling noise and saw a rattlesnake. June and Max screamed, but uncle Robert calmed them down. He pointed at the snake's mouth and said, "There is a field mouse in its mouth. It will take the snake a few days to digest it. So, the rattlesnake is no harm to us at the moment." After June and Max heard this, they slowly walked away.`,
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "What does the word delusional mean?",
      options: ["Having unrealistic beliefs", "Seeing things that are not there", "To be liminal", "Being nervous"],
      correctAnswer: "Having unrealistic beliefs",
    },
    {
      id: 7,
      type: "text",
      question: "If the author added a paragraph at the end of this story, what would it include?",
    },
    {
      id: 8,
      type: "text",
      question: "What words would you use to describe Max? Explain.",
    },
    {
      id: 9,
      type: "multiple-choice",
      question:
        "In which sentence does the underlined word have the same meaning as in the sentence below: How will the town recover from the hurricane?",
      options: [
        "Tim got some fabric to recover the bed sheet",
        "Bob will recover from the accident soon",
        "How will they recover the stole item?",
        "He can recover useful material from junk",
      ],
      correctAnswer: "Bob will recover from the accident soon",
    },
    {
      id: 10,
      type: "multiple-choice",
      question: "What does the underlined word mean in the sentence below: We camped in the grotto under the cliffs",
      options: ["A tree", "A hut", "A large rock", "A cave"],
      correctAnswer: "A cave",
    },
    {
      id: 11,
      type: "grammar",
      question:
        "Insert commas where they are needed: The first wedding in China the marriage of Yumi Lin and Xin Lee took place in 25 B.C.",
      correctAnswer: "The first wedding in China, the marriage of Yumi Lin and Xin Lee, took place in 25 B.C.",
    },
    {
      id: 12,
      type: "grammar",
      question:
        "Identify what is underlined as either a phrase or clause: When he was eight years old, he moved to Bronx, New York.",
      correctAnswer: "clause",
    },
    {
      id: 13,
      type: "grammar",
      question:
        "Read the sentence and state whether it is a compound sentence or not: Lions and cats have the same number of whiskers—seven.",
      correctAnswer: "Not a compound sentence",
    },
    {
      id: 14,
      type: "grammar",
      question:
        "Join these independent clauses using a coordinating conjunction or semicolon: We can wait for Jim. We can leave without him.",
      correctAnswer: [
        "We can wait for Jim, or we can leave without him.",
        "We can wait for Jim; we can leave without him.",
      ],
    },
    {
      id: 15,
      type: "grammar",
      question:
        "Rewrite the run on sentence: The members of congress are elected by the voters there are six thousand voters this year.",
      correctAnswer: "The members of congress are elected by the voters. There are six thousand voters this year.",
    },
    {
      id: 16,
      type: "grammar",
      question:
        'Underline each word that should be capitalized in the sentence: james said, "what time does pokemon start?"',
      correctAnswer: 'James said, "What time does Pokemon start?"',
    },
    {
      id: 17,
      type: "writing",
      question: "Compare and contrast the music you like and the music your parents like.",
    },
  ]
  
  export const grade7ELAData = {
    grade: 7,
    subject: "ela",
    title: "Grade 7 ELA Diagnostic Assessment",
    description:
      "This assessment evaluates reading comprehension, vocabulary, grammar, and writing skills for Grade 7 students.",
    questions: grade7ELAQuestions,
  }
  
  