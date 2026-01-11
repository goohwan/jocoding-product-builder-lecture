import { updateTexts } from './i18n.js';

const foods = {
    korean: [
        { name: "김치찌개", en: "Kimchi Stew", recipe: "Boil kimchi, pork, tofu, and onions in water with gochujang." },
        { name: "된장찌개", en: "Doenjang Stew", recipe: "Boil soybean paste, tofu, zucchini, and mushrooms in anchovy broth." },
        { name: "비빔밥", en: "Bibimbap", recipe: "Mix rice with sautéed vegetables, beef, fried egg, and gochujang." },
        { name: "불고기", en: "Bulgogi", recipe: "Marinate thin beef slices in soy sauce, sugar, garlic, and sesame oil, then grill." },
        { name: "삼겹살", en: "Samgyeopsal", recipe: "Grill pork belly slices and eat with lettuce, garlic, and ssamjang." },
        { name: "제육볶음", en: "Jeyuk Bokkeum", recipe: "Stir-fry pork with spicy gochujang sauce and vegetables." },
        { name: "떡볶이", en: "Tteokbokki", recipe: "Simmer rice cakes and fish cakes in spicy gochujang broth." },
        { name: "순두부찌개", en: "Sundubu Jjigae", recipe: "Boil soft tofu, clams, and egg in spicy broth." },
        { name: "갈비탕", en: "Galbitang", recipe: "Simmer beef short ribs with radish and green onions for a long time." },
        { name: "냉면", en: "Naengmyeon", recipe: "Boil buckwheat noodles and serve in chilled beef broth with cucumber and egg." }
    ],
    chinese: [
        { name: "짜장면", en: "Jajangmyeon", recipe: "Stir-fry black bean paste with pork and onions, serve over noodles." },
        { name: "짬뽕", en: "Jjamppong", recipe: "Stir-fry seafood and vegetables, then boil in spicy broth with noodles." },
        { name: "탕수육", en: "Tangsuyuk", recipe: "Deep-fry pork coated in starch, serve with sweet and sour sauce." },
        { name: "마파두부", en: "Mapo Tofu", recipe: "Stir-fry tofu and minced meat in spicy chili bean sauce." },
        { name: "양꼬치", en: "Lamb Skewers", recipe: "Skewer lamb cubes, season with cumin, and grill over charcoal." },
        { name: "볶음밥", en: "Fried Rice", recipe: "Stir-fry rice with egg, green onions, and vegetables/meat." },
        { name: "유린기", en: "Yuringi", recipe: "Deep-fry chicken and serve with fresh vegetables and soy-vinegar sauce." },
        { name: "깐풍기", en: "Kkanpunggi", recipe: "Deep-fry chicken and stir-fry in spicy garlic sauce." }
    ],
    japanese: [
        { name: "초밥", en: "Sushi", recipe: "Place fresh sashimi on seasoned rice balls." },
        { name: "라멘", en: "Ramen", recipe: "Boil noodles in pork/miso broth with chashu, egg, and bamboo shoots." },
        { name: "우동", en: "Udon", recipe: "Boil thick wheat noodles in soy-dashi broth with fish cakes." },
        { name: "돈까스", en: "Tonkatsu", recipe: "Bread pork cutlets with panko and deep-fry." },
        { name: "규동", en: "Gyudon", recipe: "Simmer thin beef and onions in sweet soy sauce, serve over rice." },
        { name: "가츠동", en: "Katsudon", recipe: "Simmer tonkatsu and egg in dashi sauce, serve over rice." },
        { name: "소바", en: "Soba", recipe: "Boil buckwheat noodles, serve cold with dipping sauce or in hot broth." },
        { name: "타코야끼", en: "Takoyaki", recipe: "Cook batter with octopus chunks in a special mold, top with sauce and flakes." }
    ],
    western: [
        { name: "피자", en: "Pizza", recipe: "Top dough with tomato sauce, cheese, and toppings, then bake." },
        { name: "파스타", en: "Pasta", recipe: "Boil pasta and toss with tomato, cream, or oil-based sauce." },
        { name: "스테이크", en: "Steak", recipe: "Season beef steak with salt/pepper and sear in a pan or grill." },
        { name: "햄버거", en: "Hamburger", recipe: "Grill beef patty, assemble in bun with lettuce, tomato, and sauce." },
        { name: "샐러드", en: "Salad", recipe: "Toss fresh vegetables/fruits with dressing and optional protein." },
        { name: "리조또", en: "Risotto", recipe: "Sauté rice with butter/onion, slowly add broth while stirring until creamy." },
        { name: "샌드위치", en: "Sandwich", recipe: "Place meat, cheese, and vegetables between bread slices." },
        { name: "그라탕", en: "Gratin", recipe: "Bake macaroni or potatoes with white sauce and cheese until golden." }
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
    
    // 4. Fetch "Nth" Image from Naver Search API
    const nth = Math.floor(Math.random() * 10) + 1;
    
    try {
        const imageUrl = await fetchNaverImage(food.name, nth);
        
        // 5. Preload image before showing anything
        const img = new Image();
        const updateRecipeLinks = () => {
            const recipeContent = document.getElementById('recipe-content');
            if (recipeContent) {
                recipeContent.innerHTML = `
                    <p style="margin-bottom: 0.5rem; font-weight: bold; font-size: 1.1rem;">${food.name}</p>
                    <p style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-color); line-height: 1.4;">${food.recipe}</p>
                    <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                        <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(food.name + ' 레시피')}" target="_blank" class="service-card" style="padding: 0.8rem; background-color: #ff0000; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                            <span data-i18n="recipe-btn-youtube">YouTube Recipe</span>
                        </a>
                        <a href="https://www.10000recipe.com/recipe/list.html?q=${encodeURIComponent(food.name)}" target="_blank" class="service-card" style="padding: 0.8rem; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                            <span data-i18n="recipe-btn-10000">10000 Recipe</span>
                        </a>
                    </div>
                `;
                updateTexts(recipeContent);
            }
        };

        img.onload = () => {
            // Update Text and Image at the same time
            foodNameEl.textContent = food.name;
            foodCategoryEl.textContent = getCategoryName(food.category);
            foodImageEl.src = imageUrl;
            
            updateRecipeLinks();
            recommendBtn.disabled = false;
        };
        img.onerror = () => {
            console.error("Image load failed, using fallback.");
            foodNameEl.textContent = food.name;
            foodCategoryEl.textContent = getCategoryName(food.category);
            foodImageEl.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(food.name)}`;
            
            updateRecipeLinks();
            recommendBtn.disabled = false;
        };
        img.src = imageUrl;
    } catch (error) {
        console.error("Search failed:", error);
        
        // Fallback: Show text and placeholder if search fails
        foodNameEl.textContent = food.name;
        foodCategoryEl.textContent = getCategoryName(food.category);
        foodImageEl.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(food.name)}`;
        recommendBtn.disabled = false;
    }
}

async function fetchNaverImage(query, nth) {
    // Using 'corsproxy.io' which is more stable and doesn't require manual activation like cors-anywhere.
    const proxyUrl = "https://corsproxy.io/?";
    const targetUrl = `https://openapi.naver.com/v1/search/image?query=${encodeURIComponent(query)}&display=10&start=${nth}&sort=sim`;
    
    try {
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
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
        
        // Pick the first item since we requested display=1 with an offset of 'nth'
        // Use weserv.nl as an image proxy to handle HTTPS/SSL issues and mixed content
        // weserv takes the url without protocol
        const originalUrl = data.items[0].link;
        const cleanUrl = originalUrl.replace(/^https?:\/\//, '');
        return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=400&h=300&fit=cover`;

    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

if (recommendBtn) {
    recommendBtn.addEventListener('click', recommend);
}

// Utterances Comments Logic
function loadUtterances(theme) {
    const commentsSection = document.querySelector('.comments-section');
    if (!commentsSection) return;
    commentsSection.innerHTML = ''; 

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'goohwan/jocoding-product-builder-lecture');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'food'); // Label for food page
    script.setAttribute('theme', theme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    commentsSection.appendChild(script);
}

// Initialize Utterances and listen for theme changes
const currentTheme = localStorage.getItem('theme') || 'dark';
loadUtterances(currentTheme === 'dark' ? 'github-dark' : 'github-light');

window.addEventListener('theme-changed', (e) => {
    const theme = e.detail.theme;
    loadUtterances(theme === 'dark' ? 'github-dark' : 'github-light');
});
