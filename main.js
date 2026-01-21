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

    function setupServiceGrid() {
        const grid = document.getElementById('service-grid');
        if (!grid) return;

        // Data Models
        const services = [
            {
                type: 'service',
                href: 'lotto.html',
                img: 'assets/gen-lotto-wide.svg',
                titleKey: 'lotto-service-name',
                titleDefault: 'Lotto Generator',
                descKey: 'lotto-service-desc',
                descDefault: 'Get your lucky numbers for the week.'
            },
            {
                type: 'service',
                href: 'food.html',
                img: 'assets/gen-food-wide.svg',
                titleKey: 'food-service-name',
                titleDefault: 'What to Eat?',
                descKey: 'food-service-desc',
                descDefault: 'Random meal recommendation.'
            }
        ];

        // Logic to fill rows of 3 with at least 1 ad
        // Total items (services + ads) must be a multiple of 3
        const totalServices = services.length;
        const minCards = totalServices + 1; // At least one ad
        let totalCards = minCards;
        while (totalCards % 3 !== 0) {
            totalCards++;
        }

        const adCount = totalCards - totalServices;

        const cards = [...services];
        for (let i = 0; i < adCount; i++) {
            cards.push({ type: 'ad' });
        }

        // Shuffle cards
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        // Render Cards
        grid.innerHTML = '';
        cards.forEach(card => {
            if (card.type === 'service') {
                const el = document.createElement('a');
                el.href = card.href;
                el.className = 'service-card';
                el.innerHTML = `
                    <img src="${card.img}" alt="${card.titleDefault} Banner" class="service-banner">
                    <div class="service-info">
                        <h2 data-i18n="${card.titleKey}">${card.titleDefault}</h2>
                        <p data-i18n="${card.descKey}">${card.descDefault}</p>
                    </div>
                `;
                grid.appendChild(el);
            } else {
                const el = document.createElement('div');
                el.className = 'service-card ad-card';
                // AdSense specific clean container styles
                el.style.display = 'flex';
                el.style.alignItems = 'center';
                el.style.justifyContent = 'center';
                el.style.minHeight = '300px';
                el.style.height = 'auto';

                el.innerHTML = `
                <ins class="adsbygoogle"
                     style="display:block; width: 100%; height: 100%;"
                     data-ad-client="ca-pub-3474389046240414"
                     data-ad-slot="4185875094"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                `;
                grid.appendChild(el);

                // Trigger AdSense
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                    console.error('AdSense error:', e);
                }
            }
        });

        // Add "Coming Soon" card at the bottom (full width)
        const comingSoon = document.createElement('a');
        comingSoon.href = '#';
        comingSoon.className = 'service-card coming-soon horizontal-card';
        comingSoon.innerHTML = `
            <img src="assets/gen-soon-wide.png" alt="Coming Soon Banner" class="service-banner">
            <div class="service-info">
                <h2 data-i18n="future-service-name">Coming Soon</h2>
                <p data-i18n="future-service-desc">More services are on the way.</p>
            </div>
        `;
        grid.appendChild(comingSoon);

        // Update translations for newly created elements
        updateTexts();
    }

    function setupEventListeners() {
        setupServiceGrid();
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
