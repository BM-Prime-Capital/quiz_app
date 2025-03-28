import { Question, QuizData, QuestionType } from "@/lib/types";
  
  export const grade5ELAQuestions: Question[] = [
    {
      id: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      question: 'What does the word "diverse" mean in paragraph one?',
      options: ["Having different kinds", "Huge", "Beautiful", "Strange"],
      correctAnswer: "Having different kinds",
      passage: `Tropical Rain Forests
  
  Tropical rain forests are amongst the most diverse ecosystems in the world. They provide homes to many different species of plants and animals, even though they cover only a small part of the Earth's surface.
  
  The rain forests provide us with many resources we use every day. Coffee, vanilla, wood, oils, nuts, vegetables and fruits all come from the rain forest. Even a large portion of our medicines is obtained from forest plants.
  
  The forest floor, the understory, the canopy, and the emergent layer are four layers common to all rain forests. The majority of the inhabitants of the forest floor are plants. The understory is higher than the forest floor but no sunlight reaches it. The canopy is 70-120 feet above ground level and is the layer in which most plants and animals live. The emergent layer is the topmost layer.
  
  Today, unfortunately, the tropical rain forests are slowly being wiped out. Our need for resources is destroying the homes of many of the plants and animals that live in the tropical rain forests. Perhaps one day there will be no more tropical rain forests remaining.`,
    },
    {
      id: 2,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Which of these is not found in the tropical rain forests?",
      options: ["Fruits", "Vanilla", "Butter", "Medicine"],
      correctAnswer: "Butter",
    },
    {
      id: 3,
      type: QuestionType.TEXT,
      question: "Why do you think hardly any sunlight reaches the understory or the forest floor?",
    },
    {
      id: 4,
      type: QuestionType.TEXT,
      question: "According to the passage, why are tropical rain forests being destroyed?",
    },
    {
      id: 5,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What was the last thing Max did to get ready for Christmas?",
      options: [
        "Mail letters at the post office",
        "Hang his sign for uncle Robert",
        "Place the stocking above the fireplace",
        "Buy a Christmas tree",
      ],
      correctAnswer: "Place the stocking above the fireplace",
      passage: `Max's Christmas
  
  For Max's family holidays are always a big deal, but this year Christmas was going to be extra special. His uncle, Robert, was coming over for Christmas.
  
  There was a lot to be done to make this Christmas special. First, Max made a big sign that said "Merry Christmas Uncle Robert!" Next, Max ran some errands with his dad. First, they stopped by the post office to mail letters. Then they went to the mall to buy gifts for everyone. Finally, Max and his dad picked up the Christmas tree for the house.
  
  With two days left before Christmas, Max and his dad decorated the entire house. First, they put lights and ornaments around the Christmas tree. Next, Max hung the sign he made for uncle Robert. Finally, they placed the stocking above the fireplace.
  
  On Christmas Eve morning, Max and his mother picked up uncle Robert from the airport. When uncle Robert came in to the house and saw the sign Max made for him he was very happy. Later that night, the entire family gathered at the dining table and had a feast. Finally, when Max went to sleep, uncle Robert placed his present for Max under the Christmas tree.
  
  When Max woke up the next day, the first thing Max did was run to the Christmas tree. Then he looked under the Christmas tree and saw the gift uncle Robert had brought for him. Max asked uncle Robert, "Who brought this gift for me?" Uncle Robert replied, "Santa Claus."`,
    },
    {
      id: 6,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Why do you think uncle Robert told Max that Santa Claus brought the present?",
      options: [
        "To trick Max",
        "To keep Max's belief in Santa Claus alive",
        "Uncle Robert is Santa Claus",
        "He likes lying to Max",
      ],
      correctAnswer: "To keep Max's belief in Santa Claus alive",
    },
    {
      id: 7,
      type: QuestionType.TEXT,
      question: "Do you think Max believed what uncle Robert told him, at the end of the story?",
    },
    {
      id: 8,
      type: QuestionType.TEXT,
      question: "Why did the author write this story?",
    },
    {
      id: 9,
      type: QuestionType.GRAMMAR,
      question:
        "Underline the adjective(s) in the following sentence: After taking a shower, Mike's hair was smooth and soft.",
      correctAnswer: ["smooth", "soft"],
    },
    {
      id: 10,
      type: QuestionType.FILL_IN,
      question: "In the space given write an antonym for each word:",
      blanks: ["Happy: _____", "Light: _____", "Expensive: _____"],
    },
    {
      id: 11,
      type: QuestionType.FILL_IN,
      question: "Choose the correct homonym for each sentence. Homonym: ate, eight",
      blanks: ["I _____ three hotdogs and two burgers at the picnic.", "There are _____ types of ice cream flavors."],
      correctAnswer: ["ate", "eight"],
    },
    {
      id: 12,
      type: QuestionType.MULTIPLE_CHOICE,
      question:
        "Pick the word that best completes the sentence: Even though Kevin knew the answer, he was too _____ to raise his hand.",
      options: ["Sick", "Embarrassed", "Sad"],
      correctAnswer: "Embarrassed",
    },
    {
      id: 13,
      type: QuestionType.FILL_IN,
      question: "Write the plural of each word:",
      blanks: ["Church: _____", "Butterfly: _____", "Prefix: _____", "Pen: _____"],
      correctAnswer: ["Churches", "Butterflies", "Prefixes", "Pens"],
    },
    {
      id: 14,
      type: QuestionType.GRAMMAR,
      question: "Correct the sentence below: The barn max owned looked mysterious but it also looked like home.",
      correctAnswer: "The barn Max owned looked mysterious, but it also looked like home.",
    },
    {
      id: 15,
      type: QuestionType.GRAMMAR,
      question: "Correct the sentence below: After finishing her dinner, Sandy asked her Mom can i have a cookie?",
      correctAnswer: 'After finishing her dinner, Sandy asked her Mom, "Can I have a cookie?"',
    },
    {
      id: 16,
      type: QuestionType.GRAMMAR,
      question:
        "Replace the abbreviation with its meaning: After class Mike came over to my apt. to play some video games.",
      correctAnswer: "After class Mike came over to my apartment to play some video games.",
    },
    {
      id: 17,
      type: QuestionType.WRITING,
      question:
        "Think of an event that really made you happy. Think about what parts of this event made you happy. In the space below write about the event and why it made you happy.",
    },
  ]
  
  export const grade5ELAData = {
    grade: 5,
    subject: "ela",
    title: "Grade 5 ELA Diagnostic Assessment",
    description:
      "This assessment evaluates reading comprehension, vocabulary, grammar, and writing skills for Grade 5 students.",
    questions: grade5ELAQuestions,
  }
  
  