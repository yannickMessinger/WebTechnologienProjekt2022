import React, { useEffect, useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_QUIZ_CATEGORIES } from "../../graphql/Query";

export const AllQuizCategories = () => {
  const { data, loading, error } = useQuery(GET_QUIZ_CATEGORIES);
  const [chooseCategory, setChooseCategory] = useState("")

  //console.log(data)
  //eig ned so geil wenn da immer ganze component rendert....
  const categories = data?.categories;
  //console.log(categories);
 console.log(chooseCategory)

  return (
    <div>
      {loading ? (
        <div>
            <h3>LOADING</h3>
        </div>
      ) : (
        <div>
          <select name="category" onChange={(e:any) => {setChooseCategory(e.target.value)}}>
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
