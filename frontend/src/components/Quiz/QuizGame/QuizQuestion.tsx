import React, { useState } from "react";
import { IQuizquestion } from "../../../typings/Quizquestion";
import css from "./QuizQuestion.module.css";
import { Popup } from "../Popup/Popup";
import { QuizEnding } from "./QuizEnding";

interface QuizQuestionProps {
  questions: IQuizquestion[];
  score: number;
  setScore: (newScore: number) => void;
}

export const QuizQuestion = (props: QuizQuestionProps) => {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const questions = props.questions;

  const currentQuestion = () => {
    return props.questions.at(index);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const checkAnswer = (answer: string) => {
    setShowPopup(true);
    if (answer === currentQuestion()?.correct_answer) {
      setMessage("Richtige Antwort! +1 Punkt erhalten!");
      props.setScore(props.score + 1);
    } else {
      setMessage("Falsche Antwort!");
    }
    setIndex(index + 1);
    if (index === questions.length - 1) {
      setFinished(true);
    }
  };

  const getHint = () => {
    setShowHint(true);
  };

  return (
    <>
      <h2 className={css.question}>{questions.at(index)?.question_content}</h2>
      <ul className={css.list}>
        {questions.at(index)?.possible_answers.map((item) => {
          return (
            <li
              key={item}
              className={css.li_items}
              onClick={() => checkAnswer(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <button onClick={() => getHint()}>Tipp</button>
      {showPopup ? <Popup text={message} closePopup={closePopup} /> : null}
      {showHint ? (
        <Popup
          text={currentQuestion()?.hint || "kein Tipp vorhanden"}
          closePopup={() => setShowHint(false)}
        />
      ) : null}
      {finished ? <QuizEnding score={props.score} /> : null}
    </>
  );
};
