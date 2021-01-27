import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";
import { nanoid } from 'nanoid'

export default function Day({ weekDayIndex, value, tasks }) {
  const weekStart = startOfWeek(value);
  const weekEnd = endOfWeek(value);
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  });
  console.log(tasks)
  const weekDay = weekDays[weekDayIndex];
  let dayTasks = [];
  if (tasks) {
    const currentDate = format(weekDay, "P");
    dayTasks = tasks.map((task) => {
      if (currentDate === task.day.date) {
        return <div  key={nanoid()} className="task-list">{task.description}</div>;
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
