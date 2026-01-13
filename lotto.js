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

// Fetch latest winning numbers from dhlottery API (Main Info)
async function getLatestWinningNumbers() {
    const proxyUrl = "https://corsproxy.io/?";
    const targetUrl = "https://www.dhlottery.co.kr/selectMainInfo.do";
    
    try {
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const json = await response.json();
        
        // Extract Lotto 6/45 data
        // API response structure: data.result.pstLtEpstInfo.lt645 (Array)
        const lt645List = json.data?.result?.pstLtEpstInfo?.lt645;
        
        if (!lt645List || lt645List.length === 0) {
            throw new Error("No Lotto data found in API response");
        }

        // Sort by episode descending to get the latest
        lt645List.sort((a, b) => b.ltEpsd - a.ltEpsd);
        
        const latest = lt645List[0];
        
        return {
            drwNo: latest.ltEpsd,
            drwNoDate: latest.ltRflYmd.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'), // YYYYMMDD -> YYYY-MM-DD
            drwtNo1: latest.tm1WnNo,
            drwtNo2: latest.tm2WnNo,
            drwtNo3: latest.tm3WnNo,
            drwtNo4: latest.tm4WnNo,
            drwtNo5: latest.tm5WnNo,
            drwtNo6: latest.tm6WnNo,
            bnusNo: latest.bnsWnNo,
            returnValue: "success"
        };
    } catch (e) {
        console.error("Lotto API Error:", e);
        return { returnValue: "fail" };
    }
}

export { getLuckyNumbers, getLatestWinningNumbers };