import { nanoid } from "nanoid";
// import { format } from "date-fns";
import { Grid } from "semantic-ui-react";
import Day from "./Day";

export default function WeeklyCalendar({ value, setValue }) {
  const dayColumns = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
    (day, index) => {
      return (
        <Grid.Column key={nanoid()}>
          <Day weekDayIndex={index} value={value} />
        </Grid.Column>
      );
    }
  );
  return <>{dayColumns}</>;
}
