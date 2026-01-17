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
                    position: relative;
                }

                .nav-logo {
                    font-weight: bold;
                    font-size: 1.5rem;
                    color: var(--text-color);
                    text-decoration: none;
                }

                .nav-center {
                    display: flex;
                    align-items: center;
                    flex-grow: 1;
                    justify-content: flex-end;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-right: 1.5rem;
                }

                .nav-links a {
                    text-decoration: none;
                    color: var(--text-color);
                    font-size: 1rem;
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                #theme-toggle, #lang-toggle {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-color);
                    padding: 0.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    transition: background-color 0.2s;
                }

                #theme-toggle:hover, #lang-toggle:hover {
                    background-color: var(--bg-color);
                }
                
                #lang-toggle {
                    font-size: 1rem;
                    font-weight: bold;
                }

                .menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-color);
                    margin-left: 0.5rem;
                }

                @media (max-width: 960px) {
                    .menu-toggle {
                        display: block;
                    }

                    .nav-center {
                        flex-grow: 0;
                    }

                    .nav-links {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        width: 100%;
                        flex-direction: column;
                        background-color: var(--card-bg);
                        box-shadow: 0 4px 6px var(--shadow-color);
                        padding: 1rem 0;
                        gap: 1rem;
                        margin-right: 0;
                        z-index: 999;
                    }

                    .nav-links.active {
                        display: flex;
                    }
                    
                    /* 모바일 메뉴 내 아이템 중앙 정렬 */
                    .nav-links a {
                        width: 100%;
                        text-align: center;
                        padding: 0.5rem 0;
                    }
                    
                    .nav-links a:hover {
                        background-color: var(--bg-color);
                    }
                }
            </style>
            <nav class="main-nav">
                <a href="index.html" class="nav-logo" data-i18n="nav-home">APBP with JoCoding</a>
                
                <div class="nav-center">
                    <div class="nav-links">
                        <a href="lotto.html" data-i18n="nav-lotto">Lotto</a>
                        <a href="food.html" data-i18n="nav-food">Food</a>
                        <a href="privacy.html" data-i18n="nav-privacy">Privacy</a>
                        <a href="faq.html" data-i18n="nav-faq">FAQ</a>
                    </div>
                </div>

                <div class="nav-actions">
                    <button id="theme-toggle">🌙</button>
                    <button id="lang-toggle" aria-label="Toggle language">KO</button>
                    <button class="menu-toggle" aria-label="Toggle navigation">☰</button>
                </div>
            </nav>
        `;
    }

    setupEventListeners() {
        const themeToggleBtn = this.shadowRoot.querySelector('#theme-toggle');
        const langToggleBtn = this.shadowRoot.querySelector('#lang-toggle');
        const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
        const navLinks = this.shadowRoot.querySelector('.nav-links');

        themeToggleBtn.addEventListener("click", () => this.toggleTheme());
        
        langToggleBtn.addEventListener('click', () => {
            const currentLang = localStorage.getItem('language') || 'ko';
            const newLang = currentLang === 'ko' ? 'en' : 'ko';
            
            setLanguage(newLang);
            this.updateLangButton(newLang);
            initializeI18n(); // Update all texts on the page
            window.dispatchEvent(new CustomEvent('language-changed', { detail: { language: newLang } }));
        });

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !this.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Set initial value for lang button
        const initialLang = localStorage.getItem('language') || 'ko';
        this.updateLangButton(initialLang);
    }
    
    updateLangButton(lang) {
        const langToggleBtn = this.shadowRoot.querySelector('#lang-toggle');
        if (langToggleBtn) {
            // lang이 ko면 버튼엔 'EN'을 보여줄지(바꿀 대상), 'KO'를 보여줄지(현재 상태) 결정.
            // 보통 토글 버튼은 현재 상태를 보여주거나 바뀔 상태를 보여줍니다.
            // 여기서는 현재 상태를 보여주는 것으로 구현합니다 (요청사항: 토글방식 아이콘).
            langToggleBtn.textContent = lang.toUpperCase();
        }
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