import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isBefore,
  addDays,
  subDays,
  eachDayOfInterval
} from "date-fns";

export default function buildCalendar(value) {
  // const startDay = value.clone().startOf("month").startOf("week")
  // const endDay = value.clone().endOf("month").endOf("week")
  // const day = startDay.clone().subtract(1, "day")
  // const calendar = []

  // while (day.isBefore(endDay, "day")) {
  //     calendar.push(
  //         Array(7)
  //         .fill(0)
  //         .map(() => day.add(1, "day").clone())
  //     )
  // }

  // return calendar
  const startDay = startOfWeek(startOfMonth(value));
  const endDay = endOfWeek(endOfMonth(value));
  let day = subDays(startDay, 1);
  // const dayIntervals = eachDayOfInterval({
  //   start: startDay,
  //   end: endDay,
  // });
  
  const calendarMatrix = [];
  // for (let i = 0; i < dayIntervals.length; i++) {
  //   calendarMatrix.push(
  //     Array(7)
  //       .fill(0)
  //       .map(() => {
  //         day = addDays(day, 1);
  //         return day;
  //       })
  //   )
  // }
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
