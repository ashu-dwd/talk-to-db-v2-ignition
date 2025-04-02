require("dotenv").config();
const { GoogleGenAI } = require('@google/genai');


const aiResponse = async (userQuery, SQLdata) => {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const prompt = `
            Instructions:
            1. Analyze the database result in relation to the user query
            2. Generate a response in HTML format
            3. For authentication:
               - If credentials match database result, return "success" status
               - If credentials don't match, return "failure" status
            4. For tables, use this basic styling: 
               <table style="border-collapse: collapse; width: 100%;">
               <td style="border: 1px solid #ddd; padding: 8px;">

            return just the HTML content.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `${prompt} \n User REQUEST: ${userQuery} \n SQL DATA: ${JSON.stringify(SQLdata)}`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw error;
    }
}

module.exports = aiResponse;