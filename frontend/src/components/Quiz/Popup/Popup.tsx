import React from "react";
import css from "./Popup.module.css";

interface PopupProps {
    text: string;
    closePopup: () => void;
}
export const Popup = (props:PopupProps) => {
  return (
    <div className={css.popup}>
      <div className={css.popup_inner}>
        <h2>{props.text}</h2>
        <button onClick={props.closePopup}>schliessen</button>
      </div>
    </div>
  );
};
