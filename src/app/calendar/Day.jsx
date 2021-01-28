import { useState } from "react";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";
import { nanoid } from "nanoid";
import EditMessage from "./EditMessage";
import fireWorks from "./specialEffects"


export default function Day({
  weekDayIndex,
  value,
  tasks,
  setTasks,
  handleUpdateTask,
}) {
  const [selectedId, setSelectedId] = useState([]);
  const [isEditingId, setIsEditingId] = useState();
  const weekStart = startOfWeek(value);
  const weekEnd = endOfWeek(value);
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  });
  const weekDay = weekDays[weekDayIndex];

  function handleEditClick(e) {
    if (!isEditingId) {
      setIsEditingId(parseInt(e.target.id, 10));
    } else if (isEditingId) {
      setIsEditingId();
    }
  }

  function handleDeleteClick(e) {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/${e.target.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json)
        .then((deletedObj) => {
          console.log(deletedObj);
          const afterDeleteTaskArray = tasks.filter(
            (task) => task.id !== parseInt(e.target.id, 10)
          );

          setTasks(afterDeleteTaskArray);
        });
    }
  }

  function handleDescriptionClick(e, task) {
    const token = localStorage.getItem("token");
    if (parseInt(e.target.id, 10) === task.id && !task.done) {
      if (token) {
        const taskPatchData = {
          description: task.description,
          points: task.points,
          done: true,
        };
        console.log(taskPatchData);
        console.log(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`);
        fetch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskPatchData),
        })
          .then((r) => r.json())
          .then((taskObj) => {
            console.log(taskObj);
            const updatedTasks = tasks.map((taskObj) => {
              if (taskObj.id === task.id) return { ...task, done: true };
              return taskObj;
            });
            setTasks(updatedTasks);
            fireWorks();
          });
      }
      setSelectedId([...selectedId, task.id]);
    } else if (parseInt(e.target.id, 10) === task.id && task.done) {
      if (token) {
        const taskPatchData = {
          description: task.description,
          points: task.points,
          done: false,
        };
        console.log(taskPatchData);
        fetch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskPatchData),
        })
          .then((r) => r.json())
          .then((taskObj) => {
            console.log(taskObj);
            const updatedTasks = tasks.map((taskObj) => {
              if (taskObj.id === task.id) return { ...task, done: false };
              return taskObj;
            });
            setTasks(updatedTasks);
          });
      }
      const filteredIds = selectedId.filter((id) => {
        return id !== task.id;
      });
      setSelectedId(filteredIds);
    }
  }

  let dayTasks = [];

  if (tasks) {
    const currentDate = format(weekDay, "P");
    dayTasks = tasks.map((task) => {
      if (currentDate === task.day.date) {
        return (
          <div key={nanoid()} className="task-list-container">
            <div
              id={task.id}
              onClick={(e) => handleDescriptionClick(e, task)}
              className={
                task.done || selectedId.includes(task.id)
                  ? "task-list-done"
                  : "task-list"
              }
            >
              <div id={task.id}>
                {isEditingId === task.id ? (
                  <EditMessage
                    setIsEditingId={setIsEditingId}
                    id={task.id}
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                    handleUpdateTask={handleUpdateTask}
                  />
                ) : (
                  task.description
                )}
              </div>
            </div>
            <div>
              <button onClick={handleEditClick} className={"edit-button"}>
                <span
                  id={task.id}
                  className="pencil"
                  role="img"
                  aria-label="edit"
                >
                  ✏️
                </span>
              </button>
            </div>
            <div>
              <button onClick={handleDeleteClick} className="edit-button">
                <span id={task.id} role="img" aria-label="delete">
                  🗑
                </span>
              </button>
            </div>
          </div>
        );
      } else {
        return null;
      }
    });
  }

  return (
    <>
      <h1 className={isSameDay(weekDay, value) ? "week-select" : "not-select"}>
        {format(weekDay, "iii")}
      </h1>
      <h3 className={isSameDay(weekDay, value) ? "week-select" : "not-select"}>
        {format(weekDay, "d")}
      </h3>
      {dayTasks}
    </>
  );
}
