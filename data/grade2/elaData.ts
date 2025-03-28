import { Question, QuizData, QuestionType } from "@/lib/types";
  
  export const grade2ELAQuestions: Question[] = [
    {
      id: 1,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What is the main idea of this passage?",
      options: [
        "If you are confident you can do anything",
        "Make sure to bring water for a race",
        "You should do things on your own",
        "Practice makes perfect",
      ],
      correctAnswer: "Practice makes perfect",
      passage: `The Marathon
  
  "The marathon is coming up," said James. "I'm a better runner and I know that I will win."
  
  "We should practice together," Joey said. "The marathon is still a few weeks away and I know that I can improve enough to finally beat you James."
  
  The days went by and the marathon came closer and closer. Joey practiced running everyday. He knew that the 6 mile marathon would be a challenge and that he needed to build his strength. He always ran out breath, so he wanted to try and keep his breathing steady. Joey always remembered to bring a bottle of water with him whenever he practiced.
  
  James spent all of his time relaxing. He felt sure that he would win with no problem. The day of the race finally came and the two friends saw each other at the start line. "Good luck," said James, "you're going to need it." The race started and they were off. James quickly went ahead of all of the other people. James noticed that he became very thirsty and his legs felt weak. He forgot to bring his water bottle. James started to slow down. Joey came up from behind him. Joey had his bottle in his hand and was running at a good pace. Joey passed James just as they came toward the finish line. "I should have practiced," said James.`,
    },
    {
      id: 2,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What did James forget to bring on the day of the marathon?",
      options: ["His shoes", "His bottle", "His keys", "He didn't forget anything"],
      correctAnswer: "His bottle",
    },
    {
      id: 3,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "Why was Joey able to beat James in the marathon?",
      options: ["He was naturally faster", "James was sick", "He practiced and prepared", "James let him win"],
      correctAnswer: "He practiced and prepared",
    },
    {
      id: 4,
      type: QuestionType.TEXT,
      question: "What do you think James will do to prepare for the next marathon?",
    },
    {
      id: 5,
      type: QuestionType.MULTIPLE_CHOICE,
      question: "What would be a good title for this passage?",
      options: ["The Age of Moon Rocks", "Astronauts Discover Moon Rocks", "What We Know About Moon Rocks", "The Moon"],
      correctAnswer: "What We Know About Moon Rocks",
      passage: `Astronauts first went to the moon in 1969. They noticed plenty of rocks that were similar to the rocks on Earth. They brought many of these moon rocks back to Earth in order to study them and discover any secrets they might hold.
  
  Scientists back on Earth found that the rocks were very old, even older than the Earth itself. People often think of the moon as Earth's little brother, but the moon is actually older than the Earth. The scientists did not find any traces of water in the rocks. Since there was never any water on the moon, we can say that no humans or animals ever lived on it. We have learned these things and more by studying the moon rocks.
  
  Today, moon rocks can be found in museums around the world. Some people even buy and sell them to others. One day, you might even have your own moon rock.`,
    },
    // Add remaining questions...
    {
      id: 16,
      type: QuestionType.MULTIPLE_CHOICE,
      question: 'What does Fri. stand for in "It was cold on Fri., January 15th."',
      options: ["Frying", "Freedom", "Friday", "Freeze"],
      correctAnswer: "Friday",
    },
    {
      id: 17,
      type: QuestionType.WRITING,
      question: "Write about your Summer vacation.",
    },
  ]
  
  export const grade2ELAData = {
    grade: 2,
    subject: "ela",
    title: "Grade 2 ELA Diagnostic Assessment",
    description: "This assessment evaluates reading comprehension, vocabulary, and writing skills for Grade 2 students.",
    questions: grade2ELAQuestions,
  }
  
  