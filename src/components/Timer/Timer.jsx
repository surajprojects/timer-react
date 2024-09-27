import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import TimerInputDisplay from "../TimerInputDisplay/TimerInputDisplay";

export default function Timer() {
    const [timerInput, setTimerInput] = useState({ inputHrs: 0, inputMins: 0, inputSecs: 0 });
    const [timer, setTimer] = useState([0, 0, 0]);
    const [isBtnDisabled, setIsBtnDisabled] = useState({ startBtn: false, stopBtn: true, resetBtn: true });
    const intervalId = useRef(null);

    const handleTimer = () => {
        let [timerHrs, timerMins, timerSecs] = timer;

        if ((timerHrs === 0) && (timerMins === 0) && (timerSecs === 0)) {
            alert("Timer finished!");
            clearInterval(intervalId.current);
            setIsBtnDisabled((prevState) => {
                return { ...prevState, startBtn: false, stopBtn: true, resetBtn: true };
            });
        }
        else if (timerHrs > 0 && timerMins === 0) {
            timerMins = 59;
            timerSecs = 59;
            timerHrs = timerHrs - 1;
        }
        else if ((timerMins < 60 && timerMins >= 0) && timerSecs === 0) {
            timerSecs = (timerHrs === 0) && (timerMins === 0) ? 0 : 59;
            timerMins = timerMins === 0 ? 0 : timerMins - 1;
        }
        else if ((timerMins < 60 && timerMins >= 0) && (timerSecs < 60 && timerSecs > 0)) {
            timerSecs = timerSecs - 1;
        }
        else {
            timerHrs = 0;
            timerMins = 0;
            timerSecs = 0;
            alert("ERROR ENCOUNTERED!!! PLEASE CONTACT US FOR SUPPORT!!!");
            alert("RESETTING THE TIMER!!!");
            clearInterval(intervalId.current);
            setIsBtnDisabled((prevState) => {
                return { ...prevState, startBtn: false, stopBtn: true, resetBtn: true };
            });
        }

        setTimer(() => {
            timer[0] = timerHrs;
            timer[1] = timerMins;
            timer[2] = timerSecs;
            return timer.map(t => t);
        });
    };

    useEffect(() => {
        intervalId.current = setInterval(handleTimer, 1000);
        return () => clearInterval(intervalId.current);
    }, [isBtnDisabled.startBtn]);

    const runTimer = () => {
        setTimer([timerInput.inputHrs, timerInput.inputMins, timerInput.inputSecs]);
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: true, stopBtn: false, resetBtn: true };
        });
        setTimerInput((prevData) => {
            return { ...prevData, inputHrs: 0, inputMins: 0, inputSecs: 0 }
        });
    };

    const stopTimer = (id = intervalId) => {
        clearInterval(intervalId.current);
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: true, stopBtn: true, resetBtn: false };
        });
    };

    const resetTimer = () => {
        setTimer([0, 0, 0]);
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: false, stopBtn: true, resetBtn: true };
        });
        setTimerInput((prevData) => {
            return { ...prevData, inputHrs: 0, inputMins: 0, inputSecs: 0 }
        });
    };

    const handleInputChange = (evt) => {
        const changedField = evt.target.name;
        const newValue = Math.max(0, Number(evt.target.value));
        setTimerInput((currentData) => {
            return {
                ...currentData,
                [changedField]: newValue
            };
        });
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <main className="container">
                <h1>Timer</h1>
                <TimerDisplay hrs={timer[0]} mins={timer[1]} secs={timer[2]} />
                <TimerInputDisplay timerData={timerInput} timerInputHandler={handleInputChange} timerSubmitHandler={handleInputSubmit} />
                <div id="timerButtons">
                    <Button handleClick={runTimer} text="Start" color="#99d98c" isDisabled={isBtnDisabled.startBtn} />
                    <Button handleClick={stopTimer} text="Stop" color="#ef233c" isDisabled={isBtnDisabled.stopBtn} />
                    <Button handleClick={resetTimer} text="Reset" color="#fca311" isDisabled={isBtnDisabled.resetBtn} />
                </div>
            </main>
        </>
    );
};
