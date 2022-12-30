import express from "express"; //Import the express dependency
import mongoose from "mongoose";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";

import typeDefs from "./graphql/schema/typedefs.js";
import resolvers from "./graphql/schema/resolvers.js";
import {ApolloServer} from "apollo-server-express";
import dotenv from 'dotenv';

import Question from "./models/quiz/question.js";
import bodyParser from "body-parser";

const app = express();  //Instantiate an express app, the main work horse of this server
const port = 4000;      //Save the port number where your server will be listening

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = http.createServer(app);

// mongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/quiz", {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
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

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
    //get requests to the root ("/") will route here
    //res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.post("/auth/signup", (req, res) => {
});

app.post("/auth/signin", (req, res) => {
});


server.listen(port, () => {
    //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});


initRESTServer();

initGraphQLServer();

function initRESTServer() {
    const PORT = 6000;
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    const quizRoutes = express.Router();
// get Question by given id
    quizRoutes.route('/:id').get((req, res) => {
        let id = req.params.id;
        Question.findById(id, (err, question) => {
            res.json(question);
        });
    });
// adding a new question
    quizRoutes.route('/add').post((req, res) => {
        let question = new Question(req.body);
        console.log("question:", question);
        question.save()
            .then(question => {
                res.status(200).json({'question': 'question added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new question failed');
            });
    });
    app.use('/quiz', quizRoutes);
    app.listen(PORT, () => {
        console.log(`REST Server is running on Port ${PORT}`);
    });
}

async function initGraphQLServer() {
    console.log("AWAIT GRAPHQL SERVER");
    const app = express();
    app.use(cors());
    dotenv.config();
    const apolloServer = new ApolloServer({
        typeDefs, resolvers
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({app});
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
