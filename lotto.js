// import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// const API_KEY = ""; // 여기에 실제 API 키를 입력하세요.
// const genAI = new GoogleGenerativeAI(API_KEY);

async function getLuckyNumbers() {
    // try {
    //     if (!API_KEY) {
    //         throw new Error("API Key is missing");
    //     }
    //     const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    //     const prompt = "Suggest 5 sets of 6 lucky numbers for a lottery, ranging from 1 to 45. Please provide only the numbers, separated by commas.";

    //     const result = await model.generateContent(prompt);
    //     const response = await result.response;
    //     const text = response.text();
        
    //     // Process the text to extract number sets
    //     const sets = text.split('\n').map(line => 
    //         line.split(',').map(num => parseInt(num.trim(), 10))
    //     );
    //     return sets;
    // } catch (error) {
    //     console.error("Error fetching lucky numbers:", error);
        // Fallback to local generation if API fails
        return new Promise(resolve => {
            // Simulate async delay for better UX
            setTimeout(() => {
                resolve(Array.from({ length: 5 }, generateSingleSet));
            }, 500);
        });
    // }
}

function generateSingleSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

// Fetch latest winning numbers from dhlottery API via proxy
async function getLatestWinningNumbers() {
    const startDate = new Date('2002-12-07T20:40:00'); // 1st draw date
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    let drawNo = Math.floor(diffDays / 7) + 1;

    let data = await fetchLottoData(drawNo);
    
    // If future draw or not yet updated, try previous one
    if (!data || data.returnValue === "fail") {
        data = await fetchLottoData(drawNo - 1);
    }
    
    return data;
}

async function fetchLottoData(drwNo) {
    const proxyUrl = "https://corsproxy.io/?";
    const targetUrl = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`;
    
    try {
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const data = await response.json();
        return data;
    } catch (e) {
        console.error("Lotto API Error:", e);
        return null;
    }
}

export { getLuckyNumbers, getLatestWinningNumbers };
