import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from "express";
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import mongoose from 'mongoose';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import { resolvers } from "./graphQL/schema/resolvers.js";
import { typeDefs } from "./graphQL/schema/typedefs.js";


const startServer = async () => {

  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });


  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
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

  await mongoose.connect('mongodb://0.0.0.0:27017/todo-db');


  await server.start();

  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));






  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);



  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });

}

startServer()
