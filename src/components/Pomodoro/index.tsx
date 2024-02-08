import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import pomodoroLogo from "../../assets/pomodoro.png";
import { ITimer } from "../../types/timer";
import secondsToClock from "../../utils/secondsToClock";
import { playAudio, stopAudio } from "../../utils/audio";
import { useEffect, useRef, useState } from "react";
// Sounds
import buttonClickSound from "../../assets/sounds/button-press.wav";
import timerSound from "../../assets/sounds/kichen-timer.mp3";
import tickingSound from "../../assets/sounds/ticking-slow.mp3";

const initialState: ITimer = {
    breakLength: 5,
    sessionLength: 25,
    status: "SESSION",
    timer: 25 * 60,
    isRunning: false,
};

const Pomodoro = () => {
    const [breakLength, setBreakLength] = useState<number>(initialState.breakLength);
    const [sessionLength, setSessionLength] = useState<number>(initialState.sessionLength);
    const [status, setStatus] = useState<"SESSION" | "BREAK">(initialState.status);
    const [timer, setTimer] = useState<number>(initialState.timer);
    const [isRunning, setIsRunning] = useState<boolean>(initialState.isRunning);
    const intervalIdRef = useRef<number | null>(null);

    useEffect(() => {
        document.title = `${status} - ${secondsToClock(timer)}`
    }, [timer, status])

    useEffect(() => {
        setTimer((status === "BREAK" ? breakLength : sessionLength) * 60);
    }, [status, breakLength, sessionLength])

    const toggleStatus = () => {
        setStatus((s) => s === "BREAK" ? "SESSION" : "BREAK")
    }

    const playButtonClickSound = () => {
        const buttonAudio = document.getElementById("button-click") as HTMLAudioElement;
        playAudio(buttonAudio);
    }

    const stopAllSounds = () => {
        const tickingAudio = document.getElementById("tick") as HTMLAudioElement;
        const timerAudio = document.getElementById("beep") as HTMLAudioElement;
        stopAudio(tickingAudio)
        stopAudio(timerAudio);
    }

    const reset = () => {
        playButtonClickSound();
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
        // Initial Values
        setBreakLength(initialState.breakLength);
        setSessionLength(initialState.sessionLength);
        setStatus(initialState.status);
        setTimer(initialState.timer);
        setIsRunning(initialState.isRunning);

        stopAllSounds()
    };


    const toggleSwitch = () => {
        playButtonClickSound();
        const timerAudio = document.getElementById("beep") as HTMLAudioElement;
        const tickingAudio = document.getElementById("tick") as HTMLAudioElement;
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
            setIsRunning(false);
            stopAllSounds()
        } else {
            const currentIntervalId = setInterval(() => {
                setTimer(t => {
                    if (t === 0) {
                        playAudio(timerAudio);
                        toggleStatus();
                        return t;
                    } else if (t === 35) {
                        playAudio(tickingAudio);
                    }
                    return t - 1;
                });
            }, 10);
            setIsRunning(true);
            intervalIdRef.current = currentIntervalId;
        }
    };

    const decreaseBreak = () => {
        if (isRunning || breakLength <= 1) return;
        setBreakLength(b => b - 1);
    };

    const increaseBreak = () => {
        if (isRunning || breakLength >= 60) return;
        setBreakLength(b => b + 1);
    };

    const decreaseSession = () => {
        if (isRunning || sessionLength <= 1) return;
        setSessionLength(s => s - 1);
    };

    const increaseSession = () => {
        if (isRunning || sessionLength >= 60) return;
        setSessionLength(s => s + 1);
    };

    return (
        <>
            <div className="container">
                <img className="pomodoro-img" src={pomodoroLogo} alt="pomodoro-img" />
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

                {/* TIMER */}
                <div className="timer-container">
                    <div id="timer-label">{status}</div>
                    <h1
                        id="time-left"
                        className={timer <= 60 ? "alert" : ""}
                    >
                        {secondsToClock(timer)}
                    </h1>
                </div>

                {/* START STOP */}
                <div className="timer-controls">
                    <button id="start_stop" onClick={toggleSwitch}>
                        {isRunning ? "Pause" : "Start"}
                    </button>
                    <button id="reset" onClick={reset}>
                        Reset
                    </button>
                </div>
                <audio
                    id="beep"
                    src={timerSound}
                />
                <audio
                    id="button-click"
                    src={buttonClickSound}
                />
                <audio
                    id="tick"
                    src={tickingSound}
                />
            </div>
            <span className="author">
                by <a href="https://jahongirhacking.netlify.app/">Jahongir Hayitov</a>
            </span>
        </>
    );
}

export default Pomodoro;