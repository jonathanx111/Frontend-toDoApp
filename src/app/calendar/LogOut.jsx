import { useHistory } from "react-router-dom";
export default function LogOut({ setCurrentUser, setTasks }) {
  const history = useHistory();
  function logout() {
    console.log("log");
    // remove the token
    localStorage.removeItem("token");
    // remove the current user from state
    setCurrentUser(null);
    setTasks();
    history.push("/");
  }

  return <div onClick={() => logout()}>Logout</div>;
}
// src/app/calendar/LogoutButton.jsx
