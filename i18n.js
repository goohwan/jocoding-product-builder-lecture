const translations = {
    en: {
        "nav-home": "APBP with JoCoding",
        "nav-lotto": "Lotto Generator",
        "nav-food": "What to Eat?",
        "nav-privacy": "Privacy",
        "hero-title": "APBP (AI Product Builder's PlayGround)",
        "hero-desc": "Explore our useful tools and services.",
        "lotto-service-name": "Lotto Generator",
        "lotto-service-desc": "Get your lucky numbers for the week.",
        "food-service-name": "What to Eat?",
        "food-service-desc": "Random meal recommendation.",
        "future-service-name": "Coming Soon",
        "future-service-desc": "More services are on the way.",
        "lotto-title": "Lotto Number Generator",
        "generate-btn": "Generate Numbers",
        "food-title": "What to Eat Today?",
        "food-desc": "Click the button for a random recommendation!",
        "food-btn": "Recommend Menu",
        "food-placeholder": "?",
        "privacy-title": "Privacy Policy",
        "privacy-content-1": "This is a placeholder for the privacy policy.",
        "privacy-content-2": "Your data is safe with us. We are not collecting any personal information.",
        "update-title": "Service Updates",
        "update-1": "Lotto Number Generation",
        "update-2": "Generate 5 Sets",
        "update-3": "Added Utterances Comments",
        "update-4": "Dark/Light Mode, i18n",
        "update-5": "Copy Numbers Function",
        "winning-title": "Recent Winning Numbers",
        "check-winning-btn": "Check Previous Winning Numbers",
        "food-update-title": "Service Updates",
        "food-update-1": "Random Food Recommendation",
        "food-update-2": "Utterance Comments",
        "food-update-3": "Food Image (Naver Search)",
        "food-update-4": "Recipe Guide Added",
        "food-update-5": "Recipe Search Function",
        "food-update-6": "Auto-add Menu & Recipe (Global)",
        "recipe-title": "Recipe",
        "recipe-placeholder": "Please recommend a menu first.",
        "recipe-btn-youtube": "YouTube Recipe",
        "recipe-btn-10000": "10000 Recipe",
        "food-btn-thinking": "Thinking... Please wait a moment",
        "recipe-search-title": "Search Recipe",
        "recipe-search-placeholder": "Enter menu name",
        "category-auto": "Auto Added"
    },
    ko: {
        "nav-home": "APBP with JoCoding",
        "nav-lotto": "로또 번호 생성기",
        "nav-food": "오늘 뭐 먹지?",
        "nav-privacy": "개인정보처리방침",
        "hero-title": "조코딩과 함께하는 APBP(AI Product Builder's PlayGround)",
        "hero-desc": "다양하고 유용한 서비스들을 만나보세요.",
        "lotto-service-name": "로또 번호 생성기",
        "lotto-service-desc": "이번 주 행운의 번호를 받아보세요.",
        "food-service-name": "오늘 뭐 먹지?",
        "food-service-desc": "랜덤 점심 메뉴 추천",
        "future-service-name": "준비중",
        "future-service-desc": "더 많은 서비스가 준비중입니다.",
        "lotto-title": "로또 번호 생성기",
        "generate-btn": "번호 생성하기",
        "food-title": "오늘 뭐 먹지?",
        "food-desc": "버튼을 누르면 랜덤으로 메뉴를 추천해드립니다!",
        "food-btn": "메뉴 추천받기",
        "food-placeholder": "?",
        "privacy-title": "개인정보처리방침",
        "privacy-content-1": "이것은 개인정보처리방침을 위한 자리 표시자입니다.",
        "privacy-content-2": "당신의 정보는 안전하게 보호됩니다. 우리는 어떠한 개인 정보도 수집하지 않습니다.",
        "update-title": "서비스 업데이트 내역",
        "update-1": "로또번호 생성",
        "update-2": "로또번호 생성 5세트",
        "update-3": "Utterance 댓글기능 추가",
        "update-4": "다크모드, 라이트모드, 한영변환",
        "update-5": "로또번호 복사기능",
        "winning-title": "최근 10회 당첨번호",
        "check-winning-btn": "지난회차 당첨번호 확인하기",
        "food-update-title": "서비스 업데이트 내역",
        "food-update-1": "음식 랜덤 추천 기능",
        "food-update-2": "Utterance 댓글기능",
        "food-update-3": "음식 이미지(네이버이미지) 추가",
        "food-update-4": "레시피 안내기능 추가",
        "food-update-5": "레시피 검색 기능 추가",
        "food-update-6": "추천메뉴 & 레시피 자동추가",
        "recipe-title": "레시피",
        "recipe-placeholder": "메뉴를 먼저 추천받아주세요.",
        "recipe-btn-youtube": "유튜브 레시피 보기",
        "recipe-btn-10000": "만개의 레시피 보기",
        "food-btn-thinking": "고민중... 잠깐만 기다려줘",
        "recipe-search-title": "레시피 검색",
        "recipe-search-placeholder": "메뉴명 입력",
        "category-auto": "자동추가"
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
