import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
function Login({ currentUser, setCurrentUser, tasks, setTasks }) {
  const { register, errors, handleSubmit, setError } = useForm();
  const history = useHistory();

  const onSubmit = (formData) => {
    fetch("http://localhost:3000/login", {
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
        setCurrentUser(data.user);
        setTasks(data.user.tasks);
        localStorage.setItem("token", data.token);
        history.push("/");
      })
      .catch((data) => {
        setError('userName', {
            type: 'server',
        })
        setError('password', {
            type: 'server',
        })
      });
  };

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
    </div>
  );
}

export default Login;
