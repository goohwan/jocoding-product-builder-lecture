const generatorBtn = document.getElementById("generator-btn");
const numberDisplay = document.querySelector(".number-display");
const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Theme Management
function loadUtterances(theme) {
    const commentsSection = document.querySelector('.comments-section');
    commentsSection.innerHTML = ''; // Clear existing script

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'goohwan/jocoding-product-builder-lecture');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', theme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    commentsSection.appendChild(script);
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        themeToggleBtn.textContent = "☀️";
        loadUtterances('github-dark');
    } else {
        themeToggleBtn.textContent = "🌙";
        loadUtterances('github-light');
    }
}

function toggleTheme() {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
    
    // Update comments theme
    loadUtterances(isDark ? 'github-dark' : 'github-light');
}

themeToggleBtn.addEventListener("click", toggleTheme);

// Lotto Generation
function generateSingleSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function getBallColor(number) {
    if (number <= 10) return "#fbc400"; // Yellow
    if (number <= 20) return "#69c8f2"; // Blue
    if (number <= 30) return "#ff7272"; // Red
    if (number <= 40) return "#aaa"; // Gray
    return "#b0d840"; // Green
}

function generateLottoNumbers() {
    numberDisplay.innerHTML = "";
    
    // Generate 5 sets
    for (let i = 0; i < 5; i++) {
        const row = document.createElement("div");
        row.classList.add("lotto-row");
        
        // Stagger the appearance of each row slightly
        row.style.animationDelay = `${i * 0.1}s`;

        const numbers = generateSingleSet();
        
        numbers.forEach((number, index) => {
            const ball = document.createElement("div");
            ball.classList.add("number-ball");
            ball.textContent = number;
            ball.style.backgroundColor = getBallColor(number);
            
            // Stagger ball animation within the row
            ball.style.animationDelay = `${(i * 0.1) + (index * 0.05)}s`;
            
            row.appendChild(ball);
        });

        numberDisplay.appendChild(row);
    }
}

generatorBtn.addEventListener("click", generateLottoNumbers);

// Initialize
initTheme();
window.onload = generateLottoNumbers;
