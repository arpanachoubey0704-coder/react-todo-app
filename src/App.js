import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        text: task,
        completed: false,
        time: new Date().toLocaleString()
      }
    ]);

    setTask("");
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div className="todo-card">

      <h1>My Todo App</h1>

      <div className="input-container">

        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />

        <button onClick={addTask}>Add</button>

      </div>

      {tasks.map((t, index) => (
        <div className="task" key={index}>

          <div className="task-left">

            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(index)}
            />

            <span
              className="task-text"
              style={{
                textDecoration: t.completed ? "line-through" : "none"
              }}
            >
              {t.text}
            </span>

            <div className="time">{t.time}</div>

          </div>
  
          <button onClick={() => deleteTask(index)}>Clear</button>

        </div>
      ))}

      {tasks.length > 0 && (
        <button className="clear-btn" onClick={clearAll}>
          Clear All
        </button>
      )}

      <p className="task-count">
        Total Tasks: {tasks.length}
      </p>

    </div>
  );
}

export default App;