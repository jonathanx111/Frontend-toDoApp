import { format, subMonths, addMonths} from 'date-fns'
export default function CalendarHeader({ value, setValue }) {
  function currentMonthName() {
    // return value.format("MMMM");
    return format(value, "MMM")
  }

  function currentYearName() {
    // return value.format("YYYY");
    return format(value, "yyyy");
  }

  function prevMonth() {
    // return value.clone().subtract(1, "month");
    return subMonths(value, 1)
  }

  function nextMonth() {
    // return value.clone().add(1, "month");
    return addMonths(value, 1)
  }

  return (
    <div className="header">
      <div className="previous" onClick={() => setValue(prevMonth())}>
        {String.fromCharCode(171)}
      </div>
      <div className="current">
        {currentMonthName()} {currentYearName()}
      </div>
      <div className="next" onClick={() => setValue(nextMonth())}>
        {String.fromCharCode(187)}
      </div>
    </div>
  );
}
