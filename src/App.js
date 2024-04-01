import React, { useEffect, useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const todoList = useSelector((state) => state.todos);

  const [name, setName] = useState("");
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    
    // Checking if user's name is stored in localStorage
    if (localStorage.getItem("name") === null) {
      setFirstTime(true);

      // Initializing an empty array and storing it in localStorage as ToDoList
      const arr = [];
      localStorage.setItem("ToDoList", JSON.stringify(arr));
    } else {
      setName(localStorage.getItem("name"));
    }
  }, [todoList.todos]);

  // Function to handle form submission when user enters their name
  const handleSubmit = () => {
    localStorage.setItem("name", name);

    setName("");
    setFirstTime(false);
  };

  return (
    <div className="main-section">
      {/* Conditional rendering based on first-time flag */}
      {firstTime ? (
        <div className="first-time-container">
          <h1>Welcome to the 📝 App! Please Enter Your Name</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div className="inner-section">
          <h1 className="greeting-heading">
            👋 {localStorage.getItem('name')} <br /> welcome to your Todo List
          </h1>

          {/* Components for adding tasks and displaying task list */}
          <AddTask />
          <TaskList />
        </div>
      )}
    </div>
  );
}

export default App;
