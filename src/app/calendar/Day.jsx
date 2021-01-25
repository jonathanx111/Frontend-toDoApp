import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay } from "date-fns"
import "./weekCalendar.css"

export default function Day({ weekDayIndex, value }) {
        const weekStart = startOfWeek(value)
        const weekEnd = endOfWeek(value)
        const weekDays = eachDayOfInterval({
          start: weekStart,
          end: weekEnd,
        });

        const weekDay = weekDays[weekDayIndex]
    return (
      <>
        <h1 className={isSameDay(weekDay, value) ? "week-select" : ""}>
          {format(weekDay, "iii")}
        </h1>
        <h2 className={isSameDay(weekDay, value) ? "week-select" : ""}>
          {format(weekDay, "d")}
        </h2>
      </>
    );
}