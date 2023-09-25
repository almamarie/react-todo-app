import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const changeHandler = (event) => {
    const value = event.target.value;
    props.onChange(value);
  };
  return (
    <input
      className={styles.input}
      type={props.type}
      name={props.name}
      required={props.required || false}
      placeholder={props.name}
      onChange={changeHandler}
    />
  );
};

export default Input;
