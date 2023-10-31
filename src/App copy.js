import { useContext, useState } from "react";
import InputBox from "./components/InputBox";
import List from "./components/List";
import { DarkModeContext } from "./context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [task, setTask] = useState([]);

  const addTask = (value) => {
    setTask([...task, value]);
  };

  const deletedTask = (e) => {
    setTask((prev) => prev.filter((x) => x.text !== e));
  };

  const handleUpdate = (id) => {
    setTask((todolist) =>
      todolist.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const hadleEdit = (id, text) => {
    setTask((todolist) =>
      todolist.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
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

export default App;
