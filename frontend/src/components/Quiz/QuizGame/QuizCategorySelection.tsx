import React, { useState } from "react";
import Select, { OptionsOrGroups } from "react-select";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../../graphql/Query";
import { useQuiz } from "../../../hooks/useQuiz";

interface OptionProps {
  value: string;
  label: string;
}

export const QuizCategorySelection = () => {
  const { data } = useQuery(GET_CATEGORIES);
  const [selected, setSelected] = useState("");

  let categories = Array<OptionProps>();
  if (data !== undefined) {
    data.categories.map((item: string) => {
      categories.push({ value: item, label: item });
    });
  }
  const handleSelect = (selectedOption: OptionProps | null) => {
    if (selectedOption !== null) {
      setSelected(selectedOption.value);
    }
  };
  return (
    <>
      <form>
        <label htmlFor="category">Wähle eine Kategorie</label>
        <Select options={categories} onChange={handleSelect} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};
