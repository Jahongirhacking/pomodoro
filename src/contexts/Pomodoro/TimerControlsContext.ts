import { createContext } from "react";
import { IControlsWithSetters } from "../../types/Pomodoro/timerControls";

const TimerControlsContext = createContext<IControlsWithSetters | null>(null);

export default TimerControlsContext;
