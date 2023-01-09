import { gql } from "@apollo/client";

export const NEW_CATEGORY_ADDED = gql`
        subscription onNewQuestionAdded {
        newQuestionCategory
  }
`;