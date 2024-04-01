import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import {
  completedToDo,
  deleteToDo,
  resetTodo,
  updateTodo,
} from "../redux/todoSlice";

function TaskList() {
  // State variables for handling changes in todo items
  const [change, setChange] = useState(false);
  const [changeText, setChangeText] = useState("");
  const [todoToChange, setToDoToChange] = useState(-1);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Accessing todos from Redux store
  const todoList = useSelector((state) => state.todos);

  // Function to mark a todo item as completed
  const handleComplete = (id) => {
    dispatch(completedToDo(id));
  };

  // Function to delete a todo item
  const handleDelete = (id) => {
    dispatch(deleteToDo(id));
  };

  // Function to enable editing of a todo item
  const handleEdit = (text, id) => {
    setToDoToChange(id);
    setChange(true);
    setChangeText(text);
  };

  // Function to update a todo item
  const handleUpdate = (id, text) => {
    dispatch(
      updateTodo({
        id: id,
        text: text,
      })
    );
    setChange(false);
  };

  // Function to reset the todo list
  const handleReset = () => {
    dispatch(resetTodo());
  };

  return (
    <div className="todo-list">
      {/* Reset Todo button */}
      <div className="reset-todo">
        {todoList?.todos?.length > 0 && (
          <IoReload size={"20px"} onClick={handleReset} />
        )}
        {todoList?.todos?.length === 0 && (
          <h1
            style={{
              color: "black",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              margin: "20px 0",
            }}
          >
            Your ToDo List is Empty
          </h1>
        )}
      </div>

      {/* List of todo items */}
      <ul>
        {todoList?.todos.map((todo, idx) => (
          <li key={idx}>
            {/* Display completed or not completed task */}
            <div
              className={`${
                todo.isCompleted ? "task-complete" : "task-not-complete"
              }`}
              onClick={() => handleComplete(idx)}
            ></div>
            {/* Display todo item text or input field for editing */}
            <div className="todoList-text">
              {change && todoToChange === idx ? (
                <div className="change-input">
                  {" "}
                  <input
                    type="text"
                    value={changeText}
                    onChange={(e) => setChangeText(e.target.value)}
                  />{" "}
                  <button onClick={() => handleUpdate(idx, changeText)}>
                    Update
                  </button>{" "}
                </div>
              ) : (
                <h5>{todo.text}</h5>
              )}
            </div>
            {/* Delete and Edit icons */}
            <div className="icons">
              <MdDelete onClick={() => handleDelete(todo.id)} />
              <FaPen onClick={() => handleEdit(todo.text, idx)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
