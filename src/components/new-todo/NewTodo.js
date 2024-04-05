import React, { useContext, useState } from "react";
import styles from "./NewTodo.module.css";
import Input from "../ui/Input";
import TodoContext from "../../context/todo-context";

const NewTodo = (props) => {
  const todoCtx = useContext(TodoContext);

  const [showNewTodoForm, setShowNewTodoForm] = useState(false);
  const [newTodoData, setNewTodoData] = useState({
    title: "",
    deadline: "",
    details: "",
  });

  const today = new Date();
  const minDate = today.toISOString();

  const updateTodoData = (fieldName) => {
    return (eventValue) => {
      setNewTodoData((prev) => {
        const updatedTodoData = {
          ...newTodoData,
          [fieldName]: eventValue,
        };
        return updatedTodoData;
      });
    };
  };

  const toggleShowTodoForm = () => {
    setShowNewTodoForm((prev) => !prev);
    props.onToggleLogoutBtn();
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    todoCtx.createNewTodo({ ...newTodoData }, toggleShowTodoForm);
  };

  if (!showNewTodoForm) {
    return (
      <button
        className={styles["new-todo-btn"]}
        type="button"
        onClick={toggleShowTodoForm}
      >
        New Todo
      </button>
    );
  }

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <h3 className={styles.heading}>New Todo</h3>
      <header className={styles.header}>
        <Input
          className={`${styles.input} ${styles["input--title"]}`}
          type="text"
          name="title"
          required
          onChange={updateTodoData("title")}
        />
        <div className={styles.deadline}>
          <Input
            className={`${styles.input} ${styles["input--date"]}`}
            type="datetime-local"
            name="deadline"
            min={minDate}
            required
            onChange={updateTodoData("deadline")}
          />
        </div>
      </header>

      <div className={styles.details}>
        <Input
          textarea
          className={styles.textarea}
          name="details"
          onChange={updateTodoData("details")}
        />
      </div>

      <div className={styles.buttons}>
        <button
          className={styles["cancel-todo-btn"]}
          type="button"
          onClick={toggleShowTodoForm}
        >
          Cancel
        </button>
        <button className={styles["add-todo-btn"]} type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default NewTodo;
