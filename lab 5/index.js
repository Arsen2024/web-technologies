let lamp = document.getElementById("lamp");
let timeout;

function toggleLamp() {
    lamp.classList.toggle("on");
    resetAutoOff();
}

function changeLampType() {
    let type = document.getElementById("lampType").value;
    alert("Вибрано тип: " + type);
    resetAutoOff();
}

function setBrightness() {
    let brightness = prompt("Введіть яскравість (1-100):");
    if (brightness !== null && brightness >= 1 && brightness <= 100) {
        lamp.style.opacity = brightness / 100;
    } else {
        alert("Невірне значення!");
    }
    resetAutoOff();
}

function resetAutoOff() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        lamp.classList.remove("on");
        alert("Лампочка автоматично вимкнена через 5 хвилин бездіяльності.");
    }, 300000); // 5 хвилин
}