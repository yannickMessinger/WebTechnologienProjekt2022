import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_ALL_QUESTIONS_TO_CATEGORY,
  GET_AVAILABLE_QUIZ_CATEGORIES,
} from "../../../graphql/Query";
import css from "./QuizCategorySelection.module.css";
import { IQuizquestion } from "../../../typings/Quizquestion";
import { NEW_CATEGORY_ADDED } from "../../../graphql/Subscription";
import { Notification } from "./Notification";

interface Props {
  displayQuestions: (questions: IQuizquestion[]) => void;
  startPlaying: (value: boolean) => void;
}

interface OptionProps {
  value: string;
  label: string;
}

export const QuizCategorySelection = (props: Props) => {
  const { data, refetch } = useQuery(GET_AVAILABLE_QUIZ_CATEGORIES);
  const [selected, setSelected] = useState("");

  const { data: newCategory } = useSubscription(NEW_CATEGORY_ADDED, {
    onData: (options) => {
      refetch();
    },
  });

  useEffect(() => {
    refetch();
  }, [data]);

  let categories = Array<OptionProps>();
  if (data !== undefined) {
    data.categories.map((item: string) => {
      categories.push({ value: item, label: item });
    });
  }

  const allCategorys = useQuery(GET_ALL_QUESTIONS_TO_CATEGORY, {
    variables: { category: selected },
    onCompleted: (data) => {
      props.displayQuestions(data.quizCategory);
    },
  });

  const handleSelect = (selectedOption: OptionProps | null) => {
    if (selectedOption !== null) {
      setSelected(selectedOption.value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.startPlaying(true);
  };

  return (
    <>
      <Notification newCategory={newCategory} />
      <label htmlFor="category">Wähle eine Kategorie</label>
      <Select options={categories} onChange={handleSelect} />
      <button className={css.button} onClick={(e) => handleClick(e)}>
        OK
      </button>
    </>
  );
};
