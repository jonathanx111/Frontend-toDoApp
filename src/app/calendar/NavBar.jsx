import { NavLink } from "react-router-dom";
import LogOut from "./LogOut";
function NavBar({ currentUser, setCurrentUser, setTasks }) {
  return (
    <>
      <h1 className="header-title">ToDoApp</h1>
      <header className="navbar-container">
        <nav className="navbar-links">
          <NavLink exact to="/" className="button">
            Calendar
          </NavLink>
          <NavLink exact to="/tasks/new" className="button">
            Create Task
          </NavLink>
          {currentUser ? (
            <LogOut setCurrentUser={setCurrentUser} setTasks={setTasks} />
          ) : (
            <NavLink exact to={"/login"} className="button">
              {"Login"}
            </NavLink>
          )}
        </nav>
      </header>
    </>
  );
}

export default NavBar;
