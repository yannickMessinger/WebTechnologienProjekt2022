import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../../hooks/useQuiz";
import { Quizquestion } from "./Quizquestion";
import css from "./AddQuizStyle.module.css";
import { useUser } from "../../hooks/useUser";

export const AddQuiz = () => {
  //Auf Login leiten, wenn nicht autorisiert
  useUser({redirectIfFound: false, redirectTo: '/login'});
  const { addNewQuiz, quizId } = useQuiz();
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  function createNewQuiz() {
    setShowQuestionForm(!showQuestionForm);
    if (!showQuestionForm) {
      addNewQuiz();
    }
  }

  return (
    <div className={css.addQuizOuterWrapper}>
      <div className={css.addQuizInnerWrapper}>
        <button
          onClick={() => {
            createNewQuiz();
          }}
        >
          {showQuestionForm ? "fertig" : "+"}
        </button>
        {showQuestionForm && <Quizquestion quizId={quizId}></Quizquestion>}
      </div>
    </div>
  );
};
