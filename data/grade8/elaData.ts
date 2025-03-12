export interface Question {
    id: number
    type: "multiple-choice" | "text" | "writing" | "grammar"
    question: string
    options?: string[]
    correctAnswer?: string | string[]
    passage?: string
  }
  
  export const grade8ELAQuestions: Question[] = [
    {
      id: 1,
      type: "multiple-choice",
      question: "What is the main idea of the passage?",
      options: [
        "Tiny particles govern our world",
        "Electrons are negatively charged",
        "Electrons and protons are smaller than atoms",
        "Lead is made of carbon atoms",
      ],
      correctAnswer: "Tiny particles govern our world",
      passage: `The Particles of Matter
  
  Have you ever looked around and wondered what the objects around you were made of? Take the lead in a pencil for example. The lead is made of graphite which is made of a bunch of carbon atoms. Atoms are the basic building blocks of matter in our universe. Everything around us is made of atoms. But then what are atoms made of? The atoms themselves are made of even tinier particles called electrons and protons. The attractive and repulsive forces between these electrons and protons give rise to the things around us (including ourselves).
  
  Electrons are negatively charged, whereas protons are positively charged. Two particles with different charges attract each other, therefore protons and electrons tend to come together. This idea of opposite charges attracting can explain why we can write with a pencil. The particles of the paper have a certain charge and attract the particles of the lead which have the opposite charge.
  
  Similarly, two particles that have the same charge repel. Our hands do not go through or stick to our desks because the electrons in our hand repel the electrons in the desk.`,
    },
    {
      id: 2,
      type: "multiple-choice",
      question: "What are the building blocks of matter according to the passage?",
      options: ["Graphite", "Carbon", "Atoms", "Protons and electrons"],
      correctAnswer: "Atoms",
    },
    {
      id: 3,
      type: "text",
      question: "What causes two particles to be attracted? What causes them to be repelled?",
    },
    {
      id: 4,
      type: "text",
      question: "What suggests that the particles in lead are attracted to the particles in an eraser?",
    },
    {
      id: 5,
      type: "multiple-choice",
      question: "What is the main Idea of the Passage?",
      options: [
        "Fire causes pain",
        "The brain plays an important part in how we perceive the world",
        "The ancient Egyptians understood the brain",
        "Charles Sherrington was a genius",
      ],
      correctAnswer: "The brain plays an important part in how we perceive the world",
      passage: `The Role of the Brain
  
  What causes the sensation of pain we experience when we place our hands in a fire? Why is it that we immediately withdraw from the source of pain? The answer to these questions is that the fire causes an electrical signal to pass through the body and into the brain. The brain then relays a signal back to the body that tells the body to take the hands away from the fire. Every aspect of our lives, whether physical or emotional, can be traced back as a result of the electrical activity in our brains.
  
  Over the centuries, many theories of sensation have appeared. Early scientists did not realize that the brain played such an important part in the process. Ancient Egyptians, for example, thought the heart was superior to the brain. They would remove the brains of their dead with a spoon but preserve the heart.
  
  It was in the mid 17th century that Rene Descartes argued that the brain played an important role in how we experience the world around us. However, Descartes did not fully understand the function of the brain. In 1900's, Charles Sherrington proposed a model in which electrical signals, received from neurons, stimulated the brain. Neurons are like long cords that carry the electrical signals to the brain. There are neurons in just about every part of our bodies.`,
    },
    {
      id: 6,
      type: "multiple-choice",
      question: "What carries electrical signals to the brain?",
      options: ["Skin", "Muscles", "Neurons", "The brain"],
      correctAnswer: "Neurons",
    },
    {
      id: 7,
      type: "text",
      question: "Why was Descartes's theory different from previous theories?",
    },
    {
      id: 8,
      type: "text",
      question: "Describe a neuron and describe its function?",
    },
    {
      id: 9,
      type: "multiple-choice",
      question:
        "In which sentence does the word effect have the same meaning as in: The effect of the storm could be seen in the widespread destruction of the town.",
      options: [
        "The deal was effected thanks to hard work.",
        "The beneficial effects of the drug were remarkable.",
        "The teacher said something to the effect of 'get out of the classroom.'",
        "None of the above",
      ],
      correctAnswer: "The beneficial effects of the drug were remarkable.",
    },
    {
      id: 10,
      type: "multiple-choice",
      question: "Which underlined part is incorrect? The teacher gave Jack and I homework over the summer vacation.",
      options: ["gave", "I", "summer", "No Error"],
      correctAnswer: "I",
    },
    {
      id: 11,
      type: "multiple-choice",
      question:
        "Which underlined part is incorrect? Last week I went on a trip with my friends. We hiked, biked, and we were swimming all day.",
      options: ["trip", "biked", "We were swimming", "No Error"],
      correctAnswer: "We were swimming",
    },
    {
      id: 12,
      type: "grammar",
      question: "Correct the following sentence: We were already to leave when the car suddenly broke down.",
      correctAnswer: "We were all ready to leave when the car suddenly broke down.",
    },
    {
      id: 13,
      type: "multiple-choice",
      question:
        "What does the underlined word mean? When the professor continued to ignore the assistant, we knew that the assistant's input was inconsequential.",
      options: ["Inappropriate", "Valuable", "Inspiring", "Irrelevant"],
      correctAnswer: "Irrelevant",
    },
    {
      id: 14,
      type: "multiple-choice",
      question:
        "Which transition word would be the most appropriate for this sentence: The apples were salty, ___ the peaches were sweet.",
      options: ["and", "however", "therefore", "also"],
      correctAnswer: "however",
    },
    {
      id: 15,
      type: "multiple-choice",
      question:
        "What does the underlined word mean? Alice Paul was an advocate of women's voting rights, which was demonstrated through her participation in protests and boycotts.",
      options: ["Against", "Supporter", "Advertise", "Knowledgeable"],
      correctAnswer: "Supporter",
    },
    {
      id: 16,
      type: "multiple-choice",
      question:
        "Which underlined part is incorrect? Mr. Smith, owner of the car shop, gave I and Allison free ice cream today.",
      options: ["Gave", "Owner", "I", "Today"],
      correctAnswer: "I",
    },
    {
      id: 17,
      type: "writing",
      question: "Is the death penalty morally correct?",
    },
  ]
  
  export const grade8ELAData = {
    grade: 8,
    subject: "ela",
    title: "Grade 8 ELA Diagnostic Assessment",
    description:
      "This assessment evaluates reading comprehension, vocabulary, grammar, and writing skills for Grade 8 students.",
    questions: grade8ELAQuestions,
  }
  
  