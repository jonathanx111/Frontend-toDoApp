import { useState } from "react";

function EditMessage({
  id,
  handleUpdateTask,
  task,
  tasks,
  setTasks,
  setIsEditingId,
}) {
  const [descriptionBody, setDescriptionBody] = useState(task.description);

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("formEdit");
    const token = localStorage.getItem("token");
    if (token) {
      const taskPatchData = {
        description: descriptionBody,
        points: task.points,
        done: task.done,
      };
      console.log(taskPatchData);
      fetch(`http://localhost:3000/tasks/${task.id}`, {
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
          handleUpdateTask(taskObj);
          setIsEditingId()
        });
    }
  }

  return (
    <form className="edit-task" onSubmit={handleFormSubmit}>
      <input
        className="edit-task-input"
        type="text"
        name="description"
        autoComplete="off"
        value={descriptionBody}
        onChange={(e) => setDescriptionBody(e.target.value)}
      />
    </form>
  );
}

export default EditMessage;
