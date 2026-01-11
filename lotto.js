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

export { getLuckyNumbers };