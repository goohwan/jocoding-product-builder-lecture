const generatorBtn = document.getElementById("generator-btn");
const numberDisplay = document.querySelector(".number-display");

function generateLottoNumbers() {
    numberDisplay.innerHTML = ""; 
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const ball = document.createElement("div");
            ball.classList.add("number-ball");
            ball.textContent = number;
            ball.style.backgroundColor = getBallColor(number);
            numberDisplay.appendChild(ball);
        }, index * 300); 
    });
}

function getBallColor(number) {
    if (number <= 10) return "#fbc400"; // Yellow
    if (number <= 20) return "#69c8f2"; // Blue
    if (number <= 30) return "#ff7272"; // Red
    if (number <= 40) return "#aaa"; // Gray
    return "#b0d840"; // Green
}

generatorBtn.addEventListener("click", generateLottoNumbers);


window.onload = generateLottoNumbers;