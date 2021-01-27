// import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { eachDayOfInterval, parseISO } from "date-fns";
import { formatDashesDate } from "./build";
import "./form.css";

function NewTaskForm({ currentUser, tasks, setTasks }) {
  const history = useHistory();
  const { register, errors, handleSubmit } = useForm();
  const startDay = new Date(2020, 0, 1);

  const onSubmit = (formData) => {
    const endDay = parseISO(formData.date);

    const dayId = eachDayOfInterval({
      start: startDay,
      end: endDay,
    }).length;

    console.log(currentUser);
    const postData = {
      user_id: currentUser.id,
      day_id: dayId,
      description: formData.taskDescription,
      points: formData.points,
      done: false,
    };
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((r) => r.json())
      .then((data) => {
        setTasks([...tasks, data]);
        console.log(tasks);
        history.push("/");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create New Task</h1>
        <label>Description</label>
        <input
          name="taskDescription"
          ref={register({ required: true, maxLength: 30 })}
          placeholder="Task Description"
        />
        {errors.taskDescription &&
          errors.taskDescription.type === "required" && (
            <p>Description is required</p>
          )}
        {errors.taskDescription &&
          errors.taskDescription.type === "maxLength" && (
            <p>Max amount of characters is 20</p>
          )}
        <label>Number of Points</label>
        <input
          type="number"
          name="points"
          ref={register({ required: true, min: 1, max: 10 })}
          placeholder="Number of Points"
        />
        {errors.points && errors.points.type === "required" && (
          <p>Please provide a point amount</p>
        )}
        {errors.points && errors.points.type === "min" && (
          <p>Point value must be greater than 0</p>
        )}
        {errors.points && errors.points.type === "max" && (
          <p>The max amount of points is 10</p>
        )}
        <label>Date</label>
        <input
          type="date"
          name="date"
          ref={register({ required: true })}
          min={formatDashesDate(new Date())}
        />
        {errors.date && <p>Please provide a date for the task</p>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default NewTaskForm;
