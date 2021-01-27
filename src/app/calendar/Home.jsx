import { useState, useEffect } from "react";
// import { addDays, addMonths } from 'date-fns'
import buildCalendar from "./build";
import MiniCalendar from "./MiniCalendar";
import WeeklyCalendar from "./WeeklyCalendar";
// import { Grid } from "semantic-ui-react";
import "./calendar.css";

function Home({ tasks, setTasks, handleUpdateTask }) {
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
        <WeeklyCalendar
          handleUpdateTask={handleUpdateTask}
          value={value}
          setValue={setValue}
          calendar={calendar}
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
}

export default Home;
