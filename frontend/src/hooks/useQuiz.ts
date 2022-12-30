import React from 'react'

import { IQuizquestion } from '../typings/Quizquestion';

export const useQuiz = () => {
  
    async function postQuizQuestion(question:IQuizquestion){
        try {
            const URL = "http://localhost:4000/quiz/add";
        
            const response = await fetch(URL, {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(question),
            });
        
            if (!response.ok) {
              console.log("error post todo frontend");
              throw new Error(response.statusText);
            }
        
            console.log("posted todo");
          } catch (error) {
            console.log(error);
          }
        
    }
  
  
  
  
  
    return {
        postQuizQuestion
    }
    
  
}
