export default function TimerDisplay({ hrs = 0, mins = 0, secs = 0 }) {
    return (
        <h2 id="timer"><span>{hrs < 10 ? "0" + hrs : hrs}</span>:<span>{mins < 10 ? "0" + mins : mins}</span>:<span>{secs < 10 ? "0" + secs : secs}</span></h2>
    );
};