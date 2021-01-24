import { nanoid } from "nanoid";
import dayStyles from "./styles";
import { format } from "date-fns";
import CalendarHeader from "./header"
export default function MiniCalendar({ value, setValue, calendar }) {
  return (
    <>
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
    </>
  );
}
