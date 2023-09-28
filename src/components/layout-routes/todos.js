import { Outlet } from "react-router-dom";
import { TodoContextProvider } from "../../context/todo-context";

const TodosContextLayout = () => {
  return (
    <TodoContextProvider>
      <Outlet />
    </TodoContextProvider>
  );
};

export default TodosContextLayout;
