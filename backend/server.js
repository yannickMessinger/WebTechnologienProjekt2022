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
import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import session from 'express-session';
import { createUser, findUser, validatePassword } from './user.js';
import userModel from "./models/user/user.model.js";
import { getLoginSession, setLoginSession } from "./auth.js";
import { removeTokenCookie } from "./auth-cookies.js";




const startServer = async () => {
  const quizRoutes = express.Router();
  const app = express();
  app.use(cors({origin: 'http://localhost:3000', credentials: true}));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(session({ secret: 'das hier ist ganz geheim',
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour 
  }));
  app.use(passport.session());
  const httpServer = http.createServer(app);
  const subscriptionHttpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

   quizRoutes.route('/user').get(async (req, res) => {
    try {
      const session = await getLoginSession(req)
      let user = (session && (await findUser(session[0]))) ?? null;
      user = user?.toObject();
      delete user?.password;
      res.status(200).json({ user })
    } catch (error) {
      console.error(error)
      res.status(500).end('Authentication token is invalid, please log in')
    }
   });

   quizRoutes.route('/signup').post((req, res) => {
    userModel.findOne({username: { $eq: req.body.username }}, (err, c) => {
      if(!c) {
        createUser(req.body.username, req.body.password);
        res.send({user: req.body.username});
      } else {
        res.status(400).send({error: "User existiert bereits"});
      }
    });
   });

   quizRoutes.route('/login').post((req, res) => {
    userModel.findOne({username: req.body.username})
    .clone().then(user => {
      if(user && validatePassword(user, req.body.password)) {
        setLoginSession(res, user.username).then(() => {
          res.send({user: req.body.username});
        });
      } else {
        res.status(400).send({error: "No User found"});
      }
    });
   });

   quizRoutes.route('/logout').get((req, res) => {
      removeTokenCookie(res);
      res.writeHead(302, { Location: '/' }).send();
   });

   quizRoutes.route('/add').post(async (req, res) => {
        // Rausschmeißen, wenn nicht authentifiziert
        let session = getLoginSession(req);
        console.log(session);
        let user = (session && (await findUser(session[0]))) ?? null;
        if(!user) {
          res.status(400).send();
          return;
        }
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

    quizRoutes.route('/add/newquiz').get(async (req, res) => {
      // Rausschmeißen, wenn nicht authentifiziert
      let session = getLoginSession(req);
      let user = (session && (await findUser(session[0]))) ?? null;
      if(!user) {
        res.status(400).send();
        return;
      }

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

  const GoogleStrategy = Strategy;


  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID: "683326814811-9j1fptf82onsarmankc8t8cagngjnddu.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/auth/callback",
    passReqToCallback: true
  },
    function (request, accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  ));

  passport.use(userModel.createStrategy());

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

  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/auth.html')));

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
      res.redirect('http://localhost:3000')
    }
  )

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


