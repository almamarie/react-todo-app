import React, { useState } from "react";
import styles from "./TodoItem.module.css";
import { extractDateAndTime, isAMorPM } from "../utils/date-time";
import Icons from "./Icons";

const TodoItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const { todo } = props;
  const [date, time] = extractDateAndTime(todo.deadline);
  const amOrPm = isAMorPM(todo.deadline);

  const toggleShowDetails = () => {
    setShowDetails((prev) => {
      return !prev;
    });
  };

  return (
    <li className={styles.li} onClick={toggleShowDetails}>
      <header className={styles.header}>
        <span>{todo.title}</span>
        <div className={styles.deadline}>
          <span>{`${date} ${time} ${amOrPm}`}</span>
        </div>

        <Icons />
      </header>

      {showDetails && (
        <div className={styles.details}>
          <span>{todo.details}</span>
          <span
            className={styles.completed}
          >{`Completed: ${todo.completed}`}</span>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
