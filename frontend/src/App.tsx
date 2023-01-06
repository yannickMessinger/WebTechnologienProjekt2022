import React, { useEffect } from 'react';
import logo from './logo.svg';
//import './App.css';
import { Chat } from './components/Chat/Chat';
import { Quizquestion } from './components/Quizquestion/Quizquestion';
import { AddQuiz } from './components/Quiz/AddQuiz';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


function App() {
 
 
  return (
    <ApolloProvider client = {client}>
    <div className="App">
      <h3>QUIZ-ÄPP</h3>
      
    <AddQuiz></AddQuiz>

   
      
    </div>
    </ApolloProvider>
  );
}

export default App;
