import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isBefore,
  addDays,
  subDays
} from "date-fns";

export default function buildCalendar(value) {
  const startDay = startOfWeek(startOfMonth(value));
  const endDay = endOfWeek(endOfMonth(value));
  let day = subDays(startDay, 1);
  
  const calendarMatrix = [];
  while (isBefore(day, endDay)) {
    calendarMatrix.push(
      Array(7)
        .fill(0)
        .map(() => {
          day = addDays(day, 1);
          return day;
        })
    );
  }
  const correctCalendarMatrix = calendarMatrix.slice(0, 6)
  return correctCalendarMatrix;
}
