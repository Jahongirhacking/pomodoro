import { ILengths } from "./lengths";
import { IControls } from "./timerControls";

export interface ITimer {
  timer: number;
  status: "SESSION" | "BREAK";
}

export interface IPomodoro extends ILengths, IControls, ITimer {}
