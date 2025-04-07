const startButton = document.getElementById("start-timer");
const input = document.getElementById("target-time");
const display = document.getElementById("countdown-display");

let interval;

startButton.addEventListener("click", () => {
    clearInterval(interval); // якщо таймер вже йде
    const targetDate = new Date(input.value);

    if (isNaN(targetDate.getTime())) {
        display.textContent = "Невірна дата!";
        return;
    }

    interval = setInterval(() => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            clearInterval(interval);
            display.textContent = "⏰ Час вийшов!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        display.textContent = `Залишилось: ${days} дн. ${hours} год. ${minutes} хв. ${seconds} сек.`;
    }, 1000);
});
