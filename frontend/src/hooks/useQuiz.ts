import React, { useState } from "react";

import { IQuizquestion } from "../typings/Quizquestion";

export const useQuiz = () => {
  const [score, setScore] = useState(0);
  const [quizId, setQuizId] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<IQuizquestion[]>([]);

  async function postQuizQuestion(question: IQuizquestion) {
    try {
      const URL = "http://localhost:4000/quiz/add";
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(question),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addNewQuiz(): Promise<string> {
    try {
      const URL = "http://localhost:4000/quiz/add/newquiz";
      const response = await fetch(URL, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
        console.log("error post todo frontend");
        throw new Error(response.statusText);
      }
      const id = await response.json();
      setQuizId(id.newQuizId);
    } catch (error) {
      console.log(error);
    }
    return "";
  }

  return {
    postQuizQuestion,
    addNewQuiz,
    quizId,
    quizQuestions,
    setQuizQuestions,
    score,
    setScore,
  };
};
