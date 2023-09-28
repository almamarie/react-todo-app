import React, { useContext } from "react";
import styles from "./Todos.module.css";
import Spinner from "./ui/Spinner";
import TodoItem from "./TodoItem";
import TodoContext from "../context/todo-context";

const Todos = (props) => {
  const todosCtx = useContext(TodoContext);
  console.log(todosCtx);
  const fetchTodos = () => {
    todosCtx.fetchTodos();
  };

  return (
    <div className={styles.wrapper}>
      {todosCtx.error === true && (
        <div className={styles["error-wrapper"]}>
          <span className={styles.error}>
            error fetching todos.
            <br />
            <button className={styles["replay-button"]} onClick={fetchTodos}>
              Retry
            </button>
          </span>
        </div>
      )}

      {todosCtx.isLoading && (
        <div className={styles["loading-wrapper"]}>
          <Spinner />
        </div>
      )}
      {todosCtx.totalTodos > 0 && (
        <ul className={styles.todos}>
          <span
            className={styles["number-of-todos"]}
          >{`showing ${todosCtx.totalTodos} todos`}</span>
          {todosCtx.todos.map((to, index) => {
            return <TodoItem key={index} todo={to} userId token />;
          })}
        </ul>
      )}
    </div>
  );
};

export default Todos;
