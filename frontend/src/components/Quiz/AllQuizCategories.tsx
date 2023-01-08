import React, { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import {
  GET_AVAILABLE_QUIZ_CATEGORIES,
  GET_ALL_QUESTIONS_TO_CATEGORY,
} from "../../graphql/Query";

export const AllQuizCategories = () => {
  const { data, loading, error } = useQuery(GET_AVAILABLE_QUIZ_CATEGORIES);
  //const {data,loading,error} = useQuery()
  const [chooseCategory, setChooseCategory] = useState("");
  const categories = data?.categories;

  console.log(chooseCategory);

  const allCategorys = useQuery(GET_ALL_QUESTIONS_TO_CATEGORY, {
    variables: { category: chooseCategory },
    onCompleted: (data) => {
      console.log("data", data);
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
              console.log("chhose");
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
