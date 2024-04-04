import React, { useState } from "react";
import styles from "./AuthPage.module.css"
import SignIn from "../../components/auth/SignIn";
import SignUp from "../../components/auth/SignUp";

const AuthPage = () => {
  const [pageName, setPageName] = useState("sign in");

  const changePageType = (pageName) => {
    return () => {
      console.log("Here", pageName);
      setPageName(pageName);
    };
  };

  return (
    <div className={styles.wrapper}>
      {pageName === "sign in" ? (
        <SignIn onChangeSwitchSignUp={changePageType("sign up")} />
      ) : (
        <SignUp onChangeSwitchSignUp={changePageType("sign in")} />
      )}
    </div>
  );
};

export default AuthPage;
