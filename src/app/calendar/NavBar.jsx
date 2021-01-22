import { NavLink } from 'react-router-dom'
function NavBar() {
    return (
        <header>
            <h1>
                ToDoApp
            </h1>
            <nav>
                <NavLink exact to="/" className="button">
                    Calendar
                </NavLink>
                <NavLink exact to="/tasks/new" className="button">
                    Create Task
                </NavLink>
                <NavLink exact to="/login" className="button">
                    Login
                </NavLink>
            </nav>
        </header>
    )
}

export default NavBar