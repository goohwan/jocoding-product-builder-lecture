class AppNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
                <a href="index.html" class="nav-logo" data-i18n="nav-home">Service Hub</a>
                <div class="nav-links">
                    <a href="lotto.html" data-i18n="nav-lotto">Lotto</a>
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
}

customElements.define('app-nav', AppNav);
