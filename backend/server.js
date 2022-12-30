import express from "express"; //Import the express dependency
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

//import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { createServer } from 'http';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';

import typeDefs from "./graphql/schema/typedefs.js";
import resolvers from "./graphql/schema/resolvers.js";
import { ApolloServer } from "apollo-server-express";
import dotenv from 'dotenv';
import Quiz from './models/quiz/quiz.model.js'
import Question from './models/quiz/question.js'

//import resolvers from './resolvers';
//import typeDefs from './typeDefs';


const schema = makeExecutableSchema({ typeDefs, resolvers});

 
const app = express();
//Instantiate an express app, the main work horse of this server
const port = 4000; //Save the port number where your server will be listening
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const quizRoutes = express.Router()
app.use('/quiz', quizRoutes);

//const server = http.createServer(app);
const server = createServer(app); 

const wsServer = new WebSocketServer({
  server: server,
  path: '/graphql',
});

useServer({ schema }, wsServer);

mongoose.connect("mongodb://127.0.0.1:27017/quiz", { useNewUrlParser: true });
const connection = mongoose.connection;
 
connection.once("open", () => {
  console.log("MongoDB database connection establshed successfully");
});

 
//Socket io stuff
 
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
 
io.on("connection", (socket) => {
  console.log(`User connected with SocketID: ${socket.id}`);
 
  socket.on("chat_message_frontend", (message) => {
    //to all connected clients
 
    io.emit("chat_message_backend", {
      username: message.username,
      payload: message.payload,
    });
  });
 
  /*
    socket.on("chat_message_frontend", (message) => {
        //To all connected clients except the sender
       socket.broadcast.emit("chat_message_backend", {payload: message.payload})
    });*/
 
  socket.on("disconnect", () => {
    console.log("User disconnected :(");
  });
});
 

 
app.post("/auth/signup", (req, res) => {});
 
app.post("/auth/signin", (req, res) => {});



server.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});

initServer();



async function initServer() {
    console.log("AWAIT GRAPHQL SERVER");
    const app = express();
    app.use(cors());
    dotenv.config();
    const apolloServer = new ApolloServer({
        typeDefs, resolvers,schema
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    app.use('/graphql', bodyParser.json(), expressMiddleware(apolloServer));
    app.use((req, res) => {
        res.send("Server started");
    });
    const PORT = process.env.PORT || 5000;
    try {
        await mongoose.connect(
            'mongodb://127.0.0.1:27017/quiz',
            {useNewUrlParser: true}
        );
        console.log("mongodb connected");
    } catch (error) {
        console.log("mongodb error:", error);
    }
    app.listen(PORT, () => console.log(`GraphQL Server running on Port ${PORT}`))
}


quizRoutes.route('/add').post((req, res) => {
  console.log(req.body)
 
  let quizQuestion = new Question(req.body);

  req.body.possible_answers.forEach((answer) =>{
    quizQuestion.possibleAnswers.push(answer);
  })

  

  console.log(quizQuestion)
});