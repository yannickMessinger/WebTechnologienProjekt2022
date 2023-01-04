import React, { useEffect } from 'react';
import logo from './logo.svg';
//import './App.css';
import { Chat } from './components/Chat/Chat';
import { Quizquestion } from './components/Quizquestion/Quizquestion';
import { AddQuiz } from './components/Quiz/AddQuiz';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";




function App() {
 
 
  return (
    <div className="App">
      <h3>QUIZ-ÄPP</h3>
      
    <AddQuiz></AddQuiz>

   
      
    </div>
  );
}

export default App;
