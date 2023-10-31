import React, { useState } from "react";
import uuid from "react-uuid";

function InputBox({addTask}) {
  const [todo, setTodo] = useState('');

  const handleChange = (e) =>{
    const {value} = e.target;
    setTodo(value);
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    addTask({id:uuid(), text: todo, status: 'pending'});
    setTodo('');
  }
  return (
    <>
      <div className="input-section">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a todo..."
            className="input input-bordered input-secondary w-full max-w-xs"
            value={todo}
            onChange={handleChange}
          />
          {/* <input
            type="date"
            className="input input-bordered input-secondary w-full max-w-xs schedule-date"
          /> */}
          <button className="btn btn-secondary add-task-button">
            <i className="bx bx-plus bx-sm"></i>
          </button>
        </form>
      </div>
    </>
  );
}

export default InputBox;
