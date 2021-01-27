// import { nanoid } from "nanoid";
// import { format } from "date-fns";
// import { Grid } from "semantic-ui-react";
import Day from "./Day";

export default function WeeklyCalendar({
  value,
  setValue,
  tasks,
  setTasks,
  handleUpdateTask,
}) {
  const dayColumns = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (day, index) => {
      return (
        <div className="weekly-calendar" key={day}>
          <Day
            handleUpdateTask={handleUpdateTask}
            weekDayIndex={index}
            value={value}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      );
    }
  );
  return <>{dayColumns}</>;
}
