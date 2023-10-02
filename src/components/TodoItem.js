import React, { useState } from "react";
import styles from "./TodoItem.module.css";
import { extractDateAndTime, isAMorPM } from "../utils/date-time";
import Icons from "./Icons";
import UpdateTodo from "./update-todo/UpdateTodo";

const TodoItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(false);
  const { todo } = props;
  const [date, time] = extractDateAndTime(todo.deadline);
  const amOrPm = isAMorPM(todo.deadline);

  const { todoId } = todo;

  const toggleShowDetails = () => {
    setShowDetails((prev) => {
      return !prev;
    });
  };

  const toggleUpdateHandler = () => {
    setUpdateTodo((prev) => !prev);
  };

  if (updateTodo) {
    return <UpdateTodo onCancel={toggleUpdateHandler} todo={todo} />;
  }

  return (
    <li className={styles.li}>
      <header className={styles.header}>
        <span>{todo.title}</span>
        <div className={styles.deadline}>
          <span>{`${date} ${time} ${amOrPm}`}</span>
        </div>

        <Icons
          todoId={todoId}
          onShowDetails={toggleShowDetails}
          onUpdate={toggleUpdateHandler}
        />
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
