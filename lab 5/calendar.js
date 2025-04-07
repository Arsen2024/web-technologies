const calendar = document.getElementById("calendar");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");
const updateBtn = document.getElementById("update-calendar");

const daysOfWeek = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

function generateCalendar(month, year) {
    calendar.innerHTML = "";

    // Виводимо дні тижня
    daysOfWeek.forEach(day => {
        const div = document.createElement("div");
        div.classList.add("day-header");
        div.textContent = day;
        calendar.appendChild(div);
    });

    const firstDay = new Date(year, month - 1, 1);
    const startDay = firstDay.getDay(); // від 0 до 6
    const daysInMonth = new Date(year, month, 0).getDate();

    // Порожні комірки перед 1 числом
    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement("div");
        calendar.appendChild(empty);
    }

    // Дні місяця
    for (let day = 1; day <= daysInMonth; day++) {
        const div = document.createElement("div");
        div.classList.add("day");
        div.textContent = day;
        calendar.appendChild(div);
    }
}

// Ініціалізація календаря на поточну дату
const now = new Date();
monthInput.value = now.getMonth() + 1;
yearInput.value = now.getFullYear();
generateCalendar(monthInput.value, yearInput.value);

// Оновлення календаря за введеними значеннями
updateBtn.addEventListener("click", () => {
    const m = parseInt(monthInput.value);
    const y = parseInt(yearInput.value);
    if (m >= 1 && m <= 12 && y > 0) {
        generateCalendar(m, y);
    } else {
        alert("Введіть коректний місяць (1-12) та рік (>0)");
    }
});

const birthdayInput = document.getElementById("birthday-input");
const calcBtn = document.getElementById("calculate-birthday");
const resultDiv = document.getElementById("birthday-result");

calcBtn.addEventListener("click", () => {
    const inputDate = new Date(birthdayInput.value);
    if (isNaN(inputDate)) {
        resultDiv.textContent = "Будь ласка, виберіть дату народження.";
        return;
    }

    const now = new Date();
    let target = new Date(now.getFullYear(), inputDate.getMonth(), inputDate.getDate());

    // Якщо день народження вже був цього року — беремо наступний рік
    if (target < now) {
        target.setFullYear(now.getFullYear() + 1);
    }

    const diffMs = target - now;

    const seconds = Math.floor(diffMs / 1000) % 60;
    const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
    const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24)) % 30;
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));

    resultDiv.innerHTML = `
        До вашого наступного дня народження залишилось:<br>
        <strong>${months} місяців, ${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд</strong>
    `;
});
