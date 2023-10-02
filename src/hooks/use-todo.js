import { useCallback, useState } from "react";
import { API_BASE_URL } from "../utils/api";

const useTodo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getAllTodos = useCallback(async (userId, token, applyData) => {
    try {
      setIsLoading(true);
      if (!userId) {
        throw new Error();
      }
      const response = await fetch(`${API_BASE_URL}/todo/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error();
      } else {
        applyData({ total: data.body.total, todos: data.body.data });
        setError(false);
      }
      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  }, []);

  const deleteTodo = async (requestData, applyData) => {
    const { userId, todoId, token } = requestData;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/todo/${userId}/${todoId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error();
      } else {
        applyData(data.body);
        setError(false);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewTodo = async (requestData, applyData) => {
    const { userId, token } = requestData;
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/todo/${userId}/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData.todoData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error();
      } else {
        applyData(data.body);
        setError(false);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (requestData, applyData) => {
    const { userId, token, todoId } = requestData;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/todo/${userId}/${todoId}/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData.todoData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error();
      } else {
        applyData(data.body);
        setError(false);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const completeTodo = async (requestData, applyData) => {
    const { userId, token, todoId } = requestData;
    console.log(requestData);
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/todo/${userId}/${todoId}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData.todoData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      } else {
        applyData(data.body);
        setError(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getAllTodos,
    deleteTodo,
    createNewTodo,
    updateTodo,
    completeTodo,
  };
};

export default useTodo;

// Start building a beautiful house for yourself. Plan the house and get the building plans and architectural designs ready. Then Buy at least 4 acres of land in a quiet and beautiful place and start building the foundation of the house.
