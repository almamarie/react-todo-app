import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Todo.module.css";
import Todos from "./Todos";

const Todo = () => {
  const [user, setUser] = useState({});
  const tokenRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.token) {
      navigate("/signin");
    } else {
      tokenRef.current = auth.token;
      setUser(auth.user);
    }
  }, [navigate]);
  return (
    <div>
      <h1 className={styles.heading}>React Todo App</h1>
      <div className={styles["create-todo"]}>
        <input
          className={styles.input}
          type="text"
          placeholder="Create a new todo"
          required
        />
        <button className={styles.button} type="button">
          Add
        </button>
      </div>
      <Todos user={user} token={tokenRef.current} />
    </div>
  );
};

export default Todo;
