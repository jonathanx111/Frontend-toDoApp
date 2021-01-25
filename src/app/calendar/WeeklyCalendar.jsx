// import { nanoid } from "nanoid";
// import { format } from "date-fns";
// import { Grid } from "semantic-ui-react";
import Day from "./Day";

export default function WeeklyCalendar({ value, setValue, tasks }) {
  const dayColumns = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (day, index) => {
      return (
        <div>
          <Day weekDayIndex={index} value={value} tasks={tasks} />
        </div>
      );
    }
  );
  return <>{dayColumns}</>;
}
