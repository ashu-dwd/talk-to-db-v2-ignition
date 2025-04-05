require("dotenv").config();
const { GoogleGenAI } = require('@google/genai');


const aiResponse = async (userQuery, SQLdata) => {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        const ai = new GoogleGenAI({ apiKey: apiKey });
        const prompt = `
            Instructions:
            1. Analyze the database result in relation to the user query
            2. Generate a response in HTML format but do not include any <html> or <body> tags, only use div tags and bold and italics where necessary.
            
            3. For tables, use this basic styling: 
               <table style="border-collapse: collapse; width: 100%;">
               <td style="border: 1px solid #ddd; padding: 8px;">
            4. when user asks for unique person then dont use table, just use div tags and bold and italics where necessary.
            return just the HTML content.`;
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `${prompt} \n User REQUEST: ${userQuery} \n SQL DATA: ${JSON.stringify(SQLdata)}`,
        });
        function cleanQueryString(input) {
            return input.replace(/^```html\s+|\s*```$/g, '');
        }
        //return response.text;
        if (response.text) {
            return { mainOutput: cleanQueryString(response.text), success: true };
        } else {
            return { mainOutput: "No response generated.", success: false };
        }
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw error;
    }
}

module.exports = aiResponse;