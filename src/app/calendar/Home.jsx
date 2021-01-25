import { useState, useEffect } from "react";
import buildCalendar from "./build";
import MiniCalendar from "./MiniCalendar";
import WeeklyCalendar from "./WeeklyCalendar";
// import { Grid } from "semantic-ui-react";
import "./calendar.css";

function Home({ tasks }) {
  const [value, setValue] = useState(new Date());
  const [calendar, setCalendar] = useState([]);
  
  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <div className="main-container">
      <div className="calendar">
        <MiniCalendar value={value} setValue={setValue} calendar={calendar} />
      </div>
      <div className="weekly-container">
        <WeeklyCalendar value={value} setValue={setValue} calendar={calendar} tasks={tasks} />
      </div>
    </div>
  );
}

export default Home;
