import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="app-wrapper">
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/todos" />} />
            <Route path="/todos" element={<Todo />} />
            <Route path="/signin" element={<Auth />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
