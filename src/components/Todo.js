import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [user, setUser] = useState({});
  const tokenRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.token) {
      navigate("/signin");
    } else {
      tokenRef.current = auth.token;
      setUser(auth.user);
    }
  }, []);
  return <div>{user.firstName}</div>;
};

export default Todo;
