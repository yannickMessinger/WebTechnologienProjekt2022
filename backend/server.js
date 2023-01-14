import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import { resolvers } from "./graphQL/schema/resolvers.js";
import { typeDefs } from "./graphQL/schema/typedefs.js";
import { Server } from "socket.io";
import Question from "./models/quiz/question.js";
import Quiz from "./models/quiz/quiz.model.js";




const startServer = async () => {
  const quizRoutes = express.Router();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const httpServer = http.createServer(app);
  const subscriptionHttpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

   quizRoutes.route('/add').post((req, res) => {
        let question = new Question(req.body);
        Quiz.findById(question.quizId, (err, Quiz) => {
          Quiz.quiz_questions.push(question)
          Quiz.save()
          .then(() => {
            res.status(200)
          })
          console.log(Quiz.quiz_questions)
        }).catch(err => {
          res.status(400)
        })
      
      
        resolvers.Mutation.createQuestion(null, question);
      
        
    });

    quizRoutes.route('/add/newquiz').get((req, res) => {
      let quiz = new Quiz();
     
      quiz.save()
          .then(quiz => {
              console.log('new quiz added successfully')
              res.status(200).json({'newQuizId': quiz._id});
          })
          .catch(err => {
              res.status(400).send('adding new quiz failed');
          });
  });

  app.use("/quiz", quizRoutes);
  

  const wsServer = new WebSocketServer({
    server: subscriptionHttpServer,
    path: "/graphql",
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  const serverCleanup = useServer({ schema }, wsServer);

  await mongoose.connect("mongodb://127.0.0.1:27017/quiz");

  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("MongoDB database connection establshed successfully");
  });

  await server.start();

  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });

  subscriptionHttpServer.listen(5000, () => {
    console.log(`Server is now running on http://localhost:5000/graphql`);
  });

  

  //Socket io stuff
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected with SocketID: ${socket.id}`);

    socket.on("chat_message_frontend", (message) => {
    

      io.emit("chat_message_backend", {
        username: message.username,
        payload: message.payload,
      });
    });

    
    socket.on("disconnect", () => {
      console.log("User disconnected :(");
    });
  });
  
  
};

startServer();


