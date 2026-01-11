import { updateTexts } from './i18n.js';

const foods = {
    korean: [
        { name: "김치찌개", en: "Kimchi Stew" },
        { name: "된장찌개", en: "Doenjang Stew" },
        { name: "비빔밥", en: "Bibimbap" },
        { name: "불고기", en: "Bulgogi" },
        { name: "삼겹살", en: "Samgyeopsal" },
        { name: "제육볶음", en: "Jeyuk Bokkeum" },
        { name: "떡볶이", en: "Tteokbokki" },
        { name: "순두부찌개", en: "Sundubu Jjigae" },
        { name: "갈비탕", en: "Galbitang" },
        { name: "냉면", en: "Naengmyeon" }
    ],
    chinese: [
        { name: "짜장면", en: "Jajangmyeon" },
        { name: "짬뽕", en: "Jjamppong" },
        { name: "탕수육", en: "Tangsuyuk" },
        { name: "마파두부", en: "Mapo Tofu" },
        { name: "양꼬치", en: "Lamb Skewers" },
        { name: "볶음밥", en: "Fried Rice" },
        { name: "유린기", en: "Yuringi" },
        { name: "깐풍기", en: "Kkanpunggi" }
    ],
    japanese: [
        { name: "초밥", en: "Sushi" },
        { name: "라멘", en: "Ramen" },
        { name: "우동", en: "Udon" },
        { name: "돈까스", en: "Tonkatsu" },
        { name: "규동", en: "Gyudon" },
        { name: "가츠동", en: "Katsudon" },
        { name: "소바", en: "Soba" },
        { name: "타코야끼", en: "Takoyaki" }
    ],
    western: [
        { name: "피자", en: "Pizza" },
        { name: "파스타", en: "Pasta" },
        { name: "스테이크", en: "Steak" },
        { name: "햄버거", en: "Hamburger" },
        { name: "샐러드", en: "Salad" },
        { name: "리조또", en: "Risotto" },
        { name: "샌드위치", en: "Sandwich" },
        { name: "그라탕", en: "Gratin" }
    ]
};

const categories = ['korean', 'chinese', 'japanese', 'western'];

const recommendBtn = document.getElementById('recommend-btn');
const foodNameEl = document.getElementById('food-name');
const foodCategoryEl = document.getElementById('food-category');
const foodImageEl = document.getElementById('food-image');
const placeholderText = document.querySelector('.placeholder-text');
const foodImageContainer = document.getElementById('food-image-container');

// Anime girl thinking image
const THINKING_IMAGE_URL = "https://image.pollinations.ai/prompt/cute_anime_girl_thinking_about_food_question_mark_cartoon_style?width=400&height=300&nologo=true";

function getRandomFood() {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const foodList = foods[randomCategory];
    const randomFood = foodList[Math.floor(Math.random() * foodList.length)];
    return { ...randomFood, category: randomCategory };
}

function getCategoryName(category) {
    const names = {
        korean: "한식",
        chinese: "중식",
        japanese: "일식",
        western: "양식"
    };
    return names[category];
}

async function recommend() {
    // 1. Show Loading State (Thinking)
    recommendBtn.disabled = true;
    foodNameEl.textContent = "고민중..."; // "Thinking..."
    foodCategoryEl.textContent = "";
    
    // Hide previous image, show placeholder or thinking image
    placeholderText.style.display = 'none';
    foodImageEl.style.display = 'block';
    foodImageEl.src = THINKING_IMAGE_URL; // Show thinking girl

    // 2. Wait for a moment to simulate "thinking" time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. Pick Random Food
    const food = getRandomFood();
    
    // Simulate thinking/search phase without extra text update
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 4. Update Text with Result
    foodNameEl.textContent = food.name;
    foodCategoryEl.textContent = getCategoryName(food.category);

    // 5. Fetch "Nth" Image (Simulated by lock param)
    const nth = Math.floor(Math.random() * 100) + 1; // Simulate taking the Nth image
    // Using loremflickr for keyword-based "search" simulation
    const imageUrl = `https://loremflickr.com/400/300/${food.en.replace(/\s+/g, ',')},food?lock=${nth}`;

    console.log(`Fetching image for ${food.en} (Nth: ${nth})`);

    // Preload image before showing
    const img = new Image();
    img.onload = () => {
        foodImageEl.src = imageUrl;
        recommendBtn.disabled = false;
        // Optional: Show which result was found
        // foodCategoryEl.textContent += ` (검색 결과 #${nth})`;
    };
    img.onerror = () => {
        // Fallback if loremflickr fails
        foodImageEl.src = `https://via.placeholder.com/400x300?text=${food.en}`;
        recommendBtn.disabled = false;
    };
    img.src = imageUrl;
}

if (recommendBtn) {
    recommendBtn.addEventListener('click', recommend);
}
