import React from "react";

interface Props {
  score: number;
}

export const QuizEnding = (props: Props) => {
  return (
    <>
      <h2>Spiel beendet!</h2>
      <p>Du hast {props.score} Punkt(e) erreicht</p>
    </>
  );
};
