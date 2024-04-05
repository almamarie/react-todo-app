import styles from "./AuthPage.module.css";
import SignIn from "../../components/auth/SignIn";
import SignUp from "../../components/auth/SignUp";
import { useParams } from "react-router-dom";

const AuthPage = () => {
  const { pageType } = useParams();

  return (
    <div className={styles.wrapper}>
      {pageType === "signin" ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default AuthPage;
