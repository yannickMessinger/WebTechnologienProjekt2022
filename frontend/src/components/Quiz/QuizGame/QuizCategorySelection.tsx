import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_ALL_QUESTIONS_TO_CATEGORY,
  GET_AVAILABLE_QUIZ_CATEGORIES,
} from "../../../graphql/Query";
import css from "./QuizCategorySelection.module.css";
import { IQuizquestion } from "../../../typings/Quizquestion";
import { CategoryNotification } from "./CategoryNotification";
import { NEW_CATEGORY_ADDED } from "../../../graphql/Subscription";
import bild1 from "../../../assets/circle_notifications_FILL0_wght400_GRAD0_opsz48.png"
import bild2 from "../../../assets/notification_important_FILL0_wght400_GRAD0_opsz48.png"


interface Props {
  displayQuestions: (questions: IQuizquestion[]) => void;
  startPlaying: (value: boolean) => void;
}

interface OptionProps {
  value: string;
  label: string;
}

export const QuizCategorySelection = (props: Props) => {
  
  

   
  
  const { data,refetch } = useQuery(GET_AVAILABLE_QUIZ_CATEGORIES);
  const [selected, setSelected] = useState("");

  const { data:newCategory, loading, error } = useSubscription(NEW_CATEGORY_ADDED, {
    onData:(options => {
      console.log(options.data);
      refetch();
    })
  });

  /*useEffect(() =>{
    refetch()
  },[newCategory])
 */

  let categories = Array<OptionProps>();
  if (data !== undefined) {
    data.categories.map((item: string) => {
      categories.push({ value: item, label: item });
    });
  }

  const allCategorys = useQuery(GET_ALL_QUESTIONS_TO_CATEGORY, {
    variables: { category: selected },
    onCompleted: (data) => {
      //console.log("data", data);
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
  }

  const Notification = () => {
    if (newCategory !== undefined) {
      return (
        <>
          <img src={bild2} />
          <CategoryNotification newCategory={newCategory.newQuestionCategory}/>
          <br />
        </>
      );
    } else {
      return (
        <>
          <img src={bild1} />
          <br />
        </>
      );
    }
  };

  return (
    <>
      <Notification/>
      <label htmlFor="category">Wähle eine Kategorie</label>
      <Select options={categories} onChange={handleSelect} />
      <button className={css.button} onClick={e => handleClick(e)}>OK</button>
    </>
  );
};
