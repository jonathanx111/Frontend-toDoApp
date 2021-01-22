import './app.css';
import { Route, Switch } from "react-router-dom"
import NavBar from './calendar/NavBar';
import Calendar from './calendar/Calendar'
import NewTaskForm from './calendar/NewTaskForm'
import Login from './calendar/Login' 
function App() {
  return (
    <div>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/">
          <Calendar />
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
