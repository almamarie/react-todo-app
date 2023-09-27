import React, { useCallback, useEffect, useState } from "react";
import styles from "./Todos.module.css";
import { API_BASE_URL } from "../utils/api";
import Spinner from "./ui/Spinner";
import TodoItem from "./TodoItem";

const Todos = (props) => {
  const [todos, setTodos] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = props.user;
  const { token } = props;
  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!userId) {
        throw new Error();
      }
      const response = await fetch(`${API_BASE_URL}/todo/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error();
      } else {
        setTodos({ total: data.body.total, todos: data.body.data });
        setError(false);
      }
      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [userId, token]);

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
