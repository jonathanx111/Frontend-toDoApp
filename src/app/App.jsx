import "./app.css";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./calendar/NavBar";
import Home from "./calendar/Home";
import NewTaskForm from "./calendar/NewTaskForm";
import Login from "./calendar/Login";
// import LogOut from "./calendar/LogOut"
function App() {
  const [tasks, setTasks] = useState();
  const [currentUser, setCurrentUser] = useState();
  console.log(currentUser);

  return (
    <div>
      <NavBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setTasks={setTasks}
      />
      <Switch>
        <Route exact path="/">
          <Home tasks={tasks} />
        </Route>
        <Route exact path="/tasks/new">
          <NewTaskForm />
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
