import React, { useRef, useState, useEffect } from "react";

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
    handleEdit(idx, text); // Pass the updated text to handleEdit
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
        todo.map((x) => (
          <tr className="todo-item" key={x.id}>
            {editIndex === x.id ? (
              <td>
                <input
                  type="text"
                  value={text || ""} // value값이 undefinde가 들어가 있으면 warning이 발생
                  onChange={toggleChange}
                  ref={inputRef}
                />
              </td>
            ) : (
              <td>{x.text}</td>
            )}
            <td>{x.isDone ? "complete" : "pending"}</td>
            <td>
              {editIndex === x.id ? (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => saveEdit(x.id)}
                >
                  수정
                  <i className="bx bx-check bx-xs"></i>
                </button>
              ) : (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => edit(x.id)}
                >
                  수정하는버튼
                  <i className="bx bx-edit-alt bx-bx-xs"></i>
                </button>
              )}
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleUpdate(x.id)}
              >
                완성버튼
                <i className="bx bx-check bx-xs"></i>
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={() => deletedTask(x.text)}
              >
                삭제버튼
                <i className="bx bx-trash bx-xs"></i>
              </button>
            </td>
          </tr>
        ))
      )}
    </>
  );
}

export default List;
