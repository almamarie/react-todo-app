import React, { useState } from "react";
import Input from "../ui/Input";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/api";
import PasswordInput from "../ui/PasswordInput";

const SignIn = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok || data.status === false) {
      setError(true);
      return;
    }
    setError(false);
    localStorage.setItem("auth", JSON.stringify(data.body));
    navigate("/todos");
  };

  const emailChangeHandler = (email) => {
    setCredentials((prev) => {
      return { ...prev, email };
    });
  };

  const passwordChangeHandler = (password) => {
    setCredentials((prev) => {
      return { ...prev, password };
    });
  };
  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <h2 className={styles.h2}>Sign In</h2>
      <div className={styles.inputs}>
        <Input
          type="text"
          name="email"
          onChange={emailChangeHandler}
          required={true}
        />
        <PasswordInput
          name="password"
          onChange={passwordChangeHandler}
          value={credentials.password}
          required={true}
        />
      </div>

      {error && (
        <span className={styles.error}>
          incorrect email and password combination
        </span>
      )}
      <div className={styles["button-wrapper"]}>
        <button type="submit" className={styles.button}>
          Sign in
        </button>
      </div>

      <p className={styles["dont-have-account"]}>
        Don't have an account?{" "}
        <span
          className={styles["signup-link"]}
          onClick={props.onChangeSwitchSignUp}
        >
          create one
        </span>
      </p>
    </form>
  );
};

export default SignIn;
