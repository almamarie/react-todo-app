import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
  const changeHandler = (event) => {
    const value = event.target.value;
    props.onChange(value);
  };

  if (props.textarea) {
    return (
      <textarea
        className={` ${styles.input} ${styles.textarea} ${props.className}`}
        name={props.name}
        required={props.required || false}
        placeholder={props.name}
        value={props.value}
        onChange={changeHandler}
      />
    );
  }
  return (
    <input
      className={` ${styles.input} ${props.className}`}
      type={props.type}
      name={props.name}
      required={props.required || false}
      placeholder={props.name}
      value={props.value}
      onChange={changeHandler}
    />
  );
};

export default Input;
