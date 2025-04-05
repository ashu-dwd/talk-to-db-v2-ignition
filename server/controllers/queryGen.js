require("dotenv").config();
const { GoogleGenAI } = require('@google/genai');


const handleUserRequest = async (query) => {
    try {
        //console.log("Received query:", req.body.query);
        const apiKey = process.env.GOOGLE_API_KEY;
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const aiPrompt = process.env.AI_PROMPT;
        //console.log(aiPrompt)
        async function main() {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `${aiPrompt} \n User REQUEST: ${query}`,
            });
            return response.text;
        }

        const result = await main();
        function cleanQueryString(input) {
            return input.replace(/^```json\s+|\s*```$/g, '');
        }

        console.log(JSON.parse(cleanQueryString(result)))
        return JSON.parse(cleanQueryString(result));

    } catch (err) {
        console.error("Error in handleUserRequest:", err);
    }
}


module.exports = handleUserRequest;