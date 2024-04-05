import { Outlet } from "react-router-dom";
import { TodoContextProvider } from "../../context/todo-context";
import { AuthContextProvider } from "../../context/auth-context";

const TodosContextLayout = () => {
  return (
    <AuthContextProvider>
      <TodoContextProvider>
        <Outlet />
      </TodoContextProvider>
    </AuthContextProvider>
  );
};

export default TodosContextLayout;
