import { ITimer } from "../../types/Pomodoro/timer";
import secondsToClock from "../../utils/secondsToClock";

const Timer = ({ timer }: ITimer) => {
    return (
        <div className="timer-container">
            <div id="timer-label">{status}</div>
            <h1
                id="time-left"
                className={timer <= 60 ? "alert" : ""}
            >
                {secondsToClock(timer)}
            </h1>
        </div>
    )
}

export default Timer