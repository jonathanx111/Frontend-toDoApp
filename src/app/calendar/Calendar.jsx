import { useState, useEffect } from "react";
import buildCalendar from "./build";
import { nanoid } from "nanoid";
import dayStyles from "./styles";
import CalendarHeader from "./header";
import { format } from "date-fns";

import "./calendar.css";

function Calendar() {
  const [value, setValue] = useState(new Date());
  const [calendar, setCalendar] = useState([]);
  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);
console.log(value)
  return (
    <div className="calendar">
      <CalendarHeader value={value} setValue={setValue} />
      <div className="body">
        <div className="day-names">
          {["s", "m", "t", "w", "t", "f", "s"].map((d) => {
            return (
              <div key={nanoid()} className="week">
                {d}
              </div>
            );
          })}
        </div>
        {calendar.map((week) => (
          <div key={nanoid()}>
            {week.map((day) => (
              <div key={nanoid()} className="day" onClick={() => setValue(day)}>
                <div className={dayStyles(day, value)}>{format(day, "d")}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
