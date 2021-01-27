import "./app.css";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./calendar/NavBar";
import Home from "./calendar/Home";
import NewTaskForm from "./calendar/NewTaskForm";
import Login from "./calendar/Login";

function App() {
  const [tasks, setTasks] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          setCurrentUser(user);
          setTasks(user.tasks);
        });
    }
  }, []);

  function handleUpdateTask(updatedTaskObj) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === updatedTaskObj.id) {
        return updatedTaskObj;
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  }

  return (
    <div>
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setTasks={setTasks}
      />
      <Switch>
        <Route exact path="/">
          <Home
            tasks={tasks}
            setTasks={setTasks}
            handleUpdateTask={handleUpdateTask}
          />
        </Route>
        <Route exact path="/tasks/new">
          <NewTaskForm
            currentUser={currentUser}
            tasks={tasks}
            setTasks={setTasks}
          />
        </Route>
        <Route exact path={"/login"}>
          <Login
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            tasks={tasks}
            setTasks={setTasks}
          />
        </Route>
        <Route path="*">
          <h1>404 Address not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
