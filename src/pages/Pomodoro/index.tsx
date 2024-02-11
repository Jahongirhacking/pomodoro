import pomodoroLogo from "../../assets/pomodoro.png";
import { IPomodoro } from "../../types/Pomodoro/timer";
import secondsToClock from "../../utils/secondsToClock";
import { playAudio, stopAudio } from "../../utils/audio";
import { useEffect, useRef, useState } from "react";
// Sounds
import buttonClickSound from "../../assets/sounds/button-press.wav";
import timerSound from "../../assets/sounds/kichen-timer.mp3";
import tickingSound from "../../assets/sounds/ticking-slow.mp3";
import lengthSound from "../../assets/sounds/up-down.mp3";
// Components
import Lengths from "../../components/Pomodoro/Lengths";
import TimerControls from "../../components/Pomodoro/TimerControls";
import Timer from "../../components/Pomodoro/Timer";
// Contexts
import LengthsContext from "../../contexts/Pomodoro/LengthsContext";
import TimerControlsContext from "../../contexts/Pomodoro/TimerControlsContext";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../types/store";

import "./style.scss";
import { increaseOrderNumber } from "../../features/todo/todoSlice";

const initialState: IPomodoro = {
    breakLength: 5,
    sessionLength: 25,
    status: "SESSION",
    timer: 25 * 60,
    isRunning: false,
};

const Pomodoro = () => {
    const dispatch = useDispatch();
    const { activeTask } = useSelector((state: IStore) => state.todos)
    const [breakLength, setBreakLength] = useState<number>(initialState.breakLength);
    const [sessionLength, setSessionLength] = useState<number>(initialState.sessionLength);
    const [status, setStatus] = useState<"SESSION" | "BREAK">(initialState.status);
    const [timer, setTimer] = useState<number>(initialState.timer);
    const [isRunning, setIsRunning] = useState<boolean>(initialState.isRunning);
    const intervalIdRef = useRef<number | null>(null);
    const DEFAULT_TITLE = "Pomodoro 25+5 Web";

    useEffect(() => {
        if (!isRunning) return;
        if (status === "BREAK" && timer === 1) {
            dispatch(increaseOrderNumber())
        }
        document.title = `${secondsToClock(timer)} - ${activeTask.name}`
    }, [timer, status, activeTask, isRunning, dispatch])

    useEffect(() => {
        document.title = DEFAULT_TITLE;
    }, [])

    useEffect(() => {
        setTimer((status === "BREAK" ? breakLength : sessionLength) * 60);
    }, [status, breakLength, sessionLength])

    useEffect(() => {
        document.getElementById("root")!.classList.toggle("break");
    }, [status])

    const toggleStatus = () => {
        setStatus((s) => {
            return s === "BREAK" ? "SESSION" : "BREAK"
        })
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

    const stopTimer = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
        setIsRunning(false);
        stopAllSounds()
        document.title = DEFAULT_TITLE;
    }

    const runTimer = () => {
        const timerAudio = document.getElementById("beep") as HTMLAudioElement;
        const tickingAudio = document.getElementById("tick") as HTMLAudioElement;
        tickingAudio.volume = 0.3;
        const currentIntervalId = setInterval(() => {
            setTimer(t => {
                if (t === 0) {
                    playAudio(timerAudio);
                    toggleStatus();
                    return t;
                }
                playAudio(tickingAudio);
                return t - 1;
            });
        }, 100);
        setIsRunning(true);
        intervalIdRef.current = currentIntervalId;
    }

    const reset = () => {
        playButtonClickSound();
        stopTimer();
        // Initial Values
        setBreakLength(initialState.breakLength);
        setSessionLength(initialState.sessionLength);
        setStatus(initialState.status);
        setTimer(initialState.timer);
    };


    const toggleSwitch = () => {
        playButtonClickSound();
        if (intervalIdRef.current) stopTimer();
        else runTimer();
    };

    const decreaseBreak = () => {
        if (isRunning || breakLength <= 1) return;
        playAudio(document.getElementById("length-sound") as HTMLAudioElement);
        setBreakLength(b => b - 1);
    };

    const increaseBreak = () => {
        if (isRunning || breakLength >= 60) return;
        playAudio(document.getElementById("length-sound") as HTMLAudioElement);
        setBreakLength(b => b + 1);
    };

    const decreaseSession = () => {
        if (isRunning || sessionLength <= 1) return;
        playAudio(document.getElementById("length-sound") as HTMLAudioElement);
        setSessionLength(s => s - 1);
    };

    const increaseSession = () => {
        if (isRunning || sessionLength >= 60) return;
        playAudio(document.getElementById("length-sound") as HTMLAudioElement);
        setSessionLength(s => s + 1);
    };

    return (
        <>
            <div className="pomodoro">
                <img className="pomodoro__img" src={pomodoroLogo} alt="pomodoro-img" />

                <LengthsContext.Provider value={{
                    breakLength,
                    sessionLength,
                    decreaseBreak,
                    increaseBreak,
                    decreaseSession,
                    increaseSession
                }}>
                    <Lengths />
                </LengthsContext.Provider>

                <Timer timer={timer} status={status} />

                <TimerControlsContext.Provider value={{
                    isRunning,
                    toggleSwitch,
                    reset
                }}>
                    <TimerControls />
                </TimerControlsContext.Provider>

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
                <audio
                    id="length-sound"
                    src={lengthSound}
                />
            </div>
        </>
    );
}

export default Pomodoro;