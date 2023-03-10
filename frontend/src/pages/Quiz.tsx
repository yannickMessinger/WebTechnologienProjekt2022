import React, { useState } from "react";
import { QuizCategorySelection } from "../components/Quiz/QuizGame/QuizCategorySelection";
import { QuizQuestion } from "../components/Quiz/QuizGame/QuizQuestion";
import { useQuiz } from "../hooks/useQuiz";
import { useUser } from "../hooks/useUser";

export const Quiz = () => {
  //Auf Login leiten, wenn nicht autorisiert
  useUser({redirectIfFound: false, redirectTo: '/login'});
  const { quizQuestions, setQuizQuestions, score, setScore } = useQuiz();
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <h1>Quiz</h1>
      {playing ? (
        <QuizQuestion
          questions={quizQuestions}
          score={score}
          setScore={setScore}
        />
      ) : (
        <>
          <QuizCategorySelection
            displayQuestions={setQuizQuestions}
            startPlaying={setPlaying}
          />
          <h3>Klicke den Button um zu starten</h3>
        </>
      )}
    </>
  );
};
