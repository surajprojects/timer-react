// Targetting necessary elements
const days = document.querySelector("#days");
const hrs = document.querySelector("#hours");
const mins = document.querySelector("#minutes");
const secs = document.querySelector("#seconds");
const message = document.querySelector("#message");
const btnStop = document.querySelector("#btnStop");
const btnStart = document.querySelector("#btnStart");
const btnReset = document.querySelector("#btnReset");
const setDateTime = document.querySelector("#setDateTime");
const countdownUpto = document.querySelector("#countdownUpto");

// Global variables to cache timer and target date
let timer;
let targetDate;

// Function to calculate and update countdown display
function countdownTimer() {
    const currentDateTime = new Date();
    const diff = targetDate - currentDateTime;

    // condition to stop when time's up and updating UI
    if (diff <= 0) {
        clearInterval(timer);
        message.textContent = "Time's up!";
        days.textContent = "00";
        hrs.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
        btnStop.disabled = true;
        btnReset.disabled = true;
        btnStart.disabled = false;
        return;
    }

    // Calculating countdown timer data
    const tempDay = Math.floor(diff / (1000 * 60 * 60 * 24));
    const tempHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const tempMinute = Math.floor((diff / (1000 * 60)) % 60);
    const tempSecond = Math.floor((diff / 1000) % 60);

    // Updating countdown display
    days.textContent = tempDay < 10 ? "0" + tempDay : tempDay;
    hrs.textContent = tempHour < 10 ? "0" + tempHour : tempHour;
    mins.textContent = tempMinute < 10 ? "0" + tempMinute : tempMinute;
    secs.textContent = tempSecond < 10 ? "0" + tempSecond : tempSecond;
};

// Add event listener to start countdown 
btnStart.addEventListener("click", () => {
    targetDate = new Date(setDateTime.value);

    // Basic error handling
    if (setDateTime.value === "" || !targetDate || targetDate <= new Date()) {
        alert("Please select a future date/time!");
        return;
    }

    // Displaying countdown upto date/time
    countdownUpto.textContent = `Countdown Upto: ${targetDate.getDate() < 10 ? ("0" + targetDate.getDate()) : targetDate.getDate()}/${(targetDate.getMonth() + 1) < 10 ? ("0" + (targetDate.getMonth() + 1)) : (targetDate.getMonth() + 1)}/${targetDate.getFullYear()}-${targetDate.getHours() < 10 ? ("0" + targetDate.getHours()) : targetDate.getHours()}:${targetDate.getMinutes() < 10 ? ("0" + targetDate.getMinutes()) : targetDate.getMinutes()}:${targetDate.getSeconds() < 10 ? ("0" + targetDate.getSeconds()) : targetDate.getSeconds()}`;

    // Storing interval id in timer variable
    timer = setInterval(countdownTimer, 1000);

    // Updating UI
    setDateTime.value = "";
    message.textContent = "";
    btnStart.disabled = true;
    btnStop.disabled = false;
    btnReset.disabled = false;
});

// Add event listener to stop countdown and updating UI
btnStop.addEventListener("click", () => {
    clearInterval(timer);
    btnStop.disabled = true;
    btnStart.disabled = true;
    btnReset.disabled = false;
});

// Add event listener to reset countdown and updating UI
btnReset.addEventListener("click", () => {
    clearInterval(timer);
    setDateTime.value = "";
    message.textContent = "";
    countdownUpto.textContent = "Countdown Upto: 01/01/2025-00:00:00";
    days.textContent = "00";
    hrs.textContent = "00";
    mins.textContent = "00";
    secs.textContent = "00";
    btnStop.disabled = true;
    btnReset.disabled = true;
    btnStart.disabled = false;
});