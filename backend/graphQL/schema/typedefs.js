import {gql} from "apollo-server-express";

const typeDefs = gql`
    type Question {
        _id: String,
        question: String,
        possibleAnswers: [String],
        correctAnswer: String,
        category: String,
        hint: [String],
    }
    type Query {
        quizCategory (category: String): [Question]
        categories: [String]
        hint (questionId: String): String
    }
    type Mutation {
        createQuestion (
            question: String,
            possibleAnswers: [String],
            correctAnswer: String,
            category: String,
            hint: String
        ) : Question
    }
`

export default typeDefs;
