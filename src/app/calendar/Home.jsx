import { useState, useEffect } from "react";
import buildCalendar from "./build";
import MiniCalendar from "./MiniCalendar"

import "./calendar.css";

function Home() {
  const [value, setValue] = useState(new Date());
  const [calendar, setCalendar] = useState([]);
  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <div className="calendar">
      <MiniCalendar value={value} setValue={setValue} calendar={calendar} />
    </div>
  );
}

export default Home;
