import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task";
import TaskForm from "./TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    setTasks(tasks);
  }, []);

  const addTask = (name) => {
    setTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
  };

  const deleteTask = (taskIndex) => {
    setTasks((prev) => {
      return prev.filter((task, index) => index !== taskIndex);
    });
  };

  const updateTaskDone = (taskIndex, newDone) => {
    setTasks((prev) => {
      const newTasks = [...tasks];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  };

  const taskCompleted = tasks.filter((task) => task.done).length;
  const allTasks = tasks.length;

  const getMessage = () => {
    const percentage = (taskCompleted / allTasks) * 100;
    if (percentage === 0) {
      return "Try to do at least one! 🙏 ";
    } else if (percentage === 100) {
      return "Nice job for today! ✅";
    } else {
      return "Keep it going 💪";
    }
  };

  const renameTask = (index, newName) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  };

  return (
    <main>
      <h1>
        {taskCompleted}/{allTasks} Complete
      </h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task
          key={index}
          {...task}
          onDelete={() => deleteTask(index)}
          onToggle={(done) => updateTaskDone(index, done)}
          onRename={(newName) => renameTask(index, newName)}
        />
      ))}
    </main>
  );
}

export default App;
