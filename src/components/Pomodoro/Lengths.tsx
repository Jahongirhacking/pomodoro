import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import LengthsContext from "../../contexts/Pomodoro/LengthsContext";
import { ILengthsWithSetters } from "../../types/Pomodoro/lengths";

const Lengths = () => {
    const {
        breakLength,
        sessionLength,
        decreaseBreak,
        increaseBreak,
        decreaseSession,
        increaseSession
    } = useContext(LengthsContext) as ILengthsWithSetters;
    return (
        <div className="length">
            {/* BREAK */}
            <div className="length-control break">
                <div id="break-label">Break Length</div>
                <div className="control">
                    <button id="break-decrement" onClick={decreaseBreak}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <span id="break-length">{breakLength}</span>
                    <button id="break-increment" onClick={increaseBreak}>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                </div>
            </div>

            {/* SESSION */}
            <div className="length-control session">
                <div id="session-label">Session Length</div>
                <div className="control">
                    <button id="session-decrement" onClick={decreaseSession}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <span id="session-length">{sessionLength}</span>
                    <button id="session-increment" onClick={increaseSession}>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Lengths