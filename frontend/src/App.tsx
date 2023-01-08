import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Chat } from "./components/Chat/Chat";
import { Quizquestion } from './components/Quizquestion/Quizquestion';
import { AddQuiz } from "./components/Quiz/AddQuiz";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { QuizCategorySelection } from "./components/Quiz/QuizGame/QuizCategorySelection";

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <h3>ÄPP</h3>
          <Chat></Chat>
          <AddQuiz></AddQuiz>
          <Link to="/quiz/select">Kategorieauswahl</Link>
          {/* <Link to="/quiz">Quiz</Link> */}
        </div>
        <Routes>
          <Route path="/quiz/select" element={<QuizCategorySelection />} />
          {/* <Route path="/quiz" element={<Quiz />} /> */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
