import React from "react";
import { useUser } from "../hooks/useUser";

export const Home = () => {
  //Auf Login leiten, wenn nicht autorisiert
  useUser({redirectIfFound: false, redirectTo: '/login'});
  return (
    <>
      <h1>Willkommen zum QUIZ MI</h1>
      <h3>
        Chatte mit anderen aktiven Spielern oder spiele ein Quiz oder erstelle
        selbst eins!
      </h3>
      <br />
    </>
  );
};
