const translations = {
    en: {
        "nav-home": "Service Hub",
        "nav-lotto": "Lotto",
        "nav-privacy": "Privacy",
        "hero-title": "Welcome to Service Hub",
        "hero-desc": "Explore our useful tools and services.",
        "lotto-service-name": "Lotto Generator",
        "lotto-service-desc": "Get your lucky numbers for the week.",
        "future-service-name": "Coming Soon",
        "future-service-desc": "More services are on the way.",
        "lotto-title": "Lotto Number Generator",
        "generate-btn": "Generate Numbers",
        "privacy-title": "Privacy Policy",
        "privacy-content-1": "This is a placeholder for the privacy policy.",
        "privacy-content-2": "Your data is safe with us. We are not collecting any personal information."
    },
    ko: {
        "nav-home": "서비스 허브",
        "nav-lotto": "로또 생성기",
        "nav-privacy": "개인정보처리방침",
        "hero-title": "서비스 허브에 오신 것을 환영합니다",
        "hero-desc": "다양하고 유용한 서비스들을 만나보세요.",
        "lotto-service-name": "로또 번호 생성기",
        "lotto-service-desc": "이번 주 행운의 번호를 받아보세요.",
        "future-service-name": "준비중",
        "future-service-desc": "더 많은 서비스가 준비중입니다.",
        "lotto-title": "로또 번호 생성기",
        "generate-btn": "번호 생성하기",
        "privacy-title": "개인정보처리방침",
        "privacy-content-1": "이것은 개인정보처리방침을 위한 자리 표시자입니다.",
        "privacy-content-2": "당신의 정보는 안전하게 보호됩니다. 우리는 어떠한 개인 정보도 수집하지 않습니다."
    }
};

let currentLanguage = localStorage.getItem('language') || 'ko';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateTexts();
}

function updateTexts(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[currentLanguage][key] || el.textContent;
    });
}

function initializeI18n() {
    updateTexts(); // Translate top-level document
    const appNav = document.querySelector('app-nav');
    if (appNav && appNav.shadowRoot) {
        updateTexts(appNav.shadowRoot); // Translate shadow DOM
    }
}

export { initializeI18n, setLanguage, updateTexts };
