document.addEventListener("DOMContentLoaded", function () {
    const statusText = document.getElementById("status-text");
    const manualButton = document.getElementById("manual-switch");

    const redLight = document.getElementById("red");
    const yellowLight = document.getElementById("yellow");
    const greenLight = document.getElementById("green");

    let durations = {
        red: 5000,
        yellow: 3000,
        green: 7000,
    };

    let currentState = "red";
    let isManual = false;
    let timeoutId;

    function updateDurations() {
        durations.red = parseInt(prompt("Тривалість ЧЕРВОНОГО (мс):", durations.red)) || durations.red;
        durations.yellow = parseInt(prompt("Тривалість ЖОВТОГО (мс):", durations.yellow)) || durations.yellow;
        durations.green = parseInt(prompt("Тривалість ЗЕЛЕНОГО (мс):", durations.green)) || durations.green;
    }

    function clearLights() {
        redLight.classList.remove("active");
        yellowLight.classList.remove("active");
        greenLight.classList.remove("active");
    }

    function setLight(state) {
        clearLights();
        currentState = state;
        statusText.textContent = state.toUpperCase();
        switch (state) {
            case "red":
                redLight.classList.add("active");
                break;
            case "yellow":
                yellowLight.classList.add("active");
                break;
            case "green":
                greenLight.classList.add("active");
                break;
        }
    }

    function blinkingYellow(times, interval, callback) {
        let count = 0;
        const blink = setInterval(() => {
            yellowLight.classList.toggle("active");
            count++;
            if (count >= times * 2) {
                clearInterval(blink);
                callback();
            }
        }, interval);
    }

    function nextState() {
        switch (currentState) {
            case "red":
                setLight("yellow");
                timeoutId = setTimeout(() => nextState(), durations.yellow);
                break;
            case "yellow":
                setLight("green");
                timeoutId = setTimeout(() => nextState(), durations.green);
                break;
            case "green":
                blinkingYellow(3, 500, () => {
                    setLight("red");
                    timeoutId = setTimeout(() => nextState(), durations.red);
                });
                break;
        }
    }

    manualButton.addEventListener("click", () => {
        isManual = true;
        clearTimeout(timeoutId);
        switch (currentState) {
            case "red":
                setLight("yellow");
                break;
            case "yellow":
                setLight("green");
                break;
            case "green":
                setLight("red");
                break;
        }
    });

    updateDurations();
    setLight("red");
    timeoutId = setTimeout(() => nextState(), durations.red);
});
