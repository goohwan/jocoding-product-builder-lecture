import { getLuckyNumbers, getLatestWinningNumbers } from './lotto.js';
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

    function setupEventListeners() {
        // Listen for theme changes from the nav component
        window.addEventListener('theme-changed', (e) => {
            const theme = e.detail.theme;
            loadUtterances(theme === 'dark' ? 'github-dark' : 'github-light');
        });

        // Initialize Utterances based on current stored theme
        const currentTheme = localStorage.getItem('theme') || 'dark';
        loadUtterances(currentTheme === 'dark' ? 'github-dark' : 'github-light');

        if (document.getElementById('generator-btn')) {
            document.getElementById('generator-btn').addEventListener('click', generateLottoNumbers);
            generateLottoNumbers();
        }
        
        displayWinningNumbers();
    }

    // ... (loadUtterances) ...

    async function displayWinningNumbers() {
        const container = document.getElementById('winning-numbers-display');
        if (!container) return;

        try {
            const data = await getLatestWinningNumbers();
            
            if (!data || data.returnValue === "fail") {
                container.innerHTML = '<p style="color:var(--text-color)">Failed to load data.</p>';
                return;
            }

            container.innerHTML = ''; // Clear loading

            // Title
            const title = document.createElement('div');
            title.style.marginBottom = '0.5rem';
            title.style.color = 'var(--text-color)';
            title.innerHTML = `<strong>${data.drwNo}회</strong> (${data.drwNoDate})`;
            container.appendChild(title);

            // Numbers Row
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.gap = '5px';
            row.style.flexWrap = 'wrap';
            row.style.justifyContent = 'center';

            const numbers = [data.drwtNo1, data.drwtNo2, data.drwtNo3, data.drwtNo4, data.drwtNo5, data.drwtNo6];
            
            numbers.forEach(num => {
                const ball = document.createElement('div');
                ball.className = 'number-ball'; // Reuse existing class
                ball.style.width = '30px';
                ball.style.height = '30px';
                ball.style.fontSize = '14px';
                ball.style.lineHeight = '30px';
                ball.textContent = num;
                ball.style.backgroundColor = getBallColor(num);
                row.appendChild(ball);
            });

            // Bonus
            const plus = document.createElement('span');
            plus.textContent = '+';
            plus.style.color = 'var(--text-color)';
            plus.style.alignSelf = 'center';
            row.appendChild(plus);

            const bonusBall = document.createElement('div');
            bonusBall.className = 'number-ball';
            bonusBall.style.width = '30px';
            bonusBall.style.height = '30px';
            bonusBall.style.fontSize = '14px';
            bonusBall.style.lineHeight = '30px';
            bonusBall.textContent = data.bnusNo;
            bonusBall.style.backgroundColor = getBallColor(data.bnusNo);
            row.appendChild(bonusBall);

            container.appendChild(row);

        } catch (e) {
            console.error(e);
            container.innerHTML = '<p style="color:var(--text-color)">Error loading numbers.</p>';
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

            // Add click-to-copy functionality
            row.style.cursor = 'pointer';
            row.title = 'Click to copy';
            row.addEventListener('click', () => {
                const nums = numbers.join(', ');
                navigator.clipboard.writeText(nums).then(() => {
                    // Visual feedback
                    const originalBg = row.style.backgroundColor;
                    row.style.transition = 'background-color 0.3s';
                    row.style.backgroundColor = 'var(--btn-bg)';
                    
                    // Create and append a temporary "Copied!" message if not already present
                    let msg = row.querySelector('.copy-msg');
                    if (!msg) {
                        msg = document.createElement('span');
                        msg.className = 'copy-msg';
                        msg.textContent = 'Copied!';
                        msg.style.color = '#fff';
                        msg.style.marginLeft = '10px';
                        msg.style.fontWeight = 'bold';
                        row.appendChild(msg);
                    }

                    setTimeout(() => {
                        row.style.backgroundColor = originalBg;
                        if (msg) msg.remove();
                    }, 1000);
                });
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
