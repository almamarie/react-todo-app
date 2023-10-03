import React, { useContext, useState } from "react";
import styles from "./TodoItem.module.css";
import { extractDateAndTime, isAMorPM } from "../utils/date-time";
import Icons from "./Icons";
import UpdateTodo from "./update-todo/UpdateTodo";
import TodoContext from "../context/todo-context";

const TodoItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(false);
  const { todo } = props;
  const [date, time] = extractDateAndTime(todo.deadline);
  const amOrPm = isAMorPM(todo.deadline);
  const todoCtx = useContext(TodoContext);

  const { todoId } = todo;

  const toggleShowDetails = () => {
    setShowDetails((prev) => {
      return !prev;
    });
  };

  const toggleUpdateHandler = () => {
    setUpdateTodo((prev) => !prev);
  };

  const completeTodo = () => {
    todoCtx.completeTodo({ completed: !todo.completed, todoId: todo.todoId });
  };

  if (updateTodo) {
    return <UpdateTodo onCancel={toggleUpdateHandler} todo={todo} />;
  }

  return (
    <li
      className={`${styles.li} ${
        todo.completed ? styles["todo--complete"] : styles["todo--not-complete"]
      }`}
    >
      <header className={styles.header}>
        <span className={styles.title}>{todo.title}</span>
        <div className={styles.deadline}>
          <span>{`${date} ${time} ${amOrPm}`}</span>
        </div>

        <div className={styles.icons}>
          <Icons
            todoId={todoId}
            onShowDetails={toggleShowDetails}
            onUpdate={toggleUpdateHandler}
          />
        </div>
      </header>

      {showDetails && (
        <div className={styles.details}>
          <span>{todo.details}</span>
          <div className={styles["complete-wrapper"]}>
            <span
              className={styles.completed}
            >{`Completed: ${todo.completed}`}</span>
            <button
              type="button"
              className={styles["complete-btn"]}
              onClick={completeTodo}
            >{`Set ${todo.completed ? "complete" : "not completed"}`}</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
