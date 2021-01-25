import { useState, useEffect } from "react";
import buildCalendar from "./build";
import MiniCalendar from "./MiniCalendar";
import WeeklyCalendar from "./WeeklyCalendar";
import { Grid } from "semantic-ui-react";
import "./calendar.css";

function Home() {
  const [value, setValue] = useState(new Date());
  const [calendar, setCalendar] = useState([]);
  
  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <div>
      <div className="calendar">
        <MiniCalendar value={value} setValue={setValue} calendar={calendar} />
      </div>
      <Grid container columns={7}>
        <WeeklyCalendar value={value} setValue={setValue} calendar={calendar} />
      </Grid>
    </div>
  );
}

export default Home;
