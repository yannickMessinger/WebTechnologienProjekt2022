import React, { useState } from "react";
import { useQuiz } from "../../hooks/useQuiz";
import { IQuizquestion } from "../../typings/Quizquestion";
import css from "./Quizstyle.module.css";

interface Questionprops {
  quizId: string
}


export const Quizquestion = ({quizId} : Questionprops) => {
  const question: IQuizquestion = {
    quizId: "",
    question_content: "",
    possible_answers: [],
    correct_answer: "",
    category: "",
    hint: "",
  };
  const { postQuizQuestion} = useQuiz();
  const [questionContent, setQuestionContent] = useState("");
  const [answers, setAnswers] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [hint, setHint] = useState("");


  const handleSubmit = (e:any) => {
    
    e.preventDefault();
    question.quizId = quizId;
    question.question_content = questionContent;
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
    setHint("");
  };

  return (
    <>
      
        <div className={css.questionWindow}>
          <div className={css.enter_question}>
          <label>
            Enter your question:
            </label>
            <input
              type="text"
              value={questionContent}
              onChange={(e) => setQuestionContent(e.target.value)}
            />
          
          </div>

          <div className={css.possible_answers}>
          <label>
            Enter possible answers seperated by whitepace:
            </label>
            <input
              type="text"
              value={answers}
              onChange={(e) => setAnswers(e.target.value)}
            />
          
          </div>

         
          <div className={css.correct_answer}>
          <label>
            Enter correct answer:
            </label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          
          </div>

         
         <div className={css.category}>
          <label>
            Enter category:
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
         
          </div>

         
          <div className={css.hint}>
          <label>
            Enter hint:
            </label>
            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
            />
         
          </div>

          
          <div className={css.send_button}>
          <button className={css.sendbutton} onClick={(e) => {handleSubmit(e)}}>SENDEN</button>
          </div>
        </div>
      
    </>
  );
};
