import { gql } from "apollo-server-express";
const typedefs = gql`
    type Quiz {
        quiz_id: ID
        quizquestions: [Quizquestions]
        category: [String]
    }
    type Quizquestions {
        question_id: ID
        question_content: String
        possible_answers: [Answer]
        correct_answer: Answer
        hints: [String]
    }
    type Answer {
        answer_id: ID
        answer_content: String
    }
    type Query {
        getRandomCategories: [String]
        getRandomQuizByCategory(category: String): Quiz
    }
`
