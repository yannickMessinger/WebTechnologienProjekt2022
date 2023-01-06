import { gql } from "@apollo/client";

export const GET_QUIZ_CATEGORIES = gql`
    query Query {
    categories
  }
`;
