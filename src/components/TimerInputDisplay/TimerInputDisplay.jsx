// TimerInputDisplay component that handles timer input values (hours, minutes, seconds) and form submission

export default function TimerInputDisplay({ timerData, timerInputHandler, timerSubmitHandler }) {
    return (
        // Form to input timer data, submitted with the timerSubmitHandler function
        <form id="timer-input" onSubmit={timerSubmitHandler}>

            {/* Input for hours, shows empty string if value is 0 */}
            <input type="number" name="inputHrs" id="inputHrs" min={0} value={timerData.inputHrs === 0 ? "" : timerData.inputHrs} onChange={timerInputHandler} /><span>:</span>

            {/* Input for minutes, value between 0 and 60, shows empty string if 0 */}
            <input type="number" name="inputMins" id="inputMins" min={0} max={60} value={timerData.inputMins === 0 ? "" : timerData.inputMins} onChange={timerInputHandler} /><span>:</span>

            {/* Input for seconds, value between 0 and 60, shows empty string if 0 */}
            <input type="number" name="inputSecs" id="inputSecs" min={0} max={60} value={timerData.inputSecs === 0 ? "" : timerData.inputSecs} onChange={timerInputHandler} />
        </form>
    );
};