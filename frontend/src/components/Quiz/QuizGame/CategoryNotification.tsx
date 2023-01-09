import { useSubscription } from "@apollo/client";
import React from "react";
import { NEW_CATEGORY_ADDED } from "../../../graphql/Subscription";

export const CategoryNotification = () => {
  const { data, loading, error } = useSubscription(NEW_CATEGORY_ADDED);

  console.log(data)
  return (
    <div>
      {loading ? (
        <div>listening</div>
      ) : (
        <div>
          <p>data received</p>
        </div>
      )}
    </div>
  );
};
