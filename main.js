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

        // Fetch winning numbers if the element exists
        if (document.getElementById('winning-numbers-list')) {
            fetchWinningNumbers();
        }
    }

    async function fetchWinningNumbers() {
        const listEl = document.getElementById('winning-numbers-list');
        if (!listEl) return;

        // Calculate latest round
        // Round 1 was 2002-12-07
        const startDate = new Date('2002-12-07T20:00:00+09:00');
        const now = new Date();
        const diffTime = now - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
        let currentRound = Math.floor(diffDays / 7) + 1;
        
        listEl.innerHTML = '<li style="text-align:center; padding: 1rem;">Loading...</li>';

        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        
        // Helper to fetch one round
        const fetchRound = async (round) => {
            const targetUrl = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`;
            const response = await fetch(proxyUrl + targetUrl);
            if (response.status === 403) {
                throw new Error("CORS_AUTH_REQUIRED");
            }
            return response.json();
        };

        // Try to fetch current round to check validity/auth
        try {
            let data = await fetchRound(currentRound);
            if (data.returnValue === 'fail') {
                currentRound--;
                data = await fetchRound(currentRound);
            }
            
            if (data.returnValue === 'fail') {
                listEl.innerHTML = '<li style="text-align:center; padding: 1rem;">Data unavailable.</li>';
                return;
            }
        } catch (e) {
            if (e.message === "CORS_AUTH_REQUIRED") {
                listEl.innerHTML = `
                    <li style="text-align:center; padding: 1rem; font-size: 0.9rem;">
                        <span>Data access required.</span><br>
                        <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank" style="color: var(--btn-bg); font-weight: bold;">Enable Access</a>
                        <br>
                        <button id="retry-fetch-btn" style="margin-top: 0.5rem; padding: 0.2rem 0.5rem; cursor: pointer;">Retry</button>
                    </li>
                `;
                document.getElementById('retry-fetch-btn').addEventListener('click', fetchWinningNumbers);
                return;
            }
            console.error("Initial fetch check failed", e);
            listEl.innerHTML = '<li style="text-align:center; padding: 1rem;">Failed to load data.</li>';
            return;
        }

        listEl.innerHTML = ''; // Clear loading

        // Fetch last 10 rounds
        for (let i = 0; i < 10; i++) {
            const round = currentRound - i;
            if (round < 1) break;

            try {
                const data = await fetchRound(round);

                if (data.returnValue === 'success') {
                    const li = document.createElement('li');
                    li.className = 'winning-item';
                    
                    const numbers = [
                        data.drwtNo1, data.drwtNo2, data.drwtNo3, 
                        data.drwtNo4, data.drwtNo5, data.drwtNo6
                    ];
                    
                    // Create ball HTML
                    const ballsHtml = numbers.map(n => 
                        `<div class="mini-ball" style="background-color: ${getBallColor(n)}">${n}</div>`
                    ).join('');

                    li.innerHTML = `
                        <span class="winning-round">${round}회</span>
                        <div class="winning-balls">
                            ${ballsHtml}
                            <span style="margin: 0 2px; color: var(--text-color);">+</span>
                            <div class="mini-ball" style="background-color: ${getBallColor(data.bnusNo)}">${data.bnusNo}</div>
                        </div>
                    `;
                    listEl.appendChild(li);
                }
            } catch (e) {
                console.error(`Failed to fetch round ${round}`, e);
            }
            
            // Delay to avoid rate limiting
            await new Promise(r => setTimeout(r, 150));
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
