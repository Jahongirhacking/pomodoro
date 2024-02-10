import { useContext } from "react"
import { IControlsWithSetters } from "../../types/Pomodoro/timerControls"
import TimerControlsContext from "../../contexts/Pomodoro/TimerControlsContext";

const TimerControls = () => {
    const { isRunning, toggleSwitch, reset } = useContext(TimerControlsContext) as IControlsWithSetters;
    return (
        <div className="timer-controls">
            <button id="start_stop" className={isRunning ? "active" : ""} onClick={toggleSwitch}>
                {isRunning ? "Pause" : "Start"}
            </button>
            <button id="reset" onClick={reset}>
                Reset
            </button>
        </div>
    )
}

export default TimerControls