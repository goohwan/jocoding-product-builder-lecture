import { initializeI18n } from './i18n.js';

class AppFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        initializeI18n();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    --bg-color: #f0f2f5;
                    --card-bg: #ffffff;
                    --text-color: #333333;
                    --shadow-color: rgba(0, 0, 0, 0.1);
                    margin-top: auto;
                }

                :host(.dark-mode) {
                    --bg-color: #18191a;
                    --card-bg: #242526;
                    --text-color: #e4e6eb;
                    --shadow-color: rgba(0, 0, 0, 0.4);
                }

                footer {
                    background-color: var(--card-bg);
                    padding: 2rem;
                    text-align: center;
                    border-top: 1px solid var(--shadow-color);
                    box-shadow: 0 -2px 5px var(--shadow-color);
                    transition: background-color 0.3s ease, color 0.3s ease;
                }

                .footer-links {
                    margin-bottom: 1rem;
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                }

                .footer-links a {
                    text-decoration: none;
                    color: var(--text-color);
                    font-size: 0.95rem;
                    transition: opacity 0.2s;
                }

                .footer-links a:hover {
                    opacity: 0.7;
                    text-decoration: underline;
                }

                .copyright {
                    font-size: 0.85rem;
                    opacity: 0.7;
                    color: var(--text-color);
                }
            </style>
            <footer>
                <div class="footer-links">
                    <a href="privacy.html" data-i18n="nav-privacy">Privacy</a>
                    <a href="faq.html" data-i18n="nav-faq">FAQ</a>
                </div>
                <div class="copyright">
                    copyright all rights reserved ⓒgoohwan.net
                </div>
            </footer>
        `;
        
        // Check for dark mode to apply initial style if needed
        const isDark = document.body.classList.contains("dark-mode");
        if (isDark) {
            this.classList.add('dark-mode');
        }

        // Listen for theme changes to update internal styles
        window.addEventListener('theme-changed', (e) => {
            if (e.detail.theme === 'dark') {
                this.classList.add('dark-mode');
            } else {
                this.classList.remove('dark-mode');
            }
        });
    }
}

customElements.define('app-footer', AppFooter);
