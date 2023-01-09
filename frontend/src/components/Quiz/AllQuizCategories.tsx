import React, { useEffect, useState } from "react";

import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_AVAILABLE_QUIZ_CATEGORIES,
  GET_ALL_QUESTIONS_TO_CATEGORY,
} from "../../graphql/Query";

import {NEW_CATEGORY_ADDED} from "../../graphql/Subscription"

export const AllQuizCategories = () => {
  const { data, loading, error } = useQuery(GET_AVAILABLE_QUIZ_CATEGORIES);
  
  const update = useSubscription(NEW_CATEGORY_ADDED,{
   
  }).data.newQuestionCategory

  const [chooseCategory, setChooseCategory] = useState("");
  const categories = data?.categories;
  console.log(update)

  console.log(chooseCategory);

  const allCategorys = useQuery(GET_ALL_QUESTIONS_TO_CATEGORY, {
    variables: { category: chooseCategory },
    onCompleted: (data) => {
      console.log("data", data);
      console.log(update)
    },
  });

  return (
    <div>
      {loading ? (
        <div>
          <h3>LOADING</h3>
        </div>
      ) : (
        <div>
          <select
            name="category"
            onChange={(e: any) => {
              setChooseCategory(e.target.value);
              console.log("choose");
            }}
          >
            {categories.map((category: any) => (
              <option key={category.id} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
