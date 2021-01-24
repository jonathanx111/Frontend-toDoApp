import { isSameDay, isBefore, startOfMonth, endOfMonth, isAfter } from "date-fns";
function isSelected(day, value) {
  // return value.isSame(day, "day");
  return isSameDay(day, value);
}

function beforeMonth(day, value) {
  // return day.isBefore(new Date(), "day");
  return (
    isBefore(day, startOfMonth(value)) || isAfter(day, endOfMonth(value))
  );
}

function isItToday(day) {
  // return day.isSame(new Date(), "day");
  return isSameDay(day, new Date());
}

function dayStyles(day, value) {
  if (isSelected(day, value)) return "selected";
  if (isItToday(day)) return "today";
  if (beforeMonth(day, value)) return "before";
  return "";
}

export default dayStyles;
