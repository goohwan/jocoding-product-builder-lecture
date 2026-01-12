import { updateTexts } from './i18n.js';

const foods = {
    korean: [
        { name: "김치찌개", en: "Kimchi Stew", descEn: "Boil kimchi, pork, tofu, and onions in water with gochujang.", descKo: "김치와 돼지고기, 두부를 넣고 얼큰하게 끓여낸 한국인의 소울 푸드." },
        { name: "된장찌개", en: "Doenjang Stew", descEn: "Boil soybean paste, tofu, zucchini, and mushrooms in anchovy broth.", descKo: "구수한 된장 국물에 두부와 각종 야채를 넣어 끓인 찌개." },
        { name: "비빔밥", en: "Bibimbap", descEn: "Mix rice with sautéed vegetables, beef, fried egg, and gochujang.", descKo: "따뜻한 밥 위에 각종 나물과 고기, 계란후라이를 얹어 고추장에 비벼 먹는 요리." },
        { name: "불고기", en: "Bulgogi", descEn: "Marinate thin beef slices in soy sauce, sugar, garlic, and sesame oil, then grill.", descKo: "얇게 썬 소고기를 달콤 짭짤한 양념에 재워 구워낸 고기 요리." },
        { name: "삼겹살", en: "Samgyeopsal", descEn: "Grill pork belly slices and eat with lettuce, garlic, and ssamjang.", descKo: "노릇하게 구운 돼지고기 삼겹살을 상추에 싸서 먹는 인기 외식 메뉴." },
        { name: "제육볶음", en: "Jeyuk Bokkeum", descEn: "Stir-fry pork with spicy gochujang sauce and vegetables.", descKo: "매콤한 고추장 양념에 돼지고기와 야채를 볶아낸 밥도둑." },
        { name: "떡볶이", en: "Tteokbokki", descEn: "Simmer rice cakes and fish cakes in spicy gochujang broth.", descKo: "매콤달콤한 고추장 소스에 떡과 어묵을 넣어 끓인 국민 간식." },
        { name: "순두부찌개", en: "Sundubu Jjigae", descEn: "Boil soft tofu, clams, and egg in spicy broth.", descKo: "부드러운 순두부와 해산물을 넣어 얼큰하게 끓인 찌개." },
        { name: "갈비탕", en: "Galbitang", descEn: "Simmer beef short ribs with radish and green onions for a long time.", descKo: "소갈비를 푹 고아내어 국물이 진하고 고기가 부드러운 보양식." },
        { name: "냉면", en: "Naengmyeon", descEn: "Boil buckwheat noodles and serve in chilled beef broth with cucumber and egg.", descKo: "시원한 육수나 매콤한 양념에 쫄깃한 메밀면을 즐기는 여름 별미." },
        { name: "김밥", en: "Kimbap", descEn: "Roll rice, vegetables, egg, and ham in dried seaweed.", descKo: "밥과 여러 가지 재료를 김으로 말아 썰어 먹는 간편하고 든든한 한 끼." },
        { name: "감자탕", en: "Gamjatang", descEn: "Boil pork backbone with potatoes, greens, and perilla powder in spicy broth.", descKo: "돼지 등뼈와 감자, 우거지를 넣고 얼큰하게 끓여낸 탕 요리." },
        { name: "콩비지찌개", en: "Kongbiji Jjigae", descEn: "Simmer ground soybeans with kimchi and pork.", descKo: "곱게 간 콩비지에 돼지고기와 김치를 넣어 고소하고 담백하게 끓인 찌개." },
        { name: "계란찜", en: "Gyeran Jjim", descEn: "Steam beaten eggs with water, scallions, and salt until fluffy.", descKo: "계란을 부드럽게 풀어 쪄낸, 남녀노소 누구나 좋아하는 반찬." },
        { name: "청국장", en: "Cheonggukjang", descEn: "Boil extra-strong fermented soybean paste with tofu and zucchini.", descKo: "진한 청국장 콩의 구수함과 두부의 부드러움이 어우러진 건강식." },
        { name: "비빔국수", en: "Bibim Guksu", descEn: "Mix wheat noodles with spicy gochujang sauce and vegetables.", descKo: "매콤새콤한 양념장에 소면과 야채를 비벼 입맛 돋우는 국수." },
        { name: "잔치국수", en: "Janchi Guksu", descEn: "Serve wheat noodles in hot anchovy broth with zucchini and egg garnish.", descKo: "따뜻한 멸치 육수에 소면을 말아 호로록 먹는 잔치 음식." },
        { name: "간장국수", en: "Ganjang Guksu", descEn: "Mix wheat noodles with soy sauce, sesame oil, and sugar.", descKo: "짭조름한 간장과 고소한 참기름으로 맛을 낸 담백한 국수." }
    ],
    chinese: [
        { name: "짜장면", en: "Jajangmyeon", descEn: "Stir-fry black bean paste with pork and onions, serve over noodles.", descKo: "춘장에 돼지고기와 야채를 볶아 만든 소스를 면에 비벼 먹는 중식의 대명사." },
        { name: "짬뽕", en: "Jjamppong", descEn: "Stir-fry seafood and vegetables, then boil in spicy broth with noodles.", descKo: "각종 해산물과 야채를 볶아 만든 얼큰하고 시원한 국물 요리." },
        { name: "탕수육", en: "Tangsuyuk", descEn: "Deep-fry pork coated in starch, serve with sweet and sour sauce.", descKo: "돼지고기에 튀김옷을 입혀 바삭하게 튀겨내어 새콤달콤한 소스를 곁들인 요리." },
        { name: "마파두부", en: "Mapo Tofu", descEn: "Stir-fry tofu and minced meat in spicy chili bean sauce.", descKo: "두부와 다진 고기를 매콤한 두반장 소스에 볶아낸 밥도둑." },
        { name: "양꼬치", en: "Lamb Skewers", descEn: "Skewer lamb cubes, season with cumin, and grill over charcoal.", descKo: "양고기를 꼬치에 꿰어 숯불에 구워 쯔란에 찍어 먹는 별미." },
        { name: "볶음밥", en: "Fried Rice", descEn: "Stir-fry rice with egg, green onions, and vegetables/meat.", descKo: "밥과 계란, 각종 야채를 고슬고슬하게 볶아낸 든든한 한 끼." },
        { name: "유린기", en: "Yuringi", descEn: "Deep-fry chicken and serve with fresh vegetables and soy-vinegar sauce.", descKo: "바삭하게 튀긴 닭고기에 아삭한 야채와 새콤한 간장 소스를 곁들인 요리." },
        { name: "깐풍기", en: "Kkanpunggi", descEn: "Deep-fry chicken and stir-fry in spicy garlic sauce.", descKo: "튀긴 닭고기를 매콤한 마늘 소스에 빠르게 볶아낸 중화요리." }
    ],
    japanese: [
        { name: "초밥", en: "Sushi", descEn: "Place fresh sashimi on seasoned rice balls.", descKo: "새콤달콤하게 간을 한 밥 위에 신선한 생선회를 얹어 먹는 요리." },
        { name: "라멘", en: "Ramen", descEn: "Boil noodles in pork/miso broth with chashu, egg, and bamboo shoots.", descKo: "진한 육수에 쫄깃한 면발과 차슈, 계란 등을 올려 먹는 일본식 국수." },
        { name: "우동", en: "Udon", descEn: "Boil thick wheat noodles in soy-dashi broth with fish cakes.", descKo: "오동통한 면발과 시원한 가쓰오부시 국물이 일품인 따뜻한 면 요리." },
        { name: "돈까스", en: "Tonkatsu", descEn: "Bread pork cutlets with panko and deep-fry.", descKo: "두툼한 돼지고기에 빵가루를 입혀 바삭하게 튀겨낸 인기 메뉴." },
        { name: "규동", en: "Gyudon", descEn: "Simmer thin beef and onions in sweet soy sauce, serve over rice.", descKo: "얇게 썬 소고기와 양파를 달콤 짭짤한 간장 소스에 졸여 밥 위에 얹은 덮밥." },
        { name: "가츠동", en: "Katsudon", descEn: "Simmer tonkatsu and egg in dashi sauce, serve over rice.", descKo: "바삭한 돈까스와 부드러운 계란을 소스에 졸여 밥 위에 얹은 덮밥." },
        { name: "소바", en: "Soba", descEn: "Boil buckwheat noodles, serve cold with dipping sauce or in hot broth.", descKo: "메밀 향이 가득한 면을 시원한 쯔유 소스에 적셔 먹는 깔끔한 맛." },
        { name: "타코야끼", en: "Takoyaki", descEn: "Cook batter with octopus chunks in a special mold, top with sauce and flakes.", descKo: "밀가루 반죽 안에 문어를 넣고 동그랗게 구워낸 일본식 간식." }
    ],
    western: [
        { name: "피자", en: "Pizza", descEn: "Top dough with tomato sauce, cheese, and toppings, then bake.", descKo: "도우 위에 토마토 소스와 치즈, 다양한 토핑을 얹어 구워낸 요리." },
        { name: "파스타", en: "Pasta", descEn: "Boil pasta and toss with tomato, cream, or oil-based sauce.", descKo: "다양한 소스와 재료를 면과 함께 볶거나 끓여낸 이탈리아 면 요리." },
        { name: "스테이크", en: "Steak", descEn: "Season beef steak with salt/pepper and sear in a pan or grill.", descKo: "두툼한 소고기를 그릴이나 팬에 구워 육즙을 즐기는 고급진 요리." },
        { name: "햄버거", en: "Hamburger", descEn: "Grill beef patty, assemble in bun with lettuce, tomato, and sauce.", descKo: "빵 사이에 고기 패티와 신선한 야채, 소스를 넣어 먹는 든든한 샌드위치." },
        { name: "샐러드", en: "Salad", descEn: "Toss fresh vegetables/fruits with dressing and optional protein.", descKo: "신선한 채소와 과일, 드레싱이 어우러져 가볍고 건강하게 즐기는 메뉴." },
        { name: "리조또", en: "Risotto", descEn: "Sauté rice with butter/onion, slowly add broth while stirring until creamy.", descKo: "쌀을 버터에 볶다가 육수를 부어 크림처럼 부드럽게 익힌 쌀 요리." },
        { name: "샌드위치", en: "Sandwich", descEn: "Place meat, cheese, and vegetables between bread slices.", descKo: "식빵 사이에 햄, 치즈, 야채 등 좋아하는 재료를 넣어 만든 간편식." },
        { name: "그라탕", en: "Gratin", descEn: "Bake macaroni or potatoes with white sauce and cheese until golden.", descKo: "재료 위에 화이트 소스와 치즈를 듬뿍 얹어 오븐에 노릇하게 구운 요리." },
        { name: "감바스", en: "Gambas al Ajillo", descEn: "Cook shrimp in olive oil with plenty of garlic and chili peppers.", descKo: "올리브 오일에 마늘과 새우를 넣고 끓여 빵과 함께 먹는 스페인 요리." }
    ],
    auto: [] // New "Auto Add" category
};

let categories = ['korean', 'chinese', 'japanese', 'western'];

// Load custom foods from local storage
function loadCustomFoods() {
    const customFoods = JSON.parse(localStorage.getItem('custom_food_items') || '[]');
    if (customFoods.length > 0) {
        foods.auto = customFoods;
        if (!categories.includes('auto')) {
            categories.push('auto');
        }
    }
}
loadCustomFoods(); // Init

// Naver Search API Configuration
const NAVER_CLIENT_ID = "Ufnci94HHyrKm_r0wmyj";
const NAVER_CLIENT_SECRET = "BeDbva4IA5";

const recommendBtn = document.getElementById('recommend-btn');
const foodNameEl = document.getElementById('food-name');
const foodDescriptionEl = document.getElementById('food-description');
const foodCategoryEl = document.getElementById('food-category');
const foodImageEl = document.getElementById('food-image');
const placeholderText = document.querySelector('.placeholder-text');
const foodImageContainer = document.getElementById('food-image-container');

// Anime girl thinking image
const THINKING_IMAGE_URL = "https://image.pollinations.ai/prompt/cute_anime_girl_thinking_about_food_question_mark_cartoon_style?width=400&height=300&nologo=true";

let currentFood = null;

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
        western: "양식",
        auto: "자동추가"
    };
    return names[category] || category;
}

function updateFoodDescription() {
    if (!currentFood) return;
    const lang = localStorage.getItem('language') || 'ko';
    if (foodDescriptionEl) {
        foodDescriptionEl.textContent = lang === 'ko' ? currentFood.descKo : currentFood.descEn;
    }
}

async function recommend() {
    // 1. Show Loading State (Thinking)
    recommendBtn.disabled = true;
    const lang = localStorage.getItem('language') || 'ko';
    const thinkingText = lang === 'ko' ? "고민중... 잠깐만 기다려줘" : "Thinking... Please wait a moment";
    recommendBtn.textContent = thinkingText;

    foodNameEl.textContent = "고민중..."; 
    if (foodDescriptionEl) foodDescriptionEl.textContent = "";
    foodCategoryEl.textContent = "";
    
    placeholderText.style.display = 'none';
    foodImageEl.style.display = 'block';
    foodImageEl.src = THINKING_IMAGE_URL; 

    // 2. Wait
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 3. Pick Random Food
    const food = getRandomFood();
    currentFood = food; 
    
    // 4. Fetch Image
    const nth = Math.floor(Math.random() * 10) + 1;
    
    try {
        const imageUrl = await fetchNaverImage(food.name, nth);
        const img = new Image();
        
        // Load Recipe Data (Priority: Local Custom -> recipes.json)
        const updateRecipeLinks = async () => {
            const recipeContent = document.getElementById('recipe-content');
            if (recipeContent) {
                let recipeData = await getRecipeData(food.name); // Unified loader

                let detailsHtml = '';
                if (recipeData) {
                    const ingredientsHtml = recipeData.ingredients.join(', ');
                    const instructionsHtml = recipeData.instructions.map(inst => `<li>${inst}</li>`).join('');
                    
                    const recipeTitleEl = document.querySelector('#recipe-board h3');
                    if (recipeTitleEl) {
                        const lang = localStorage.getItem('language') || 'ko';
                        const suffix = lang === 'ko' ? ' 레시피' : ' Recipe';
                        recipeTitleEl.textContent = food.name + suffix; 
                    }

                    detailsHtml = `
                        <div id="recipe-details" style="margin-top: 1rem; text-align: left;">
                            <h4 style="margin-top: 1rem; color: var(--btn-bg); border-bottom: 1px solid #ddd; padding-bottom: 5px;">재료</h4>
                            <p style="margin-top: 0.5rem; line-height: 1.6; color: var(--text-color);">${ingredientsHtml}</p>
                            <h4 style="margin-top: 1rem; color: var(--btn-bg); border-bottom: 1px solid #ddd; padding-bottom: 5px;">조리방법</h4>
                            <ol class="recipe-list" style="padding-left: 1.2rem;">${instructionsHtml}</ol>
                        </div>
                    `;
                }

                recipeContent.innerHTML = `
                    ${detailsHtml}
                    <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-top: 1.5rem;">
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
            foodNameEl.textContent = food.name;
            updateFoodDescription(); 
            foodCategoryEl.textContent = getCategoryName(food.category);
            foodImageEl.src = imageUrl;
            
            updateRecipeLinks();
            recommendBtn.disabled = false;
            recommendBtn.textContent = lang === 'ko' ? "메뉴 추천받기" : "Recommend Menu";
            updateTexts(recommendBtn.parentElement); 
        };
        img.onerror = () => {
            console.error("Image load failed, using fallback.");
            foodNameEl.textContent = food.name;
            updateFoodDescription();
            foodCategoryEl.textContent = getCategoryName(food.category);
            foodImageEl.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(food.name)}`;
            
            updateRecipeLinks();
            recommendBtn.disabled = false;
            recommendBtn.textContent = lang === 'ko' ? "메뉴 추천받기" : "Recommend Menu";
        };
        img.src = imageUrl;
    } catch (error) {
        console.error("Search failed:", error);
        foodNameEl.textContent = food.name;
        updateFoodDescription();
        foodCategoryEl.textContent = getCategoryName(food.category);
        foodImageEl.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(food.name)}`;
        recommendBtn.disabled = false;
        recommendBtn.textContent = lang === 'ko' ? "메뉴 추천받기" : "Recommend Menu";
    }
}

async function fetchNaverImage(query, nth) {
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

        if (!response.ok) throw new Error(`Naver API Error: ${response.statusText}`);
        const data = await response.json();
        if (!data.items || data.items.length === 0) throw new Error("No results found");
        const originalUrl = data.items[0].link;
        const cleanUrl = originalUrl.replace(/^https?:\/\//, '');
        return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=400&h=300&fit=cover`;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

// ==========================================
// Recipe Data Management (JSON + LocalStorage)
// ==========================================

async function getRecipeData(query) {
    // 1. Check LocalStorage (Custom Recipes)
    const customRecipes = JSON.parse(localStorage.getItem('custom_recipes') || '{}');
    if (customRecipes[query]) {
        return customRecipes[query];
    }

    // 2. Check recipes.json
    try {
        const response = await fetch('recipes.json');
        const allRecipes = await response.json();
        if (allRecipes[query]) {
            return allRecipes[query];
        }
    } catch (e) {
        console.error("Failed to load recipes.json", e);
    }
    
    return null;
}

function saveCustomRecipe(query, data) {
    // Save Recipe Data
    const customRecipes = JSON.parse(localStorage.getItem('custom_recipes') || '{}');
    customRecipes[query] = data;
    localStorage.setItem('custom_recipes', JSON.stringify(customRecipes));

    // Save Food Item Data (Auto Add Category)
    const customFoods = JSON.parse(localStorage.getItem('custom_food_items') || '[]');
    // Check if already exists
    if (!customFoods.some(f => f.name === query)) {
        customFoods.push({
            name: query,
            en: query, // Use name as EN name fallback
            descEn: "User added recipe.",
            descKo: "사용자가 직접 검색하여 추가된 레시피입니다.",
            category: "auto"
        });
        localStorage.setItem('custom_food_items', JSON.stringify(customFoods));
        
        // Update current runtime list
        foods.auto = customFoods;
        if (!categories.includes('auto')) {
            categories.push('auto');
        }
    }
}

async function crawl10000Recipe(query) {
    const proxyUrl = "https://corsproxy.io/?";
    const searchUrl = `https://www.10000recipe.com/recipe/list.html?q=${encodeURIComponent(query)}`;
    
    try {
        const listResponse = await fetch(proxyUrl + encodeURIComponent(searchUrl));
        const listText = await listResponse.text();
        const parser = new DOMParser();
        const listDoc = parser.parseFromString(listText, 'text/html');
        
        const firstRecipeLink = listDoc.querySelector('.common_sp_list_ul .common_sp_list_li .common_sp_thumb a');
        if (!firstRecipeLink) throw new Error("Recipe not found");
        
        const detailUrl = "https://www.10000recipe.com" + firstRecipeLink.getAttribute('href');
        const detailResponse = await fetch(proxyUrl + encodeURIComponent(detailUrl));
        const detailText = await detailResponse.text();
        const detailDoc = parser.parseFromString(detailText, 'text/html');
        
        const ingredientNodes = detailDoc.querySelectorAll('#divConfirmedMaterialArea ul li');
        const ingredients = Array.from(ingredientNodes).map(li => {
            const name = li.querySelector('.ingre_list_name_a')?.textContent?.trim() || 
                         li.childNodes[0]?.textContent?.trim(); 
            const unit = li.querySelector('.ingre_list_unit')?.textContent?.trim() || "";
            return name && unit ? `${name} ${unit}` : (name || li.textContent.trim());
        }).filter(text => text && text.length > 0);

        const stepNodes = detailDoc.querySelectorAll('.view_step .media-body');
        const instructions = Array.from(stepNodes).map(div => div.textContent.trim());

        return {
            ingredients: ingredients,
            instructions: instructions
        };

    } catch (error) {
        console.error("Crawling failed:", error);
        return null;
    }
}

// ==========================================
// Search Event Listener
// ==========================================

const recipeSearchBtn = document.getElementById('recipe-search-btn');
const recipeSearchInput = document.getElementById('recipe-search-input');

async function handleRecipeSearch() {
    const query = recipeSearchInput.value.trim();
    if (!query) return;

    recipeSearchBtn.disabled = true;
    recipeSearchBtn.textContent = "...";
    
    const recipeContent = document.getElementById('recipe-content');
    const recipeTitleEl = document.querySelector('#recipe-board h3');
    recipeContent.innerHTML = '<p class="placeholder-text-small">Searching...</p>';

    // 1. Try to get data from local sources first
    let result = await getRecipeData(query);

    // 2. If not found, crawl
    if (!result) {
        result = await crawl10000Recipe(query);
        // 3. If crawled successfully, save it!
        if (result) {
            saveCustomRecipe(query, result);
        }
    }
    
    if (result) {
        if (recipeTitleEl) {
            const lang = localStorage.getItem('language') || 'ko';
            recipeTitleEl.textContent = query + (lang === 'ko' ? ' 레시피' : ' Recipe');
        }

        const ingredientsHtml = result.ingredients.join(', ');
        const instructionsHtml = result.instructions.map(inst => `<li>${inst}</li>`).join('');

        recipeContent.innerHTML = `
            <div id="recipe-details" style="margin-top: 1rem; text-align: left;">
                <h4 style="margin-top: 1rem; color: var(--btn-bg); border-bottom: 1px solid #ddd; padding-bottom: 5px;">재료</h4>
                <p style="margin-top: 0.5rem; line-height: 1.6; color: var(--text-color);">${ingredientsHtml}</p>
                <h4 style="margin-top: 1rem; color: var(--btn-bg); border-bottom: 1px solid #ddd; padding-bottom: 5px;">조리방법</h4>
                <ol class="recipe-list" style="padding-left: 1.2rem;">${instructionsHtml}</ol>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-top: 1.5rem;">
                 <a href="https://www.10000recipe.com/recipe/list.html?q=${encodeURIComponent(query)}" target="_blank" class="service-card" style="padding: 0.8rem; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                    <span data-i18n="recipe-btn-10000">10000 Recipe (View Original)</span>
                </a>
            </div>
        `;
        updateTexts(recipeContent); 
    } else {
        recipeContent.innerHTML = `
            <p class="placeholder-text-small" style="color: red;">Recipe not found.</p>
            <a href="https://www.10000recipe.com/recipe/list.html?q=${encodeURIComponent(query)}" target="_blank" style="display:block; margin-top:10px; color: var(--btn-bg); text-decoration: underline;">
                Search on 10000 Recipe directly
            </a>
        `;
    }

    recipeSearchBtn.disabled = false;
    recipeSearchBtn.textContent = "🔍";
}

if (recipeSearchBtn) {
    recipeSearchBtn.addEventListener('click', handleRecipeSearch);
    recipeSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleRecipeSearch();
    });
}

// Initial Listener
window.addEventListener('language-changed', () => {
    updateFoodDescription();
});
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