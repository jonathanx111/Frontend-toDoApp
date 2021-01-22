import moment from "moment"
import "./calendar.css"
function Calendar() {
    return (
        <div>
            <h1>{moment().format('MMMM Do YYYY, h:mm:ss a')}</h1>
        </div>
    )
}


export default Calendar


