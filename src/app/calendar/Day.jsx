import { useState } from 'react'
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
} from "date-fns";
import { nanoid } from 'nanoid'

export default function Day({ weekDayIndex, value, tasks }) {
  const [isHover, setIsHover] = useState(false)
  const weekStart = startOfWeek(value);
  const weekEnd = endOfWeek(value);
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  });
  const weekDay = weekDays[weekDayIndex];
 
  function handleMouseEnter(e, task) {
    if (task.id === parseInt(e.target.id, 10)) {
      setIsHover(!isHover)
    }
  }

  function handleMouseLeave(e, task) {
    if (task.id === parseInt(e.target.id, 10)) {
      setIsHover(!isHover);
    }
  }
  
  let dayTasks = [];
  if (tasks) {
    const currentDate = format(weekDay, "P");
    dayTasks = tasks.map((task) => {
      if (currentDate === task.day.date) {
        return <div id={task.id} onMouseEnter={(e) => handleMouseEnter(e, task)} onMouseLeave={(e) => handleMouseLeave(e, task)}  key={nanoid()} className="task-list">{isHover ? task.points + " points" : task.description}</div>;
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
