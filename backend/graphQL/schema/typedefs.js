import {gql} from "apollo-server-express";

export const typeDefs = gql`
    type Question {
        _id: String,
        quizId:String,
        question_content: String,
        possible_answers: [String],
        correct_answer: String,
        category: String,
        hint: String,
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
    type Subscription {
        newQuestionCategory: String
    }
`


