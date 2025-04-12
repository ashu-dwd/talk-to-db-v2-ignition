require("dotenv").config();
const { GoogleGenAI } = require('@google/genai');


const aiResponse = async (userQuery, SQLdata) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const prompt = `
Instructions:
1. Analyze the database result in relation to the user query.
2. Generate a response in HTML format without any <html>, <head>, or <body> tags.
3. Use semantic HTML where appropriate (<div>, <p>,  <strong>, <em>, <ul>, <ol>, etc.).
4. Ensure accessibility by using appropriate ARIA attributes when necessary.
5. You will have to explain data coming from database to user in his natural language.`;
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