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
                    margin-top: auto;
                }

                footer {
                    background-color: var(--card-bg);
                    padding: 2rem 0;
                    text-align: center;
                    border-top: 1px solid var(--shadow-color);
                    box-shadow: 0 -2px 5px var(--shadow-color);
                    transition: background-color 0.3s ease, color 0.3s ease;
                }

                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
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
                <div class="footer-content">
                    <div class="footer-links">
                        <a href="privacy.html" data-i18n="nav-privacy">Privacy</a>
                        <a href="faq.html" data-i18n="nav-faq">FAQ</a>
                    </div>
                    <div class="copyright">
                        copyright all rights reserved by goohwan.net
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('app-footer', AppFooter);
