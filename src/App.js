import { useContext, useReducer } from "react";
import InputBox from "./components/InputBox";
import List from "./components/List";
import { DarkModeContext } from "./context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import todoReducer from "./reducer/todoReducer";

function App() {
  const [task, dispatch] = useReducer(todoReducer, initTodo);

  const addTask = (value) => {
    dispatch({type:'ADD', value});
  };

  const deletedTask = (todolist) => {
    dispatch({type:'DELETE', todolist})
  };

  const handleUpdate = (id) => {
    dispatch({type:'UPDATE', id})
  };

  const hadleEdit = (id, text) => {
    dispatch({type:'EDIT', id, text});
  };
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const toggleClass = darkMode ? "dark" : "light";
  return (
    <>
      <div className={`wrap ${toggleClass}`}>
        {/* 다크모드 */}
        <div className="theme-switcher">
          <p>
            {darkMode ? (
              <FontAwesomeIcon icon={faMoon} onClick={() => toggleDarkMode()} className="moonIcon"/>
            ) : (
              <FontAwesomeIcon icon={faSun} onClick={() => toggleDarkMode()} className="sunIcon"/>
            )}
          </p>
        </div>

        {/* 투두리스트 */}
        <div className="container">
          <header>
            <h1>TODO LIST</h1>
            <div className="alert-message"></div>
            <InputBox addTask={addTask} task={task} />
          </header>

          <table className="table w-full">
            <thead>
              <tr>
                <th width="30%">Task</th>
                {/* <th>Due Date</th> */}
                <th width="20%">Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="todos-list-body">
              <List
                todo={task}
                deletedTask={deletedTask}
                handleUpdate={handleUpdate}
                handleEdit={hadleEdit}
              />
            </tbody>
          </table>
        </div>

        {/* 카피라이터 */}
        <div className="author-text">
          <p>
            Made with ❤️ by
            <a
              href="https://github.com/yujini-lee"
              target="_blank"
              rel="noreferrer"
            >
              <b> yujini-lee</b>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
const initTodo = [{id:'1', text:'화이팅', isDone:false}];

export default App;
