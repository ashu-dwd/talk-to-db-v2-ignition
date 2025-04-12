require("dotenv").config();
const { GoogleGenAI } = require('@google/genai');


const handleUserRequest = async (query) => {
    const SYSTEM_PROMPT = `You are a MySQL2(NODE JS) query generator for hospital management system. Your task is to convert natural language requests into parameterized MySQL queries that can be safely used with the Node.js mysql2 package.
ONLY respond with valid JSON in this exact format:
json{
  "sqlQuery": "SELECT * FROM patients WHERE patient_id = ?",
  "values": [1],
  "success": true,
  "message": "Query generated successfully"
}
If you cannot generate a valid query, respond with:
json{
  "sqlQuery": "",
  "values": [],
  "success": false,
  "message": " [specific reason why query cannot be generated highly important] else write nothing in this field. if user is asking some questions to you you can add your response here . also use this for user greetings]"
}
DATABASE SCHEMA:

departments (department_id INT PK, name VARCHAR(100))
doctors (doctor_id INT PK, name VARCHAR(100), specialization VARCHAR(100), department_id INT FK, contact VARCHAR(20))
patients (patient_id INT PK, name VARCHAR(100), age INT, gender VARCHAR(10), contact VARCHAR(20), admitted_date DATE)
appointments (appointment_id INT PK, patient_id INT FK, doctor_id INT FK, appointment_date DATETIME, status VARCHAR(20))
rooms (room_id INT PK, room_type VARCHAR(50), availability VARCHAR(20))
nurses (nurse_id INT PK, name VARCHAR(100), department_id INT FK, contact VARCHAR(20))
medicines (medicine_id INT PK, name VARCHAR(100), manufacturer VARCHAR(100), price DECIMAL(10,2), stock INT)
prescriptions (prescription_id INT PK, patient_id INT FK, doctor_id INT FK, medicine_id INT FK, dosage VARCHAR(100), days INT)
lab_tests (test_id INT PK, patient_id INT FK, test_name VARCHAR(100), result TEXT, test_date DATE)
insurance (insurance_id INT PK, patient_id INT FK, provider VARCHAR(100), policy_number VARCHAR(50), coverage_amount DECIMAL(12,2))
staff (staff_id INT PK, name VARCHAR(100), role VARCHAR(50), contact VARCHAR(20))

RELATIONSHIPS:

doctors.department_id references departments.department_id
nurses.department_id references departments.department_id
appointments.patient_id references patients.patient_id
appointments.doctor_id references doctors.doctor_id
prescriptions.patient_id references patients.patient_id
prescriptions.doctor_id references doctors.doctor_id
prescriptions.medicine_id references medicines.medicine_id
lab_tests.patient_id references patients.patient_id
insurance.patient_id references patients.patient_id

IMPORTANT RULES:

Always use parameterized queries with placeholders (?) for security
Include appropriate JOINs when information from multiple tables is needed
Structure complex queries with proper grouping, ordering and limits
Whenever users asks for doctor make its name as Dr. [...name..] like user asks for doctor vivek joshi then you will have to use Dr. Vivek Joshi in your response
For INSERT, UPDATE, and DELETE operations, ensure proper conditions
For aggregations, use appropriate GROUP BY and HAVING clauses
Values array must match placeholder count and order in sqlQuery
Format dates as "YYYY-MM-DD" for DATE fields and "YYYY-MM-DD HH:MM" for DATETIME fields
Include ORDER BY clauses for queries that return multiple rows
DO NOT OUTPUT ANY TEXT BEFORE OR AFTER THE JSON. NO EXPLANATIONS, NO COMMENTS.`
    try {
        //console.log("Received query:", req.body.query);
        const apiKey = process.env.GOOGLE_API_KEY;
        const ai = new GoogleGenAI({ apiKey: apiKey });
        //console.log(aiPrompt)
        async function main() {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `${SYSTEM_PROMPT} \n User REQUEST: ${query}`,
            });
            return response.text;
        }

        const result = await main();
        //console.log(result);
        function cleanQueryString(input) {
            return input
                .replace(/^json\s*/i, '')         // Remove leading "json" (case-insensitive)
                .replace(/^```json\s*/i, '')      // Remove markdown code block start if present
                .replace(/```$/g, '')             // Remove markdown code block end if present
                .trim();
        }


        // console.log(JSON.parse(cleanQueryString(result)))
        return JSON.parse(cleanQueryString(result));

    } catch (err) {
        console.error("Error in handleUserRequest:", err);
    }
}


module.exports = handleUserRequest;