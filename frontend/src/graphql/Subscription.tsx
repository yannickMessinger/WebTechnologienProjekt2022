import { gql } from "@apollo/client";

export const NEW_CATEGORY_ADDED = gql`
  subscription Subscription {
    newQuestionCategory
  }
`;
