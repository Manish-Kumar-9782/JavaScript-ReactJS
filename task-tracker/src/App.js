import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctor Appointment",
      day: "Feb 5th at 2:30PM",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "Feb 5th at 1:30PM",
      reminder: true,
    },
  ]);

  // -----------------

  // Deleting event for task

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //   ------------------
  // toggleReminder Event
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };
  // ---------------------
  return (
    <div className="container">
      <Header title="Task Tracker" />
      <AddTask />
      <Tasks
        tasks={tasks}
        onDelete={deleteTask}
        onToggleReminder={toggleReminder}
      />
    </div>
  );
}

export default App;
