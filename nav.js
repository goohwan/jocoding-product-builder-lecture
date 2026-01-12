import { setLanguage, initializeI18n } from './i18n.js';

class AppNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initTheme();
        
        // Initialize i18n for the nav itself
        initializeI18n();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    width: 100%;
                    --bg-color: #f0f2f5;
                    --card-bg: #ffffff;
                    --text-color: #333333;
                    --shadow-color: rgba(0, 0, 0, 0.1);
                }

                :host(.dark-mode) {
                    --bg-color: #18191a;
                    --card-bg: #242526;
                    --text-color: #e4e6eb;
                    --shadow-color: rgba(0, 0, 0, 0.4);
                }

                .main-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    background-color: var(--card-bg);
                    box-shadow: 0 2px 5px var(--shadow-color);
                    transition: background-color 0.3s ease, color 0.3s ease;
                }

                .nav-logo {
                    font-weight: bold;
                    font-size: 1.5rem;
                    color: var(--text-color);
                    text-decoration: none;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .nav-links a {
                    text-decoration: none;
                    color: var(--text-color);
                    font-size: 1rem;
                }

                #theme-toggle {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-color);
                }

                #lang-selector {
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 0.25rem;
                    background-color: var(--bg-color);
                    color: var(--text-color);
                }
            </style>
            <nav class="main-nav">
                <a href="index.html" class="nav-logo" data-i18n="nav-home">APBP with JoCoding</a>
                <div class="nav-links">
                    <a href="lotto.html" data-i18n="nav-lotto">Lotto</a>
                    <a href="food.html" data-i18n="nav-food">Food</a>
                    <a href="privacy.html" data-i18n="nav-privacy">Privacy</a>
                    <button id="theme-toggle">🌙</button>
                    <select id="lang-selector">
                        <option value="en">EN</option>
                        <option value="ko">KO</option>
                    </select>
                </div>
            </nav>
        `;
    }

    setupEventListeners() {
        const themeToggleBtn = this.shadowRoot.querySelector('#theme-toggle');
        const langSelector = this.shadowRoot.querySelector('#lang-selector');

        themeToggleBtn.addEventListener("click", () => this.toggleTheme());
        
        langSelector.addEventListener('change', (e) => {
            setLanguage(e.target.value);
            initializeI18n(); // Update all texts on the page
            window.dispatchEvent(new CustomEvent('language-changed', { detail: { language: e.target.value } }));
        });

        // Set initial value for lang selector
        langSelector.value = localStorage.getItem('language') || 'ko';
    }

    initTheme() {
        const savedTheme = localStorage.getItem("theme") || 'dark'; // Default to dark
        const isDark = savedTheme === "dark";
        
        // Apply to body
        if (isDark) {
            document.body.classList.add("dark-mode");
            this.classList.add('dark-mode');
        } else {
            document.body.classList.remove("dark-mode");
            this.classList.remove('dark-mode');
        }
        
        this.updateThemeIcon(isDark);
    }

    toggleTheme() {
        const isDark = document.body.classList.toggle("dark-mode");
        this.classList.toggle('dark-mode');
        localStorage.setItem("theme", isDark ? "dark" : "light");
        this.updateThemeIcon(isDark);
        
        // Dispatch event if other components need to know
        window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: isDark ? 'dark' : 'light' } }));
    }

    updateThemeIcon(isDark) {
        const themeToggleBtn = this.shadowRoot.querySelector('#theme-toggle');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
        }
    }
}

customElements.define('app-nav', AppNav);