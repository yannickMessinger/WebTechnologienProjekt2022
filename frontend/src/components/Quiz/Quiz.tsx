import React, { useState } from "react";
import { useQuiz } from "../../hooks/useQuiz";
import { IQuizquestion } from "../../typings/Quizquestion";
import css from "./Quizstyle.module.css";



export const Quiz = () => {
  const question: IQuizquestion = {
    question: "",
    possible_answers: [],
    correct_answer: "",
    category: "",
    hint: "",
  };
  const { postQuizQuestion } = useQuiz();
  const [questionContent, setQuestionContent] = useState("");
  const [answers, setAnswers] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [hint, setHint] = useState("");


  const handleSubmit = (e:any) => {
    e.preventDefault();
    question.question = questionContent;
    question.correct_answer = correctAnswer;
    question.category = category;
    question.hint = hint;

    answers.split(" ").forEach((answer) => {
      question.possible_answers.push(answer);
    });

    console.log(question)
    postQuizQuestion(question);


    setQuestionContent("");
    setAnswers("");
    setCorrectAnswer("");
    setCategory("");
    setCategory("");
  };

  return (
    <>
      <div className={css.wrapper}>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your question:
            <input
              type="text"
              value={questionContent}
              onChange={(e) => setQuestionContent(e.target.value)}
            />
          </label>

          <br></br>

          <label>
            Enter possible answers seperated by whitepace:
            <input
              type="text"
              value={answers}
              onChange={(e) => setAnswers(e.target.value)}
            />
          </label>

          <br></br>

          <label>
            Enter correct answer:
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </label>

          <br></br>

          <label>
            Enter category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>

          <br></br>

          <label>
            Enter hint:
            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
            />
          </label>

          <br></br>

          <input type="submit" />
        </form>
      </div>
    </>
  );
};
