import { isSameDay, isBefore, startOfMonth, endOfMonth, isAfter } from "date-fns";
function isSelected(day, value) {
  return isSameDay(day, value);
}

function beforeMonth(day, value) {
  return (
    isBefore(day, startOfMonth(value)) || isAfter(day, endOfMonth(value))
  );
}

function isItToday(day) {
  return isSameDay(day, new Date());
}

function dayStyles(day, value) {
  if (isSelected(day, value)) return "selected";
  if (isItToday(day)) return "today";
  if (beforeMonth(day, value)) return "before";
  return "";
}

export default dayStyles;
