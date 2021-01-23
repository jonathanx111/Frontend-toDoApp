import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import moment from "moment";
import "./calendar.css";
import buildCalendar from "./build";
import dayStyles from "./styles";
import CalendarHeader from "./header";
function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());
  // const test = moment()
  // -We are cloning moment because moments are mutable(able to be changed).
  // -cloned version of moments are not equal to the original moment
  // -moments objects can't be returned in jsx, but if we
  // call the Moment.js function .format on a moment object, we can
  // turn it into a string. Strings can be returned insie JSX

  useEffect(() => {
    console.log("within");
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <div className="calendar">
      <CalendarHeader value={value} setValue={setValue} />
      <div className="body">
        <div className="day-names">
          {["s", "m", "t", "w", "t", "f", "s"].map((d) => {
            return <div key={nanoid()} className="week">{d}</div>;
          })}
        </div>
        {calendar.map((week) => (
          <div key={nanoid()}>
            {week.map((day) => (
              <div key={nanoid()} className="day" onClick={() => setValue(day)}>
                <div className={dayStyles(day, value)}>{day.format("D")}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
