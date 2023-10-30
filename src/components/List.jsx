import React, { useState } from "react";

function List({ todo, deletedTask, handleUpdate, hadleEdit }) {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState('');

  const toggleChange = (e) =>{
    setText(e.target.value);
  }
  const edit = (idx) => {
    setToggle((prev) => !prev);
    setText(todo.find((item) => item.id === idx).content);
    handleKeyPress();

    
  }
  const handleKeyPress = (e) => {
    console.log(e.target);
    if(e.key === 'Enter'){
      console.log(text);
    }
  }
  return (
    <>
      {todo.map((x, idx) => (
        <tr className="todo-item" key={idx}>
          {toggle ? <td><input value={text} onChange={toggleChange} onKeyDown={handleKeyPress}></input></td> : <td>{x.text}</td>}
          <td>{x.isDone ? 'complete' : 'pending'}</td>
          <td>
            <button
              className="btn btn-warning btn-sm"
              onClick={()=>edit(idx)}
            >
              <i className="bx bx-edit-alt bx-bx-xs"></i>
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={()=>handleUpdate(idx)}
            >
              <i className="bx bx-check bx-xs"></i>
            </button>
            <button
              className="btn btn-error btn-sm"
              onClick={()=>deletedTask(x.text)}
            >
              <i className="bx bx-trash bx-xs"></i>
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default List;
