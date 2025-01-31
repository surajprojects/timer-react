const btnStart = document.querySelector("#btnStart");
const btnStop = document.querySelector("#btnStop");
const btnReset = document.querySelector("#btnReset");
const hrs = document.querySelector("#hrs");
const mins = document.querySelector("#mins");
const secs = document.querySelector("#secs");
const setClockHrs = document.querySelector("#setClockHrs");
const setClockMins = document.querySelector("#setClockMins");
const setClockSecs = document.querySelector("#setClockSecs");

let clockHrs = 0;
let clockMins = 0;
let clockSecs = 0;

function timer() {
    if (clockHrs > 0 && clockMins === 0) {
        clockMins = 59;
        clockSecs = 59;
        clockHrs = clockHrs - 1;
        secs.textContent = clockSecs < 10 ? `0${clockSecs}` : clockSecs;
        mins.textContent = clockMins < 10 ? `0${clockMins}` : clockMins;
        hrs.textContent = clockHrs < 10 ? `0${clockHrs}` : clockHrs;
    }
    else if ((clockMins < 60 && clockMins >= 0) && clockSecs === 0) {
        clockSecs = (clockHrs === 0) && (clockMins === 0) ? 0 : 59;
        clockMins = clockMins === 0 ? 0 : clockMins - 1;
        secs.textContent = clockSecs < 10 ? `0${clockSecs}` : clockSecs;
        mins.textContent = clockMins < 10 ? `0${clockMins}` : clockMins;
    }
    else if ((clockMins < 60 && clockMins >= 0) && (clockSecs < 60 && clockSecs > 0)) {
        clockSecs = clockSecs - 1;
        secs.textContent = clockSecs < 10 ? `0${clockSecs}` : clockSecs;
    }
    else {
        clockHrs = 0;
        clockMins = 0;
        clockSecs = 0;
        alert("ERROR ENCOUNTERED!!! PLEASE CONTACT US FOR SUPPORT!!!");
        alert("RESETTING THE CLOCK!!!");
        btnStop.disabled = true;
        btnStart.disabled = false;
        btnReset.disabled = true;
    }
};

function runTimer() {
    const intervalId = setInterval(timer, 1000);

    btnReset.addEventListener("click", function (e) {
        e.preventDefault();
        clockHrs = 0;
        clockMins = 0;
        clockSecs = 0;
        hrs.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
        btnStop.disabled = true;
        btnStart.disabled = false;
        btnReset.disabled = false;
        clearInterval(intervalId);
    });

    btnStop.addEventListener("click", function (e) {
        e.preventDefault();
        btnStop.disabled = true;
        btnStart.disabled = true;
        btnReset.disabled = false;
        clearInterval(intervalId);
    });

};

btnStart.addEventListener("click", function (e) {
    e.preventDefault();
    btnStop.disabled = false;
    btnStart.disabled = true;
    btnReset.disabled = false;
    clockSecs = setClockSecs.value === "" ? 0 : parseInt(setClockSecs.value);
    clockMins = setClockMins.value === "" ? 0 : parseInt(setClockMins.value);
    clockHrs = setClockHrs.value === "" ? 0 : parseInt(setClockHrs.value);
    secs.textContent = clockSecs < 10 ? `0${clockSecs}` : clockSecs;
    mins.textContent = clockMins < 10 ? `0${clockMins}` : clockMins;
    hrs.textContent = clockHrs < 10 ? `0${clockHrs}` : clockHrs;
    setClockSecs.value = "";
    setClockMins.value = "";
    setClockHrs.value = "";
    runTimer();
});





























// function validateSetClock() {
//     let hrs = parseInt(setClockHrs.value);
//     let mins = parseInt(setClockMins.value);
//     let secs = parseInt(setClockSecs.value);

//     if (hrs >= 0) {
//         console.log("hrs check");
//         btnStart.disabled = true;
//         if (mins <= 60 && mins > 0) {
//             console.log("mins check");
//             btnStart.disabled = true;
//             if (secs <= 60 && secs > 0) {
//                 console.log("secs check");
//                 btnStart.disabled = false;
//             }
//         }
//     }
//     else {
//         console.log("nothing matched");
//         btnStart.disabled = true;
//     }
// }

// validateSetClock();

// setClockHrs.addEventListener("input", validateSetClock);
// setClockMins.addEventListener("input", validateSetClock);
// setClockSecs.addEventListener("input", validateSetClock);

// btnStart.addEventListener("click", function (e) {
//     e.preventDefault();
//     clockSecs = parseInt(setClockSecs.value);
//     clockMins = parseInt(setClockMins.value);
//     clockHrs = parseInt(setClockHrs.value);

//     secs.textContent = clockSecs;
//     mins.textContent = clockMins;
//     hrs.textContent = clockHrs;

// });

// function runTimer() {
//     let timerSecs = parseInt(setClockSecs.value);
//     let timerMins = parseInt(setClockMins.value);
//     let timerHrs = parseInt(setClockHrs.value);

//     if (timerHrs !== NaN) {
//         if (timerMins !== NaN) {
//             if (timerSecs !== NaN) {
//                 secs.textContent = clockSecs;
//                 mins.textContent = clockMins;
//                 hrs.textContent = clockHrs;
//             }
//         }
//     }

//     else {
//         console.log("ERROR")
//     }
// }

// runTimer();