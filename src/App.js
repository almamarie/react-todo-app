import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import TodosContextLayout from "./components/layout-routes/todos";
import TodoPage from "./pages/todo/TodoPage";
import AuthPage from "./pages/auth/AuthPage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Navigate to="todos" replace />,
        },
        {
          element: <TodosContextLayout />,
          children: [
            {
              path: "todos",
              element: <TodoPage />,
            },
          ],
        },
        {
          path: "/auth/:pageType",
          element: <AuthPage />,
        },
      ],
    },
  ]);
  return (
    <div className="app-wrapper">
      <div className="app">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
