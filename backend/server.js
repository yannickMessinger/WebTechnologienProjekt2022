import express from "express";
import typeDefs from "./graphql/schema/typedefs.js";
import resolvers from "./graphql/schema/resolvers.js";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

async function initServer() {
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
    const PORT = process.env.PORT || 4000;
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/quiz',
            {useNewUrlParser: true}
        );
        console.log("mongodb connected");
    } catch (error) {
        console.log("mongodb error:", error);
    }
    app.listen(PORT, () => console.log(`GraphQL Server running on Port ${PORT}`))
}
initServer();
