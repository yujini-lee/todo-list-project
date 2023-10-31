import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCheck, faTrash, faFilePen } from "@fortawesome/free-solid-svg-icons";

function List({ todo, deletedTask, handleUpdate, handleEdit }) {
  const [editIndex, setEditIndex] = useState();
  const [text, setText] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editIndex]);

  const toggleChange = (e) => {
    setText(e.target.value);
  };

  const edit = (idx) => {
    setEditIndex(idx);
    setText(todo[idx].text);
  };

  const saveEdit = (idx) => {
    setEditIndex();
    handleEdit(idx, text);
  };

  return (
    <>
      {todo.length === 0 ? (
        <tr>
          <td colSpan="3" className="text-center">
            No task found
          </td>
        </tr>
      ) : (
        todo.map((x, idx) => (
          <tr className="todo-item" key={x.id}>
            {editIndex === idx ? (
              <td>
                <input
                  type="text"
                  value={text || x.text} 
                  onChange={toggleChange}
                  ref={inputRef}
                />
              </td>
            ) : (
              <td>{x.text}</td>
            )}
            <td>{x.isDone ? "complete" : "pending"}</td>
            <td>
              {editIndex === idx ? (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => saveEdit(x.id)}
                >
                  <FontAwesomeIcon icon={faFilePen} />
                </button>
              ) : (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => edit(idx)}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              )}
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleUpdate(x.id)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={() => deletedTask(x.text)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))
      )}
    </>
  );
}

export default List;
