const express = require('express');
const router = express.Router();
const { handleUserLogin, handleUserRegistration } = require('../controllers/user');

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required", status: "error" });
    }

    try {
        const result = await handleUserLogin(email, password);

        return res.status(200).json({
            status: "success",
            msg: result.message,
            user: result.user,
            token: result.token
        });
    } catch (error) {
        console.error("🔴 Error during login:", error.message);

        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error",
            status: "error"
        });
    }
});


// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required", status: "error" });
    }

    try {
        const result = await handleUserRegistration(name, email, password);
        return res.status(200).json({
            message: result,
            status: "success",
            msg: "Registration successful"
        });
    } catch (error) {
        console.error("🔴 Error during signup:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
});

module.exports = router;
