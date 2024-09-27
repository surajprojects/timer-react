import { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import TimerInputDisplay from "../TimerInputDisplay/TimerInputDisplay";

export default function Timer() {

    // State for timer input fields (hours, minutes, seconds)
    const [timerInput, setTimerInput] = useState({ inputHrs: 0, inputMins: 0, inputSecs: 0 });

    // State for the actual timer that counts down
    const [timer, setTimer] = useState([0, 0, 0]);

    // State to control the enable/disable status of buttons (start, stop, reset)
    const [isBtnDisabled, setIsBtnDisabled] = useState({ startBtn: false, stopBtn: true, resetBtn: true });

    // Using useRef to store the interval ID for the timer
    const intervalId = useRef(null);

    // Function that updates the timer every second
    const handleTimer = () => {
        let [timerHrs, timerMins, timerSecs] = timer;

        // If timer reaches 00:00:00, alert and stop the timer
        if ((timerHrs === 0) && (timerMins === 0) && (timerSecs === 0)) {
            alert("Timer finished!");
            clearInterval(intervalId.current); // Clear the interval
            setIsBtnDisabled((prevState) => {
                return { ...prevState, startBtn: false, stopBtn: true, resetBtn: true }; // Disable buttons accordingly
            });
        }
        // If hours are > 0 and minutes are 0, reduce the hours and reset minutes and seconds
        else if (timerHrs > 0 && timerMins === 0) {
            timerMins = 59;
            timerSecs = 59;
            timerHrs = timerHrs - 1;
        }
        // When seconds reach 0, reduce minutes and reset seconds
        else if ((timerMins < 60 && timerMins >= 0) && timerSecs === 0) {
            timerSecs = (timerHrs === 0) && (timerMins === 0) ? 0 : 59; // Reset seconds to 59 if needed
            timerMins = timerMins === 0 ? 0 : timerMins - 1; // Reduce minutes if not zero
        }
        // Regular second countdown
        else if ((timerMins < 60 && timerMins >= 0) && (timerSecs < 60 && timerSecs > 0)) {
            timerSecs = timerSecs - 1; // Reduce seconds
        }
        // Catch-all for errors; reset timer in case of unexpected issues
        else {
            timerHrs = 0;
            timerMins = 0;
            timerSecs = 0;
            alert("ERROR ENCOUNTERED!!! PLEASE CONTACT US FOR SUPPORT!!!");
            alert("RESETTING THE TIMER!!!");
            clearInterval(intervalId.current); // Clear the interval
            setIsBtnDisabled((prevState) => {
                return { ...prevState, startBtn: false, stopBtn: true, resetBtn: true }; // Disable buttons
            });
        }

        // Update the timer state after adjustments
        setTimer(() => {
            timer[0] = timerHrs;
            timer[1] = timerMins;
            timer[2] = timerSecs;
            return timer.map(t => t); // Return the updated timer
        });
    };

    // Effect hook that triggers the interval when the start button is clicked
    useEffect(() => {
        if (isBtnDisabled.startBtn) {
            intervalId.current = setInterval(handleTimer, 1000); // Call handleTimer every second
            return () => clearInterval(intervalId.current); // Clear interval on cleanup
        }
    }, [isBtnDisabled.startBtn]);

    // Start timer by setting the input values to the timer state
    const runTimer = () => {
        setTimer([timerInput.inputHrs, timerInput.inputMins, timerInput.inputSecs]);
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: true, stopBtn: false, resetBtn: true }; // Update button states
        });
        // Reset input fields after starting the timer
        setTimerInput((prevData) => {
            return { ...prevData, inputHrs: 0, inputMins: 0, inputSecs: 0 }
        });
    };

    // Stop the timer by clearing the interval
    const stopTimer = (id = intervalId) => {
        clearInterval(intervalId.current);
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: true, stopBtn: true, resetBtn: false }; // Disable/enable buttons
        });
    };

    // Reset timer back to 00:00:00 and reset input fields
    const resetTimer = () => {
        setTimer([0, 0, 0]); // Set timer to 0
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: false, stopBtn: true, resetBtn: true }; // Disable/enable buttons
        });
        setTimerInput((prevData) => {
            return { ...prevData, inputHrs: 0, inputMins: 0, inputSecs: 0 } // Reset input fields
        });
    };

    // Handle changes in input fields (hours, minutes, seconds)
    const handleInputChange = (evt) => {
        const changedField = evt.target.name; // Identify the changed field
        const newValue = Math.max(0, Number(evt.target.value)); // Ensure the value is non-negative
        setTimerInput((currentData) => {
            return {
                ...currentData,
                [changedField]: newValue // Update the specific field with the new value
            };
        });
    };

    // Prevent default form submission behavior
    const handleInputSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <main className="container">
                <h1>Timer</h1>
                <TimerDisplay hrs={timer[0]} mins={timer[1]} secs={timer[2]} /> {/* Display the countdown */}
                <TimerInputDisplay timerData={timerInput} timerInputHandler={handleInputChange} timerSubmitHandler={handleInputSubmit} /> {/* Handle user input */}
                <div id="timerButtons">
                    <Button handleClick={runTimer} text="Start" color="#99d98c" isDisabled={isBtnDisabled.startBtn} /> {/* Start button */}
                    <Button handleClick={stopTimer} text="Stop" color="#ef233c" isDisabled={isBtnDisabled.stopBtn} /> {/* Stop button */}
                    <Button handleClick={resetTimer} text="Reset" color="#fca311" isDisabled={isBtnDisabled.resetBtn} /> {/* Reset button */}
                </div>
            </main>
        </>
    );
};
