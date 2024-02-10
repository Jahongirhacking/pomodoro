export interface ILengths {
  breakLength: number;
  sessionLength: number;
}

export interface ILengthsWithSetters extends ILengths {
  decreaseBreak: () => void;
  increaseBreak: () => void;
  decreaseSession: () => void;
  increaseSession: () => void;
}
