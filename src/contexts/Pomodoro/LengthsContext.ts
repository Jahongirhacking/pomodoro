import { createContext } from "react";
import { ILengthsWithSetters } from "../../types/Pomodoro/lengths";

const LengthsContext = createContext<ILengthsWithSetters | null>(null);

export default LengthsContext;
