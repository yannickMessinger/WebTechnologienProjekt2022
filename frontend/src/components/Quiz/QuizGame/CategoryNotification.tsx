import { useSubscription } from "@apollo/client";
import React from "react";
import { NEW_CATEGORY_ADDED } from "../../../graphql/Subscription";

interface Props {
  newCategory:string
  
}

export const CategoryNotification = ({newCategory}:Props) => {
  
  

 
  return (
    <div>
      
        
          <p>Kategorie der zuletzt hinzugefügten Frage: "{newCategory}"</p>
        
      
    </div>
  );
};
