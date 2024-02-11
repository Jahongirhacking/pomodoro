export interface IControls {
  isRunning: boolean;
}

export interface IControlsWithSetters extends IControls {
  toggleSwitch: () => void;
  reset: () => void;
}
