import { format, subMonths, addMonths} from 'date-fns'
export default function CalendarHeader({ value, setValue }) {
  function currentMonthName() {
    return format(value, "MMM")
  }

  function currentYearName() { 
    return format(value, "yyyy");
  }

  function prevMonth() {
    return subMonths(value, 1)
  }

  function nextMonth() {
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
