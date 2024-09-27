export default function TimerInputDisplay({ timerData, timerInputHandler, timerSubmitHandler }) {

    return (
        <form id="timer-input" onSubmit={timerSubmitHandler}>
            <input type="number" name="inputHrs" id="inputHrs" min={0} value={timerData.inputHrs === 0 ? "" : timerData.inputHrs} onChange={timerInputHandler} /><span>:</span>
            <input type="number" name="inputMins" id="inputMins" min={0} max={60} value={timerData.inputMins === 0 ? "" : timerData.inputMins} onChange={timerInputHandler} /><span>:</span>
            <input type="number" name="inputSecs" id="inputSecs" min={0} max={60} value={timerData.inputSecs === 0 ? "" : timerData.inputSecs} onChange={timerInputHandler} />
        </form>
    );
};