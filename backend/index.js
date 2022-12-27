// import typedefs from "./graphQL/schema/typedefs.js";
// import resolvers from "./graphQL/schema/resolvers.js";
// import {graphqlHTTP} from "express-graphql";
// import mongoose from "mongoose";
// import express from "express";       //Import the express dependency
import mongoose from "mongoose";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";

// const app = express();
              //Instantiate an express app, the main work horse of this server
// const port = 4000;                  //Save the port number where your server will be listening
//
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

mongoose.connect('mongodb://127.0.0.1:27017/quiz', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection establshed successfully");
})


//Socket io stuff

const io = new Server(server, {
    cors:{
        origin:"*",
        methods: ["GET", "POST","PUT","DELETE"]
    }
})

io.on("connection", (socket) => {
    console.log(`User connected with SocketID: ${socket.id}`);

    
    socket.on("chat_message_frontend", (message) => {
        //to all connected clients
        
       io.emit("chat_message_backend", { username:message.username, payload: message.payload})
    });

    /*
    socket.on("chat_message_frontend", (message) => {
        //To all connected clients except the sender
       socket.broadcast.emit("chat_message_backend", {payload: message.payload})
    });*/

    socket.on("disconnect", () => {
        console.log("User disconnected :(");
    });
})


//
// //Idiomatic expression in express to route and respond to a client request
// app.get('/', (req, res) => {        //get requests to the root ("/") will route here
//     //res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
//                                                         //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
// });
//
// app.post('/auth/signup', (req, res) => {
//
// });
//
// app.post('/auth/signin', (req, res) => {
//
// });
//
// server.use('/graphql', graphqlHTTP({
//     schema: typedefs,
//     rootValue: resolvers,
//     graphiql: true,
// }))
//
// const mongoDBuri = "mongodb://localhost:27017/quiz";
// try {
//     await mongoose.connect(
//         mongoDBuri,
//         {useNewUrlParser: true}
//     );
//     console.log('Mongoose connected');
// } catch (error) {
//     console.log(`Error: ${error}`);
// }
//
// app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
//     console.log(`Now listening on port ${port}`);
// });