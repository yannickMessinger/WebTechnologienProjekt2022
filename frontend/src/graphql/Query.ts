import {gql} from "@apollo/client";

export const GET_CATEGORIES = gql`
    query categories {
        categories
    }`

export const GET_QUIZ_BY_CATEGORY = gql`
    query quizCategory($category: String) {
        quizCategory(category: $category) {
            _id
            question
            possibleAnswers
            correctAnswer
            hint
        }
    }`