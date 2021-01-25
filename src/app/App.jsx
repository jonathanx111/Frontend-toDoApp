import "./app.css";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
// import NavBar from './calendar/NavBar';
import Home from "./calendar/Home";
import NewTaskForm from "./calendar/NewTaskForm";
import Login from "./calendar/Login";
function App() {
  const [tasks, setTasks] = useState([
    {
      user_id: 1,
      game_id: 1,
      description: "Cook Dinner",
      chore_points: 6,
      done: false,
    },
    {
      user_id: 1,
      game_id: 2,
      description: "Clean Dishes",
      chore_points: 3,
      done: false,
    },
  ]);

  return (
    <div>
      {/* <NavBar /> */}
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
