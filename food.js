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

// Google Custom Search API Configuration
// Get these from: https://developers.google.com/custom-search/v1/overview
const GOOGLE_API_KEY = ""; // PASTE YOUR API KEY HERE
const GOOGLE_SEARCH_ENGINE_ID = ""; // PASTE YOUR SEARCH ENGINE ID (CX) HERE

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
    
    // Simulate thinking/search phase
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 4. Update Text with Result
    foodNameEl.textContent = food.name;
    foodCategoryEl.textContent = getCategoryName(food.category);

    // 5. Fetch "Nth" Image from Google Custom Search
    const nth = Math.floor(Math.random() * 10) + 1; // Simulate taking the Nth image (1-10)
    
    try {
        const imageUrl = await fetchGoogleImage(food.en, nth);
        
        // Preload image before showing
        const img = new Image();
        img.onload = () => {
            foodImageEl.src = imageUrl;
            recommendBtn.disabled = false;
        };
        img.onerror = () => {
            throw new Error("Image load failed");
        };
        img.src = imageUrl;
    } catch (error) {
        console.error("Search failed:", error);
        
        // If API key is missing, show a specific alert or fallback
        if (error.message.includes("API Key")) {
             alert("Google API Key is missing! Please configure it in food.js.");
        }

        // Fallback to placeholder
        foodImageEl.src = `https://via.placeholder.com/400x300?text=${food.en}`;
        recommendBtn.disabled = false;
    }
}

async function fetchGoogleImage(query, nth) {
    if (!GOOGLE_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
        throw new Error("Google API Key or Search Engine ID is missing.");
    }

    // Google Custom Search API
    // We fetch 10 results and pick the Nth one.
    // Note: 'start' parameter can be used for pagination if nth > 10.
    const endpoint = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&searchType=image&num=10`;
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(`Google API Error: ${errData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
        throw new Error("No results found");
    }
    
    // Pick the Nth image (wrapping around if N > length)
    const index = (nth - 1) % data.items.length;
    return data.items[index].link;
}

if (recommendBtn) {
    recommendBtn.addEventListener('click', recommend);
}
