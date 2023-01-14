import React from "react";
import bild1 from "../../../assets/circle_notifications_FILL0_wght400_GRAD0_opsz48.png";
import bild2 from "../../../assets/notification_important_FILL0_wght400_GRAD0_opsz48.png";
import { CategoryNotification } from "./CategoryNotification";

interface NotficationProps {
  newCategory: any;
}
export const Notification = ({ newCategory }: NotficationProps) => {
  if (newCategory !== undefined) {
    return (
      <>
        <img src={bild2} />
        <CategoryNotification newCategory={newCategory.newQuestionCategory} />
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
