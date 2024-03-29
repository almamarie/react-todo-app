import { useContext, useState } from "react";
import styles from "./Icons.module.css";
import TodoContext from "../context/todo-context";

const Icons = (props) => {
  const [isShowingDetails, setIsShowingDetails] = useState(true);
  const todoCtx = useContext(TodoContext);
  const { todoId } = props;

  const deleteTodoHandler = () => {
    todoCtx.deleteTodo(todoId);
  };

  const toggleShowDetails = () => {
    setIsShowingDetails((prev) => !prev);
    props.onShowDetails();
  };

  return (
    <div className={styles.wrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`${styles.icon} ${styles.update}`}
        onClick={props.onUpdate}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`${styles.icon} ${styles.delete}`}
        onClick={deleteTodoHandler}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
      {isShowingDetails ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${styles.icon} ${styles.expand}`}
          onClick={toggleShowDetails}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${styles.icon} ${styles.collapse}`}
          onClick={toggleShowDetails}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      )}
    </div>
  );
};

export default Icons;

// const icons = {
//   expand: (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       className={`${styles.icon} ${styles.expand}`}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M12 4.5v15m7.5-7.5h-15"
//       />
//     </svg>
//   ),

//   collapse: (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       className={`${styles.icon} ${styles.collapse}`}
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
//     </svg>
//   ),
// };
