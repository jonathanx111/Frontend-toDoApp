import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
export default function MyVerticallyCenteredModal(props) {
  const { register, errors, handleSubmit, setError } = useForm();
  const history = useHistory();
  const onSubmit = (formData) => {
    console.log(props);
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.userName,
        password: formData.password,
        points: 0,
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
        props.setCurrentUser(data.user);
        props.setTasks(data.user.tasks);
        localStorage.setItem("token", data.jwt);
        history.push("/");
      })
      .catch((data) => {
        setError("userName", {
          type: "server",
          message: data.error
        });
        // setError("password", {
        //   type: "server",
        // });
      });
  };
  console.log(props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Sign Up</h1>
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
            <div>
              {errors.userName.message ? <p>{errors.userName.message}</p> : null}
            </div>
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
          <input type="submit" />
        </form>{" "}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
