import { getLuckyNumbers } from './lotto.js';
import { initializeI18n, setLanguage, updateTexts } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
    // Set default language and theme on initial load
    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'ko');
    }
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }

    const body = document.body;

    function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            body.classList.add("dark-mode");
            document.querySelector('app-nav').classList.add('dark-mode');
        } else {
            body.classList.remove("dark-mode");
            document.querySelector('app-nav').classList.remove('dark-mode');
        }
        updateThemeIcon(savedTheme === "dark");
        loadUtterances(savedTheme === 'dark' ? 'github-dark' : 'github-light');
    }

    function toggleTheme() {
        const isDark = body.classList.toggle("dark-mode");
        document.querySelector('app-nav').classList.toggle('dark-mode');
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateThemeIcon(isDark);
        loadUtterances(isDark ? 'github-dark' : 'github-light');
    }

    function updateThemeIcon(isDark) {
        const themeToggleBtn = document.querySelector('app-nav')?.shadowRoot.querySelector('#theme-toggle');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
        }
    }

    function setupEventListeners() {
        customElements.whenDefined('app-nav').then(() => {
            const shadowRoot = document.querySelector('app-nav').shadowRoot;
            const themeToggleBtn = shadowRoot.querySelector('#theme-toggle');
            const langSelector = shadowRoot.querySelector('#lang-selector');

            themeToggleBtn.addEventListener("click", toggleTheme);
            langSelector.addEventListener('change', (e) => {
                setLanguage(e.target.value);
                // Re-initialize texts in shadow DOM as well
                initializeI18n();
            });
            
            langSelector.value = localStorage.getItem('language') || 'ko';

            // Initial render
            initializeI18n();
            initTheme();
        });

        if (document.getElementById('generator-btn')) {
            document.getElementById('generator-btn').addEventListener('click', generateLottoNumbers);
            generateLottoNumbers();
        }
    }

    function loadUtterances(theme) {
        const commentsSection = document.querySelector('.comments-section');
        if (!commentsSection) return;
        commentsSection.innerHTML = ''; 

        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', 'goohwan/jocoding-product-builder-lecture');
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('label', 'lotto');
        script.setAttribute('theme', theme);
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        commentsSection.appendChild(script);
    }

    async function generateLottoNumbers() {
        const numberDisplay = document.querySelector(".number-display");
        if (!numberDisplay) return;
        numberDisplay.innerHTML = "<div class='loading'></div>";
        
        const sets = await getLuckyNumbers();

        numberDisplay.innerHTML = "";
        
        sets.forEach((numbers, i) => {
            if (!Array.isArray(numbers)) return;
            const row = document.createElement("div");
            row.classList.add("lotto-row");
            row.style.animationDelay = `${i * 0.1}s`;

            numbers.forEach((number, j) => {
                const ball = document.createElement("div");
                ball.classList.add("number-ball");
                ball.textContent = number;
                ball.style.backgroundColor = getBallColor(number);
                ball.style.animationDelay = `${(i * 0.1) + (j * 0.05)}s`;
                row.appendChild(ball);
            });

            numberDisplay.appendChild(row);
        });
    }

    function getBallColor(number) {
        if (number <= 10) return "#fbc400";
        if (number <= 20) return "#69c8f2";
        if (number <= 30) return "#ff7272";
        if (number <= 40) return "#aaa";
        return "#b0d840";
    }

    setupEventListeners();
});
