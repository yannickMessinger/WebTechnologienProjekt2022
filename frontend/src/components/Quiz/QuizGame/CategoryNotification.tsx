import React from "react";

interface Props {
  newCategory: string;
}

export const CategoryNotification = ({ newCategory }: Props) => {
  return (
    <div>
      <p>Kategorie der zuletzt hinzugefügten Frage: "{newCategory}"</p>
    </div>
  );
};
