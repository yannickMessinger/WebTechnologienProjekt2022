import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { Chat } from "./components/Chat/Chat";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Quiz } from "./pages/Quiz";
import { Login } from "./pages/Login";
import { NoPage } from "./pages/NoPage";
import { Signup } from "./pages/Signup";
import { CreateQuestion } from "./pages/CreateQuestion";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import logo from "../src/assets/hochschule-rheinmain-bildmarke.jpg";
import { useUsername } from "./hooks/useUser";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // Or your Slash GraphQL endpoint (if you're using Slash GraphQL)
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:5000/graphql",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  const nutzer = useUsername();
  let chat = nutzer ? <Chat />: "";
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <h1>QUIZ-MI</h1>
          <img src={logo} width="auto" height="80" />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="createQuestion" element={<CreateQuestion />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
          {chat}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
