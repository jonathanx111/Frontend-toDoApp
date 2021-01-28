import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./SignUpModel";
function Login({ currentUser, setCurrentUser, tasks, setTasks }) {
  const [modalShow, setModalShow] = useState(false);
  const { register, errors, handleSubmit, setError } = useForm();
  const history = useHistory();
console.log(process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID);
  function handleSignUpClick(e) {
    setModalShow(true);
  }
  const handleGoogleLogin = (response) => {
    console.log(response)
    console.log(response.tokenId)
      if (response.tokenId) {
        fetch(`${process.env.REACT_APP_API_URL}/google_login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${response.tokenId}`,
          },
        })
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
            const { user, token } = data;
            // then set that user in state in our App component
            setCurrentUser(user);
             setTasks(user.tasks);
            // also save the id to localStorage
            localStorage.token = token;
            history.push("/");
          });
      }
    };

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
        const { user, token } = data;
        setCurrentUser(user);
        setTasks(user.tasks);
        localStorage.token = token
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
        <div className="google">
          {/* this is the new component that will help with Google sign in */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={"single_host_origin"}
          />
        </div>
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
