import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./SignUpModel";
function Login({ currentUser, setCurrentUser, tasks, setTasks }) {
  const [modalShow, setModalShow] = useState(false);
  const { register, errors, handleSubmit, setError } = useForm();
  const history = useHistory();

  function handleSignUpClick() {
    setModalShow(true);
  }

  const onSubmit = (formData) => {
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.userName,
        password: formData.password,
      }),
    })
      .then((r) => {
        return r.json().then((data) => {
          if (r.ok) {
            return data;
          } else {
            throw data;
          }
        });
      })
      .then((data) => {
        console.log(data);
        setCurrentUser(data.user);
        setTasks(data.user.tasks);
        localStorage.setItem("token", data.token);
        history.push("/");
      })
      .catch((data) => {
        setError("userName", {
          type: "server",
        });
        setError("password", {
          type: "server",
        });
      });
  };
  console.log(currentUser);
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          <label>Username</label>
          <input
            type="text"
            name="userName"
            ref={register({ required: true })}
            placeholder="Username"
          />
          {errors.userName && errors.userName.type === "required" && (
            <p>Username is required</p>
          )}
          {errors.userName && errors.userName.type === "server" && (
            <p>Invalid Username or Password</p>
          )}

          <label>Password</label>
          <input
            type="password"
            name="password"
            ref={register({ required: true })}
            placeholder="Password"
          />
          {errors.password && errors.password.type === "required" && (
            <p>Password is required</p>
          )}
          {errors.userName && errors.userName.type === "server" && (
            <p>Invalid Username or Password</p>
          )}
          <input type="submit" />
        </form>
      </div>
      <br />
      <center>
        <Button
          onClick={handleSignUpClick}
          className="sign-up"
          variant="outline-success"
        >
          Create Account
        </Button>

        <MyVerticallyCenteredModal
          show={modalShow}
          setCurrentUser={setCurrentUser}
          setTasks={setTasks}
          onHide={() => setModalShow(false)}
        />
      </center>
    </div>
  );
}

export default Login;
