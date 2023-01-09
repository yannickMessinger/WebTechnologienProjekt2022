import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Chat } from "./components/Chat/Chat";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";
import { Login } from "./pages/Login";
import { NoPage } from "./pages/NoPage";
import { CreateQuestion } from "./pages/CreateQuestion";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <h1>QUIZ-ÄPP</h1>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="createQuestion" element={<CreateQuestion />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
          <Chat />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
