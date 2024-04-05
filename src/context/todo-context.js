import React, { useCallback, useEffect, useState } from "react";
import useTodo from "../hooks/use-todo";

const TodoContext = React.createContext({
  todos: [],
  totalTodos: 0,
  auth: { user: {}, token: "", isLoggedIn: false },
  error: null,
  fetchTodos: () => {},
});

export const TodoContextProvider = (props) => {
  const [auth, setAuth] = useState({
    token: null,
    isLoggedIn: false,
    user: {},
  });
  const [todos, setTodos] = useState([]);
  const [totalTodos, setTotalTodos] = useState(0);

  const {
    getAllTodos,
    deleteTodo,
    createNewTodo: createNewTodoCtx,
    updateTodo: updateTodoCtx,
    completeTodo: completeTodoCtx,
    error: useTodoError,
    isLoading: useTodoIsLoading,
  } = useTodo();

  const userId = auth.user.userId;
  const { token } = auth;

  const applyData = (todoData) => {
    setTodos((prev) => {
      return todoData.todos;
    });

    setTotalTodos((prev) => {
      return todoData.total;
    });
  };

  const fetchTodos = useCallback(async () => {
    await getAllTodos(userId, token, applyData);
  }, [getAllTodos, token, userId]);

  const deleteTodoHandler = async (todoId) => {
    const requestData = { userId, todoId, token };
    await deleteTodo(requestData, (updatedTodos) => {
      setTodos(updatedTodos.data);

      setTotalTodos(updatedTodos.total);
    });
  };

  const createNewTodo = async (newTodoData, applyData) => {
    const requestData = { userId, token, todoData: newTodoData };
    await createNewTodoCtx(requestData, (updatedTodos) => {
      setTodos(updatedTodos.data);
      setTotalTodos(updatedTodos.total);
      applyData();
    });
  };

  const updateTodo = async (updatedTodo, applyData) => {
    const requestData = {
      userId,
      todoId: updatedTodo.todoId,
      token,
      todoData: updatedTodo,
    };
    // console.log(requestData);

    await updateTodoCtx(requestData, (updatedTodos) => {
      setTodos(updatedTodos.data);
      setTotalTodos(updatedTodos.total);
      applyData();
    });
  };

  const completeTodo = async (updatedTodo, applyData) => {
    // console.log("Updated todo: ", updatedTodo);
    const requestData = {
      userId,
      todoId: updatedTodo.todoId,
      token,
      todoData: { completed: updatedTodo.completed },
    };

    await completeTodoCtx(requestData, (updatedTodos) => {
      setTodos(updatedTodos.data);
      setTotalTodos(updatedTodos.total);
      applyData && applyData();
    });
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.token) {
      setAuth({ isLoggedIn: false, token: null });
    } else {
      setAuth({ isLoggedIn: true, token: auth.token, user: auth.user });
      fetchTodos();
    }
  }, [fetchTodos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        totalTodos,
        auth,
        error: useTodoError,
        isLoading: useTodoIsLoading,
        fetchTodos,
        deleteTodo: deleteTodoHandler,
        createNewTodo,
        updateTodo,
        completeTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
