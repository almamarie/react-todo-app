import React, { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext({
  user: {},
  token: "",
  isLoggedIn: false,
  isLoading: false,
});

export const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({
    token: null,
    isLoggedIn: false,
    user: {},
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const verifyAuth = useCallback(async () => {
    console.log("Verifying User: ");
    setIsLoading(true);
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      if (!auth || !auth.token) {
        throw new Error();
      }

      const response = await fetch(`${API_BASE_URL}/auth/verify-auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();
      console.log("data: ", data);
      if (!response.ok || !data.success) {
        throw new Error();
      }

      setAuth({ isLoggedIn: true, token: auth.token, user: auth.user });
      console.log("User verified: ", auth);
    } catch (error) {
      console.log("Error: ", error);
      setAuth({ isLoggedIn: false, token: null });
      console.log("User not verified");
      navigate("/auth/signin");
    }
    setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
