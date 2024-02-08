export interface ITimer {
  breakLength: number;
  sessionLength: number;
  status: "SESSION" | "BREAK";
  isRunning: boolean;
  timer: number;
}
