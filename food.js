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

// Naver Search API Configuration
// Note: Calling this API directly from the frontend may cause CORS errors.
// It is recommended to use a backend proxy for production.
const NAVER_CLIENT_ID = "Ufnci94HHyrKm_r0wmyj";
const NAVER_CLIENT_SECRET = "BeDbva4IA5";

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

    // 5. Fetch "Nth" Image from Naver Search API
    const nth = Math.floor(Math.random() * 10) + 1; // Simulate taking the Nth image (1-10)
    
    try {
        // Use Korean name for Naver Search
        const imageUrl = await fetchNaverImage(food.name, nth);
        
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
        
        if (error.message.includes("CORS")) {
             alert("CORS Error: Naver API cannot be called directly from the browser. You may need a proxy or disable web security for testing.");
        }

        // Fallback to placeholder
        foodImageEl.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(food.name)}`;
        recommendBtn.disabled = false;
    }
}

async function fetchNaverImage(query, nth) {
    // Using a CORS proxy to bypass browser restrictions for this demo.
    // In a real backend environment, you would call the Naver API directly.
    // We try to call directly first, if it fails, the catch block in recommend handles it.
    // However, to make it work in this specific "no-backend" environment, we might need a workaround.
    // For now, we implement the direct call as requested.
    
    const url = `https://openapi.naver.com/v1/search/image?query=${encodeURIComponent(query)}&display=1&start=${nth}&sort=sim`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-Naver-Client-Id': NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
        }
    });
    
    if (!response.ok) {
        throw new Error(`Naver API Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
        throw new Error("No results found");
    }
    
    return data.items[0].link;
}

if (recommendBtn) {
    recommendBtn.addEventListener('click', recommend);
}
