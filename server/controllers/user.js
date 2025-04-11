const bcrypt = require('bcrypt');
const User = require('../models/user');

// Handle User Login
const handleUserLogin = async (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    return "Login successful";
};

// Handle User Registration
const handleUserRegistration = async (name, email, password) => {
    if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();

    return "Registration successful";
};

module.exports = { handleUserLogin, handleUserRegistration };
