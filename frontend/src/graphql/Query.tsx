import { gql } from "@apollo/client";

export const GET_AVAILABLE_QUIZ_CATEGORIES = gql`
    query Query {
    categories
  }
`;

export const GET_ALL_QUESTIONS_TO_CATEGORY = gql`
query QuizCategory($category: String) {
  quizCategory(category: $category) {
    category
    correct_answer
    hint
    possible_answers
    question_content
  }
}

`;



