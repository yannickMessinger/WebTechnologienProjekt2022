import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuiz } from '../../hooks/useQuiz'
import { Quizquestion } from '../Quizquestion/Quizquestion';
import css from "./AddQuizStyle.module.css";

export const AddQuiz = () => {

  
    const {addNewQuiz,quizId} = useQuiz();
    const [showQuestionForm, setShowQuestionForm] = useState(false);

    function createNewQuiz(){
      setShowQuestionForm(!showQuestionForm);
      if(!showQuestionForm){
        console.log("ADD NEW QUIZ")
        addNewQuiz();
      }
     
      //console.log(`QuizID frontend AddQuiz ${quizId}`)
    }



  return (
    <div className={css.addQuizOuterWrapper}>
      <div className={css.addQuizInnerWrapper}>
      <button onClick={() => {createNewQuiz()}}>{showQuestionForm ?'done' : '+'}</button>
        {showQuestionForm &&  (
          <Quizquestion quizId={quizId}></Quizquestion>
        )}
      </div> 
    </div>
  )
}
