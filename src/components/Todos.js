import React, { useCallback, useEffect, useState } from "react";
import styles from "./Todos.module.css";
import Spinner from "./ui/Spinner";
import TodoItem from "./TodoItem";
import useTodo from "../hooks/use-todo";

const Todos = (props) => {
  const [todos, setTodos] = useState({});
  const { getAllTodos, error, isLoading } = useTodo();

  const { userId } = props.user;
  const { token } = props;

  const applyData = (todoData) => {
    setTodos(todoData);
  };

  const fetchTodos = useCallback(() => {
    getAllTodos(userId, token, applyData);
  }, [getAllTodos, token, userId]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className={styles.wrapper}>
      {error && (
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

      {isLoading && (
        <div className={styles["loading-wrapper"]}>
          <Spinner />
          <span>Fetching todos</span>
        </div>
      )}
      {todos.total > 0 && (
        <ul className={styles.todos}>
          <span
            className={styles["number-of-todos"]}
          >{`showing ${todos.total} todos`}</span>
          {todos.todos.map((to, index) => {
            return <TodoItem key={index} todo={to} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default Todos;
