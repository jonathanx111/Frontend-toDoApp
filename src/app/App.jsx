import "./app.css";
import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from './calendar/NavBar';
import Home from "./calendar/Home";
import NewTaskForm from "./calendar/NewTaskForm";
import Login from "./calendar/Login";
function App() {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/users/1")
      .then((r) => r.json())
      .then((userObj) => {
        setTasks(userObj.tasks);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home tasks={tasks} />
        </Route>
        <Route exact path="/tasks/new">
          <NewTaskForm />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="*">
          <h1>404 Address not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
