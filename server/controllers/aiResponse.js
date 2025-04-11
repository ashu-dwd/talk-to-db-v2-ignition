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
3. Use semantic HTML where appropriate (<div>, <p>, <h1>-<h6>, <strong>, <em>, <ul>, <ol>, etc.).
4. Ensure accessibility by using appropriate ARIA attributes when necessary.

5. For tables, use this styling:
   <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
     <thead>
       <tr style="background-color: #f2f2f2;">
         <th style="border: 1px solid #ddd; padding: 12px; text-align: left; font-weight: bold;">Column Name</th>
         <!-- Repeat for each column -->
       </tr>
     </thead>
     <tbody>
       <tr>
         <td style="border: 1px solid #ddd; padding: 8px;">Data</td>
         <!-- Repeat for each cell -->
       </tr>
       <!-- Repeat for each row -->
     </tbody>
   </table>

6. When displaying information about a unique person:
   - Use a card-like layout with appropriate spacing
   - Format as:
     <div style="padding: 15px; border: 1px solid #eee; border-radius: 5px; margin-bottom: 15px;">
       <h3 style="margin-top: 0;">Person Name</h3>
       <p><strong>ID:</strong> <em>person_id</em></p>
       <p><strong>Email:</strong> <em>email_address</em></p>
       <!-- Other person attributes -->
     </div>

7. For error cases, use:
   <div style="color: #721c24; background-color: #f8d7da; padding: 12px; border: 1px solid #f5c6cb; border-radius: 4px;">
     <strong>Error:</strong> [Error message]
   </div>

8. For successful operations with no data to display:
   <div style="color: #155724; background-color: #d4edda; padding: 12px; border: 1px solid #c3e6cb; border-radius: 4px;">
     <strong>Success:</strong> [Success message]
   </div>

9. Ensure responsive design by using percentage-based widths and flexible layouts.
10. Return only the HTML content without any JavaScript or additional formatting.
`;
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