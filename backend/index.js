// import typedefs from "./graphQL/schema/typedefs.js";
// import resolvers from "./graphQL/schema/resolvers.js";
// import {graphqlHTTP} from "express-graphql";
// import mongoose from "mongoose";
// import express from "express"       //Import the express dependency
// const app = express();              //Instantiate an express app, the main work horse of this server
// const port = 4000;                  //Save the port number where your server will be listening
//
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//
// //Idiomatic expression in express to route and respond to a client request
// app.get('/', (req, res) => {        //get requests to the root ("/") will route here
//     res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
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
// app.use('/graphql', graphqlHTTP({
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