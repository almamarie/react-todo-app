import React, { useContext, useState } from "react";
import styles from "./UpdateTodo.module.css";
import Input from "../ui/Input";
import TodoContext from "../../context/todo-context";

const UpdateTodo = (props) => {
  const { todo } = props;
  const todoCtx = useContext(TodoContext);
  const [newTodoData, setNewTodoData] = useState({
    ...todo,
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

  function datetimeLocal(datetime) {
    const dt = new Date(datetime);
    dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
    return dt.toISOString().slice(0, 16);
  }

  const finishUpdateHandler = () => {
    props.onCancel();
  };

  const formSubmitHandler = (event) => {
    console.log("Submitting data");
    event.preventDefault();
    todoCtx.updateTodo({ ...newTodoData }, finishUpdateHandler);
  };

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <h3 className={styles.heading}>Updating Todo</h3>
      <header className={styles.header}>
        <Input
          className={`${styles.input} ${styles["input--title"]}`}
          type="text"
          name="title"
          required
          value={newTodoData.title}
          onChange={updateTodoData("title")}
        />
        <div className={styles.deadline}>
          <Input
            className={`${styles.input} ${styles["input--date"]}`}
            type="datetime-local"
            name="deadline"
            min={minDate}
            required
            value={datetimeLocal(newTodoData.deadline)}
            onChange={updateTodoData("deadline")}
          />
        </div>
      </header>

      <div className={styles.details}>
        <Input
          textarea
          className={styles.textarea}
          name="details"
          value={newTodoData.details}
          onChange={updateTodoData("details")}
        />
      </div>

      <div className={styles.buttons}>
        <button
          className={styles["cancel-todo-btn"]}
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button
          className={styles["add-todo-btn"]}
          type="submit"
          onClick={formSubmitHandler}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UpdateTodo;
