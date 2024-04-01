import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo } from "../redux/todoSlice";
import "../App.css"; // Importing CSS file
import { FaPlus } from "react-icons/fa"; // Importing FontAwesome icon

function AddTask() {
  const todoList = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // State variable for input field value
  const [input, setInput] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatching action to add a new todo item
    dispatch(
      addToDo({
        text: input,
        id: todoList?.todos?.length,
        isCompleted: false,
      })
    );

    setInput("");
  };

  return (
    <div className="add-task">
      <div className="input-field">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add Your Tasks"
        />

        <button type="submit" onClick={handleSubmit}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default AddTask;
