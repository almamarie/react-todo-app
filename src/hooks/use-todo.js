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
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error();
      } else {
        applyData(data.success);
        setError(false);
      }
      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  return {
    isLoading,
    error,
    getAllTodos,
    deleteTodo,
  };
};

export default useTodo;
