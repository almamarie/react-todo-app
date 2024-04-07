import React, { useState } from "react";
import Input from "../ui/Input";
import signIntyles from "./SignIn.module.css";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/api";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ status: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);
        return;
      }
      setError({ status: false, message: "" });
      // localStorage.setItem("auth", JSON.stringify(data.body));
      navigate("/auth/signin");
    } catch (err) {
      console.log("Error: ", err);
      setError({
        status: true,
        message: "Error creating user. try again later",
      });
    }
    setIsLoading(false);
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
      <h2 className={signIntyles.h2}>Create Account</h2>
      <div className={signIntyles.inputs}>
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

      {error && <span className={signIntyles.error}>{error.message}</span>}
      <div className={signIntyles["button-wrapper"]}>
        <Button type="submit">Create account</Button>
      </div>

      {isLoading && (
        <div className={styles["loading-wrapper"]}>
          <Spinner />
        </div>
      )}

      <p className={signIntyles["dont-have-account"]}>
        Have an account?{" "}
        <Link
          to={"/auth/signin"}
          className={signIntyles["signup-link"]}
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
