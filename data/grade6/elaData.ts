export interface Question {
    id: number
    type: "multiple-choice" | "text" | "writing" | "grammar"
    question: string
    options?: string[]
    correctAnswer?: string | string[]
    passage?: string
  }
  
  export const grade6ELAQuestions: Question[] = [
    {
      id: 1,
      type: "multiple-choice",
      question: "What is lightning?",
      options: ["It occurs because of Zeus", "A rod of fire", "The effect of God sneezing", "A large electrical current"],
      correctAnswer: "A large electrical current",
      passage: `Franklin's Experiment
  
  People often associate the discovery of electricity with Benjamin Franklin. We envision Franklin braving a thunderstorm with a small kite that gets struck by lightning. The fact of the matter is that Franklin did not actually discover electricity; he merely showed us that lightning was made of it.
  
  Although lightning did not actually strike Franklin's kite, he was able to determine that the air around him was electrically charged during the thunderstorm. He had a silk kite with a metal key at the end of it. The metal key could attract the electrical charges in the surrounding air. The silk fibers began to stand, giving the impression that they were charged. Imagine how a person's hair stands up after they receive an electrical shock. Because the fibers stood up only during the thunderstorm, Franklin concluded that lightning was just a large electrical current.
  
  Benjamin Franklin was a very curious man who did not allow fear to get in the way of his search for knowledge. Thanks to Benjamin Franklin's curiosity, we now know much more about the nature of electricity.`,
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What do you think happened when Benjamin Franklin touched the key?",
      options: ["He was struck by lightning", "His hand got burned", "He felt a shock", "Nothing happened"],
      correctAnswer: "He felt a shock",
    },
    {
      id: 3,
      type: "text",
      question: "What was the purpose of Franklin's experiment?",
    },
    {
      id: 4,
      type: "text",
      question: "Why did Franklin attach a key to the end of his kite?",
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "What is the purpose of the passage?",
      options: [
        "To inform the reader about parks",
        "To instruct the reader on how to make parks",
        "To persuade the reader that parks are a good place for kids",
        "To show that kids are very active",
      ],
      correctAnswer: "To persuade the reader that parks are a good place for kids",
      passage: `Parks for Kids
  
  Kids your age are full of energy. They tend to play games with their friends whenever they get a chance. If kids have a decent park with proper facilities, they can spend their time there playing sports such as basketball and football.
  
  Parks offer many advantages for children which we sometimes take for granted. They are a safe environment in which children can meet new people and make new friends. Instead of playing in the streets, kids can play in the park, a location the parents are familiar with. If kids are having fun with their friends in a park, they may be saved from negative influences such as drugs. Having a place to socially engage with peers prevents kids from spending too much time watching TV or using the computer. Problems such as obesity can be avoided if children stay constantly active.
  
  Parks can also strengthen the community. Parents of children can come with them to the parks and speak with other members of the community. As the children develop closer friendships the parents may start to become friendlier towards each other.`,
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "What is one bad influence for kids mentioned in the passage?",
      options: ["Fighting", "Drugs", "Alcohol", "Smoking"],
      correctAnswer: "Drugs",
    },
    {
      id: 7,
      type: "text",
      question: "What are some advantages of parks?",
    },
    {
      id: 8,
      type: "text",
      question: "Why would the community be strengthened because of parks?",
    },
    {
      id: 9,
      type: "multiple-choice",
      question: "What is the subject of this sentence? Sally's dog jumped over the obstacle.",
      options: ["Sally", "Dog", "Obstacle", "None of the above"],
      correctAnswer: "Dog",
    },
    {
      id: 10,
      type: "multiple-choice",
      question: "Which underlined part is incorrect? Cleopatra discovers gold in the hidden chamber a week ago.",
      options: ["Discovers", "Hidden", "Week", "None of the above"],
      correctAnswer: "Discovers",
    },
    {
      id: 11,
      type: "multiple-choice",
      question: "Take out the trash Bruno. What type of sentence is this?",
      options: ["Exclamatory", "Interrogative", "Imperative", "Declarative"],
      correctAnswer: "Imperative",
    },
    {
      id: 12,
      type: "grammar",
      question: "Correct the following sentence: alexander was a great general who conquered many territorys.",
      correctAnswer: "Alexander was a great general who conquered many territories.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "What does the word impaled mean in the following sentence? Maximus was impaled by the dagger but he still managed to defeat the vile emperor.",
      options: ["Chopped", "Stabbed", "Scraped", "Stung"],
      correctAnswer: "Stabbed",
    },
    {
      id: 14,
      type: "grammar",
      question: "Correct the following sentence: The college took their time in sending me a reply.",
      correctAnswer: "The college took its time in sending me a reply.",
    },
    {
      id: 15,
      type: "multiple-choice",
      question: "What is this sentence missing? Is Constantine ready to go fishing with his dad",
      options: ["Capital", "Period", "Question Mark", "Comma"],
      correctAnswer: "Question Mark",
    },
    {
      id: 16,
      type: "multiple-choice",
      question: "Which underlined part is incorrect? The teacher gave Jack and I homework over the summer vacation.",
      options: ["gave", "I", "over", "summer"],
      correctAnswer: "I",
    },
    {
      id: 17,
      type: "writing",
      question: "Should uniforms be mandatory at school?",
    },
  ]
  
  export const grade6ELAData = {
    grade: 6,
    subject: "ela",
    title: "Grade 6 ELA Diagnostic Assessment",
    description:
      "This assessment evaluates reading comprehension, vocabulary, grammar, and writing skills for Grade 6 students.",
    questions: grade6ELAQuestions,
  }
  
  