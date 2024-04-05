import React, { useState } from "react";
import Input from "../ui/Input";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/api";
import PasswordInput from "../ui/PasswordInput";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ status: false, message: "" });

  const navigate = useNavigate();

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      console.log("Credentials: ", credentials);
      const response = await fetch(`${API_BASE_URL}/user/new`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok || data.status === false) {
        setError({ status: true, message: data.body });
        return;
      }
      setError({ status: false, message: "" });
      localStorage.setItem("auth", JSON.stringify(data.body));
      navigate("/auth/signin");
    } catch (err) {
      console.log("Error: ", err);
      setError({
        status: true,
        message: "Error creating user. try again later",
      });
    }
  };

  const credentialsController = (credentialName) => {
    return (value) => {
      setCredentials((prev) => {
        const newData = { ...prev };
        newData[credentialName] = value;
        return newData;
      });
    };
  };
  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <h2 className={styles.h2}>Create Account</h2>
      <div className={styles.inputs}>
        <Input
          type="text"
          name="first name"
          onChange={credentialsController("firstName")}
          required={true}
        />

        <Input
          type="text"
          name="last name"
          onChange={credentialsController("lastName")}
          required={true}
        />

        <Input
          type="text"
          name="email"
          onChange={credentialsController("email")}
          required={true}
        />

        <PasswordInput
          name="password"
          onChange={credentialsController("password")}
          value={credentials.password}
          required={true}
        />
      </div>

      {error && <span className={styles.error}>{error.message}</span>}
      <div className={styles["button-wrapper"]}>
        <button type="submit" className={styles.button}>
          Create account
        </button>
      </div>

      <p className={styles["dont-have-account"]}>
        Have an account?{" "}
        <Link
          to={"/auth/signin"}
          className={styles["signup-link"]}
          onClick={props.onChangeSwitchSignUp}
        >
          sign in
        </Link>{" "}
        instead
      </p>
    </form>
  );
};

export default SignUp;
