import React, { useState } from "react";
import { IQuizquestion } from "../../../typings/Quizquestion";
import css from "./QuizQuestion.module.css";

interface QuizQuestionProps {
    questions: IQuizquestion[]
}

export const QuizQuestion = (props:QuizQuestionProps) => {
    const [index, setIndex] = useState(0);
    console.log(props.questions);
    const questions = props.questions;

    const checkAnswer = (i: string) => {
        console.log(i);

    }

    return (
        <>
        <h2 className={css.question}>{questions.at(index)?.question_content}</h2>
        <ul className={css.list}>
            {questions.at(index)?.possible_answers.map((item) => {
                return (
                    <li key={item} className={css.li_items} onClick={() => checkAnswer(item)}>
                        {item}
                    </li>
                )
            })}
        </ul>
        </>
    )
}
